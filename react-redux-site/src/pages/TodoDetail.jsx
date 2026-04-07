import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTodoById, updateTodo, clearSelectedTodo } from "../features/todos/todosSlice";

const TodoDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedTodo, status, error } = useSelector((state) => state.todos);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    dispatch(fetchTodoById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedTodo) {
      setEditForm(selectedTodo);
    }
  }, [selectedTodo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = () => {
    dispatch(updateTodo({
      ...editForm,
      completed: Boolean(editForm.completed),
    }));
  };

  const handleBack = () => {
    dispatch(clearSelectedTodo());
    navigate("/todos");
  };

  if (status === "loading") return <p>Загрузка задачи...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!selectedTodo) return <p>Задача не найдена</p>;

  return (
    <div className="container">
      <button onClick={handleBack}>← Назад к задачам</button>

      {editForm && (
        <div style={{ marginTop: "20px" }}>
          <h2>Детали задачи</h2>
          <label>
            Название
            <input
              name="title"
              value={editForm.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Описание
            <input
              name="description"
              value={editForm.description}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="checkbox"
              name="completed"
              checked={editForm.completed}
              onChange={handleChange}
            />
            Завершено
          </label>
          <button onClick={handleUpdate}>Сохранить задачу</button>
        </div>
      )}
    </div>
  );
};

export default TodoDetail;
