import Swal from 'sweetalert2';

export const redirectionAlert = ({
  title,
  text,
  icon,
  html,
  toast = false,
  confirmButtonText = 'Ok',
  showCloseButton = true,
  confirmButtonAriaLabel = 'Thumbs up, great!',
  cancelButtonText = 'Cancelar',
  showCancelButton = false,
  allowOutsideClick = false,
  allowEscapeKey = false
}: any) => {
  let color: string = '#6B0D0D'; 
  switch (icon) {
    case 'info':
      color = '#6B0D0D'; 
      break;
    case 'warning':
      color = '#808080';
      break;
    case 'error':
      color = '#FF0000';
      break;
    default:
      color = '#6B0D0D'; 
      break;
  }
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    toast: toast,
    showCloseButton: showCloseButton,
    showCancelButton: showCancelButton,
    html: html || `<a href="/" style="color: white;">${confirmButtonText}</a>`, 
    confirmButtonText: confirmButtonText,
    confirmButtonAriaLabel: confirmButtonAriaLabel,
    cancelButtonText: cancelButtonText,
    color: 'black', 
    iconColor: color, 
    confirmButtonColor: '#6B0D0D', 
    cancelButtonColor: '#FF0000',
    allowOutsideClick: allowOutsideClick,
    allowEscapeKey: allowEscapeKey
  });
};