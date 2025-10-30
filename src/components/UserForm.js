import React, { useState } from "react";

function UserForm({ onUserAdded }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://184.72.149.109:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // ✅ usar formData
      });

      if (res.ok) {
        setMessage("✅ Usuario registrado con éxito!");
        setFormData({ nombre: "", email: "", telefono: "" });
        onUserAdded();
      } else {
        const errorData = await res.json();
        console.error(errorData);
        setMessage("❌ Error al registrar el usuario.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ No se pudo conectar al servidor.");
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Registrar nuevo usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Teléfono: </label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserForm;
