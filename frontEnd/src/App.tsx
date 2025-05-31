import { useEffect, useState } from 'react';
import './App.css'
import { CarteiraService, type Carteira } from './Services/CarteiraService';

const App = () => {

  const [carteiras, setCarteiras] = useState<Carteira[]>([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    CarteiraService.getAll()
      .then((carteiras) => {
        console.log('POLY:', carteiras);
        setCarteiras(carteiras);
      })
      .catch((error) => {
        console.error('Error fetching carteiras:', error);
      });
  }, [refresh]);

  return (
    <>
      {carteiras.map((carteira) => (
        <div key={carteira.id} className="carteira">
          <h2>Pedido: {carteira.pedido}</h2>
          <p>Item: {carteira.item}</p>
        </div>
      ))}
      {carteiras.length === 0 && <p>Sem carteiras por enquanto.</p>}
      <button onClick={() => setRefresh(refresh + 1)}>Atualizar</button>

      <input
        type="text"
        placeholder="Digite o ID da carteira"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const id = (e.target as HTMLInputElement).value;
            CarteiraService.getById(parseInt(id))
              .then((carteira) => {
                console.log('Carteira encontrada:', carteira);
                setCarteiras([carteira]);
              })
              .catch((error) => {
                console.error('Error fetching carteira by ID:', error);
              });
          }
        }}
      />

    </>
  )
}

export default App
