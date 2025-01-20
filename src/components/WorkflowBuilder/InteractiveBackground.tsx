/* src\components\WorkflowBuilder\InteractiveBackground.tsx */
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

interface CachedGradients {
  active: CanvasGradient;
  inactive: CanvasGradient;
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);
  const pointsRef = useRef<Point[]>([]);
  const circlesRef = useRef<Circle[]>([]);
  const gradientsRef = useRef<CachedGradients | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const createGradients = (width: number): CachedGradients => {
      const activeGradient = ctx.createLinearGradient(0, 0, width, 0);
      activeGradient.addColorStop(0, "#0092ff");
      activeGradient.addColorStop(0.5, "#00ffae");
      activeGradient.addColorStop(1, '#e5fe48');
      
      const inactiveGradient = ctx.createLinearGradient(0, 0, width, 0);
      inactiveGradient.addColorStop(0, "#204868");
      inactiveGradient.addColorStop(0.5, "#256456");
      inactiveGradient.addColorStop(1, '#5a643d');

      return {
        active: activeGradient,
        inactive: inactiveGradient
      };
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gradientsRef.current = createGradients(canvas.width);
      initializeCircles();
    };

    const initializeCircles = () => {
      const circlesMargin = 15;
      const xMultiplier = circlesMargin * 0.8;
      const yMultiplier = (circlesMargin - 0.25) * 0.8;
      
      circlesRef.current = [];
      
      const cols = Math.round(canvas.width / circlesMargin * 1.5);
      const rows = Math.round(canvas.height / circlesMargin * 1.5);
      
      for(let i = 0; i < cols; i++) {
        const x = 13 + xMultiplier * i;
        for(let j = 0; j < rows; j++) {
          circlesRef.current.push({
            x: x,
            y: 10 + yMultiplier * j,
            r: 0.5,
            animation: false
          });
        }
      }
    };

    const batchDrawCircles = (circles: Circle[], animated: boolean) => {
      if (!circles.length || !gradientsRef.current) return;
      
      ctx.beginPath();
      circles.forEach(circle => {
        ctx.moveTo(circle.x + circle.r, circle.y + 1.5);
        ctx.arc(circle.x, circle.y + 1.5, circle.r, 0, 2 * Math.PI, true);
      });
      
      ctx.fillStyle = animated ? gradientsRef.current.active : gradientsRef.current.inactive;
      ctx.fill();
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Separate circles into animated and non-animated batches
      const animatedCircles: Circle[] = [];
      const staticCircles: Circle[] = [];
      
      circlesRef.current.forEach(circle => {
        if (circle.animation) {
          animatedCircles.push(circle);
        } else {
          staticCircles.push(circle);
        }
      });

      // Draw all static circles in one batch
      batchDrawCircles(staticCircles, false);
      
      // Draw all animated circles in one batch
      batchDrawCircles(animatedCircles, true);

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
        const spreadRate = lineWidthStart * (1 - inc);
        const lastPoint = pointsRef.current[i - 1] || point;
        
        const midX = (lastPoint.x + point.x) / 2;
        const midY = (lastPoint.y + point.y) / 2;
        
        circlesRef.current.forEach(circle => {
          drawCircleEffect(point.x, point.y, circle, spreadRate);
          drawCircleEffect(midX, midY, circle, spreadRate);
        });

        return true;
      });
    };

    const drawCircleEffect = (x: number, y: number, circle: Circle, spreadRate: number) => {
      const distSquared = (x - circle.x) ** 2 + (y - circle.y) ** 2;
      if (distSquared < 64) {
        if (spreadRate >= 0.8) {
          circle.animation = true;
          circle.r = spreadRate;
        } else {
          circle.animation = false;
          circle.r = 0.5;
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

    resizeCanvas();
    drawDots();

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