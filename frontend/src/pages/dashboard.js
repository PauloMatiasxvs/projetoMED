import { Link } from "react-router-dom";

export default function Dashboard() {
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
