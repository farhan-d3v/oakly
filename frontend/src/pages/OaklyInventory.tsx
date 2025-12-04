// src/pages/OaklyInventory.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Package,
  Search,
  Download,
  Upload,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingDown,
  Eye,
} from "lucide-react";
import api from "../api/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type InventoryItem = {
  _id: string;
  name: string;
  sku?: string;
  quantity: number;
  price: number;
  category?: string;
  woodType?: string;
  unit?: string;
  supplier?: string;
  reorderPoint?: number;
  lastRestocked?: string;
  status?: "In Stock" | "Low Stock" | "Out of Stock" | "Reorder";
  createdAt?: string;
  updatedAt?: string;
};

const PAGE_SIZE = 8;

const OaklyInventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // UI controls
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "stock" | "price">("name");

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // selection for bulk actions
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  // modals
  const [viewing, setViewing] = useState<InventoryItem | null>(null);
  const [editing, setEditing] = useState<InventoryItem | null>(null);
  const [addingOpen, setAddingOpen] = useState(false);

  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);
  const navigate = useNavigate();

  // server fetch with query params
  const fetchItems = async (opts?: { page?: number; q?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const p = opts?.page ?? page;
      const q = opts?.q ?? searchQuery;

      // build query params (server-side filtering)
      const params = new URLSearchParams();
      params.append("page", String(p));
      params.append("limit", String(PAGE_SIZE));
      if (q && q.trim().length) params.append("q", q.trim());
      if (selectedCategory !== "All") params.append("category", selectedCategory);
      if (selectedStatus !== "All") params.append("status", selectedStatus);
      params.append("sort", sortBy);

      const res = await api.get(`/inventory/paginated?${params.toString()}`);
      const payload = res.data; // { page, totalPages, items }
      const returned: InventoryItem[] = payload.items ?? [];
      setItems(returned);
      setTotalPages(payload.totalPages ?? 1);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error?.response?.data?.message ?? "Unable to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchItems({ page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // debounce search
  useEffect(() => {
    if (debounceTimer) window.clearTimeout(debounceTimer);
    const t = window.setTimeout(() => {
      setPage(1);
      fetchItems({ page: 1, q: searchQuery });
    }, 450);
    setDebounceTimer(t);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory, selectedStatus, sortBy]);

  const displayed = useMemo(() => items.slice(), [items]);

  // stats
  const totalProducts = items.length;
  const inStock = items.filter((it) => (it.status ?? "In Stock") === "In Stock").length;
  const lowStock = items.filter((it) => (it.status ?? "").toLowerCase() === "low stock").length;
  const outOfStock = items.filter((it) => (it.status ?? "").toLowerCase() === "out of stock").length;
  const needsReorder = items.filter((it) => (it.status ?? "").toLowerCase() === "reorder").length;
  const totalValue = items.reduce((sum, it) => sum + ((it.quantity ?? 0) * (it.price ?? 0)), 0);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      case "Reorder":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "In Stock":
        return <CheckCircle className="w-4 h-4" />;
      case "Low Stock":
        return <AlertTriangle className="w-4 h-4" />;
      case "Out of Stock":
        return <XCircle className="w-4 h-4" />;
      case "Reorder":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // selection helpers
  const toggleSelect = (id: string) => {
    setSelectedIds((s) => ({ ...s, [id]: !s[id] }));
  };
  const clearSelection = () => setSelectedIds({});
  const selectAllOnPage = () => {
    const map: Record<string, boolean> = {};
    displayed.forEach((d) => (map[d._id] = true));
    setSelectedIds(map);
  };

  // CRUD operations
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This action cannot be undone.")) return;
    try {
      await api.delete(`/inventory/${id}`);
      fetchItems({ page });
      clearSelection();
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      alert(error?.response?.data?.message ?? "Delete failed");
    }
  };

  const handleBulkDelete = async () => {
    const ids = Object.keys(selectedIds).filter((k) => selectedIds[k]);
    if (!ids.length) return alert("No items selected");
    if (!confirm(`Delete ${ids.length} selected items?`)) return;
    try {
      // sequentially delete (or add backend bulk endpoint)
      await Promise.all(ids.map((id) => api.delete(`/inventory/${id}`)));
      fetchItems({ page });
      clearSelection();
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      alert(error?.response?.data?.message ?? "Bulk delete failed");
    }
  };

  const handleView = (id: string) => {
    const it = items.find((x) => x._id === id);
    if (it) setViewing(it);
    else navigate(`/inventory/${id}`);
  };

  const handleAddOpen = () => setAddingOpen(true);
  const handleEdit = (id: string) => {
    const it = items.find((x) => x._id === id);
    if (it) setEditing(it);
    else navigate(`/inventory/${id}/edit`);
  };

  // add / edit submit handlers (called from modal components)
  const createItem = async (payload: Partial<InventoryItem>) => {
    try {
      const res = await api.post("/inventory", payload);
      setAddingOpen(false);
      fetchItems({ page: 1 }); // go to first page to see new item
      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error?.response?.data?.message ?? "Create failed");
    }
  };

  const updateItem = async (id: string, payload: Partial<InventoryItem>) => {
    try {
      const res = await api.put(`/inventory/${id}`, payload);
      setEditing(null);
      fetchItems({ page });
      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(error?.response?.data?.message ?? "Update failed");
    }
  };

  // ------------------ Modals (inline components) ------------------
  const ViewModal: React.FC<{ item: InventoryItem; onClose: () => void }> = ({ item, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">SKU</p>
            <p className="font-medium">{item.sku ?? item._id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Category</p>
            <p className="font-medium">{item.category ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Stock</p>
            <p className="font-medium">{item.quantity?.toLocaleString() ?? 0} {item.unit ?? ""}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Price per unit</p>
            <p className="font-medium">${(item.price ?? 0).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Supplier</p>
            <p className="font-medium">{item.supplier ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Last restocked</p>
            <p className="font-medium">{item.lastRestocked ? new Date(item.lastRestocked).toLocaleDateString() : "—"}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-100" onClick={onClose}>Close</button>
          <button className="px-4 py-2 rounded bg-amber-600 text-white" onClick={() => { onClose(); handleEdit(item._id); }}>Edit</button>
        </div>
      </div>
    </div>
  );

  const AddEditModal: React.FC<{
    initial?: Partial<InventoryItem> | null;
    onSave: (payload: Partial<InventoryItem>) => Promise<void>;
    onClose: () => void;
    title: string;
  }> = ({ initial = null, onSave, onClose, title }) => {
    const [form, setForm] = useState<Partial<InventoryItem>>({
      name: initial?.name ?? "",
      sku: initial?.sku ?? "",
      category: initial?.category ?? "",
      woodType: initial?.woodType ?? "",
      unit: initial?.unit ?? "",
      quantity: initial?.quantity ?? 0,
      price: initial?.price ?? 0,
      supplier: initial?.supplier ?? "",
      reorderPoint: initial?.reorderPoint ?? 0,
      lastRestocked: initial?.lastRestocked ?? "",
    });
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const handleChange = (k: keyof InventoryItem, v: any) => setForm((s) => ({ ...s, [k]: v }));

    const submit = async (e?: React.FormEvent) => {
      e?.preventDefault();
      setSaving(true);
      setErr(null);
      try {
        await onSave(form);
        onClose();
      } catch (e: any) {
        setErr(e?.message ?? "Save failed");
      } finally {
        setSaving(false);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <form onSubmit={submit} className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 z-10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button type="button" onClick={onClose} className="text-gray-500">Close</button>
          </div>

          {err && <div className="text-sm text-red-600 p-2 bg-red-50 rounded">{err}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600">Name</label>
              <input value={form.name} onChange={(e) => handleChange("name" as any, e.target.value)} required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">SKU (optional)</label>
              <input value={form.sku} onChange={(e) => handleChange("sku" as any, e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Category</label>
              <input value={form.category} onChange={(e) => handleChange("category" as any, e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Wood Type</label>
              <input value={form.woodType} onChange={(e) => handleChange("woodType" as any, e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Quantity</label>
              <input type="number" value={form.quantity ?? 0} onChange={(e) => handleChange("quantity" as any, Number(e.target.value))} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Price</label>
              <input type="number" step="0.01" value={form.price ?? 0} onChange={(e) => handleChange("price" as any, Number(e.target.value))} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Unit</label>
              <input value={form.unit} onChange={(e) => handleChange("unit" as any, e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Supplier</label>
              <input value={form.supplier} onChange={(e) => handleChange("supplier" as any, e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Reorder point</label>
              <input type="number" value={form.reorderPoint ?? 0} onChange={(e) => handleChange("reorderPoint" as any, Number(e.target.value))} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Last restocked (YYYY-MM-DD)</label>
              <input type="date" value={form.lastRestocked ?? ""} onChange={(e) => handleChange("lastRestocked" as any, e.target.value)} className="w-full p-2 border rounded" />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 rounded bg-amber-600 text-white">{saving ? "Saving..." : "Save"}</button>
          </div>
        </form>
      </div>
    );
  };

  // ------------------ JSX ------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3" />
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddOpen}
              className="px-4 sm:px-5 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Product</span>
            </button>
            <button onClick={selectAllOnPage} className="px-3 py-2 bg-white rounded border">Select page</button>
            <button onClick={handleBulkDelete} className="px-3 py-2 bg-red-50 text-red-700 rounded border">Delete selected</button>
          </div>
        </div>
      </div>

      <main className="p-4 sm:p-8 lg:p-9 max-w-7xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-9">
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-2">Total Products</p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">{totalProducts}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-2">In Stock</p>
            <p className="text-3xl sm:text-4xl font-bold text-green-600">{inStock}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-2">Low Stock</p>
            <p className="text-3xl sm:text-4xl font-bold text-yellow-600">{lowStock}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-2">Out of Stock</p>
            <p className="text-3xl sm:text-4xl font-bold text-red-600">{outOfStock}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-2">Needs Reorder</p>
            <p className="text-3xl sm:text-4xl font-bold text-orange-600">{needsReorder}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-2">Total Value</p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
          </div>
        </div>

        <div className="h-5 sm:h-9" />

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="          Search by name, wood type, or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
            >
              <option value="All">All Categories</option>
              <option value="Hardwood Lumber">Hardwood Lumber</option>
              <option value="Softwood Lumber">Softwood Lumber</option>
              <option value="Plywood & Panels">Plywood & Panels</option>
              <option value="Wood Flooring">Wood Flooring</option>
            </select>

        {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
            >
              <option value="All">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Reorder">Needs Reorder</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
            >
              <option value="name">Sort by name</option>
              <option value="stock">Sort by stock</option>
              <option value="price">Sort by price</option>
            </select>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button onClick={() => fetchItems({ page: 1 })} className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
              </button>
            </div>
          </div>
        </div>

        <div className="h-5 sm:h-9" />

        {/* Inventory Display - Card Style */}
        <div className="space-y-6">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-pulse px-6 py-3 bg-amber-100 rounded-lg">Loading inventory…</div>
            </div>
          )}

          {!loading &&
            displayed.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow-md p-5 sm:p-6 hover:shadow-lg transition-shadow border-2 border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-amber-400">
                      <Package className="w-6 h-6 text-amber-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">{product.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5">SKU: {product.sku ?? product._id} • {product.woodType ?? "—"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={!!selectedIds[product._id]} onChange={() => toggleSelect(product._id)} />
                    <span className={`ml-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(product.status)}`}>
                      {getStatusIcon(product.status)}
                      <span>{product.status ?? (product.quantity > 0 ? "In Stock" : "Out of Stock")}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 pb-4 border-b-2 border-gray-100">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 font-medium">Category</p>
                    <p className="text-sm font-medium text-gray-900 break-words">{product.category ?? "—"}</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 font-medium">Dimensions</p>
                    <p className="text-sm font-medium text-gray-900">—</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 font-medium">Stock Level</p>
                    <p className="text-sm font-semibold text-gray-900">{(product.quantity ?? 0).toLocaleString()} {product.unit ?? ""}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Reorder: {product.reorderPoint ?? "—"}</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 font-medium">Price per Unit</p>
                    <p className="text-sm font-semibold text-gray-900">${(product.price ?? 0).toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Total: ${( (product.quantity ?? 0) * (product.price ?? 0) ).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-gray-600">
                    <span className="font-semibold">Supplier:</span> {product.supplier ?? "—"} •{" "}
                    <span className="ml-1">
                      <span className="font-semibold">Last Restocked:</span> {product.lastRestocked ? new Date(product.lastRestocked).toLocaleDateString() : "—"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => handleView(product._id)} className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5 font-medium">
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button onClick={() => handleEdit(product._id)} className="px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1.5 font-medium">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="px-3 py-1.5 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1.5 font-medium">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        { !loading && displayed.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center mt-6">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No products found matching your filters</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-2 rounded bg-white border">
              Prev
            </button>
            <div className="px-4 py-2 bg-white border rounded">Page {page} / {totalPages}</div>
            <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-2 rounded bg-white border">
              Next
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      {viewing && <ViewModal item={viewing} onClose={() => setViewing(null)} />}
      {addingOpen && (
        <AddEditModal
          title="Add Product"
          initial={null}
          onClose={() => setAddingOpen(false)}
          onSave={async (payload) => {
            await createItem(payload);
          }}
        />
      )}
      {editing && (
        <AddEditModal
          title="Edit Product"
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={async (payload) => {
            await updateItem(editing._id, payload);
          }}
        />
      )}
    </div>
  );
};

export default OaklyInventory;
