import React from 'react'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const SwichButtons = (props) => {

  const returnIsStockShow = () => {
    return props.isStockShow;
  }

  const returnIsShoppingShow = () => {
    return props.isShoppingShow;
  }


  // ストックを見せる
  const stockSwich = () => {
    if (props.isStockShow === false && props.isShoppingShow === true) {
      props.setIsStockShow(true);
      props.setIsShoppingShow(false);
    }
  }

  // ショッピングを見せる
  const shoppingSwich = () => {
    if (props.isShoppingShow === false && props.isStockShow === true) {
      props.setIsStockShow(false);
      props.setIsShoppingShow(true);

    }
  }

  return (
    <div className='button-container'>
      <button className={`swich-button ${returnIsStockShow() ? "" : "hide-button"}`} onClick={stockSwich}>在庫</button>
      <button className={`swich-button ${returnIsShoppingShow() ? "" : "hide-button"}`} onClick={shoppingSwich}><ShoppingCartCheckoutIcon /></button>
    </div>
  )
}

export default SwichButtons