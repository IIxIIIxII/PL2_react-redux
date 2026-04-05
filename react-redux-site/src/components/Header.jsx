import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import { logout } from "../features/auth/authSlice";
import "../styles/header.css";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <header className="header">
      <div className="header-inner container">
        <div className="logo">🐴 Пони-сайт на Redux 💖</div>
        <nav className="nav">
          <a href="/">Главная пони</a>
          <a href="#">О пони</a>
          <a href="#">Контакты пони</a>
          {!isAuth ? (
            <>
              <a href="/login">Войти пони</a>
              <a href="/register">Регистрация пони</a>
            </>
          ) : (
            <button
              className="theme-btn"
              onClick={() => dispatch(logout())}
              style={{ marginLeft: "20px" }}
            >
              Выход пони
            </button>
          )}
        </nav>
        <button className="theme-btn" onClick={() => dispatch(toggleTheme())}>
          {theme === "light" ? "🌙 Тёмная тема" : "☀️ Светлая тема"}
        </button>
      </div>
    </header>
  );
};

export default Header;