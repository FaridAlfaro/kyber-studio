document.addEventListener("DOMContentLoaded", function() {
  var wrap = document.querySelector('.wrap')
  var nav = document.querySelector('header');
  var logo = document.querySelector('.logo-header');
  var opciones = document.querySelector('nav');
  var isNavHidden = false;

  // Calcula el extremo superior de la página
  var initialOffset = 0;

  window.addEventListener('scroll', function() {
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Si el usuario se encuentra en la parte superior de la página
    if (currentScroll <= initialOffset) {
      // Oculta las opciones después de la transición de opacidad
      opciones.style.transition = 'opacity 0.5s ease';

      // Si las opciones ya están ocultas, no es necesario volver a hacerlo
      if (!isNavHidden) {
        isNavHidden = true;
        opciones.style.opacity = '0';
        wrap.style.opacity = '0'
        setTimeout(() => {
          opciones.style.display = 'none';
        }, 500);
      }

      setTimeout(() => {
        nav.style.backgroundColor = 'transparent';
        logo.style.opacity = '0';
        wrap.style.opacity = '0'
      }, 100);
    } else {
      // Muestra las opciones antes de la transición de opacidad
      opciones.style.opacity = '1';
      wrap.style.opacity = '1'
      opciones.style.display = '';
      isNavHidden = false;

      setTimeout(() => {
        nav.style.backgroundColor = '#1D1D1B';
        logo.style.opacity = '1';
        logo.style.transition = 'opacity 0.5s ease';
        opciones.style.transition = 'opacity 0.5s ease';
        nav.style.transition = 'background-color 0.3s ease';
        wrap.style.transition = 'opacity 0.5s ease';
      }, 100);
    }
  });
});
