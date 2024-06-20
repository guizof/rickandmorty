import React, { useState } from 'react';
import CharacterList from './CharacterList';

const CharacterSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacters = (name) => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro ao buscar personagens');
      })
      .then((data) => {
        setCharacters(data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    fetchCharacters(searchTerm);
  };

  return (
    <div className="character-search">
      <input
        type="text"
        placeholder="Digite o nome do personagem..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Buscar</button>
      {loading && <p>Carregando...</p>}
      {error && <p>{error.message}</p>}
      {characters.length > 0 && <CharacterList characters={characters} />}
    </div>
  );
};

export default CharacterSearch;