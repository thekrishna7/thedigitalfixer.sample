/* particles.js - Canvas Particle Animation System for Premium Backgrounds */

class CanvasParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationFrameId = null;
    
    // Config
    this.particleCount = 60;
    this.connectionDistance = 120;
    this.mouseRadius = 150;
    
    this.mouse = {
      x: null,
      y: null
    };
    
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.addEventListener('mouseout', () => this.handleMouseOut());
    
    // Re-init colors on theme changes
    window.addEventListener('themeChanged', () => this.updateColors());
  }
  
  init() {
    this.resize();
    this.updateColors();
    this.particles = [];
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1
      });
    }
  }
  
  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight || window.innerHeight;
  }
  
  updateColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.particleColor = isDark ? 'rgba(14, 165, 233, 0.4)' : 'rgba(37, 99, 235, 0.25)';
    this.lineColor = isDark ? 'rgba(14, 165, 233, 0.15)' : 'rgba(37, 99, 235, 0.1)';
  }
  
  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }
  
  handleMouseOut() {
    this.mouse.x = null;
    this.mouse.y = null;
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      
      // Update position
      p1.x += p1.vx;
      p1.y += p1.vy;
      
      // Bounce off walls
      if (p1.x < 0 || p1.x > this.canvas.width) p1.vx *= -1;
      if (p1.y < 0 || p1.y > this.canvas.height) p1.vy *= -1;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.particleColor;
      this.ctx.fill();
      
      // Lines to mouse
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p1.x - this.mouse.x;
        const dy = p1.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.mouseRadius) {
          const alpha = (1 - dist / this.mouseRadius) * 0.45;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`; // Purple connection to mouse
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
      
      // Lines to other particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.connectionDistance) {
          const alpha = (1 - dist / this.connectionDistance) * 0.4;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = this.lineColor;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }
    
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// Auto init on target elements
document.addEventListener('DOMContentLoaded', () => {
  const c = new CanvasParticles('hero-particles');
});
