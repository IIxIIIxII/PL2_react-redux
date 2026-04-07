import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTodos, createTodo, deleteTodo } from "../features/todos/todosSlice";

const TodosList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((state) => state.todos);

  const [form, setForm] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createTodo({
        id: Date.now(),
        title: form.title,
        description: form.description,
        completed: form.completed,
      })
    );
    setForm({ title: "", description: "", completed: false });
  };

  if (status === "loading") return <p>Загрузка задач...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container">
      <h2>Todo список</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="title"
          placeholder="Название задачи"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Описание задачи"
          value={form.description}
          onChange={handleChange}
        />
        <label style={{ display: "block", margin: "10px 0" }}>
          <input
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
          />
          Завершено
        </label>
        <button type="submit">Добавить задачу</button>
      </form>

      <ul>
        {items.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "12px" }}>
            <button onClick={() => navigate(`/todos/${todo.id}`)}>
              {todo.title}
            </button>
            <span style={{ marginLeft: "8px" }}>
              [{todo.completed ? "Выполнено" : "В процессе"}]
            </span>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosList;
