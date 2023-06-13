import React from 'react'

const SelectUsuarios = () => {
  return (
    <>
    <div className="form-group" data-select2-id={29}>
                <label>Añade Miembros</label>
                <select
                  multiple className="custom-select"
                  data-placeholder="Selecciona usuarios"
                  style={{ width: '100%' }}
                  name="members"
                  value={selectedMembers}
                  onChange={handleSelectChange}
                > 
                  {
                    users.map(user =>
                      <option key={user.id} value={user.id}>
                        {user.censu.first_name.split(" ")[0]} {user.censu.last_name.split(" ")[0]} ({user.email})
                      </option>
                    )
                  }
                </select>
              </div>
    </>
  )
}

export default SelectUsuarios