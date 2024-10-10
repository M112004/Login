import React, { useState } from 'react';
import './Login.css';  
import Mensaje from './Mensaje';
import './imagenes/HackerRain.gif';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const usuario = users.find(user => user.email === email);
        
        if (!usuario) {
            setSuccess(false);
            setMensaje('Error: Usuario no encontrado.');
        } else if (usuario.username !== password) {
            setSuccess(false);
            setMensaje('Error: Contraseña incorrecta.');
        } else {
            setSuccess(true);
            setMensaje(`Bienvenido, ${usuario.name}!`);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
                {mensaje && (
                    <p className={`message ${success ? 'success' : ''}`}>{mensaje}</p>
                )}
            </form>
        </div>
    );
};

export default Login;
