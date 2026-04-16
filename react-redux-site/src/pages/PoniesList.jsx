import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPonies, createPony, deletePony, addLike, removeLike, addToFavorites, removeFromFavorites, addRating, selectAverageRating } 
from "../features/ponies/poniesSlice";
import { useNavigate } from "react-router-dom";

const PoniesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status, error, likes, favorites, ratings } = useSelector(state => state.ponies);

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

  const handleLike = (ponyId) => {
    dispatch(addLike(ponyId));
  };

  const handleUnlike = (ponyId) => {
    dispatch(removeLike(ponyId));
  };

  const handleAddToFavorites = (ponyId) => {
    dispatch(addToFavorites(ponyId));
  };

  const handleRemoveFromFavorites = (ponyId) => {
    dispatch(removeFromFavorites(ponyId));
  };

  const handleAddRating = (ponyId, rating) => {
    dispatch(addRating({ ponyId, rating }));
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

            <div>
              <p>Лайки: {likes[pony.id] || 0}</p>
              <p>Средняя оценка: {(() => {
                const ponyRatings = ratings[pony.id] || [];
                if (ponyRatings.length === 0) return 0;
                const sum = ponyRatings.reduce((a, b) => a + b, 0);
                return (sum / ponyRatings.length).toFixed(1);
              })()}</p>
              <p>В избранном: {favorites.includes(pony.id) ? 'Да' : 'Нет'}</p>
            </div>

            <div>
              <button onClick={() => handleLike(pony.id)}>Лайк</button>
              <button onClick={() => handleUnlike(pony.id)}>Убрать лайк</button>
              <button onClick={() => handleAddToFavorites(pony.id)}>В избранное</button>
              <button onClick={() => handleRemoveFromFavorites(pony.id)}>Убрать из избранного</button>
            </div>

            <div>
              <p>Оценить:</p>
              {[1, 2, 3, 4, 5].map(rating => (
                <button key={rating} onClick={() => handleAddRating(pony.id, rating)}>
                  {rating}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoniesList;