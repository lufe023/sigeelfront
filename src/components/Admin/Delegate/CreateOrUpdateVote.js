import axios from "axios"
import getConfig from "../../../utils/getConfig";
import Swal from "sweetalert2";


const CreateOrUpdateVote = (citizenID,suffrageValue) => {
    axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/suffrages/registervote`,
    {
        citizenID,suffrageValue
    }, getConfig())
    .then((response) => {
        console.log(response)
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    {
console.log('ocurrio: '+response?.data?.suffrage)
    response?.data?.suffrage ==true?
    Toast.fire({
        icon: 'success',
        title: `Voto registrado a ${response.data.citizenID}`
    }):
    Toast.fire({
        icon: 'error',
        title: `Se restó el votó a ${response.data.citizenID}` 
    })
}
    })
    .catch((error) => {
    console.error('Error al enviar los datos:', error);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: `${error.response.data.message}`
      })
    });
    
}

export default CreateOrUpdateVote