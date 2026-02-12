import './Contacto.css';
import React, { useState } from "react";

function Contacto(){
    return(
        <div className="ContenedorContacto"> 
        <FormularioContacto  />
        </div>
        
    );
}



function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    tipoTelefono: "Fijo",
    asunto: "",
    mensaje: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Gracias ${formData.nombre}, recibimos tu mensaje sobre "${formData.asunto}"`);
    setFormData({
      nombre: "",
      correo: "",
      telefono: "",
      tipoTelefono: "Fijo",
      asunto: "",
      mensaje: ""
    });
  };

  return (
    <div className="FormularioContacto">
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Contáctanos</legend>
        <h3>Déjanos tus datos</h3>

        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          type="text"
          size="70"
          required
          placeholder="Deja tu nombre para poder contactarte..."
          value={formData.nombre}
          onChange={handleChange}
        />

        <label htmlFor="correo">Correo electrónico:</label>
        <input
          id="correo"
          type="email"
          size="50"
          required
          placeholder="correo@dominio.ext"
          value={formData.correo}
          onChange={handleChange}
        />
        <br /><br />

        <label htmlFor="tipoTelefono">Número de Teléfono:</label>
        <select
          id="tipoTelefono"
          value={formData.tipoTelefono}
          onChange={handleChange}
        >
          <option value="Fijo">Fijo</option>
          <option value="Móvil">Móvil</option>
        </select>
        <input
          id="telefono"
          type="tel"
          required
          placeholder="p.e: 555-123-4567"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          value={formData.telefono}
          onChange={handleChange}
        />
        <br /><br />

        <label htmlFor="asunto">Asunto:</label>
        <input
          id="asunto"
          type="text"
          size="70"
          required
          placeholder="Deja el asunto de tu mensaje..."
          value={formData.asunto}
          onChange={handleChange}
        />
        <br /><br />

        <label htmlFor="mensaje">Describe tu inquietud:</label>
        <br />
        <textarea
          id="mensaje"
          style={{ resize: "none" }}
          cols="100"
          rows="10"
          value={formData.mensaje}
          onChange={handleChange}
        />
        <br /><br />
      </fieldset>
      <br /><br />
      <input type="submit" value="Enviar" />
      <input
        type="reset"
        value="Limpiar Formulario"
        onClick={() =>
          setFormData({
            nombre: "",
            correo: "",
            telefono: "",
            tipoTelefono: "Fijo",
            asunto: "",
            mensaje: ""
          })
        }
      />
    </form>
    </div>
  );
}



export default Contacto;