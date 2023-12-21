import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';


const StockListRemake = (props) => {

  const [stockThings, setStockThings] = useState([]);
  const [trick, setTrick] = useState(true);
  const mountStockThings = JSON.parse(localStorage.getItem("stockThings"));
  const mountThings = JSON.parse(localStorage.getItem("things"));


  useEffect(() => {
    if (mountThings) {
      props.setThings(mountThings);
    }

    if (mountStockThings) {
      setStockThings(mountStockThings);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('things', JSON.stringify(props.things));
  }, [props.things]);

  useEffect(() => {
    localStorage.setItem('stockThings', JSON.stringify(stockThings));
  }, [stockThings]);

  const [thingName, setThingName] = useState('');
  const [thingNum, setThingNum] = useState(1);

  const returnIsShow = () => {
    return props.isStockShow;
  }




  const handleStock = (e) => {
    e.preventDefault();
    if (thingName) {
      const setDate = new Date();
      const date = setDate.getDate();
      const month = setDate.getMonth();
      const time = setDate.getTime();

      props.setThings([
        ...props.things,
        {
          month: month,
          addMonth: month,
          date: date,
          addDate: date,
          text: thingName,
          num: thingNum,
          id: time,
          isShopping: false,
          isBought: false,
          index: props.things.length
        }
      ]);

      setStockThings([
        ...stockThings,
        {
          month: month,
          date: date,
          text: thingName,
          num: thingNum,
          id: time,
          isShopping: false,
          index: stockThings.length
        }
      ]);
      setThingName('');
      setThingNum(1);
    }
  }

  const handleText = (e) => {
    setThingName(e.target.value);
  }

  const handleNum = (e) => {
    setThingNum(e.target.value);
    console.log(thingNum);
  }


  const chengeNum = (index, id) => {

    if (stockThings[index].num === 1) {
      setStockThings(stockThings.filter(stockThing => {
        return stockThing.id !== id
      }));
    } else {

      let reducedNum = stockThings[index].num - 1;
      setStockThings(
        stockThings.map((stockThing) => {
          if (id === stockThing.id) {
            return {
              ...stockThing,
              num: reducedNum
            }

          }

        })
      );
    }

  }


  const addShoppingList = (id) => {

    const date = new Date();
    const addDay = date.getDate();
    const addMonth = date.getMonth();

    props.things.forEach((thing) => {
      if (thing.id === id) {
        thing.addMonth = addMonth;
        thing.addDate = addDay;
        thing.isShopping = !thing.isShopping;

      }

    });
    props.setThings(props.things);
    console.log(props.things);

    stockThings.forEach((stockThing) => {
      if (stockThing.id === id) {
        stockThing.isShopping = !stockThing.isShopping;

        setTrick(!trick);

      }
    });
    props.setShoppingLists(props.things.filter((thing) => thing.isShopping === true));

    localStorage.setItem('things', JSON.stringify(props.things));
    localStorage.setItem('stockThings', JSON.stringify(stockThings));

  }

  // 

  return (
    <div className={`stock ${returnIsShow() ? "" : "hide"}`} >
      <form onSubmit={handleStock} className='stock-form'>
        <input
          className='input-name'
          type="text"
          placeholder='例）ティッシュ   洗剤'
          onChange={handleText}
          value={thingName}
        />
        <input
          className='input-num'
          type="number"
          min="1" max="999"
          placeholder='数量'
          value={thingNum}
          onChange={handleNum}
        />

        <Button variant="contained" type="submit"
          value="追加">✔</Button>
      </form>

      <h3 className={stockThings.length === 0 ? "" : "hide"}>リストを追加してください</h3>

      <ul className='stock-ul'>
        {stockThings.map((stockThing, index) => {
          return <li key={stockThing.id}>
            <span>{stockThing.month}/{stockThing.date})</span><p>{stockThing.text}</p><span>残り{stockThing.num}個</span>
            <Button className='minus' variant="outlined" color="error" onClick={() => chengeNum(index, stockThing.id)}>-1</Button>
            <Button className={stockThing.isShopping ? "checked" : ""} variant="contained" onClick={() => addShoppingList(stockThing.id, index)}><ShoppingCartCheckoutIcon /></Button>
          </li>
        })}
      </ul>
    </div>
  )
}

export default StockListRemake