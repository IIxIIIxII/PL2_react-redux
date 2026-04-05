export const authMiddleware = (store) => (next) => (action) => {
  
  // Ловим регистрацию пони
  if (action.type === "auth/register") {
    console.log("Регистрация пони:", action.payload);
    
    // сохраняем в localStorage (типо база пони)
    localStorage.setItem("pony", JSON.stringify(action.payload));
  }

  // Ловим логин пони
  if (action.type === "auth/login") {
    const savedPony = JSON.parse(localStorage.getItem("pony"));
    
    if (!savedPony || savedPony.email !== action.payload.email || savedPony.password !== action.payload.password) {
      alert("Неверное имя пони или секрет!");
      return;
    }

    console.log("Успешный вход пони");
  }

  return next(action);
};