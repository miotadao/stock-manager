import { Button } from '@mui/material';
import { useEffect, useState } from 'react';



const ShoppingList = (props) => {

  const [trick, setTrick] = useState(true);

  const mountThings = JSON.parse(localStorage.getItem("things"));
  const mountShoppingLists = JSON.parse(localStorage.getItem("shoppingLists"));
  useEffect(() => {
    if (mountThings) {
      props.setThings(mountThings);
    }

    if (mountShoppingLists) {
      props.setShoppingLists(mountShoppingLists);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingLists', JSON.stringify(props.shoppingLists));
  }, [props.shoppingLists]);

  useEffect(() => {
    localStorage.setItem('things', JSON.stringify(props.things));

  }, [props.things]);

  const returnIsShow = () => {
    return props.isShoppingShow;
  }

  const handleDelete = () => {
    if (window.confirm('選択した項目はすべて削除します。よろしいですか？')) {
      props.setShoppingLists(props.shoppingLists.filter(shoppingList => { return shoppingList.isBought === false }));
      props.setThings(props.shoppingLists.filter(shoppingList => { return shoppingList.isBought === false }));
      alert('選択した項目を削除しました。');
    }

  }

  const handleChange = (id) => {
    props.shoppingLists.forEach((shoppingList) => {
      if (shoppingList.id === id) {
        setTrick(!trick);
        return shoppingList.isBought === true ? shoppingList.isBought = false : shoppingList.isBought = true;
      }
    });
    localStorage.setItem('shoppingLists', JSON.stringify(props.shoppingLists));
  }

  return (

    <div className={`shopping ${returnIsShow() ? "" : "hide"}`}>
      <div className={props.shoppingLists.length === 0 ? "hide" : ""}>
        <Button className="shopping-delete-btn" onClick={handleDelete} variant="outlined" type="submit" value="追加">購入済み全削除</Button>
      </div>

      <h3 className={props.shoppingLists.length === 0 ? "" : "hide"}>買い物リストは空です</h3>


      <ul className='shopping-ul'>
        {props.shoppingLists.map((shoppingList, index) => {
          return <li key={index}>
            <span>{shoppingList.addMonth}/{shoppingList.addDate})</span><p className={shoppingList.isBought === true ? "checked" : ""}>{shoppingList.text}</p>
            <Button className={shoppingList.isBought ? "checked" : ""} onClick={() => handleChange(shoppingList.id)} variant="contained" type="submit" value="追加">✔</Button>
          </li>
        })}
      </ul>
    </div>

  )
}

export default ShoppingList