import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import "../styles/auth.css";

const Login = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email обязателен";
    if (!form.password) newErrors.password = "Пароль обязателен";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    dispatch(login(form));
  };

  return (
    <div className="container">
      <h2>Вход для пони</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Имя пони"
          onChange={handleChange}
          value={form.email}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          name="password"
          type="password"
          placeholder="Секрет пони"
          onChange={handleChange}
          value={form.password}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Войти в пони-мир</button>
      </form>
    </div>
  );
};

export default Login;