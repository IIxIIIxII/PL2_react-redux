import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProducts,
    addToCart,
    setUserData,
    clearCart
} from "../features/purchase/purchaseSlice";

const Purchase = () => {
    const dispatch = useDispatch();
    const { products, cart } = useSelector(state => state.purchase);
    const userData = useSelector(state => state.purchase.userData);

    const [form, setForm] = useState({
        name: "",
        phone: ""
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleBuy = () => {
        dispatch(setUserData(form));
        alert("Покупка оформлена");
    };

    return (
        <div className="container">
            <h2>Магазин</h2>
            <h3>Товары</h3>
            {products.map(p => (
                <div key={p.id}>
                    <p>{p.title}</p>
                    <button onClick={() => dispatch(addToCart(p))}>
                        Добавить
                    </button>
                </div>
            ))}

            <h3>Корзина</h3>
            {cart.map(item => (
                <p key={item.id}>{item.title}</p>
            ))}

            <h3>Данные покупателя</h3>
            <input 
                name="name"
                placeholder="Имя"
                onChange={handleChange}
                value={form.name}
            />

            <input 
                name="phone"
                placeholder="Телефон"
                onChange={handleChange}
                value={form.phone}
            />

            <br/><br/>

            <button onClick={handleBuy}>
                Купить
            </button>

            {/* Исправление: проверка на существование userData */}
            {userData && (
                <>
                    <p>Имя: {userData.name}</p>
                    <p>Телефон: {userData.phone}</p>
                </>
            )}

            {/* Или используйте optional chaining */}
            {/* <p>Имя: {userData?.name}</p>
            <p>Телефон: {userData?.phone}</p> */}

        </div>
    );
};

export default Purchase;