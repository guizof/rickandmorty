import React from 'react';

const CharacterList = ({ characters }) => {
  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>
          <img src={character.image} alt={character.name} />
          {character.name}
        </li>
      ))}
    </ul>
  );
};

export default CharacterList;