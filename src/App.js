import React, { useState } from "react";

const lojas = [
  "Ribeirão Shopping",
  "Novo Shopping",
  "Shopping Dom Pedro",
  "Shopping Galleria",
];

const produtos = [
  "Camiseta",
  "Calça",
  "Tênis",
  "Boné",
  "Jaqueta",
];

export default function App() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [transferencias, setTransferencias] = useState([]);

  function handleTransferir(e) {
    e.preventDefault();

    if (!origem || !destino || !produto || quantidade <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    if (origem === destino) {
      alert("A loja de origem e destino devem ser diferentes.");
      return;
    }

    const novaTransf = {
      id: Date.now(),
      origem,
      destino,
      produto,
      quantidade,
    };

    setTransferencias((old) => [novaTransf, ...old]);

    setOrigem("");
    setDestino("");
    setProduto("");
    setQuantidade(1);
  }

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Transferência de Produtos entre Lojas</h1>
      <form onSubmit={handleTransferir} style={{ marginBottom: 20, padding: 20, border: "1px solid #ccc", borderRadius: 6 }}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Loja Origem: <br />
            <select value={origem} onChange={(e) => setOrigem(e.target.value)} required>
              <option value="">-- Selecione --</option>
              {lojas.map((loja) => (
                <option key={loja} value={loja}>
                  {loja}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Loja Destino: <br />
            <select value={destino} onChange={(e) => setDestino(e.target.value)} required>
              <option value="">-- Selecione --</option>
              {lojas.map((loja) => (
                <option key={loja} value={loja}>
                  {loja}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Produto: <br />
            <select value={produto} onChange={(e) => setProduto(e.target.value)} required>
              <option value="">-- Selecione --</option>
              {produtos.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Quantidade: <br />
            <input
              type="number"
              min="1"
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
              required
              style={{ width: "100px" }}
            />
          </label>
        </div>

        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          Transferir
        </button>
      </form>

      <h2>Transferências realizadas</h2>
      {transferencias.length === 0 && <p>Nenhuma transferência ainda.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {transferencias.map(({ id, origem, destino, produto, quantidade }) => (
          <li
            key={id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 4,
              padding: 10,
              marginBottom: 8,
              backgroundColor: "#f9f9f9",
            }}
          >
            <strong>{quantidade}x {produto}</strong> de <em>{origem}</em> para <em>{destino}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
