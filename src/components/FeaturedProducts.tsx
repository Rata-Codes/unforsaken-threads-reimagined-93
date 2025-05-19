
import ProductCard from "./ProductCard";

// Define mock product data
const products = [
  {
    id: "1",
    name: "Minimal Heavyweight Hoodie",
    price: 65,
    originalPrice: 74,
    imageDefault: "/placeholder.svg",
    imageHover: "/placeholder.svg",
    discount: 12
  },
  {
    id: "2",
    name: "Modern Oversized Tee",
    price: 42,
    originalPrice: 53,
    imageDefault: "/placeholder.svg",
    imageHover: "/placeholder.svg",
    discount: 21
  },
  {
    id: "3",
    name: "Iconic Washed Oversized Tee",
    price: 47,
    originalPrice: 57,
    imageDefault: "/placeholder.svg",
    imageHover: "/placeholder.svg",
    discount: 18
  },
  {
    id: "4",
    name: "Celestial 2.0 Heavyweight Tee",
    price: 45,
    originalPrice: 53,
    imageDefault: "/placeholder.svg",
    imageHover: "/placeholder.svg",
    discount: 15
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 px-4">
      <div className="container">
        <h2 className="text-2xl font-medium mb-8 text-center">Best Sellers</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors duration-300 uppercase tracking-wide text-sm">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
