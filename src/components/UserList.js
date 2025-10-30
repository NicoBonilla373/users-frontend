import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // ============================================================
  // 🧩 1. Obtener lista de usuarios desde el backend
  // ============================================================
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://184.72.149.109:8000/api/users/");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("❌ Error obteniendo usuarios:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  // ============================================================
  // 🧩 2. Cargar usuarios una vez al iniciar el componente
  // ============================================================
  useEffect(() => {
    fetchUsers();
  }, []);

  // ============================================================
  // 🧩 3. Función para eliminar usuario
  // ============================================================
  const deleteUser = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que querés eliminar este usuario?"
    );
    if (!confirmar) return;

    try {
      await axios.delete(`http://184.72.149.109:8000/api/users/${id}/`);
      alert("🗑️ Usuario eliminado correctamente.");
      fetchUsers(); // refrescar la lista
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
      alert("No se pudo eliminar el usuario. Verificá el servidor.");
    }
  };

  // ============================================================
  // 🧩 4. Búsqueda local (sin llamadas al backend)
  // ============================================================
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (u) =>
          u.nombre.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  };

  // ============================================================
  // 🧩 5. Renderizado de la tabla con botón de eliminación
  // ============================================================
  return (
    <div style={{ textAlign: "center" }}>
      <h2>📋 Usuarios Registrados</h2>

      {/* Barra de búsqueda */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: "5px", width: "250px" }}
        />
        <button
          onClick={() => {
            setSearchTerm("");
            setFilteredUsers(users);
          }}
          style={{ marginLeft: "10px" }}
        >
          Mostrar todos
        </button>
        <button
          onClick={fetchUsers}
          style={{ marginLeft: "10px", backgroundColor: "#d3f9d8" }}
        >
          🔄 Refrescar lista
        </button>
      </div>

      {/* Tabla de usuarios */}
      <table
        border="1"
        cellPadding="5"
        style={{
          margin: "0 auto",
          borderCollapse: "collapse",
          width: "85%",
          maxWidth: "1000px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Fecha de Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.telefono}</td>
                <td>{new Date(u.created_at).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => deleteUser(u.id)}
                    style={{
                      backgroundColor: "#ffb3b3",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No se encontraron usuarios.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
