import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repo, setRepo] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepo(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `App MongoDB com Node.js ${Date.now()}`,
      url: 'www.meurepo/abc',
      techs: ["ReactJS", "React Native", "Node.Js"]
    })

    const newRepo = response.data;
    setRepo([...repo, newRepo]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`)
    setRepo(repo.filter(repo => repo.id !== id));

  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repo.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
        </button>
          </li>
        ))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
