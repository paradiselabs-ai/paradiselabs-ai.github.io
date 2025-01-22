/* src/workflow/components/WorkflowBuilder/InteractiveBackground.tsx */
import React, { useEffect, useRef } from 'react';

interface Circle {
  x: number;
  y: number;
  r: number;
  animation: boolean;
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

interface GridCell {
  circles: Circle[];
}

const CELL_SIZE = 16; // Spatial partitioning cell size

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const staticCacheRef = useRef<HTMLCanvasElement>(); // Cache for static circles
  const gridRef = useRef<GridCell[][]>([]); // Spatial partitioning grid
  const frameRef = useRef<number>(0);
  const pointsRef = useRef<Point[]>([]);
  const circlesRef = useRef<Circle[]>([]);
  const gradientsRef = useRef<CachedGradients | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create gradients and cache
    const createGradients = (width: number): CachedGradients => {
      const activeGradient = ctx.createLinearGradient(0, 0, width, 0);
      activeGradient.addColorStop(0, "#0092ff");
      activeGradient.addColorStop(0.5, "#00ffae");
      activeGradient.addColorStop(1, '#e5fe48');
      
      const inactiveGradient = ctx.createLinearGradient(0, 0, width, 0);
      inactiveGradient.addColorStop(0, "#204868");
      inactiveGradient.addColorStop(0.5, "#256456");
      inactiveGradient.addColorStop(1, '#5a643d');

      return { active: activeGradient, inactive: inactiveGradient };
    };

    // Batch draw circles helper
    const batchDrawCircles = (circles: Circle[], context: CanvasRenderingContext2D, gradient: CanvasGradient) => {
      if (!circles.length) return;
      context.beginPath();
      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        context.moveTo(circle.x + circle.r, circle.y + 1.5);
        context.arc(circle.x, circle.y + 1.5, circle.r, 0, 2 * Math.PI);
      }
      context.fillStyle = gradient;
      context.fill();
    };

    // Build spatial grid
    const buildGrid = (circles: Circle[]) => {
      const cols = Math.ceil(canvas.width / CELL_SIZE);
      const rows = Math.ceil(canvas.height / CELL_SIZE);
      const grid: GridCell[][] = Array.from({ length: cols }, () => 
        Array.from({ length: rows }, () => ({ circles: [] }))
      );

      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        const cellX = Math.floor(circle.x / CELL_SIZE);
        const cellY = Math.floor(circle.y / CELL_SIZE);
        if (grid[cellX]?.[cellY]) {
          grid[cellX][cellY].circles.push(circle);
        }
      }
      gridRef.current = grid;
    };

    // Initialize static cache
    const updateStaticCache = () => {
      const staticCanvas = document.createElement('canvas');
      staticCanvas.width = canvas.width;
      staticCanvas.height = canvas.height;
      const staticCtx = staticCanvas.getContext('2d');
      if (!staticCtx || !gradientsRef.current) return;

      batchDrawCircles(circlesRef.current, staticCtx, gradientsRef.current.inactive);
      staticCacheRef.current = staticCanvas;
    };

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gradientsRef.current = createGradients(canvas.width);
      
      // Reinitialize circles
      const circlesMargin = 15;
      const cols = Math.round(canvas.width / circlesMargin * 1.5);
      const rows = Math.round(canvas.height / circlesMargin * 1.5);
      circlesRef.current = Array.from({ length: cols * rows }, (_, i) => ({
        x: 13 + (circlesMargin * 0.8) * (i % cols),
        y: 10 + ((circlesMargin - 0.25) * 0.8) * Math.floor(i / cols),
        r: 0.5,
        animation: false
      }));

      buildGrid(circlesRef.current);
      updateStaticCache();
    };

    // Animation logic
    const animatePoints = () => {
      const duration = 2 * 1000 / 60;
      const lineWidthStart = 3.5;
      const grid = gridRef.current;
      const points = pointsRef.current;

      // Reset circles
      for (let i = 0; i < circlesRef.current.length; i++) {
        circlesRef.current[i].r = 0.5;
        circlesRef.current[i].animation = false;
      }

      for (let i = points.length - 1; i >= 0; i--) {
        const point = points[i];
        point.lifetime += 1;
        if (point.lifetime > duration) {
          points.splice(i, 1);
          continue;
        }

        const inc = point.lifetime / duration;
        const spreadRate = lineWidthStart * (1 - inc);
        const lastPoint = points[i - 1] || point;
        const midX = (lastPoint.x + point.x) / 2;
        const midY = (lastPoint.y + point.y) / 2;

        // Check influence for both point and midpoint
        const checkInfluence = (x: number, y: number) => {
          const cellX = Math.floor(x / CELL_SIZE);
          const cellY = Math.floor(y / CELL_SIZE);
          for (let cx = cellX - 1; cx <= cellX + 1; cx++) {
            for (let cy = cellY - 1; cy <= cellY + 1; cy++) {
              if (grid[cx]?.[cy]) {
                const cell = grid[cx][cy];
                for (let j = 0; j < cell.circles.length; j++) {
                  const circle = cell.circles[j];
                  const dx = circle.x - x;
                  const dy = circle.y - y;
                  if (dx * dx + dy * dy < 64 && spreadRate > circle.r) {
                    circle.r = spreadRate;
                    circle.animation = spreadRate >= 0.8;
                  }
                }
              }
            }
          }
        };

        checkInfluence(point.x, point.y);
        checkInfluence(midX, midY);
      }
    };

    // Drawing loop
    const drawDots = () => {
      if (!ctx || !staticCacheRef.current || !gradientsRef.current) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(staticCacheRef.current, 0, 0); // Draw static cache

      // Draw animated circles
      const animatedCircles = circlesRef.current.filter(c => c.animation);
      batchDrawCircles(animatedCircles, ctx, gradientsRef.current.active);

      animatePoints();
      requestAnimationFrame(drawDots);
    };

    // Pointer handler
    const handlePointerMove = (e: PointerEvent) => {
      if (frameRef.current % 2 === 0) { // Throttle to every other frame
        const rect = canvas.getBoundingClientRect();
        pointsRef.current.push({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          lifetime: 0
        });
      }
      frameRef.current = (frameRef.current + 1) % 2;
    };

    // Initial setup
    resizeCanvas();
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerMove);
    const raf = requestAnimationFrame(drawDots);

    return () => {
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerMove);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resizeCanvas);
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