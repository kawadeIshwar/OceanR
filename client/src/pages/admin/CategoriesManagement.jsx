import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, FolderTree, X, Save, Package } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    reset(category);
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory._id}`, data);
      } else {
        await api.post('/categories', data);
      }
      setShowForm(false);
      setEditingCategory(null);
      reset();
      fetchCategories();
      toast.success(editingCategory ? 'Category updated successfully!' : 'Category created successfully!');
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
    reset();
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-5 md:mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">Categories Management</h1>
          <p className="text-sm md:text-base text-gray-600">Organize your products into categories</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all font-bold shadow-lg hover:shadow-xl text-sm md:text-base whitespace-nowrap"
        >
          <Plus size={18} className="md:w-5 md:h-5" />
          Add Category
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 flex justify-between items-center rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-black text-white">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <p className="text-emerald-100 text-sm mt-1">
                  {editingCategory ? 'Update category details' : 'Create a new product category'}
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                type="button"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-700">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Category name is required' })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="e.g., Safety Equipment"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-bold mb-2 text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  {...register('description')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
                  placeholder="Describe this category..."
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3.5 px-6 rounded-xl font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3.5 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderTree size={36} className="text-emerald-600 md:w-10 md:h-10" />
          </div>
          <p className="text-lg md:text-xl font-bold text-gray-900 mb-2">No categories yet</p>
          <p className="text-sm md:text-base text-gray-600 mb-6">Create your first category to organize your products</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all font-bold shadow-lg text-sm md:text-base"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {categories.map((category) => (
            <div key={category._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FolderTree className="text-white" size={24} />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2.5 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="p-2.5 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-1">{category.name}</h3>
                {category.description ? (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{category.description}</p>
                ) : (
                  <p className="text-sm text-gray-400 italic mb-4">No description</p>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-100">
                  <Package size={14} />
                  <span className="font-semibold">Products in this category</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesManagement;
