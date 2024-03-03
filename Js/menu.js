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
      menus.forEach(menu => {
        menu.style.opacity = '0';
        menu.style.display = 'none';
        menu.classList.remove('menu-content');
        menuBienvenida.style.transform = 'translateX(60vw)';
        bienvenida.style.transform = 'translateX(0)';
        linkss.style.transform = 'translateX(0)';
        header.style.display = '';

        htmlBody.style.overflow = 'auto';
      });
    });

    links.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();

        menus.forEach(menu => {
          menu.style.opacity = '0';
          menu.style.display = 'none';
          menu.classList.remove('menu-content');
        });

        const targetMenuId = this.id.replace('menu', '').toLowerCase();
        const targetMenu = document.querySelector(`.menu-${targetMenuId}`);

        targetMenu.style.display = 'block';
        header.style.display = 'none';

        setTimeout(() => {
          targetMenu.classList.add('menu-content');
          targetMenu.style.opacity = '1';

          bienvenida.style.transform = 'translateX(-60vw)';
          menuBienvenida.style.transform = 'translateX(0)';
          linkss.style.transform = 'translateX(-60vw)';

          // htmlBody.style.overflow = 'hidden';

          if (window.scrollY !== 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 10);
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