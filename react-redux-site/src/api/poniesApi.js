// "База данных" - сделаем изменяемой
let ponies = [
    {
        id: 1,
        name: "Радуга Дэш",
        type: "Пегас",
        description: "Быстрая пони, любит скорость",
        price: 300
    },
    {
        id: 2,
        name: "Твайлайт Спаркл",
        type: "Единорог",
        description: "Умная пони, любит книги",
        price: 1200
    },
    {
        id: 3,
        name: "Флаттершай",
        type: "Пегас",
        description: "Добрая пони, заботится о животных",
        price: 800
    },
    {
        id: 4,
        name: "Пинки Пай",
        type: "Земная пони",
        description: "Веселая пони, любит вечеринки",
        price: 600
    }
];

// имитация задержки сервера
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 📃 Получить всех пони
export const fetchPoniesApi = async () => {
    await delay(500);
    return [...ponies]; // Возвращаем копию массива
};

// 🔍 Получить одного пони по id
export const fetchPonyByIdApi = async (id) => {
    await delay(300);
    const pony = ponies.find(p => p.id === Number(id));
    return pony ? { ...pony } : null; // Возвращаем копию или null
};

// ➕ Создать пони
export const createPonyApi = async (pony) => {
    await delay(500);
    const newPony = { ...pony, id: Number(pony.id) };
    ponies.push(newPony);
    return { ...newPony };
};

// ✏️ Обновить пони
export const updatePonyApi = async (pony) => {
    await delay(500);
    const index = ponies.findIndex(p => p.id === Number(pony.id));
    if (index !== -1) {
        ponies[index] = { ...pony };
        return { ...ponies[index] };
    }
    return null;
};

// ❌ Удалить пони
export const deletePonyApi = async (id) => {
    await delay(500);
    ponies = ponies.filter(p => p.id !== Number(id));
    return id;
};