// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { clearBill } from '../Redux/Reducer';

// function BillPage() {
//   const billItems = useSelector((state) => state.bill.flat());
//   const dispatch = useDispatch();

// //   const myLocalData=JSON.parse(localStorage.getItem("billItems"))||[]
//     const myLocalData = JSON.parse(localStorage.getItem("billItems")) || [];

// //   console.log("Local Storage Data:",JSON.parse( myLocalData));

//   const totalBillAmount = billItems.reduce((acc, item) => acc + item.total, 0);

//   const handlePDF = () => {
//     const doc = new jsPDF();
//     doc.text("🧾 INVOICE", 20, 10);

//     const tableData = billItems.map(item => [
//       item.name,
//       item.brand,
//       item.category,
//       item.price.toFixed(2),
//       item.quantity,
//       item.total.toFixed(2),
//     ]);

//     autoTable(doc, {
//       head: [['Name', 'Brand', 'Category', 'Price', 'Quantity', 'Total']],
//       body: tableData,
//       startY: 20,
//     });

//     const finalY = doc.lastAutoTable.finalY || 30;
//     doc.text(`Total Bill Amount: ₹${totalBillAmount.toFixed(2)}`, 20, finalY + 10);
//     doc.save('bill.pdf');
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div>
//       <h2>🧾 Bill Items</h2>
//       {billItems.length === 0 ? (
//         <p>No items in the bill.</p>
//       ) : (
//         <>
//           <ul>
//             {myLocalData.map((item, index) => (
//               <li key={index} style={{ marginBottom: '1rem' }}>
//                 <img src={item.image} alt={item.name} width="100" />
//                 <div><strong>Name:</strong> {item.name}</div>
//                 <div><strong>Brand:</strong> {item.brand}</div>
//                 <div><strong>Category:</strong> {item.category}</div>
//                 <div><strong>Price:</strong> ₹{item.price}</div>
//                 <div><strong>Quantity:</strong> {item.quantity}</div>
//                 <div><strong>Total:</strong> ₹{item.total}</div>
//               </li>
//             ))}
//           </ul>
//           <hr />
//           <h3>🧮 Total Bill Amount: ₹{totalBillAmount.toFixed(2)}</h3>

//           <button onClick={() => dispatch(clearBill())}>🗑️ Clear Bill</button>{' '}
//           <button onClick={handlePDF}>📥 Download PDF</button>{' '}
//           <button onClick={handlePrint}>🖨️ Print Invoice</button>
//         </>
//       )}
//     </div>
//   );
// }

// export default BillPage;




import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { clearBill } from '../Redux/Reducer';

function BillPage() {
  const dispatch = useDispatch();

  
  const billItems = useSelector(state => state.bill || []);
  const local=JSON.parse(localStorage.getItem("billItems"))

  const totalBillAmount = local.reduce((acc, item) => acc + item.total, 0);

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("🧾 INVOICE", 20, 10);

    const tableData = local.map(item => [
      item.name,
      item.brand,
      item.category,
      item.price.toFixed(2),
      item.quantity,
      item.total.toFixed(2),
    ]);

    autoTable(doc, {
      head: [['Name', 'Brand', 'Category', 'Price', 'Quantity', 'Total']],
      body: tableData,
      startY: 20,
    });

    const finalY = doc.lastAutoTable.finalY || 30;
    doc.text(`Total Bill Amount: ₹${totalBillAmount.toFixed(2)}`, 20, finalY + 10);
    doc.save('bill.pdf');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClear = () => {
    dispatch(clearBill());
  };

  return (
    <div>
      <h2>🧾 Bill Items</h2>
      {local.length === 0 ? (
        <p>No items in the bill.</p>
      ) : (
        <>
          <ul>
            {local.map((item, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <img src={item.image} alt={item.name} width="100" />
                <div><strong>Name:</strong> {item.name}</div>
                <div><strong>Brand:</strong> {item.brand}</div>
                <div><strong>Category:</strong> {item.category}</div>
                <div><strong>Price:</strong> ₹{item.price}</div>
                <div><strong>Quantity:</strong> {item.quantity}</div>
                <div><strong>Total:</strong> ₹{item.total}</div>
              </li>
            ))}
          </ul>
          <hr />
          <h3>🧮 Total Bill Amount: ₹{totalBillAmount.toFixed(2)}</h3>

          <button onClick={handleClear}>🗑️ Clear Bill</button>{' '}
          <button onClick={handlePDF}>📥 Download PDF</button>{' '}
          <button onClick={handlePrint}>🖨️ Print Invoice</button>
        </>
      )}
    </div>
  );
}

export default BillPage;
