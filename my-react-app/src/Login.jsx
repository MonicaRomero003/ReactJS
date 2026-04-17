import { useState } from 'react';
import api from './Services/api';
import './Login.css';
import { useAuth } from './AuthContext';
import PropTypes from 'prop-types';

function Login({ cambiarVista }) {
  return (
    <div className="contenedorLogin">
      <Log cambiarVista={cambiarVista} />
    </div>
  );
}

function Log({ cambiarVista }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCrearCuenta = (e) => {
    e.preventDefault();
    cambiarVista('RegistrarUsuarios');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/usuarios/login', {
        email,
        password,
      });

      const token = response?.data?.token;

      if (token) {
        login(token);
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
          email="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <a href="#" onClick={handleCrearCuenta}>Crear cuenta</a>
        <a href="#">Recuperar contraseña</a>
      </form>
    </div>
  );
}

Login.propTypes = {
  cambiarVista: PropTypes.func.isRequired,
};

Log.propTypes = {
  cambiarVista: PropTypes.func.isRequired,
};

export default Login;