// seletorDeCores.js
document.addEventListener('DOMContentLoaded', function () {
  const svArea = document.getElementById('svArea');
  const svCursor = document.getElementById('svCursor');
  const hueSlider = document.getElementById('hue');
  const hueCursor = document.getElementById('hueCursor');
  const preview = document.getElementById('preview');
  const hexInput = document.getElementById('hex');
  const rgbInput = document.getElementById('rgb');
  const copyHexBtn = document.getElementById('copyHex');
  const copyRgbBtn = document.getElementById('copyRgb');
  const tooltipHex = document.getElementById('tooltipHex');
  const tooltipRgb = document.getElementById('tooltipRgb');

  let hue = 0;
  let saturation = 100;
  let value = 100;
  let isDragging = false;

  // posição inicial do cursor
  svCursor.style.left = '100%';
  svCursor.style.top = '0%';
  hueCursor.style.left = '0%';

  function updateColor() {
    const rgb = hsvToRgb(hue, saturation, value);
    const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);

    preview.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    hexInput.value = hex;
    rgbInput.value = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;

    // atualiza fundo da área c matriz selecionada
    const hueColor = hsvToRgb(hue, 100, 100);
    svArea.style.background = `linear-gradient(to top, #000, transparent), 
                                  linear-gradient(to right, #fff, transparent),
                                  linear-gradient(to bottom, hsl(${hue}, 100%, 50%), hsl(${hue}, 100%, 50%))`;
  }

  // conversao das cores
  function hsvToRgb(h, s, v) {
    h = h % 360;
    s = s / 100;
    v = v / 100;

    let r, g, b;
    const i = Math.floor(h / 60);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - s * f);
    const t = v * (1 - s * (1 - f));

    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }

    return [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    ];
  }

  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  // area sv
  function setSvPosition(x, y) {
    const rect = svArea.getBoundingClientRect();

    x = Math.max(0, Math.min(x - rect.left, rect.width));
    y = Math.max(0, Math.min(y - rect.top, rect.height));

    saturation = Math.round((x / rect.width) * 100);
    value = 100 - Math.round((y / rect.height) * 100);

    svCursor.style.left = `${x}px`;
    svCursor.style.top = `${y}px`;

    updateColor();
  }

  svArea.addEventListener('mousedown', function (e) {
    isDragging = true;
    setSvPosition(e.clientX, e.clientY);
  });

  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      setSvPosition(e.clientX, e.clientY);
    }
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });

  // slider da matriz
  function setHuePosition(x) {
    const rect = hueSlider.getBoundingClientRect();

    x = Math.max(0, Math.min(x - rect.left, rect.width));

    hue = Math.round((x / rect.width) * 360);
    hueCursor.style.left = `${x}px`;

    updateColor();
  }

  hueSlider.addEventListener('mousedown', function (e) {
    isDragging = true;
    setHuePosition(e.clientX);
  });

  // copiar
  copyHexBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(hexInput.value).then(() => {
      tooltipHex.classList.add('show');
      setTimeout(() => {
        tooltipHex.classList.remove('show');
      }, 2000);
    });
  });

  copyRgbBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(rgbInput.value).then(() => {
      tooltipRgb.classList.add('show');
      setTimeout(() => {
        tooltipRgb.classList.remove('show');
      }, 2000);
    });
  });

  // inicialização
  updateColor();
});


function copiarRGB() {
  var output = document.getElementById("rgb").value;
  if (output !== '') {
    navigator.clipboard.writeText(output);
  }
}

function copiarHex() {
  var output = document.getElementById("hex").value;
  if (output !== '') {
    navigator.clipboard.writeText(output);
  }
}