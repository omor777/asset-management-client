import Swal from 'sweetalert2';
const successAlert = (msg) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: msg,
    showConfirmButton: false,
    timer: 1600,
  });
};

const errorAlert = (msg) => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: msg,
    showConfirmButton: false,
    timer: 1600,
  });
};

export { errorAlert, successAlert };
