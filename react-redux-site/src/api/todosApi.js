// Тестовый API для Todo
let todos = [
    { id: 1, title: "Купить хлеб", description: "Свежий багет для завтрака", completed: false },
    { id: 2, title: "Сделать домашку", description: "Redux Toolkit + React", completed: false },
    { id: 3, title: "Позвонить маме", description: "Узнать как дела", completed: true },
    { id: 4, title: "Прочитать книгу", description: "Хорошая глава перед сном", completed: false }
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTodosApi = async () => {
    await delay(400);
    return [...todos];
};

export const fetchTodoByIdApi = async (id) => {
    await delay(300);
    const todo = todos.find((item) => item.id === Number(id));
    return todo ? { ...todo } : null;
};

export const createTodoApi = async (todo) => {
    await delay(400);
    const newTodo = { ...todo, id: Number(todo.id), completed: Boolean(todo.completed) };
    todos.push(newTodo);
    return { ...newTodo };
};

export const updateTodoApi = async (todo) => {
    await delay(400);
    const index = todos.findIndex((item) => item.id === Number(todo.id));
    if (index !== -1) {
        todos[index] = { ...todo, completed: Boolean(todo.completed) };
        return { ...todos[index] };
    }
    return null;
};

export const deleteTodoApi = async (id) => {
    await delay(300);
    todos = todos.filter((item) => item.id !== Number(id));
    return id;
};
