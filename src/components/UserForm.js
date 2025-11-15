import React, { useState } from "react";

// Leer configuración de window o usar variable de entorno
const API_URL = window.API_CONFIG?.API_URL || process.env.REACT_APP_API_URL || "http://localhost:8000";

function UserForm({ onUserAdded }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono }),
      });

      if (res.ok) {
        setMessage("✅ Usuario registrado exitosamente");
        setNombre("");
        setEmail("");
        setTelefono("");
        setTimeout(() => {
          onUserAdded();
        }, 1500);
      } else {
        const error = await res.json();
        setMessage(`❌ Error: ${JSON.stringify(error)}`);
      }
    } catch (error) {
      setMessage(`❌ Error de conexión: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Registrar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Registrar
        </button>
      </form>
      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
      <p style={{ fontSize: "12px", color: "#666", marginTop: "20px" }}>
        API: {API_URL}
      </p>
    </div>
  );
}

export default UserForm;
