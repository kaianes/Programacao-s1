import { IoIosSearch } from "react-icons/io";
import './style.css';
import { useState } from 'react';
import api from "./services/api";

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    
    
    if(input === ''){
      alert('Digite um CEP');
      return;
    }
    if (input.length !== "" | 8) {
      alert('CEP inválido');
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("")
    }
    catch{
      alert('Houve um erro.');
      setInput('');
    }
  }
  
  return (
    <div className="container">
    <h1 className="title">Buscador CEP</h1>

    <div className="containerInput">
      <input type="text" placeholder="Digite o CEP"
      value={input}
      onChange={(event) => setInput(event.target.value)}
      />
      <button className="buttonSearch" onClick={handleSearch}>
      <IoIosSearch />
      </button>
    </div>


    {Object.keys(cep).length > 0 && (
      <main className="main">
        <h2>CEP: {cep.cep}</h2>
        <span>Logradouro: {cep.logradouro}</span>  
      </main>
    )}
    

    </div>
  );
}

export default App;
