import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Apple from '../src/asets/images/apple.jpg'
import Orange from '../src/asets/images/Orange.jpg'
import Watermelon from '../src/asets/images/waterlemon.jpg'

function App() {
  let cartItems = [];
  const [productItems, setproductItems] = useState([]);
  // const [addcartItems, setcartItems] = useState([]);
  const [items, setItems] = useState([
    {

      "id": 1,
      "title": "Apple",
      "url": Apple,
      "Price": 20,
      "quantity": "1"
    },
    {

      "id": 2,
      "title": "Orange",
      "url": Orange,
      "Price": 30,
      "quantity": "1"
    },
    {

      "id": 3,
      "title": "watermelon",
      "url": Watermelon,
      "Price": 40,
      "quantity": "1"
    },
  ]);
  const onAddTocart = (productItem) => {
    let cartItem = items.find(item => item.id === productItem.id);
    console.log(cartItem,"===>")
    const itemIndex = productItems.findIndex((item) => item.title === cartItem.title);
    if (itemIndex !== -1) {
      const updatedItems = [...productItems];
      updatedItems[itemIndex].Price = cartItem.Price * cartItem.quantity ;
      setproductItems(updatedItems);
    } else {
      setproductItems([...productItems, cartItem])
    }

  }


  const clearcart = () => {
    setproductItems([])
  }

  const checkOut = () => {
    if (productItems.length > 0) {
      alert("the Products you selected has ben checkout successfully")
    } else {
      alert("Please choose the products")
    }

  }

  const updateQuantity = (itemId, newQuantity) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    if (updatedItems === 0) {
      setItems(0);
    } else {
      setItems(updatedItems); 
    }
  };


  return (
    <div className="App">
      <div className='cartContainer'>
        <h1 className='cartTitle'>Cart Items</h1>
        <div className='buttonContainer'>
          <button className='cartButtonStyles' onClick={() => clearcart()}>Clear the cart</button>
          <button className='checkoutButtonStyles' onClick={() => checkOut()}>Checkout</button>
        </div>
        {productItems.length == 0 ? <div className='titleStyles'>Nothing To see Here</div>
          :
          <ul>
            {productItems.map((item) => (
              <li key={item.id}> {item.title} - ${item.quantity*item.Price}</li>
            ))}
          </ul>
        }
        <div>Total Price: ${productItems.reduce((total, item) => total + item.Price * item.quantity, 0)}</div>
      </div>
      <div className='Productscontainer'>
        <h5 style={{ textAlign: "center", fontSize: "1rem" }}>Some Produc Items</h5>
        <div className="App">
          {items.map(item => {
            return (
              <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={item.url} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Quantity
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                    /></p>
                  <p className="card-text">Price : {item.Price} </p>
                </div>
                <button key={item.id} className='checkoutButtonStyles' onClick={() => onAddTocart(item)}>Add To cart</button>
              </div>
            )
          })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
