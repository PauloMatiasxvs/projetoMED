import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login Médico</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuário"
            className="w-full p-2 border rounded mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 border rounded mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded">Entrar</button>
        </form>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex">
      <nav className="w-1/4 bg-gray-200 p-4 min-h-screen">
        <ul>
          <li className="mb-4"><Link to="/dashboard">Dashboard</Link></li>
          <li className="mb-4"><Link to="/clientes">Clientes</Link></li>
          <li className="mb-4"><Link to="/cadastrar-cliente">Cadastrar Cliente</Link></li>
        </ul>
      </nav>
      <div className="p-6 w-3/4">
        <h2 className="text-2xl font-bold">Bem-vindo ao sistema</h2>
      </div>
    </div>
  );
}

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/clientes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClientes(response.data);
    };
    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/clientes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Lista de Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id} className="flex justify-between p-2 border-b">
            {cliente.nome} - {cliente.cpf}
            <button className="bg-red-500 text-white p-1 rounded" onClick={() => handleDelete(cliente.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProtectedRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
        <Route path="/cadastrar-cliente" element={<ProtectedRoute><CadastrarCliente /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
