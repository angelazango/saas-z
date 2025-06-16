// 'use client';

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import {
//   fetchPurchasesStart,
//   fetchPurchasesSuccess,
//   fetchPurchasesFailure,
// } from '@/src/redux/slice/purchaseSlice';
// import { URL } from '@/config';
// import PurchaseForm from './PurchaseForm';

// export default function PurchaseList() {
//   const dispatch = useDispatch();
//   const { purchases, loading, error } = useSelector((state) => state.purchase);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState(null);

//   useEffect(() => {
//     fetchPurchases();
//   }, []);

//   const fetchPurchases = async () => {
//     try {
//       dispatch(fetchPurchasesStart());
//       const response = await axios.get(`${URL}/purchase`);
//       dispatch(fetchPurchasesSuccess(response.data.purchases));
//     } catch (err) {
//       dispatch(fetchPurchasesFailure(err.response?.data?.message || 'Failed to fetch purchases.'));
//     }
//   };

//   const handleAddPurchase = (productId = null) => {
//     setSelectedProductId(productId);
//     setShowForm(true);
//   };

//   const handleFormCancel = () => {
//     setShowForm(false);
//     setSelectedProductId(null);
//   };

//   const handleFormSuccess = () => {
//     setShowForm(false);
//     setSelectedProductId(null);
//     fetchPurchases(); // Refresh list
//   };

//   return (
//     <div className="max-w-6xl mx-auto mt-10 p-6">
//       <div className="bg-white rounded-lg shadow">
//         <div className="p-4 border-b flex justify-between items-center">
//           <h2 className="text-2xl font-semibold text-gray-800">Purchases List</h2>
//           <button
//             onClick={() => handleAddPurchase()}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
//           >
//             <span>+</span>
//             <span>Add Purchase</span>
//           </button>
//         </div>

//         {loading && (
//           <div className="p-8 text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
//             <p className="mt-4 text-gray-600">Loading purchases...</p>
//           </div>
//         )}

//         {error && !loading && (
//           <div className="p-8 text-center text-red-500">
//             <p className="text-red-600 mb-4">{error}</p>
//             <button
//               onClick={fetchPurchases}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {!loading && !error && purchases.length === 0 && (
//           <div className="p-8 text-center text-gray-500">
//             <h3 className="text-xl font-medium text-gray-900 mb-2">No purchases found</h3>
//             <p className="text-gray-500 mb-6">Get started by creating your first purchase.</p>
//             <button
//               onClick={() => handleAddPurchase()}
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//             >
//               Add Your First Purchase
//             </button>
//           </div>
//         )}

//         {!loading && !error && purchases.length > 0 && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {purchases.map((purchase) => (
//                   <tr key={purchase.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.id}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {purchase.product_id}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.quantity}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.total_price}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(purchase.created_at).toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button 
//                         onClick={() => handleAddPurchase(purchase.product_id)}
//                         className="text-blue-600 hover:text-blue-900 mr-4"
//                       >
//                         Repeat
//                       </button>
//                       <button className="text-red-600 hover:text-red-900">
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {showForm && (
//         <PurchaseForm 
//           onCancel={handleFormCancel} 
//           onSuccess={handleFormSuccess} 
//           productId={selectedProductId}
//         />
//       )}
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
// import PurchaseForm from '@/components/PurchaseForm'; // Adjust this path to match your actual location
import PurchaseForm from './new/page';

export default function ReportsPage() {
  const [showForm, setShowForm] = useState(true); // or false by default if triggered via button

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports - Production Purchases</h1>

      {showForm && (
        <PurchaseForm
          onCancel={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            // You can also refresh list data here
          }}
        />
      )}

      {!showForm && (
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          Add New Purchase
        </button>
      )}
    </div>
  );
}
