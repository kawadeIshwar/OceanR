import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, ArrowLeft } from 'lucide-react';
import api from '../utils/api';

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryAndProducts();
  }, [id]);

  const fetchCategoryAndProducts = async () => {
    try {
      const [categoryRes, productsRes] = await Promise.all([
        api.get(`/categories/${id}`),
        api.get(`/products?category=${id}`),
      ]);
      setCategory(categoryRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Category not found</p>
          <Link to="/products" className="text-primary-600 hover:underline mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-gray-600">{category.description}</p>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">No products in this category yet</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group"
                >
                  <div className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <Package size={64} className="text-gray-400" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
