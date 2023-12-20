import { useState } from 'react';
import './App.css';
import ShoppingList from './components/ShoppingList';
import StockListRemake from './components/StockListRemake';
import SwichButtons from './components/Swichbuttons';

function App() {
  const [things, setThings] = useState([]);
  const [shoppingLists, setShoppingLists] = useState([]);
  const [isStockShow, setIsStockShow] = useState(true);
  const [isShoppingShow, setIsShoppingShow] = useState(false);







  return (
    <div className='container'>
      <SwichButtons
        isStockShow={isStockShow} setIsStockShow={setIsStockShow}
        isShoppingShow={isShoppingShow} setIsShoppingShow={setIsShoppingShow}
        things={things} setThings={setThings}
        shoppingLists={shoppingLists} setShoppingLists={setShoppingLists}
      />
      <StockListRemake
        things={things} setThings={setThings}
        isStockShow={isStockShow} setIsStockShow={setIsStockShow}
        shoppingLists={shoppingLists} setShoppingLists={setShoppingLists}
      />
      <ShoppingList
        things={things} setThings={setThings}
        isShoppingShow={isShoppingShow} setIsShoppingShow={setIsShoppingShow}
        shoppingLists={shoppingLists} setShoppingLists={setShoppingLists}
      />
    </div>
  );
}

export default App;
