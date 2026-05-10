import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, total } = useSelector(state => state.cart);
  const { isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePurchase = () => {
    if (!isAuth) {
      alert("Доступ запрещен. Пожалуйста, войдите в систему или зарегистрируйтесь для совершения покупок.");
      navigate('/auth');
      return;
    }
    alert("Заказ успешно оформлен! Ожидайте звонка менеджера.");
    dispatch(clearCart());
  };

  return (
    <div className="page">
      <h2>Корзина товаров</h2>
      {items.length === 0 ? <p>Ваша корзина пуста.</p> : (
        <>
          {items.map((item, index) => (
            <div key={index} className="cart-item">
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <img src={item.image} alt="" style={{width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover'}}/>
                <span>{item.name}</span>
              </div>
              <div>
                <span style={{marginRight: '20px', fontWeight: 'bold'}}>{item.price} сом</span>
                <button className="btn-icon" onClick={() => dispatch(removeFromCart(item))}>Удалить</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Итого к оплате: {total} сом</h3>
            <button className="btn-gold" onClick={handlePurchase}>Оформить заказ</button>
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;