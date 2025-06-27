// components/ProductCard.jsx
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
        <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <Link href={`/products/${product.id}`} passHref>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;