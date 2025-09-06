// darkmode 
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const shouldUseLightMode = localStorage.getItem('theme') === 'light' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: light)').matches);

  if (shouldUseLightMode) {
    document.documentElement.classList.remove('dark');
    if(themeToggle) themeToggle.checked = false;
  } else if(themeToggle) {
    themeToggle.checked = true;
  }

  themeToggle?.addEventListener('change', () => {
    document.documentElement.classList.toggle('dark', !themeToggle.checked);
    localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
  });
});

// efeito no cursor
  const solidCursor = document.createElement('div');
  solidCursor.classList.add('cursor-solid');
  document.body.appendChild(solidCursor);

document.addEventListener('mousemove', e => {
  solidCursor.style.left = e.clientX + 'px';
  solidCursor.style.top = e.clientY + 'px';
});
