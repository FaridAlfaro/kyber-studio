document.addEventListener('DOMContentLoaded', function () {
  const bienvenida = document.querySelector('.bienvenida');
  const menuBienvenida = document.querySelector('.menu-bienvenida');
  const links = document.querySelectorAll('.bienvenida-link');
  const linkss = document.querySelector('.bienvenida-links');
  const closeBtn = document.querySelector('.close-btn');
  const menus = document.querySelectorAll('.menu-bienvenida > div');
  var anchoPantalla = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // Función para restablecer el estado inicial
  function resetInitialState() {
    menus.forEach(menu => {
      menu.style.opacity = '0';
      menu.style.display = 'none';
      menu.classList.remove('menu-content');
      menuBienvenida.style.transform = 'translateX(100vw)';
      bienvenida.style.transform = 'translateX(0)';
      linkss.style.transform = 'translateX(0)';
      menuBienvenida.style.display = 'none'
    });
  }

  // Evento al hacer clic en el botón cerrar
  closeBtn.addEventListener('click', function () {
    resetInitialState();
  });

  // Evento al cargar la página
  window.addEventListener('beforeunload', function () {
    resetInitialState();
    menuBienvenida.style.display = 'none'
  });

  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      menus.forEach(menu => {
        menuBienvenida.style.display = 'none'
        menu.style.opacity = '0';
        menu.style.display = 'none';
        menu.classList.remove('menu-content');
      });

      const targetMenuId = this.id.replace('menu', '').toLowerCase();
      const targetMenu = document.querySelector(`.menu-${targetMenuId}`);

      targetMenu.style.display = 'block';

      setTimeout(() => {
        targetMenu.classList.add('menu-content');
        targetMenu.style.opacity = '1';

        if (anchoPantalla < 990) {
          bienvenida.style.transform = 'translateX(-100vw)';
          menuBienvenida.style.display = 'flex'
          menuBienvenida.style.transform = 'translateX(0)'
          linkss.style.transform = 'translateX(-100vw)';
        }
        else{
          menuBienvenida.style.display = 'flex'
          bienvenida.style.transform = 'translateX(-60vw)';
          menuBienvenida.style.transform = 'translateX(0)';
          linkss.style.transform = 'translateX(-60vw)';
        }

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