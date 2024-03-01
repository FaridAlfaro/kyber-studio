document.addEventListener('DOMContentLoaded', function () {
    const bienvenida = document.querySelector('.bienvenida');
    const menuBienvenida = document.querySelector('.menu-bienvenida');
    const links = document.querySelectorAll('.bienvenida-link');
    const linkss = document.querySelector('.bienvenida-links');
    const closeBtn = document.querySelector('.close-btn');
    const menus = document.querySelectorAll('.menu-bienvenida > div');
    const header = document.querySelector('header');
    const htmlBody = document.documentElement;

    closeBtn.addEventListener('click', function () {
        // Ocultar los menús
        menus.forEach(menu => {
            menu.style.opacity = '0';
            menu.style.display = 'none';
            menuBienvenida.style.transform = 'translateX(60vw)';
            bienvenida.style.transform = 'translateX(0)';
            linkss.style.transform = 'translateX(0)';
            header.style.display = '';
            
            // Habilitar el scroll
            htmlBody.style.overflow = 'auto';
        });

        // Desplazar bienvenida y menuBienvenida a la derecha
        // bienvenida.style.transform = 'translateX(0)';
        // menuBienvenida.style.transform = 'translateX(60vw)';
    });

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Ocultar los menús previos
            menus.forEach(menu => {
                menu.style.opacity = '0';
                menu.style.display = 'none';
            });

            const targetMenuId = this.id.replace('menu', '').toLowerCase();
            const targetMenu = document.querySelector(`.menu-${targetMenuId}`);

            // Mostrar el menú correspondiente
            targetMenu.style.display = 'block';
            setTimeout(() => {
                targetMenu.style.opacity = '1';
            }, 10);
            header.style.display = 'none';

            // Desplazar bienvenida y menuBienvenida a la izquierda
            bienvenida.style.transform = 'translateX(-60vw)';
            menuBienvenida.style.transform = 'translateX(0)';
            linkss.style.transform = 'translateX(-60vw)';

            // Bloquear el scroll
            htmlBody.style.overflow = 'hidden';

            // Scroll automático solo si no está en la parte superior
            if (window.scrollY !== 0) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", function (e) {
      const x = e.clientX;
      const y = e.clientY;

      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
    });
  });