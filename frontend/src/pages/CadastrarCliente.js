import { useState } from "react";
import axios from "axios";

export default function CadastrarCliente() {
  const [form, setForm] = useState({ nome: "", cpf: "", email: "", dataNascimento: "", valorConsulta: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/clientes", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cliente cadastrado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar cliente.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Cadastrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="text" name="cpf" placeholder="CPF" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="date" name="dataNascimento" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="number" name="valorConsulta" placeholder="Valor da Consulta" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <button className="w-full bg-green-500 text-white p-2 rounded">Cadastrar</button>
      </form>
    </div>
  );
}
