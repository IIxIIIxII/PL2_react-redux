import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { 
  fetchPonyById, 
  clearSelectedPony, 
  updatePony,
  addLike,
  removeLike,
  addToFavorites,
  removeFromFavorites,
  addRating,
  selectAverageRating
} from "../features/ponies/poniesSlice";

const PonyDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedPony, status, likes, favorites, ratings } = useSelector(
    state => state.ponies
  );

  const averageRating = useSelector(state => selectAverageRating(state, id));

  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    dispatch(fetchPonyById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedPony) {
      setEditForm(selectedPony);
    }
  }, [selectedPony]);

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = () => {
    dispatch(updatePony({
      ...editForm,
      price: Number(editForm.price)
    }));
  };

  const handleLike = () => {
    dispatch(addLike(selectedPony.id));
  };

  const handleUnlike = () => {
    dispatch(removeLike(selectedPony.id));
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(selectedPony.id));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(selectedPony.id));
  };

  const handleAddRating = (rating) => {
    dispatch(addRating({ ponyId: selectedPony.id, rating }));
  };

  if (status === "loading") return <p>Загрузка пони...</p>;
  if (!selectedPony) return null;

  return (
    <div className="container">
      <button
        onClick={() => {
          dispatch(clearSelectedPony());
          navigate("/");
        }}
      >
        ← Назад к пони
      </button>

      <div>
        <h3>{selectedPony.name}</h3>
        <p>Тип: {selectedPony.type}</p>
        <p>Описание: {selectedPony.description}</p>
        <p>Цена: {selectedPony.price}</p>
        <p>Лайки: {likes[selectedPony.id] || 0}</p>
        <p>Средняя оценка: {averageRating.toFixed(1)}</p>
        <p>В избранном: {favorites.includes(selectedPony.id) ? 'Да' : 'Нет'}</p>
      </div>

      <div>
        <button onClick={handleLike}>Лайк</button>
        <button onClick={handleUnlike}>Убрать лайк</button>
        <button onClick={handleAddToFavorites}>Добавить в избранное</button>
        <button onClick={handleRemoveFromFavorites}>Убрать из избранного</button>
      </div>

      <div>
        <p>Оценить:</p>
        {[1, 2, 3, 4, 5].map(rating => (
          <button key={rating} onClick={() => handleAddRating(rating)}>
            {rating}
          </button>
        ))}
      </div>
        <>
          <input
            name="name"
            value={editForm.name}
            onChange={handleChange}
          />

          <input
            name="type"
            value={editForm.type}
            onChange={handleChange}
          />

          <input
            name="description"
            value={editForm.description}
            onChange={handleChange}
          />

          <input
            name="price"
            value={editForm.price}
            onChange={handleChange}
          />

          <button onClick={handleUpdate}>
            Сохранить изменения пони
          </button>
        </>
      )}
    </div>
  );
};

export default PonyDetail;