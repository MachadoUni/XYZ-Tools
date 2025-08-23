    document.addEventListener('DOMContentLoaded', function() {
      const svArea = document.getElementById('svArea');
      const svCursor = document.getElementById('svCursor');
      const hueSlider = document.getElementById('hue');
      const hueCursor = document.getElementById('hueCursor');
      const preview = document.getElementById('preview');
      const hexInput = document.getElementById('hex');
      const rgbInput = document.getElementById('rgb');
      const copyHexBtn = document.getElementById('copyHex');
      const copyRgbBtn = document.getElementById('copyRgb');

      let hue = 0;
      let saturation = 100;
      let value = 100;
      let isDragging = false;


      svCursor.style.left = '100%';
      svCursor.style.top = '0%';
      hueCursor.style.left = '0%';


      function updateColor() {
        const rgb = hsvToRgb(hue, saturation, value);
        const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
        
        preview.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        hexInput.value = hex;
        rgbInput.value = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        
        const hueColor = hsvToRgb(hue, 100, 100);
        svArea.style.background = `linear-gradient(to right, #fff, rgba(255,255,255,0)), 
                                  linear-gradient(to top, rgb(${hueColor[0]}, ${hueColor[1]}, ${hueColor[2]}), rgba(0,0,0,0))`;
      }

      // conversões de cor
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

      // interação com a área SV
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

      svArea.addEventListener('mousedown', function(e) {
        isDragging = true;
        setSvPosition(e.clientX, e.clientY);
      });

      document.addEventListener('mousemove', function(e) {
        if (isDragging) {
          setSvPosition(e.clientX, e.clientY);
        }
      });

      document.addEventListener('mouseup', function() {
        isDragging = false;
      });

      function setHuePosition(x) {
        const rect = hueSlider.getBoundingClientRect();
        
        x = Math.max(0, Math.min(x - rect.left, rect.width));
        
        hue = Math.round((x / rect.width) * 360);
        hueCursor.style.left = `${x}px`;
        
        updateColor();
      }

      hueSlider.addEventListener('mousedown', function(e) {
        isDragging = true;
        setHuePosition(e.clientX);
      });

      copyHexBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(hexInput.value).then(() => {
          const originalText = copyHexBtn.innerHTML;
          copyHexBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Copiado!';
          setTimeout(() => {
            copyHexBtn.innerHTML = originalText;
          }, 2000);
        });
      });

      copyRgbBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(rgbInput.value).then(() => {
          const originalText = copyRgbBtn.innerHTML;
          copyRgbBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Copiado!';
          setTimeout(() => {
            copyRgbBtn.innerHTML = originalText;
          }, 2000);
        });
      });

      updateColor();
    });


    