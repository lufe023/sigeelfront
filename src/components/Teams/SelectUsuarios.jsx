import axios from 'axios';
import React, { useEffect, useState } from 'react';
import getConfig from '../../utils/getConfig';

const SelectUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getAllUsers = () => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/userSearch`;
    const requestData = {
      findUser: searchTerm,
    };

    axios
      .post(URL, requestData, getConfig())
      .then((res) => {
        setUsers(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, [searchTerm]);

  const handleSelectChange = (event) => {
    setSelectedMembers(Array.from(event.target.selectedOptions, (option) => option.value));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="form-group" data-select2-id={29}>
        <label>Añade Miembros</label>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar usuarios"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          multiple
          className="custom-select"
          data-placeholder="Selecciona usuarios"
          style={{ width: '100%' }}
          name="members"
          value={selectedMembers}
          onChange={handleSelectChange}
        >
          {users?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.censu.first_name.split(' ')[0]} {user.censu.last_name.split(' ')[0]} ({user.email})
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectUsuarios;
