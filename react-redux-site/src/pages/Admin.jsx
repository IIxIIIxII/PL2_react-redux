import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct } from '../redux/slices/productsSlice';

const Admin = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.products);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !price || !image) return;
    dispatch(addProduct({ name, price: Number(price), image }));
    setName(''); setPrice(''); setImage('');
  };

  return (
    <div className="admin-panel">
      <h2 style={{borderLeft: '4px solid #d4af37', paddingLeft: '15px'}}>Управление бутиком</h2>
      
      {/* Форма добавления */}
      <div className="admin-card">
        <h3>Добавить новый товар</h3>
        <form onSubmit={handleAdd} className="admin-form">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Название десерта (например: Эклер Роза)" required />
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Цена (сом)" required />
          <input value={image} onChange={e => setImage(e.target.value)} placeholder="Ссылка на изображение (URL)" required />
          <button type="submit" className="btn-gold">Добавить в каталог</button>
        </form>
      </div>

      {/* Список товаров */}
      <div className="admin-card" style={{marginTop: '30px'}}>
        <h3>Список товаров в наличии ({items.length})</h3>
        <div className="admin-list">
          {items.map(item => (
            <div key={item.id} className="admin-item">
              <img src={item.image} alt="" style={{width: '40px', height: '40px', borderRadius: '5px'}}/>
              <span style={{flex: 1, marginLeft: '10px'}}>{item.name} — <strong>{item.price} сом</strong></span>
              <button className="btn-icon" onClick={() => dispatch(deleteProduct(item.id))}>Удалить</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Admin;