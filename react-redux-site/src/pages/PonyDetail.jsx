import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { 
  fetchPonyById, 
  clearSelectedPony, 
  updatePony 
} from "../features/ponies/poniesSlice";

const PonyDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedPony, status } = useSelector(
    state => state.ponies
  );

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

      {editForm && (
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