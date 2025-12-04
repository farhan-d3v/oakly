import { Response, NextFunction } from 'express';
import Order from '../models/Order.model';
import Inventory from '../models/Inventory.model';
import { AuthRequest } from '../middleware/auth.middleware';
import { AppError } from '../middleware/errorHandler';

export const getAllOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, customerType, search, page = '1', limit = '20' } = req.query;

    const query: any = {};

    if (status && status !== 'All') query.status = status;
    if (customerType && customerType !== 'All') query.customerType = customerType;
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const orders = await Order.find(query)
      .sort({ orderDate: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('createdBy', 'name email');

    const total = await Order.countDocuments(query);

    const stats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: '$total' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      stats,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.params.id).populate('createdBy', 'name email');

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderData = { ...req.body, createdBy: req.user?.id };

    // Validate stock availability
    for (const item of orderData.items) {
      const inventory = await Inventory.findById(item.productId);
      if (!inventory) {
        return next(new AppError(`Product ${item.productName} not found`, 404));
      }
      if (inventory.currentStock < item.quantity) {
        return next(new AppError(`Insufficient stock for ${item.productName}`, 400));
      }
    }

    const order = await Order.create(orderData);

    // Update inventory
    for (const item of order.items) {
      await Inventory.findByIdAndUpdate(item.productId, {
        $inc: { currentStock: -item.quantity },
      });
    }

    const io = req.app.get('io');
    io.emit('order:created', order);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    const io = req.app.get('io');
    io.emit('order:updated', order);

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
