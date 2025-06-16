// // components/SalesPage.js
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { postSale, fetchSales } from '@/src/redux/thunks/saleThunks';
// import { fetchProducts } from '@/src/redux/thunks/productThunks';
// import { resetSalesState } from '@/src/redux/slice/saleSlice';

// export default function SalesPage() {
//   const dispatch = useDispatch();
  
//   // Safely destructure state with default values
//   const { 
//     sales = [], 
//     loading: salesLoading, 
//     error: salesError,
//     success: salesSuccess 
//   } = useSelector((state) => state.sales || {});
  
//   const { 
//     items: products = [], 
//     loading: productsLoading 
//   } = useSelector((state) => state.product || {});

//   const [form, setForm] = useState({
//     productName: '',
//     unit_price: '',
//     quantity: '',
//   });
//   const [formErrors, setFormErrors] = useState({});

//   useEffect(() => {
//     dispatch(fetchProducts());
//     dispatch(fetchSales());
    
//     // Clean up function to reset sales state when component unmounts
//     return () => {
//       dispatch(resetSalesState());
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (salesSuccess) {
//       // Reset form on successful submission
//       setForm({
//         productName: '',
//         unit_price: '',
//         quantity: '',
//       });
//       // Optionally show a success message
//       alert('Sale recorded successfully!');
//     }
//   }, [salesSuccess]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormErrors({});

//     // Basic validation
//     if (!form.productName) {
//       setFormErrors({ productName: 'Please select a product' });
//       return;
//     }
//     if (!form.unit_price || isNaN(form.unit_price) {
//       setFormErrors({ unit_price: 'Please enter a valid unit price' });
//       return;
//     }
//     if (!form.quantity || isNaN(form.quantity) {
//       setFormErrors({ quantity: 'Please enter a valid quantity' });
//       return;
//     }

//     const selectedProduct = products.find(
//       (p) => p.material_name === form.productName
//     );
//     if (!selectedProduct) {
//       setFormErrors({ productName: 'Invalid product selected' });
//       return;
//     }

//     const salePayload = {
//       product_id: selectedProduct.id,
//       product_name: selectedProduct.material_name,
//       unit_price: parseFloat(form.unit_price),
//       quantity: parseInt(form.quantity),
//       total: parseFloat(form.unit_price) * parseInt(form.quantity),
//     };

//     try {
//       await dispatch(postSale(salePayload));
//       // The success effect will handle the reset
//     } catch (error) {
//       // Error is already handled by the thunk
//       console.error('Sale submission error:', error);
//     }
//   };

//   if (productsLoading) {
//     return <div className="p-6 text-center">Loading products...</div>;
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Sales Management</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Sales Form */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-xl font-semibold mb-4">Record a Sale</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Product *</label>
//               <select
//                 className={`w-full p-2 border rounded ${formErrors.productName ? 'border-red-500' : ''}`}
//                 value={form.productName}
//                 onChange={(e) => setForm({ ...form, productName: e.target.value })}
//               >
//                 <option value="">Select Product</option>
//                 {products.map((prod) => (
//                   <option key={prod.id} value={prod.material_name}>
//                     {prod.material_name}
//                   </option>
//                 ))}
//               </select>
//               {formErrors.productName && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.productName}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Unit Price *</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 placeholder="0.00"
//                 className={`w-full p-2 border rounded ${formErrors.unit_price ? 'border-red-500' : ''}`}
//                 value={form.unit_price}
//                 onChange={(e) => setForm({ ...form, unit_price: e.target.value })}
//               />
//               {formErrors.unit_price && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.unit_price}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Quantity *</label>
//               <input
//                 type="number"
//                 min="1"
//                 placeholder="1"
//                 className={`w-full p-2 border rounded ${formErrors.quantity ? 'border-red-500' : ''}`}
//                 value={form.quantity}
//                 onChange={(e) => setForm({ ...form, quantity: e.target.value })}
//               />
//               {formErrors.quantity && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.quantity}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
//               disabled={salesLoading}
//             >
//               {salesLoading ? 'Processing...' : 'Submit Sale'}
//             </button>
            
//             {salesError && (
//               <p className="text-red-500 text-sm mt-2">{salesError}</p>
//             )}
//           </form>
//         </div>

//         {/* Sales List */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-xl font-semibold mb-4">Recent Sales</h3>
//           {salesLoading ? (
//             <p>Loading sales...</p>
//           ) : sales.length === 0 ? (
//             <p className="text-gray-500">No sales recorded yet</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left p-2">Product</th>
//                     <th className="text-left p-2">Price</th>
//                     <th className="text-left p-2">Qty</th>
//                     <th className="text-left p-2">Total</th>
//                     <th className="text-left p-2">Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sales.map((sale) => (
//                     <tr key={sale.id} className="border-b">
//                       <td className="p-2">{sale.product_name}</td>
//                       <td className="p-2">${sale.unit_price?.toFixed(2)}</td>
//                       <td className="p-2">{sale.quantity}</td>
//                       <td className="p-2 font-medium">
//                         ${(sale.unit_price * sale.quantity)?.toFixed(2)}
//                       </td>
//                       <td className="p-2 text-sm text-gray-500">
//                         {new Date(sale.created_at).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }