import { useState, useEffect } from "react";
import axios from "axios";

export default function Clientes() {
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
