/* ================================
   SUKALEYAN — Main JavaScript
   ================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Tile entrance animations
  const tiles = document.querySelectorAll('.tile');

  tiles.forEach((tile, index) => {
    tile.style.opacity = '0';
    tile.style.transform = 'translateY(20px)';

    setTimeout(() => {
      tile.style.transition = 'opacity 0.6s ease, transform 0.6s ease, background-color 0.5s ease';
      tile.style.opacity = '1';
      tile.style.transform = 'translateY(0)';
    }, 200 + (index * 100));
  });

  // Tile click feedback
  tiles.forEach(tile => {
    tile.addEventListener('click', function(e) {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // Footer links entrance
  const footerLinks = document.querySelectorAll('.footer__link');
  footerLinks.forEach((link, index) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(10px)';

    setTimeout(() => {
      link.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, color 0.3s ease';
      link.style.opacity = '1';
      link.style.transform = 'translateY(0)';
    }, 800 + (index * 100));
  });

});
