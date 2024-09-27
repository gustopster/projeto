import { useEffect, useState } from 'react'
import './App.css'
import api from './services/api';

interface Animal {
  id: number;
  name: string;
  type: string;
}

const App: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get<Animal[]>('/api/Animals')
      .then((response) => {
        setAnimals(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar animais:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Lista de Animais</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>{animal.name} ({animal.type})</li>
        ))}
      </ul>
    </div>
  );
};

export default App;