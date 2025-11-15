import React, { useEffect, useState } from "react";
import axios from "axios";

// Leer configuración de window o usar variable de entorno
const API_URL = window.API_CONFIG?.API_URL || process.env.REACT_APP_API_URL || "http://localhost:8000";

function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.telefono && user.telefono.includes(searchTerm))
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setError("");
    } catch (err) {
      setError(`Error al cargar usuarios: ${err.message}`);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    
    try {
      await axios.delete(`${API_URL}/users/${id}/`);
      fetchUsers();
    } catch (err) {
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Usuarios Registrados ({filteredUsers.length})</h2>
      <p style={{ fontSize: "12px", color: "#666" }}>API: {API_URL}</p>
      
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre, email o teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "10px",
            fontSize: "16px",
            border: "2px solid #4CAF50",
            borderRadius: "5px",
          }}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            style={{
              marginLeft: "10px",
              padding: "10px 15px",
              cursor: "pointer",
            }}
          >
            Limpiar
          </button>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {filteredUsers.length === 0 && !error && searchTerm && (
        <p>No se encontraron usuarios que coincidan con "{searchTerm}"</p>
      )}
      
      {filteredUsers.length === 0 && !error && !searchTerm && (
        <p>No hay usuarios registrados</p>
      )}
      
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "5px",
              textAlign: "left",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Teléfono:</strong> {user.telefono || "N/A"}</p>
            <p><strong>Registrado:</strong> {new Date(user.created_at).toLocaleString()}</p>
            <button 
              onClick={() => handleDelete(user.id)} 
              style={{ 
                marginTop: "10px", 
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              🗑️ Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
