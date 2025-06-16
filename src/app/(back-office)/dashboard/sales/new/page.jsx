// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { postSale, fetchSales } from '@/src/redux/thunks/saleThunks';
// // import { fetchProductsThunk } from '@/src/redux/thunks/productThunks';

// import { postSale, fetchSales } from '@/src/redux/thunks/saleThunks';


// import { fetchProductsThunk } from '@/src/redux/thunks/productThunks';

// // import { fetchProducts } from '@/src/redux/thunks/productThunks';

// export default function SalesPage() {
//   const dispatch = useDispatch();
  
//   // Safely access Redux state with default values
//   const products = useSelector((state) => state.product?.items || []);
//   const sales = useSelector((state) => state.sales?.sales || []);
//   const loading = useSelector((state) => state.sales?.loading || false);
//   const error = useSelector((state) => state.sales?.error || null);

//   const [form, setForm] = useState({
//     productName: '',
//     unit_price: '',
//     quantity: '',
//   });

//   useEffect(() => {
//     dispatch(fetchProducts());
//     dispatch(fetchSales()); // Fetch existing sales when component mounts
//   }, [dispatch]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form inputs
//     if (!form.productName) {
//       alert('Please select a product');
//       return;
//     }
//     if (!form.unit_price || isNaN(form.unit_price)) {
//       alert('Please enter a valid unit price');
//       return;
//     }
//     if (!form.quantity || isNaN(form.quantity)) {
//       alert('Please enter a valid quantity');
//       return;
//     }

//     const selectedProduct = products.find(
//       (p) => p.material_name === form.productName
//     );
//     if (!selectedProduct) {
//       alert('Invalid product selected.');
//       return;
//     }

//     const salePayload = {
//       product_id: selectedProduct.id,
//       product_name: selectedProduct.material_name, // Include product name for display
//       unit_price: parseFloat(form.unit_price), // Use parseFloat for decimal prices
//       quantity: parseInt(form.quantity),
//       total: parseFloat(form.unit_price) * parseInt(form.quantity), // Calculate total
//     };

//     try {
//       await dispatch(postSale(salePayload));
//       // Reset form after successful submission
//       setForm({
//         productName: '',
//         unit_price: '',
//         quantity: '',
//       });
//       // Refresh sales list
//       dispatch(fetchSales());
//     } catch (err) {
//       console.error('Error submitting sale:', err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Sales Management</h2>
      
//       {/* Sales Form */}
//       <div className="bg-white p-6 rounded-lg shadow mb-6">
//         <h3 className="text-xl font-semibold mb-4">Record a Sale</h3>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">Product</label>
//             <select
//               className="w-full p-2 border rounded"
//               value={form.productName}
//               onChange={(e) => setForm({ ...form, productName: e.target.value })}
//               required
//             >
//               <option value="">Select Product</option>
//               {products.map((prod) => (
//                 <option key={prod.id} value={prod.material_name}>
//                   {prod.material_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Unit Price</label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               placeholder="0.00"
//               className="w-full p-2 border rounded"
//               value={form.unit_price}
//               onChange={(e) => setForm({ ...form, unit_price: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Quantity</label>
//             <input
//               type="number"
//               min="1"
//               placeholder="1"
//               className="w-full p-2 border rounded"
//               value={form.quantity}
//               onChange={(e) => setForm({ ...form, quantity: e.target.value })}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
//             disabled={loading}
//           >
//             {loading ? 'Processing...' : 'Submit Sale'}
//           </button>
          
//           {error && (
//             <p className="text-red-500 mt-2">{error}</p>
//           )}
//         </form>
//       </div>

//       {/* Sales List */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h3 className="text-xl font-semibold mb-4">Sales History</h3>
//         {loading ? (
//           <p>Loading sales...</p>
//         ) : sales.length === 0 ? (
//           <p className="text-gray-500">No sales recorded yet</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead>
//                 <tr className="border-b">
//                   <th className="text-left p-2">Product</th>
//                   <th className="text-left p-2">Unit Price</th>
//                   <th className="text-left p-2">Quantity</th>
//                   <th className="text-left p-2">Total</th>
//                   <th className="text-left p-2">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sales.map((sale) => (
//                   <tr key={sale.id} className="border-b">
//                     <td className="p-2">{sale.product_name || 'N/A'}</td>
//                     <td className="p-2">${sale.unit_price?.toFixed(2)}</td>
//                     <td className="p-2">{sale.quantity}</td>
//                     <td className="p-2 font-medium">
//                       ${(sale.unit_price * sale.quantity)?.toFixed(2)}
//                     </td>
//                     <td className="p-2 text-sm text-gray-500">
//                       {new Date(sale.created_at || sale.create_at).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }