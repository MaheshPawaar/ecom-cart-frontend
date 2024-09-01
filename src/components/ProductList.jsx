import { useFetchData } from '../hooks/useFetchData';
import ProductCard from './ProductCard';

const ProductList = () => {
  const productUrl = import.meta.env.VITE_PRODUCT_URL;
  const { data, loading, error } = useFetchData(`${productUrl}?limit=15`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="product-list">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
