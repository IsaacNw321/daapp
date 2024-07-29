import Swal from 'sweetalert2'
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
  let color: string = '#00416A'
  switch (icon) {
      case 'info':
          color = '#00416A'
          break
      case 'warning':
          color = '#808080'
          break
      case 'error':
          color = '#FF0000'
          break
      default:
          color = '#00416A'
          break
  }
  Swal.fire({
      icon: icon,
      title: title,
      text: text,
      toast: toast,
      showCloseButton: showCloseButton,
      showCancelButton: showCancelButton,
      html: html,
      confirmButtonText: confirmButtonText,
      confirmButtonAriaLabel: confirmButtonAriaLabel,
      cancelButtonText: cancelButtonText,
      color: '#0f172a',
      iconColor: color,
      confirmButtonColor: '#00416A',
      cancelButtonColor: '#FF0000',
      allowOutsideClick: allowOutsideClick,
      allowEscapeKey: allowEscapeKey
  })
  
}