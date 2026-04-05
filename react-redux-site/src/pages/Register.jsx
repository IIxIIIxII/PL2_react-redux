import { useState } from "react";
import { useDispatch } from 'react-redux';
import { register } from "../features/auth/authSlice";
import "../styles/auth.css";

const Register = ()=>{
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.email) newErrors.email = "Email обязателен";
        if (!form.password) newErrors.password = "Пароль обязателен";
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Пароли не совпадают";
        if (form.password.length < 6) newErrors.password = "Пароль должен быть не менее 6 символов";
        return newErrors;
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        dispatch(register({ email: form.email, password: form.password }));
    };

    return(
        <div className="container">
            <h2>Регистрация пони</h2>

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

                <input 
                name="confirmPassword"
                type="password"
                placeholder="Подтверди секрет пони"
                onChange={handleChange}
                value={form.confirmPassword}
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <button type="submit">Стать пони</button>

            </form>

        </div>
    );
};

export default Register;