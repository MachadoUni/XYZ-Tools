const matrixSequence = ['Shift', 'x', 'y', 'z'];
let matrixInput = [];
let matrixActive = false;
let matrixCanvas, matrixCtx, matrixInterval;

function startMatrix() {
  matrixCanvas = document.createElement('canvas');
  matrixCanvas.id = 'matrix-canvas';
  document.body.appendChild(matrixCanvas);
  matrixCtx = matrixCanvas.getContext('2d');

  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;

  const letters = 'XYZTOOLS';
  const fontSize = 16;
  const columns = Math.floor(matrixCanvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    matrixCtx.fillStyle = '#7b00ff'; 
    matrixCtx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  matrixInterval = setInterval(draw, 50);

  window.addEventListener('resize', () => {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
  });

  matrixActive = true;
}

function stopMatrix() {
  clearInterval(matrixInterval);
  if (matrixCanvas) {
    document.body.removeChild(matrixCanvas);
  }
  matrixActive = false;
}

document.addEventListener('keydown', (e) => {
  matrixInput.push(e.key);
  if (matrixInput.length > matrixSequence.length) matrixInput.shift();

  if (matrixInput.join('').toLowerCase() === matrixSequence.join('').toLowerCase()) {
    if (!matrixActive) startMatrix();
    else stopMatrix();
    matrixInput = [];
  }
});
