// --- TAB SPOTLIGHT ---
const tabs = document.querySelectorAll('.nav-tab');
tabs.forEach(tab => {
  tab.addEventListener('mousemove', (e) => {
    const rect = tab.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set position for radial gradient spotlight
    tab.style.setProperty('--x', `${x}px`);
    tab.style.setProperty('--y', `${y}px`);
    
    // Calculate angle from center for conic gradient rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    tab.style.setProperty('--angle', `${angle}deg`);
  });
});

// --- CARD CONIC GRADIENT BORDER & SCALE ---
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  // Track mouse position for conic gradient
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate angle from center for conic gradient rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    card.style.setProperty('--angle', `${angle}deg`);
  });
  
  // Store original transform
  let originalTransform = '';
  
  // Handle hover scale
  card.addEventListener('mouseenter', () => {
    // Store the current transform (from anime.js or other sources)
    originalTransform = card.style.transform || '';
    
    // Apply scale, preserving any existing transform
    if (originalTransform) {
      // Parse and combine transforms
      const scaleMatch = originalTransform.match(/scale\([^)]+\)/);
      if (scaleMatch) {
        // Replace existing scale
        card.style.transform = originalTransform.replace(/scale\([^)]+\)/, 'scale(1.05)');
      } else {
        // Add scale to existing transform
        card.style.transform = `${originalTransform} scale(1.05)`;
      }
    } else {
      card.style.transform = 'scale(1.05)';
    }
  });
  
  card.addEventListener('mouseleave', () => {
    // Restore original transform
    card.style.transform = originalTransform;
  });
});

// --- COMMAND PALETTE LOGIC ---
const overlay = document.getElementById('command-palette-overlay');
const modal = overlay.querySelector('.command-palette-modal');
const input = overlay.querySelector('.cp-search-input');
const items = document.querySelectorAll('.cp-item');

let isOpen = false;
let selectedIndex = 0; 

// --- KEYBOARD NAV ---
function updateSelection() {
  items.forEach((item, index) => {
    if (index === selectedIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function openCommandPalette() {
  if (isOpen) return;
  isOpen = true;
  overlay.style.display = 'flex';
  input.value = ''; 
  selectedIndex = 0; 
  updateSelection();

  anime({
    targets: overlay, opacity: [0, 1], duration: 200, easing: 'easeOutQuad'
  });
  anime({
    targets: modal, translateY: [-20, 0], opacity: [0, 1], duration: 300, easing: 'easeOutExpo', delay: 50,
    complete: () => {
      input.focus();
      if (window.renderShadow) window.renderShadow();
    }
  });
}

function closeCommandPalette() {
  if (!isOpen) return;
  isOpen = false;
  anime({
    targets: overlay, opacity: [1, 0], duration: 200, easing: 'easeInQuad'
  });
  anime({
    targets: modal, translateY: [0, -20], opacity: [1, 0], duration: 200, easing: 'easeInExpo',
    complete: () => { overlay.style.display = 'none'; }
  });
}

document.addEventListener('keydown', (e) => {
  // Check for CMD+K or CTRL+K
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault(); 
    if (isOpen) closeCommandPalette();
    else openCommandPalette();
  }
  
  if (isOpen) {
    if (e.key === 'Escape') closeCommandPalette();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
      updateSelection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      updateSelection();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // Animation for the "Enter" press
      anime({ 
        targets: items[selectedIndex], 
        scale: [1, 0.98, 1], 
        duration: 200, 
        easing: 'easeInOutQuad' 
      });
    }
  }
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) { closeCommandPalette(); }
});

items.forEach((item, index) => {
  item.addEventListener('mouseenter', () => {
    selectedIndex = index;
    updateSelection();
  });
});

// --- INITIAL LOAD & FOCUS FIX ---
anime({ targets: ['.top-section', '.card'], translateY: [20, 0], opacity: [0, 1], duration: 800, easing: 'easeOutQuart', delay: anime.stagger(100) });
anime({ targets: '.bar-fill', width: [0, function(el) { return el.style.width; }], easing: 'easeOutExpo', duration: 1500, delay: 500 });
anime({ targets: 'circle[stroke-dashoffset]', strokeDashoffset: [anime.setDashoffset, 0], easing: 'easeOutExpo', duration: 1500, delay: 400 });

// Force focus on the document window immediately so shortcuts work
window.focus();
document.body.focus();

// --- WEBGL SHADOW SHADER ---
function initWebGLShadow() {
  const canvas = document.getElementById('cp-shadow-canvas');
  if (!canvas) return;
  
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    console.warn('WebGL not supported');
    return;
  }

  // Vertex shader source
  const vertexShaderSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_uv = (a_position + 1.0) * 0.5;
      v_uv.y = 1.0 - v_uv.y; // Flip Y for correct UV
    }
  `;

  // Fragment shader source - multi-layer gradient shadow
  const fragmentShaderSource = `
    precision mediump float;
    
    varying vec2 v_uv;
    
    uniform vec2 u_resolution;
    uniform vec2 u_modalSize;
    uniform vec2 u_modalPos;
    uniform float u_devicePixelRatio;
    
    // Gaussian blur function for proper shadow blur
    float gaussian(float dist, float sigma) {
      if (sigma <= 0.0) return 0.0;
      return exp(-(dist * dist) / (2.0 * sigma * sigma));
    }
    
    // Smooth falloff with Gaussian blur
    float smoothFalloff(float dist, float blurRadius) {
      // Scale blur radius by device pixel ratio
      float scaledBlur = blurRadius * u_devicePixelRatio;
      
      // Convert blur radius to sigma (standard deviation)
      // For more visible blur, use a larger sigma relative to blur radius
      // CSS box-shadow uses a softer falloff, so we'll use / 1.5 for more visible blur
      float sigma = max(scaledBlur / 1.5, 3.0);
      
      // Ensure we have a minimum blur even for small distances
      float result = gaussian(dist, sigma);
      
      // Make blur more visible by ensuring it doesn't drop too quickly
      return result;
    }
    
    // Calculate shadow layer - spreads across modal width
    vec4 shadowLayer(vec2 offset, float blurRadius, vec3 color, float alpha) {
      // Convert UV to pixel coordinates
      vec2 pixelPos = v_uv * u_resolution;
      
      // Scale offset by device pixel ratio
      vec2 scaledOffset = offset * u_devicePixelRatio;
      
      // Modal bounds
      float modalLeft = u_modalPos.x;
      float modalRight = u_modalPos.x + u_modalSize.x;
      float modalBottom = u_modalPos.y + u_modalSize.y;
      
      // Only render shadows below the modal
      if (pixelPos.y < modalBottom) {
        return vec4(0.0);
      }
      
      // Apply horizontal offset - shadows shift left by offset.x
      float offsetX = pixelPos.x - scaledOffset.x;
      
      // Check if this pixel's shadow position intersects with modal bottom edge
      // The shadow spreads horizontally across the entire modal width
      bool inModalWidth = offsetX >= modalLeft && offsetX <= modalRight;
      
      if (!inModalWidth) {
        // Still allow shadow to extend beyond modal edges with fade
        float distFromEdge = min(
          abs(offsetX - modalLeft),
          abs(offsetX - modalRight)
        );
        // Fade out quickly beyond modal edges
        if (distFromEdge > blurRadius * 0.3) {
          return vec4(0.0);
        }
      }
      
      // Calculate distance from modal bottom edge (with vertical offset)
      // For pixels that map to modal bottom, distance is just vertical
      float distY = pixelPos.y - modalBottom - scaledOffset.y;
      
      // Horizontal distance from closest point on modal bottom edge
      float closestX = clamp(offsetX, modalLeft, modalRight);
      float distX = abs(offsetX - closestX);
      
      // Calculate elliptical distance (box-shadow creates elliptical blur)
      // Use a softer horizontal spread
      float dist = sqrt(distX * distX * 0.5 + distY * distY);
      
      // Apply blur with Gaussian falloff
      float blurIntensity = smoothFalloff(dist, blurRadius);
      
      // Multiply by alpha - but ensure minimum visibility
      float intensity = blurIntensity * alpha;
      
      // Don't early exit - let the GPU handle it for now to see full blur
      // if (intensity < 0.0001) {
      //   return vec4(0.0);
      // }
      
      return vec4(color * intensity, intensity);
    }
    
    void main() {
      vec4 color = vec4(0.0);
      
      // TEST MODE: Uncomment to see a bright test shadow
      // vec2 pixelPos = v_uv * u_resolution;
      // float modalBottom = u_modalPos.y + u_modalSize.y;
      // if (pixelPos.y > modalBottom && pixelPos.y < modalBottom + 100.0) {
      //   gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5); // Red test shadow
      //   return;
      // }
      
      // Layer 1 - furthest, largest (matches -21px 202.75px 138px rgba(228, 238, 151, 0.02))
      // Increase alpha for visibility during debugging
      vec4 layer1 = shadowLayer(
        vec2(-21.0, 202.75),
        138.0,
        vec3(228.0, 238.0, 151.0) / 255.0,
        0.02 * 5.0  // Temporarily increase for visibility
      );
      color += layer1;
      
      // Layer 2 (matches -14px 166.5px 126px rgba(229, 90, 90, 0.14))
      vec4 layer2 = shadowLayer(
        vec2(-14.0, 166.5),
        126.0,
        vec3(229.0, 90.0, 90.0) / 255.0,
        0.14 * 2.0  // Temporarily increase for visibility
      );
      color += layer2;
      
      // Layer 3 (matches -8px 88.25px 106px rgba(74, 234, 146, 0.31))
      vec4 layer3 = shadowLayer(
        vec2(-8.0, 88.25),
        106.0,
        vec3(74.0, 234.0, 146.0) / 255.0,
        0.31 * 1.5  // Temporarily increase for visibility
      );
      color += layer3;
      
      // Layer 4 (matches -3px 19.75px 79px rgba(100, 128, 236, 0.58))
      vec4 layer4 = shadowLayer(
        vec2(-3.0, 19.75),
        79.0,
        vec3(100.0, 128.0, 236.0) / 255.0,
        0.58
      );
      color += layer4;
      
      // Layer 5 - closest (matches -1px 10px 43px rgba(107, 107, 107, 0.86))
      vec4 layer5 = shadowLayer(
        vec2(-1.0, 10.0),
        43.0,
        vec3(107.0, 107.0, 107.0) / 255.0,
        0.86
      );
      color += layer5;
      
      gl_FragColor = color;
    }
  `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createProgram(gl, vertexShader, fragmentShader);

  if (!program) return;

  // Create quad geometry
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  function resizeCanvas() {
    const wrapper = canvas.parentElement;
    if (!wrapper || !modal) return;
    
    const rect = modal.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    
    // Canvas should cover the modal and shadow area
    const width = wrapperRect.width;
    const height = wrapperRect.height + 300; // Extra space for shadow
    
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function render() {
    if (!overlay || overlay.style.display === 'none' || !modal) {
      canvas.style.opacity = '0';
      return;
    }
    
    resizeCanvas();
    canvas.style.opacity = '1';
    
    gl.useProgram(program);
    
    // Set up attributes
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Set uniforms
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const modalSizeLocation = gl.getUniformLocation(program, 'u_modalSize');
    const modalPosLocation = gl.getUniformLocation(program, 'u_modalPos');
    const devicePixelRatioLocation = gl.getUniformLocation(program, 'u_devicePixelRatio');
    
    const rect = modal.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    
    // Calculate modal position relative to canvas
    const modalPosX = (rect.left - canvasRect.left) * window.devicePixelRatio;
    const modalPosY = (rect.top - canvasRect.top) * window.devicePixelRatio;
    const modalWidth = rect.width * window.devicePixelRatio;
    const modalHeight = rect.height * window.devicePixelRatio;
    
    // Debug logging
    if (window.DEBUG_SHADOW) {
      console.log('Shadow render:', {
        canvasSize: `${canvas.width}x${canvas.height}`,
        modalPos: `${modalPosX}, ${modalPosY}`,
        modalSize: `${modalWidth}x${modalHeight}`,
        devicePixelRatio: window.devicePixelRatio
      });
    }
    
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(modalSizeLocation, modalWidth, modalHeight);
    gl.uniform2f(modalPosLocation, modalPosX, modalPosY);
    gl.uniform1f(devicePixelRatioLocation, window.devicePixelRatio || 1.0);
    
    // Enable blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    // Clear and draw
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    // Check for WebGL errors
    const error = gl.getError();
    if (error !== gl.NO_ERROR && window.DEBUG_SHADOW) {
      console.error('WebGL error:', error);
    }
  }

  // Don't render initially (modal is hidden)
  canvas.style.opacity = '0';
  
  // Re-render on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(render, 100);
  });
  
  // Re-render when modal visibility changes
  const observer = new MutationObserver(() => {
    setTimeout(render, 100);
  });
  
  observer.observe(overlay, { attributes: true, attributeFilter: ['style'] });
  
  // Make render function globally accessible
  window.renderShadow = render;
}

// Initialize WebGL shadow when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWebGLShadow);
} else {
  initWebGLShadow();
}