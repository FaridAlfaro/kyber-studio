document.addEventListener("DOMContentLoaded", function() {
    var nav = document.querySelector('.menubar');
    var initialOffset = nav.getBoundingClientRect().top + window.scrollY;
    var logo = document.querySelector('.img-logo')

    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Si el usuario se encuentra en la parte superior de la página
        if (currentScroll <= initialOffset) {
            nav.style.backgroundColor = 'transparent';
            logo.style.opacity = '0'
        } else {
            // Si el usuario ha bajado, cambia el color de fondo a rojo con una transición suave
            nav.style.backgroundColor = '#1D1D1B';
            logo.style.opacity = '1'
            logo.style.transition = '0.5s ease'
            nav.style.transition = 'background-color 0.3s ease'; // Ajusta la duración y la función de temporización según sea necesario
        }
    });
});