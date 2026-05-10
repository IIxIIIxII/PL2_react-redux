let mockDatabase = [
  { id: 1, name: 'Трюфельный Эклер', price: 450, image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Макарон "Черная Икра"', price: 300, image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Золотой Чизкейк', price: 850, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Десерт "Красный Бархат"', price: 550, image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80' },
];

// Убрали случайную генерацию ошибок. Теперь всегда resolve.
export const fetchProductsAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockDatabase]);
    }, 1000);
  });
};

export const addProductAPI = (product) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProduct = { ...product, id: Date.now() };
      mockDatabase.push(newProduct);
      resolve(newProduct);
    }, 800);
  });
};

export const deleteProductAPI = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockDatabase = mockDatabase.filter(p => p.id !== id);
      resolve(id);
    }, 500);
  });
};