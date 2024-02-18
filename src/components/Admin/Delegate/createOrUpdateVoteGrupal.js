import axios from "axios"
import getConfig from "../../../utils/getConfig";
import Swal from "sweetalert2";


const CreateOrUpdateVoteGrupal = (positions, collegeId, suffrageValue) => {
    axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/suffrages/registergrupalvote`,
    {
        positions,collegeId,suffrageValue
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
console.log('ocurrio: ')

    response?.data.success?
    Toast.fire({
        icon: 'success',
        title: `Hecho`
    }):
    Toast.fire({
        icon: 'error',
        title: `Hubo un error` 
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

export default CreateOrUpdateVoteGrupal