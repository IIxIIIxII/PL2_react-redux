import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPonies, createPony, deletePony } 
from "../features/ponies/poniesSlice";
import { useNavigate } from "react-router-dom";

const PoniesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status, error } = useSelector(state => state.ponies);

  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    price: ""
  });

  useEffect(() => {
    dispatch(fetchPonies());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPony({
      id: Date.now(),
      name: form.name,
      type: form.type,
      description: form.description,
      price: Number(form.price)
    }));

    setForm({
      name: "",
      type: "",
      description: "",
      price: ""
    });
  };

  if (status === "loading") return <p>Загрузка пони...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container">
      <h2>Милые пони</h2>

      <h3>Добавить пони</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Имя пони"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="type"
          placeholder="Тип пони"
          value={form.type}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Описание пони"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Цена пони"
          value={form.price}
          onChange={handleChange}
        />

        <button type="submit">Добавить пони</button>
      </form>

      <ul>
        {items.map(pony => (
          <li key={pony.id}>
            <button onClick={() => navigate(`/ponies/${pony.id}`)}>
              {pony.name}
            </button>

            <button onClick={() => dispatch(deletePony(pony.id))}>
              Удалить пони
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoniesList;