import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout ,addToBill} from '../Redux/Reducer';
import { useGetPostsQuery } from '../Redux/jsondata';

import BarcodeScannerComponent from 'react-qr-barcode-scanner';

function LandingPage() {
    const [barcode, setBarcode] = useState('');
      const [scanned, setScanned] = useState(false);
 const [manualPrice, setManualPrice] = useState('');
  const [quantity, setQuantity] = useState(1);


    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const handleLogout=()=>{
        dispatch(logout());
        
        navigate('/');
    }

     

    const {data}=useGetPostsQuery(barcode);
      const product = data?.products?.[0];
      console.log(product);
     
const MainItemId=product?.id
const handleAddToBill = () => {
  const item = {
    itemId:MainItemId,
    id: barcode,
    name: product.product_name || 'N/A',
    brand: product.brands === "Heinz" ? "N/A" : product.brands || "N/A",
    category: product.categories || 'N/A',
    image: product.image_front_small_url,
    price: parseFloat(manualPrice),
    quantity: quantity,
    total: parseFloat(manualPrice) * quantity
  };


{console.log(item)}
  dispatch(addToBill(item)); 


  
  setManualPrice('');
  setQuantity(1);
  setBarcode('');
  setScanned(false);

//   console.log("Item added to bill:", updatedBillItems);
};



  return (
    <>
        <button className='btn btn-primary' onClick={handleLogout}>Logout</button>


{!scanned&&
(
<BarcodeScannerComponent

width={500}
height={400}

onUpdate={(err,result)=>{
    if(result){
        setBarcode(result.text);
        setScanned(true);
    }
}}
/>
)}

{scanned && (
    <BarcodeScannerComponent
    
    width={500}

    height={400}
    onUpdate={(err, result) => {
        if (result) {
            setBarcode(result.text);
        }
    }}
    />
)}






           

  <form>
        <input
          type="text"
          placeholder="Enter barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="form-control mt-3"
        />
       
      </form>


{/* { console.log("Product data:", product?.id)} */}
{/* {console.log(product)} */}
 {product && (
        <div className="mt-3">
          <h5>Product Found:</h5>
          <img src={product.image_front_small_url} alt="Product" className="img-fluid mb-3" height={80} width={50} />
          <p><strong>Name:</strong> {product.product_name || 'N/A'}</p>
<p><strong>Brand:</strong> {product.brands === "Heinz" ? "N/A" : product.brands || "N/A"}</p>          <p><strong>Category:</strong> {product.categories || 'N/A'}</p>
          
        <input type="number" className="form-control" value={manualPrice} placeholder='enter the price '  onChange={(e) => setManualPrice(e.target.value)} />

          <p><strong>Price: {manualPrice}</strong></p>
              <input type="number" className="form-control" value={quantity} placeholder='Select the quantity '  onChange={(e) => setQuantity(Number(e.target.value))} />
            <p><strong>Total Price: {manualPrice * quantity}</strong></p>   
        </div>
      )}

   
      <button onClick={handleAddToBill} >Click here Add to Bill</button>

      <button onClick={() => navigate("/bill")} >Click here to Bill Page</button>
    
    </>
  )
}

export default LandingPage