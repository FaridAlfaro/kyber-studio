var button = document.querySelector('button');
var menu = document.querySelector('.menu');
button.addEventListener('click', function() {
  menu.classList.toggle('close');
});