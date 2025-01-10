document.querySelectorAll('.style-btn').forEach(btn => btn.addEventListener('click', function(e) {
  e.preventDefault();
  e.target.classList.toggle('active');
  document.querySelectorAll('.style-btn').forEach(btn => {
    if (btn !== e.target) {
      btn.classList.remove('active');
    }
  });
  const hasActive = e.target.classList.contains('active');
  state.setStyle(hasActive ? e.target.dataset.style : '');
}));

document.querySelector('#cssCode button').addEventListener('click', function(e) {
  e.preventDefault();
  const code = document.querySelector('#cssCode code');
  navigator.clipboard.writeText(code.textContent);
});

const state = {
  style: localStorage.getItem('style') || '',

  setStyle(style) {
    this.style = style;
    this.updateStyle();
    localStorage.setItem('style', style);
  },

  updateStyle() {
    const el = document.querySelector('#textInput');
    el.className = this.style;
    const code = document.querySelector('#cssCode code');
    code.textContent = `@font-face {
  font-family: 'Jinghua';
  src: url(https://frostming.github.io/jinghua-webfont/css/京華老宋体v2.002.ttf) format('truetype');
  ${this.style ? `font-feature-settings: '${this.style}';` : ''}
}`;
  }
}

state.updateStyle();
