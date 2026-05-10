import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, user } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isLoginMode) {
      try {
        dispatch(login({ username, password }));
        navigate('/');
      } catch (err) {
        setError('Неверный логин или пароль');
      }
    } else {
      dispatch(register({ username, password }));
      setIsLoginMode(true);
      alert('Регистрация успешна! Теперь войдите в аккаунт.');
    }
  };

  if (isAuth) {
    return (
      <div className="auth-form">
        <h2>Личный кабинет</h2>
        <p>Вы вошли как: <strong>{user.username}</strong></p>
        <button className="btn-gold" onClick={() => dispatch(logout())}>Выйти</button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLoginMode ? 'Вход в аккаунт' : 'Регистрация'}</h2>
        {error && <p style={{color: 'red', fontSize: '14px'}}>{error}</p>}
        
        <input 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="Логин" 
          required 
        />
        <input 
          type="password" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Пароль" 
          required 
        />
        
        <button className="btn-gold" type="submit">
          {isLoginMode ? 'Войти' : 'Создать аккаунт'}
        </button>
        
        <p 
          style={{cursor: 'pointer', textAlign: 'center', marginTop: '15px', fontSize: '14px', textDecoration: 'underline'}}
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? 'Еще нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </p>
      </form>
    </div>
  );
};
export default Auth;