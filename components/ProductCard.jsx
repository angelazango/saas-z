"use client";

const ProductCard = ({ product }) => {
  const {
    image,
    name = "Unnamed Product",
    category = "Uncategorized",
    price,
  } = product || {};
// Convert price to number if possible
  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString()
      : parseFloat(price)
      ? parseFloat(price).toLocaleString()
      : "N/A";
return (
    <div className="border rounded-xl shadow-md p-4 bg-white">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-md"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center 
        justify-center rounded-md text-gray-500">
          No Image
        </div>
      )}

      <h3 className="text-lg font-semibold mt-1">{name}</h3>
      <p className="text-gray-700">Category: {category}</p>
      <p className="text-green-500 font-bold">
        {formattedPrice} FCFA
      </p>
    </div>
  );
};

export default ProductCard;
