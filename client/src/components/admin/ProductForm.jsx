import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { X, Upload } from 'lucide-react';
import api from '../../utils/api';

const ProductForm = ({ product, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: product || {},
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      
      // Add product data
      const productData = {
        name: data.name,
        description: data.description,
        category: data.category,
        featured: data.featured || false,
        specs: {},
      };

      // Parse specs if provided
      if (data.specs) {
        try {
          productData.specs = JSON.parse(data.specs);
        } catch (e) {
          console.error('Invalid specs JSON:', e);
          toast.error('Invalid JSON format in specifications. Please check and try again.');
          setSubmitting(false);
          return;
        }
      }

      console.log('Product Data:', productData);
      formData.append('data', JSON.stringify(productData));

      // Add images
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });
      console.log('Images:', imageFiles.length);

      if (product) {
        const response = await api.put(`/products/${product._id}`, formData);
        console.log('Product updated:', response.data);
        toast.success('Product updated successfully!');
      } else {
        const response = await api.post('/products', formData);
        console.log('Product created:', response.data);
        toast.success('Product added successfully!');
      }

      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMessage = 'Unknown error occurred';
      
      if (error.response?.data) {
        errorMessage = error.response.data.message || error.response.data.error || error.message;
        
        // Check if it's a Cloudinary error
        if (errorMessage.includes('cloudinary') || errorMessage.includes('Cloudinary')) {
          errorMessage = 'Image upload failed. Please check Cloudinary configuration in server .env file.';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error('Failed to save product: ' + errorMessage);
      console.error('Check browser console for more details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-black text-white">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {product ? 'Update product details and specifications' : 'Fill in the details to add a new product'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Product name is required' })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="e.g., Industrial Safety Helmet"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-bold mb-2 text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-bold mb-2 text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows="4"
              {...register('description', { required: 'Description is required' })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              placeholder="Describe the product features and benefits..."
            ></textarea>
            {errors.description && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="specs" className="block text-sm font-bold mb-2 text-gray-700">
              Specifications (JSON format)
            </label>
            <textarea
              id="specs"
              rows="3"
              {...register('specs')}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono text-sm resize-none"
              placeholder='{"Material": "Steel", "Weight": "2kg", "Dimensions": "30x20x15cm"}'
            ></textarea>
            <p className="mt-2 text-xs text-gray-500 bg-blue-50 px-3 py-2 rounded-lg">
              💡 Enter as JSON object, e.g., {`{"key": "value"}`}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border-2 border-blue-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('featured')}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded border-2 border-gray-300"
              />
              <div>
                <span className="text-sm font-bold text-gray-900">Featured Product</span>
                <p className="text-xs text-gray-600 mt-0.5">Display this product prominently on the homepage</p>
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Product Images
            </label>
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center bg-blue-50/30 hover:bg-blue-50 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImageFiles(Array.from(e.target.files))}
                className="hidden"
                id="images"
              />
              <label htmlFor="images" className="cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="text-blue-600" size={32} />
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Click to upload product images
                </p>
                <p className="text-xs text-gray-500">Maximum 5 images, JPG or PNG</p>
                {imageFiles.length > 0 && (
                  <p className="text-sm text-blue-600 font-bold mt-3 bg-white px-4 py-2 rounded-lg inline-block">
                    ✓ {imageFiles.length} file(s) selected
                  </p>
                )}
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                product ? 'Update Product' : 'Add Product'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3.5 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
