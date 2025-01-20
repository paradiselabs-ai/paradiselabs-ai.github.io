import React, { useEffect, useRef } from 'react';

interface Circle {
  x: number;
  y: number;
  r: number;
  animation: boolean;
  spreadRate?: number;
}

interface Point {
  x: number;
  y: number;
  lifetime: number;
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);
  const pointsRef = useRef<Point[]>([]);
  const circlesRef = useRef<Circle[]>([]);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeCircles();
    };

    const initializeCircles = () => {
      const circlesMargin = 15;
      circlesRef.current = [];
      
      for(let i = 0; i < Math.round(canvas.width / circlesMargin * 1.5); i++) {
        for(let j = 0; j < Math.round(canvas.height / circlesMargin * 1.5); j++) {
          circlesRef.current.push({
            x: 13 + (circlesMargin) * i * 0.8,
            y: 10 + (circlesMargin - 0.25) * j * 0.8,
            r: 0.5, // Initial radius
            animation: false
          });
        }
      }
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const grd_active = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grd_active.addColorStop(0, "#0092ff");
      grd_active.addColorStop(0.5, "#00ffae");
      grd_active.addColorStop(1, '#e5fe48');
      
      const grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grd.addColorStop(0, "#204868");
      grd.addColorStop(0.5, "#256456");
      grd.addColorStop(1, '#5a643d');

      circlesRef.current.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y + 1.5, circle.r, 0, 2 * Math.PI, true);
        ctx.fillStyle = circle.animation ? grd_active : grd;
        ctx.fill();
      });

      animatePoints();
      requestAnimationFrame(drawDots);
    };

    const animatePoints = () => {
      const duration = 2 * 1000 / 60;
      const lineWidthStart = 3.5;
      
      pointsRef.current = pointsRef.current.filter((point, i) => {
        point.lifetime += 1;
        if (point.lifetime > duration) return false;

        const inc = point.lifetime / duration;
        const dec = 1 - inc;
        const spreadRate = lineWidthStart * (1 - inc);

        const lastPoint = pointsRef.current[i - 1] || point;
        
        circlesRef.current.forEach(circle => {
          drawCircleEffect(point.x, point.y, circle, spreadRate);
          const midX = (lastPoint.x + point.x) / 2;
          const midY = (lastPoint.y + point.y) / 2;
          drawCircleEffect(midX, midY, circle, spreadRate);
        });

        return true;
      });
    };

    const drawCircleEffect = (x: number, y: number, circle: Circle, spreadRate: number) => {
      const dist = Math.round(Math.sqrt(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2)));
      
      if (dist < 8) {
        // Only animate if the spreadRate is greater than a threshold
        if (spreadRate >= 0.8) {
          circle.animation = true;
          circle.r = spreadRate;
        } else {
          // Reset the circle to its original state
          circle.animation = false;
          circle.r = 0.5; // Reset to the initial radius
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (frameRef.current === 1) {
        const rect = canvas.getBoundingClientRect();
        pointsRef.current.push({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          lifetime: 0
        });
        frameRef.current = 0;
      }
      frameRef.current++;
    };

    // Initialize and start animation
    resizeCanvas();
    drawDots();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-auto"
      />
    </div>
  );
};

export default InteractiveBackground;