import { useState } from 'react';
import api from './Services/api';
import './Login.css';

function Login() {
  return (
    <div className="contenedorLogin">
      <Log />
    </div>
  );
}

function Log() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      const token = response?.data?.token;

      if (token) {
        console.log('Token:', token);
        alert('Bienvenido');
      } else {
        alert('Ops, error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error login:', error);
      alert('Ops, error al iniciar sesión');
    }
  };

  return (
    <div className="formLogin">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuario:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Acceder</button>
        <a href="#">Crear cuenta</a>
        <a href="#">Recuperar contraseña</a>
      </form>
    </div>
  );
}

export default Login;