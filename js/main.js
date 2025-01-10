document.querySelectorAll('.style-btn').forEach(btn => btn.addEventListener('click', function(e) {
  e.preventDefault();
  e.target.classList.toggle('active');
  state.setStyle(Array.from(document.querySelectorAll('.style-btn.active')).map(btn => btn.dataset.style));
}));

document.querySelector('#cssCode button').addEventListener('click', function(e) {
  e.preventDefault();
  const code = document.querySelector('#cssCode code');
  navigator.clipboard.writeText(code.textContent);
});

const state = {
  styles: (localStorage.getItem('styles') || '').split(',').filter(Boolean),

  setStyle(styles) {
    this.styles = styles;
    this.updateStyle();
    localStorage.setItem('styles', this.styles.join(','));
  },

  updateStyle(init = false) {
    const el = document.querySelector('#textInput');
    el.style.fontFeatureSettings = this.styles.map(style => `'${style}'`).join(', ');
    const code = document.querySelector('#cssCode code');
    code.textContent = `@font-face {
  font-family: 'Jinghua';
  src: url(https://frostming.github.io/jinghua-webfont/css/京華老宋体v2.002.ttf) format('truetype');
  ${this.styles.length > 0 ? `font-feature-settings: ${el.style.fontFeatureSettings};` : ''}
}`;
    if (init) {
      this.styles.forEach(style => {
        document.querySelector(`.style-btn[data-style="${style}"]`).classList.add('active');
      });
    }
  }
}

state.updateStyle(true);
