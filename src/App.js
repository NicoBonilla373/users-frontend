import React, { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [view, setView] = useState("menu"); // "menu", "form", o "list"
  const [refresh, setRefresh] = useState(false);

  const handleUserAdded = () => {
  setRefresh(!refresh);
  setView("menu");
  };


  return (
    <div style={{ padding: "30px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>Gestión de Usuarios</h1>

      {view === "menu" && (
        <div>
          <p>Selecciona una opción:</p>
          <button onClick={() => setView("form")}>Registrar nuevo usuario</button>
          <button style={{ marginLeft: "10px" }} onClick={() => setView("list")}>
            Ver usuarios registrados
          </button>
        </div>
      )}

      {view === "form" && (
        <div>
          <UserForm onUserAdded={handleUserAdded} />
          <button onClick={() => setView("menu")}>⬅ Volver al menú</button>
        </div>
      )}

      {view === "list" && (
        <div>
          <UserList key={refresh} />
          <button onClick={() => setView("menu")}>⬅ Volver al menú</button>
        </div>
      )}
    </div>
  );
}

export default App;
