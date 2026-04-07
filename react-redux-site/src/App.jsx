import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PoniesList from "./pages/PoniesList.jsx";
import PonyDetail from "./pages/PonyDetail.jsx";
import TodosList from "./pages/TodosList.jsx";
import TodoDetail from "./pages/TodoDetail.jsx";
import Home from "./pages/Home.jsx";
import Counter from "./pages/Counter.jsx";
import Register from "./pages/PonyRegister.jsx";
import Login from "./pages/PonyLogin.jsx";
import Purchase from "./pages/Purchase.jsx";

function App() {
  const theme = useSelector((state) => state.ui?.theme || "light");

  useEffect(() => {
    // Убираем предыдущие классы темы и добавляем новую
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PoniesList />} />
        <Route path="/ponies/:id" element={<PonyDetail />} />
        <Route path="/todos" element={<TodosList />} />
        <Route path="/todos/:id" element={<TodoDetail />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/purchase" element={<Purchase />} />
        {/* Если хотите добавить Home, раскомментируйте: */}
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;