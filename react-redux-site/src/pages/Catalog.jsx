import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setSearchQuery } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';

const Catalog = () => {
  const dispatch = useDispatch();
  
  // Достаем нужные данные и состояния из Redux
  const { items, status, error, searchQuery } = useSelector(state => state.products);

  // Запрашиваем десерты при загрузке страницы, если они еще не загружены
  useEffect(() => { 
    if (status === 'idle') {
      dispatch(fetchProducts()); 
    }
  }, [status, dispatch]);

  // Логика поиска (фильтрация)
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="catalog-page">
      <h2>Эксклюзивная Коллекция</h2>
      
      {/* Поле поиска */}
      <input 
        type="text" 
        placeholder="Поиск десертов..." 
        value={searchQuery} 
        onChange={(e) => dispatch(setSearchQuery(e.target.value))} 
        className="search-input" 
      />

      {/* Обработка состояний (Loading, Error, Empty) */}
      {status === 'loading' && <p>Подготовка коллекции... ⏳</p>}
      {status === 'failed' && <p style={{ color: '#e74c3c' }}>Ошибка: {error}</p>}
      {status === 'succeeded' && filteredItems.length === 0 && (
        <p style={{ color: '#7f8c8d' }}>К сожалению, по вашему запросу десертов не найдено.</p>
      )}
      
      {/* Сетка карточек товаров */}
      <div className="product-grid">
        {status === 'succeeded' && filteredItems.map(item => (
          <div key={item.id} className="product-card">
            {/* Если у товара вдруг нет картинки, ставим красивую заглушку */}
            <img 
              src={item.image || 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80'} 
              alt={item.name} 
              className="product-img" 
            />
            <div className="product-info">
              <h3>{item.name}</h3>
              <p className="product-price">{item.price} сом</p>
              
              {/* Кнопка добавления в корзину */}
              <button 
                className="btn-gold" 
                onClick={() => dispatch(addToCart(item))}
              >
                В корзину
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;