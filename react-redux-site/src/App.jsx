import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const { isAdmin, isAuth, user } = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <Link to="/" style={{textDecoration: 'none'}}><h1 className="logo">TastyTreats</h1></Link>
          
          <nav className="nav-links">
            <Link to="/">Главная</Link>
            <Link to="/catalog">Бутик</Link>
            <Link to="/cart">Корзина ({cartItems.length})</Link>
            
            {/* Показываем админку только если isAdmin === true */}
            {isAdmin && <Link to="/admin" style={{color: '#d4af37'}}>Админка</Link>}
            
            <Link to="/auth">
              {isAuth ? `👤 ${user.username}` : 'Войти'}
            </Link>

            <button className="btn-icon" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
            {isAdmin && <Route path="/admin" element={<Admin />} />}
          </Routes>
        </main>

        <footer className="footer">
          <div style={{marginBottom: '10px'}}>
             <strong>TastyTreats Premium Desserts</strong>
          </div>
          <p>+996 (773) 956-057</p>
          <p>talipova_k@iuca.kg</p>
          <p style={{fontSize: '10px', marginTop: '15px', opacity: 0.6}}>© 2026 Все права защищены</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;