import Swal from "sweetalert2";
import getConfig from "../../utils/getConfig";
import axios from "axios";

const changeUserRole = (id, newRoleId, updateView) => {
  const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users//changeUserRole`;
  axios
    .patch(URL, { id, newRoleId }, getConfig())
    .then((res) => {
        updateView()
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Nuevo rol asignado",
      });
    })
    .catch((err) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      console.log(err);
      Toast.fire({
        icon: "error",
        title: `${err.response.data.message}`,
      });
    });
};

export default changeUserRole;
