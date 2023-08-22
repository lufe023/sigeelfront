const getConfig = () => ({
    headers: {
      Authorization: `jwt ${localStorage.getItem('token')}`,
    }
  })
  
  export default getConfig