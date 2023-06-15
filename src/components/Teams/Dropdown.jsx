import React, { useState } from 'react';
import axios from 'axios';

const Dropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Realizar la solicitud POST al endpoint con el término de búsqueda
    axios
      .post(`${import.meta.env.VITE_API_SERVER}/api/v1/users/userSearch`, {
        findUser: value
      })
      .then((response) => {
        setSearchResults(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleItemClick = (item) => {
    if (selectedItems.length < 5) {
      setSelectedItems((prevItems) => [...prevItems, item]);
    }
  };

  const handleRemoveItem = (item) => {
    setSelectedItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Buscar usuarios" />
      <ul>
        {searchResults?.map((result) => (
          <li key={result.id} onClick={() => handleItemClick(result)}>
            {result.name}
          </li>
        ))}
      </ul>
      <button onClick={() => console.log(selectedItems)}>Imprimir en console.log</button>
    </div>
  );
};

export default Dropdown;
