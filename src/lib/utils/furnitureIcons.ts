/**
 * Architectural top-down furniture renderers for 2D canvas.
 * Each function draws within a normalized rect: (-w/2, -d/2) to (w/2, d/2)
 * where w = width*zoom, d = depth*zoom. Context is already translated & rotated.
 */

function getHeatColor(value: number) {
  switch (value) {
    case 1:
      return 'rgba(255, 220, 0, 0.25)'; // vàng nhạt
    case 2:
      return 'rgba(255, 140, 0, 0.4)';  // cam
    case 3:
      return 'rgba(255, 60, 0, 0.6)';   // đỏ
    default:
      return 'rgba(0,0,0,0)'; // transparent
  }
}

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, d: number, color: string, heatmapMatrix?: any, hasPerson?: boolean) => void;

// Helper: rounded rect
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

const drawSofa: DrawFn = (ctx, w, d, color) => {
  const armW = w * 0.12;
  const backD = d * 0.25;
  // Back
  roundRect(ctx, -w/2, -d/2, w, backD, 3);
  ctx.fill(); ctx.stroke();
  // Seat
  roundRect(ctx, -w/2 + armW, -d/2 + backD, w - armW*2, d - backD, 2);
  ctx.fillStyle = color + '40';
  ctx.fill(); ctx.stroke();
  // Arms
  ctx.fillStyle = color + '80';
  roundRect(ctx, -w/2, -d/2 + backD, armW, d - backD, 2);
  ctx.fill(); ctx.stroke();
  roundRect(ctx, w/2 - armW, -d/2 + backD, armW, d - backD, 2);
  ctx.fill(); ctx.stroke();
  // Cushion lines
  ctx.beginPath();
  const cushions = 3;
  for (let i = 1; i < cushions; i++) {
    const x = -w/2 + armW + (w - armW*2) * i / cushions;
    ctx.moveTo(x, -d/2 + backD + 2);
    ctx.lineTo(x, d/2 - 2);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;
  ctx.stroke();
};

const drawLoveseat: DrawFn = (ctx, w, d, color) => {
  // Same as sofa but 2 cushions
  const armW = w * 0.14;
  const backD = d * 0.25;
  roundRect(ctx, -w/2, -d/2, w, backD, 3);
  ctx.fill(); ctx.stroke();
  roundRect(ctx, -w/2 + armW, -d/2 + backD, w - armW*2, d - backD, 2);
  ctx.fillStyle = color + '40';
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = color + '80';
  roundRect(ctx, -w/2, -d/2 + backD, armW, d - backD, 2);
  ctx.fill(); ctx.stroke();
  roundRect(ctx, w/2 - armW, -d/2 + backD, armW, d - backD, 2);
  ctx.fill(); ctx.stroke();
  // One cushion line
  ctx.beginPath();
  ctx.moveTo(0, -d/2 + backD + 2);
  ctx.lineTo(0, d/2 - 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;
  ctx.stroke();
};

const drawChair: DrawFn = (ctx, w, d, color) => {
  const backD = d * 0.2;
  const armW = w * 0.15;
  // Back
  roundRect(ctx, -w/2, -d/2, w, backD, 3);
  ctx.fill(); ctx.stroke();
  // Seat
  roundRect(ctx, -w/2 + armW, -d/2 + backD, w - armW*2, d - backD, 2);
  ctx.fillStyle = color + '40';
  ctx.fill(); ctx.stroke();
  // Arms
  ctx.fillStyle = color + '80';
  roundRect(ctx, -w/2, -d/2 + backD, armW, d - backD - d*0.1, 2);
  ctx.fill(); ctx.stroke();
  roundRect(ctx, w/2 - armW, -d/2 + backD, armW, d - backD - d*0.1, 2);
  ctx.fill(); ctx.stroke();
};

const drawTable: DrawFn = (ctx, w, d) => {
  // Simple rectangle with slightly rounded corners
  roundRect(ctx, -w/2, -d/2, w, d, 3);
  ctx.fill(); ctx.stroke();
};

const drawBed: DrawFn = (ctx, w, d, color) => {
  // Mattress
  roundRect(ctx, -w/2, -d/2, w, d, 3);
  ctx.fill(); ctx.stroke();
  // Headboard (top)
  ctx.fillStyle = color;
  roundRect(ctx, -w/2, -d/2, w, d * 0.08, 2);
  ctx.fill(); ctx.stroke();
  // Pillows
  ctx.fillStyle = '#ffffff90';
  const pw = w * 0.38;
  const ph = d * 0.15;
  const py = -d/2 + d * 0.1;
  roundRect(ctx, -w/2 + w*0.06, py, pw, ph, 3);
  ctx.fill(); ctx.stroke();
  roundRect(ctx, w/2 - w*0.06 - pw, py, pw, ph, 3);
  ctx.fill(); ctx.stroke();
  // Blanket line
  ctx.beginPath();
  ctx.moveTo(-w/2 + 3, d * 0.05);
  ctx.lineTo(w/2 - 3, d * 0.05);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
};

const drawNightstand: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // Drawer line
  ctx.beginPath();
  ctx.moveTo(-w/2 + 3, 0);
  ctx.lineTo(w/2 - 3, 0);
  ctx.stroke();
  // Knob
  ctx.beginPath();
  ctx.arc(0, -d*0.25, Math.min(w, d) * 0.06, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, d*0.25, Math.min(w, d) * 0.06, 0, Math.PI * 2);
  ctx.stroke();
};

const drawDresser: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // Drawer lines
  const drawers = 4;
  for (let i = 1; i < drawers; i++) {
    const y = -d/2 + (d * i / drawers);
    ctx.beginPath();
    ctx.moveTo(-w/2 + 2, y);
    ctx.lineTo(w/2 - 2, y);
    ctx.stroke();
  }
  // Knobs
  for (let i = 0; i < drawers; i++) {
    const y = -d/2 + d * (i + 0.5) / drawers;
    ctx.beginPath();
    ctx.arc(0, y, Math.min(w, d) * 0.04, 0, Math.PI * 2);
    ctx.fill();
  }
};

const drawWardrobe: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // Center line (doors)
  ctx.beginPath();
  ctx.moveTo(0, -d/2 + 2);
  ctx.lineTo(0, d/2 - 2);
  ctx.stroke();
  // Knobs
  ctx.beginPath();
  ctx.arc(-3, 0, 2, 0, Math.PI * 2);
  ctx.arc(3, 0, 2, 0, Math.PI * 2);
  ctx.fill();
};

const drawToilet: DrawFn = (ctx, w, d, color) => {
  // Tank (back rectangle)
  const tankD = d * 0.3;
  roundRect(ctx, -w/2 + w*0.1, -d/2, w*0.8, tankD, 2);
  ctx.fill(); ctx.stroke();
  // Bowl (ellipse)
  ctx.beginPath();
  const bowlCy = -d/2 + tankD + (d - tankD) * 0.5;
  const bowlRx = w * 0.42;
  const bowlRy = (d - tankD) * 0.48;
  ctx.ellipse(0, bowlCy, bowlRx, bowlRy, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff90';
  ctx.fill(); ctx.stroke();
  // Seat opening
  ctx.beginPath();
  ctx.ellipse(0, bowlCy + bowlRy*0.05, bowlRx*0.7, bowlRy*0.7, 0, 0, Math.PI * 2);
  ctx.stroke();
};

const drawBathtub: DrawFn = (ctx, w, d, color) => {
  // Outer
  roundRect(ctx, -w/2, -d/2, w, d, 6);
  ctx.fill(); ctx.stroke();
  // Inner
  ctx.fillStyle = '#ffffff60';
  roundRect(ctx, -w/2 + 3, -d/2 + 3, w - 6, d - 6, 4);
  ctx.fill(); ctx.stroke();
  // Drain
  ctx.beginPath();
  ctx.arc(w*0.3, 0, 2, 0, Math.PI*2);
  ctx.fill(); ctx.stroke();
  // Faucet
  ctx.beginPath();
  ctx.arc(-w*0.35, 0, 3, 0, Math.PI*2);
  ctx.stroke();
};

const drawShower: DrawFn = (ctx, w, d) => {
  // Floor tray
  roundRect(ctx, -w/2, -d/2, w, d, 4);
  ctx.fill(); ctx.stroke();
  // Drain
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI*2);
  ctx.stroke();
  // Showerhead indicator (corner)
  ctx.beginPath();
  ctx.arc(-w/2 + 8, -d/2 + 8, 4, 0, Math.PI*2);
  ctx.stroke();
  // Water dots
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(-w/2 + 8 + (i+1)*3, -d/2 + 8 + (i+1)*3, 1, 0, Math.PI*2);
    ctx.fill();
  }
};

const drawSink: DrawFn = (ctx, w, d) => {
  // Counter
  roundRect(ctx, -w/2, -d/2, w, d, 3);
  ctx.fill(); ctx.stroke();
  // Basin (ellipse)
  ctx.beginPath();
  ctx.ellipse(0, d*0.05, w*0.35, d*0.35, 0, 0, Math.PI*2);
  ctx.fillStyle = '#ffffff80';
  ctx.fill(); ctx.stroke();
  // Faucet
  ctx.beginPath();
  ctx.arc(0, -d*0.3, 2, 0, Math.PI*2);
  ctx.fill();
};

const drawStove: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // 4 burners
  const positions = [[-1,-1],[1,-1],[-1,1],[1,1]];
  const br = Math.min(w, d) * 0.16;
  for (const [px, py] of positions) {
    ctx.beginPath();
    ctx.arc(px * w * 0.2, py * d * 0.2, br, 0, Math.PI*2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px * w * 0.2, py * d * 0.2, br * 0.5, 0, Math.PI*2);
    ctx.stroke();
  }
};

const drawFridge: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // Door line
  ctx.beginPath();
  ctx.moveTo(-w/2 + 2, -d*0.1);
  ctx.lineTo(w/2 - 2, -d*0.1);
  ctx.stroke();
  // Handle
  ctx.beginPath();
  ctx.moveTo(w*0.3, -d*0.35);
  ctx.lineTo(w*0.3, -d*0.15);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w*0.3, d*0.05);
  ctx.lineTo(w*0.3, d*0.35);
  ctx.stroke();
};

const drawCounter: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 1);
  ctx.fill(); ctx.stroke();
};

const drawDishwasher: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // Handle
  ctx.beginPath();
  ctx.moveTo(-w*0.25, -d*0.3);
  ctx.lineTo(w*0.25, -d*0.3);
  ctx.lineWidth = 1.5;
  ctx.stroke();
};

const drawDesk: DrawFn = (ctx, w, d) => {
  // Desktop
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // Keyboard area indication
  ctx.strokeStyle = ctx.strokeStyle + '60';
  roundRect(ctx, -w*0.25, -d*0.05, w*0.5, d*0.2, 1);
  ctx.stroke();
};

const drawOfficeChair: DrawFn = (ctx, w, d) => {
  // Base (circle)
  ctx.beginPath();
  ctx.arc(0, 0, Math.min(w, d) * 0.45, 0, Math.PI*2);
  ctx.fill(); ctx.stroke();
  // Backrest
  ctx.beginPath();
  ctx.arc(0, -d*0.25, w*0.3, Math.PI*1.2, Math.PI*1.8);
  ctx.lineWidth = 2;
  ctx.stroke();
};

const drawDiningTable: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 4);
  ctx.fill(); ctx.stroke();
};

const drawDiningChair: DrawFn = (ctx, w, d, color) => {
  // Seat
  roundRect(ctx, -w/2, -d/2 + d*0.2, w, d*0.8, 2);
  ctx.fillStyle = color + '40';
  ctx.fill(); ctx.stroke();
  // Back
  ctx.fillStyle = color + '80';
  roundRect(ctx, -w/2, -d/2, w, d*0.2, 2);
  ctx.fill(); ctx.stroke();
};

const drawBookshelf: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 1);
  ctx.fill(); ctx.stroke();
  // Shelf lines
  const shelves = 4;
  for (let i = 1; i < shelves; i++) {
    const x = -w/2 + w * i / shelves;
    ctx.beginPath();
    ctx.moveTo(x, -d/2 + 2);
    ctx.lineTo(x, d/2 - 2);
    ctx.stroke();
  }
};

const drawSideTable: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 3);
  ctx.fill(); ctx.stroke();
};

const drawTvStand: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // TV line at back
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-w*0.4, -d*0.35);
  ctx.lineTo(w*0.4, -d*0.35);
  ctx.stroke();
};

// Decor icons
const drawRug: DrawFn = (ctx, w, d, color) => {
  roundRect(ctx, -w/2, -d/2, w, d, 4);
  ctx.fill(); ctx.stroke();
  // Border pattern
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  roundRect(ctx, -w/2 + 4, -d/2 + 4, w - 8, d - 8, 3);
  ctx.stroke();
  // Inner pattern lines
  ctx.lineWidth = 0.5;
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(-w/2 + 8, -d/2 + d * i / 4);
    ctx.lineTo(w/2 - 8, -d/2 + d * i / 4);
    ctx.stroke();
  }
};

const drawRoundRug: DrawFn = (ctx, w, d, color) => {
  ctx.beginPath();
  ctx.ellipse(0, 0, w/2, d/2, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Inner ring
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(0, 0, w/2 - 6, d/2 - 6, 0, 0, Math.PI * 2);
  ctx.stroke();
};

const drawPlant: DrawFn = (ctx, w, d, color) => {
  // Pot (trapezoid)
  ctx.fillStyle = '#8B6914';
  ctx.beginPath();
  ctx.moveTo(-w*0.3, d*0.1);
  ctx.lineTo(w*0.3, d*0.1);
  ctx.lineTo(w*0.25, d*0.45);
  ctx.lineTo(-w*0.25, d*0.45);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  // Foliage circle
  ctx.fillStyle = color + '90';
  ctx.beginPath();
  ctx.arc(0, -d*0.1, Math.min(w, d) * 0.4, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
};

const drawCurtain: DrawFn = (ctx, w, d, color) => {
  roundRect(ctx, -w/2, -d/2, w, d, 1);
  ctx.fill(); ctx.stroke();
  // Vertical fold lines
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;
  for (let i = 1; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(-w/2 + w * i / 5, -d/2 + 2);
    ctx.lineTo(-w/2 + w * i / 5, d/2 - 2);
    ctx.stroke();
  }
};

const drawWallArt: DrawFn = (ctx, w, d, color) => {
  // Frame
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // Inner matting
  ctx.fillStyle = '#ffffff80';
  roundRect(ctx, -w/2 + 3, -d/2 + 3, w - 6, d - 6, 1);
  ctx.fill(); ctx.stroke();
  // Simple landscape indication
  ctx.fillStyle = color + '40';
  ctx.fillRect(-w/2 + 5, -d/2 + 5, w - 10, d - 10);
};

const drawMirror: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fillStyle = '#c0d8e880';
  ctx.fill(); ctx.stroke();
  // Reflection lines
  ctx.strokeStyle = '#ffffff60';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-w*0.2, -d*0.3);
  ctx.lineTo(-w*0.1, d*0.3);
  ctx.stroke();
};

const drawClock: DrawFn = (ctx, w, d) => {
  const r = Math.min(w, d) * 0.45;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Clock hands
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -r * 0.6);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(r * 0.4, 0);
  ctx.stroke();
};

// Lighting icons
const drawCeilingLight: DrawFn = (ctx, w, d) => {
  const r = Math.min(w, d) * 0.4;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Rays
  ctx.strokeStyle = '#f59e0b80';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r * 1.1, Math.sin(a) * r * 1.1);
    ctx.lineTo(Math.cos(a) * r * 1.5, Math.sin(a) * r * 1.5);
    ctx.stroke();
  }
};

const drawChandelier: DrawFn = (ctx, w, d) => {
  const r = Math.min(w, d) * 0.35;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Decorative arms with bulbs
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const ex = Math.cos(a) * r * 1.4;
    const ey = Math.sin(a) * r * 1.4;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r * 0.6, Math.sin(a) * r * 0.6);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ex, ey, 3, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  }
};

const drawFloorLamp: DrawFn = (ctx, w, d) => {
  // Base circle
  const r = Math.min(w, d) * 0.35;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Center pole
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = '#555';
  ctx.fill();
};

const drawTableLamp: DrawFn = (ctx, w, d) => {
  const r = Math.min(w, d) * 0.4;
  // Shade (circle)
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Base
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
  ctx.fillStyle = '#666';
  ctx.fill();
};

const drawWallSconce: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // Light indication
  ctx.beginPath();
  ctx.arc(0, 0, Math.min(w, d) * 0.25, 0, Math.PI * 2);
  ctx.fillStyle = '#fef08a80';
  ctx.fill();
};

const drawPendantLight: DrawFn = (ctx, w, d) => {
  const r = Math.min(w, d) * 0.4;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Inner glow
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = '#fef08a60';
  ctx.fill();
};

const drawRecessedLight: DrawFn = (ctx, w, d) => {
  const r = Math.min(w, d) * 0.45;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.6, 0, Math.PI * 2);
  ctx.strokeStyle = '#fef08a80';
  ctx.stroke();
};

const drawOven: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // Oven door window
  ctx.fillStyle = '#00000020';
  roundRect(ctx, -w*0.3, -d*0.2, w*0.6, d*0.5, 2);
  ctx.fill(); ctx.stroke();
  // Handle
  ctx.beginPath();
  ctx.moveTo(-w*0.25, -d*0.3);
  ctx.lineTo(w*0.25, -d*0.3);
  ctx.lineWidth = 1.5;
  ctx.stroke();
};

const drawWasherDryer: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // Drum circle
  ctx.beginPath();
  const r = Math.min(w, d) * 0.3;
  ctx.arc(0, d*0.05, r, 0, Math.PI*2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, d*0.05, r*0.6, 0, Math.PI*2);
  ctx.stroke();
  // Control panel area
  ctx.beginPath();
  ctx.moveTo(-w*0.4, -d*0.3);
  ctx.lineTo(w*0.4, -d*0.3);
  ctx.stroke();
};

const drawFireplace: DrawFn = (ctx, w, d, color) => {
  // Mantel/surround
  roundRect(ctx, -w/2, -d/2, w, d, 3);
  ctx.fill(); ctx.stroke();
  // Firebox opening
  ctx.fillStyle = '#1a1a1a40';
  roundRect(ctx, -w*0.35, -d*0.1, w*0.7, d*0.5, 2);
  ctx.fill(); ctx.stroke();
  // Flame hint
  ctx.fillStyle = '#f59e0b60';
  ctx.beginPath();
  ctx.moveTo(-w*0.1, d*0.3);
  ctx.quadraticCurveTo(0, -d*0.05, w*0.1, d*0.3);
  ctx.fill();
};

const drawTelevision: DrawFn = (ctx, w, d) => {
  // Thin rectangle (flat panel)
  roundRect(ctx, -w/2, -d/2, w, d, 1);
  ctx.fill(); ctx.stroke();
  // Screen
  ctx.fillStyle = '#00000030';
  roundRect(ctx, -w*0.45, -d*0.3, w*0.9, d*0.6, 1);
  ctx.fill();
  // Stand
  ctx.beginPath();
  ctx.moveTo(-w*0.15, d*0.4);
  ctx.lineTo(w*0.15, d*0.4);
  ctx.lineWidth = 2;
  ctx.stroke();
};

const drawStorage: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 2);
  ctx.fill(); ctx.stroke();
  // Two doors
  ctx.beginPath();
  ctx.moveTo(0, -d/2 + 2);
  ctx.lineTo(0, d/2 - 2);
  ctx.stroke();
  // Shelf line
  ctx.beginPath();
  ctx.moveTo(-w/2 + 2, 0);
  ctx.lineTo(w/2 - 2, 0);
  ctx.stroke();
  // Knobs
  ctx.beginPath();
  ctx.arc(-w*0.1, -d*0.25, 1.5, 0, Math.PI*2);
  ctx.arc(w*0.1, -d*0.25, 1.5, 0, Math.PI*2);
  ctx.fill();
};

const drawGenericTable: DrawFn = (ctx, w, d) => {
  roundRect(ctx, -w/2, -d/2, w, d, 3);
  ctx.fill(); ctx.stroke();
};

// ─── Electrical Symbols ─────────────────────────────────────────────────

const drawSymOutlet: DrawFn = (ctx, w, d, color) => {
  const r = Math.min(w, d) * 0.45;
  // Circle
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill(); ctx.stroke();
  // Two vertical slots
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-r * 0.3, -r * 0.35);
  ctx.lineTo(-r * 0.3, r * 0.35);
  ctx.moveTo(r * 0.3, -r * 0.35);
  ctx.lineTo(r * 0.3, r * 0.35);
  ctx.strokeStyle = color;
  ctx.stroke();
};

const drawSymSwitch: DrawFn = (ctx, w, d, color) => {
  const r = Math.min(w, d) * 0.45;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill(); ctx.stroke();
  // "S" text
  ctx.fillStyle = color;
  ctx.font = `bold ${r * 1.2}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('S', 0, 0);
};

const drawSymCeilingLight: DrawFn = (ctx, w, d, color) => {
  const r = Math.min(w, d) * 0.45;
  // Circle with X
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#fef9c3';
  ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-r * 0.7, -r * 0.7);
  ctx.lineTo(r * 0.7, r * 0.7);
  ctx.moveTo(r * 0.7, -r * 0.7);
  ctx.lineTo(-r * 0.7, r * 0.7);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
};

const drawSymRecessedLight: DrawFn = (ctx, w, d, color) => {
  const r = Math.min(w, d) * 0.45;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#fef9c3';
  ctx.fill(); ctx.stroke();
  // Dot in center
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.2, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};

const drawSymPendant: DrawFn = (ctx, w, d, color) => {
  const r = Math.min(w, d) * 0.45;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#fef9c3';
  ctx.fill(); ctx.stroke();
  // Pendant line + small circle
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.6);
  ctx.lineTo(0, 0);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, r * 0.2, r * 0.3, 0, Math.PI * 2);
  ctx.stroke();
};

const drawSymCeilingFan: DrawFn = (ctx, w, d, color) => {
  const r = Math.min(w, d) * 0.45;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill(); ctx.stroke();
  // 4 blades
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * r * 0.85, Math.sin(a) * r * 0.85);
    ctx.stroke();
  }
  // Center hub
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};

const drawSymJunction: DrawFn = (ctx, w, d, color) => {
  const s = Math.min(w, d) * 0.8;
  // Square box
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-s / 2, -s / 2, s, s);
  ctx.strokeRect(-s / 2, -s / 2, s, s);
  // "J" label
  ctx.fillStyle = color;
  ctx.font = `bold ${s * 0.6}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('J', 0, 0);
};

const drawSymSmoke: DrawFn = (ctx, w, d, color) => {
  const r = Math.min(w, d) * 0.45;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
  // "SD" text
  ctx.fillStyle = color;
  ctx.font = `bold ${r * 0.85}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SD', 0, 0);
};

// ─── Plumbing Symbols ───────────────────────────────────────────────────

const drawSymWaterSupply: DrawFn = (ctx, w, d, color) => {
  const r = Math.min(w, d) * 0.45;
  // Triangle pointing up (water supply)
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r * 0.87, r * 0.5);
  ctx.lineTo(-r * 0.87, r * 0.5);
  ctx.closePath();
  ctx.fillStyle = color + '40';
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
  // "W" label
  ctx.fillStyle = color;
  ctx.font = `bold ${r * 0.8}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('W', 0, r * 0.05);
};

const drawSymDrain: DrawFn = (ctx, w, d, color) => {
  const r = Math.min(w, d) * 0.45;
  // Circle with grid pattern (drain)
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
  // Cross-hatch
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-r * 0.7, 0);
  ctx.lineTo(r * 0.7, 0);
  ctx.moveTo(0, -r * 0.7);
  ctx.lineTo(0, r * 0.7);
  ctx.moveTo(-r * 0.5, -r * 0.5);
  ctx.lineTo(r * 0.5, r * 0.5);
  ctx.moveTo(r * 0.5, -r * 0.5);
  ctx.lineTo(-r * 0.5, r * 0.5);
  ctx.strokeStyle = color;
  ctx.stroke();
};

const drawSymWaterHeater: DrawFn = (ctx, w, d, color) => {
  const r = Math.min(w, d) * 0.45;
  // Circle
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
  // "WH" label
  ctx.fillStyle = color;
  ctx.font = `bold ${r * 0.75}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('WH', 0, 0);
};

const drawSymWasherHookup: DrawFn = (ctx, w, d, color) => {
  const r = Math.min(w, d) * 0.45;
  // Square with valve symbol
  const s = r * 1.4;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-s / 2, -s / 2, s, s);
  ctx.strokeStyle = color;
  ctx.strokeRect(-s / 2, -s / 2, s, s);
  // Two circles (hot/cold)
  ctx.beginPath();
  ctx.arc(-s * 0.2, 0, s * 0.15, 0, Math.PI * 2);
  ctx.strokeStyle = '#dc2626';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(s * 0.2, 0, s * 0.15, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.stroke();
};

const drawSymGasLine: DrawFn = (ctx, w, d, color) => {
  const r = Math.min(w, d) * 0.45;
  // Diamond shape
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r, 0);
  ctx.lineTo(0, r);
  ctx.lineTo(-r, 0);
  ctx.closePath();
  ctx.fillStyle = color + '30';
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
  // "G" label
  ctx.fillStyle = color;
  ctx.font = `bold ${r * 0.9}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('G', 0, 0);
};

// let personAnim = null;
let persons = [];
let personGlow = null;

let lastSpawnTime = 0;
const SPAWN_INTERVAL = 1000; // ms
const MAX_PERSONS = 20;

const drawCamera = (ctx, w, d, color, heatmapMatrix, hasPerson) => {
  const bodyRadius = 4;
  const lensR = Math.min(w, d) * 0.25;

  // =========================
  // 🔥 HEATMAP (HÌNH NÓN)
  // =========================
  const range = Math.max(w, d) * 6;   // tầm xa
  const fov = Math.PI / 2;            // 90 độ

  ctx.save();

  // 👉 nếu camera của bạn đã rotate từ ngoài thì KHÔNG cần rotate ở đây
  // ctx.rotate(angle);

  const gradient = ctx.createRadialGradient(
      0, 0, 0,
      0, 0, range
  );

  gradient.addColorStop(0, color + '66'); // gần đậm
  gradient.addColorStop(0.5, color + '33');
  gradient.addColorStop(1, color + '00'); // xa mờ

  ctx.fillStyle = gradient;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, range, -fov / 2, fov / 2);
  ctx.closePath();

  // 👉 blend cho đẹp
  ctx.globalCompositeOperation = 'lighter';

  ctx.fill();
  ctx.restore();

  // =========================
  // 🔥 HEATMAP FROM MATRIX
  // =========================

  if (heatmapMatrix) {
    const rows = heatmapMatrix.length;
    const cols = heatmapMatrix[0].length;

    const cellSize = Math.max(w, d) * 0.3; // scale heatmap

    ctx.save();

    // 👉 nếu camera có rotation từ ngoài thì nó sẽ apply luôn
    // nên heatmap sẽ quay theo camera

    // move origin ra trước camera (để heatmap nằm phía trước)
    ctx.translate(0, 0);

    // blend đẹp
    ctx.globalCompositeOperation = 'lighter';
    ctx.filter = 'blur(8px)';

    const paths = {
      1: new Path2D(),
      2: new Path2D(),
      3: new Path2D(),
      4: new Path2D()
    };

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const value = heatmapMatrix[y][x];
        if (value === 0) continue;

        const angle = (-fov / 2) + (x / (cols - 1)) * fov;
        const r = (y / rows) * range;

        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;

        paths[value].moveTo(px, py);
        paths[value].arc(px, py, cellSize * 0.4, 0, Math.PI * 2);
      }
    }

// 🎨 vẽ 1 lần / màu
    Object.keys(paths).forEach(v => {
      ctx.fillStyle = getHeatColor(Number(v));
      ctx.fill(paths[v]);
    });

    ctx.restore();
  }

  // =========================
// 🚨 PERSON DETECTED ALERT
// =========================
//   if (hasPerson) {
//     const now = Date.now();
//
//     const range = Math.max(w, d) * 6;
//     // const angle = 0;
//
//     // =========================
//     // 🎯 INIT OBJECT (SPAWN 1 LẦN)
//     // =========================
//     if (!personAnim) {
//       personAnim = {
//         startTime: now,
//         duration: 2000, // ms
//         direction: ['near-to-far', 'far-to-near'][Math.round(Math.random())], // hoặc 'near-to-far',
//
//         // 🎯 random góc trong cone
//         angle: (Math.random() - 0.5) * fov
//       };
//     }
//
//     const angle = personAnim.angle;
//
//     const { startTime, duration, direction } = personAnim;
//
//     let t = (now - startTime) / duration;
//
//     // =========================
//     // ❌ KHI CHẠM ĐÍCH → BIẾN MẤT
//     // =========================
//     if (t >= 1) {
//       personAnim = null;
//       return; // không vẽ nữa
//     }
//
//     // clamp
//     t = Math.max(0, Math.min(t, 1));
//
//     // =========================
//     // 🎯 TÍNH R
//     // =========================
//     let r;
//
//     if (direction === 'far-to-near') {
//       r = range * (0.9 - t * 0.8);
//     } else {
//       r = range * (0.1 + t * 0.8);
//     }
//
//     const x = Math.cos(angle) * r;
//     const y = Math.sin(angle) * r;
//
//     ctx.save();
//     ctx.translate(x, y);
//
//     // =========================
//     // 🎨 DRAW ICON
//     // =========================
//
//     ctx.globalCompositeOperation = 'lighter';
//
//     // scale theo khoảng cách
//     const scale = 0.5 + (1 - r / range);
//     ctx.scale(scale, scale);
//
//     // fade out khi gần hết
//     ctx.globalAlpha = 1 - t;
//
//     // glow
//     const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
//     glow.addColorStop(0, 'rgba(255,0,0,0.8)');
//     glow.addColorStop(1, 'rgba(255,0,0,0)');
//
//     ctx.fillStyle = glow;
//     ctx.beginPath();
//     ctx.arc(0, 0, 20, 0, Math.PI * 2);
//     ctx.fill();
//
//     // body
//     ctx.beginPath();
//     ctx.arc(0, 0, 6, 0, Math.PI * 2);
//     ctx.fillStyle = 'red';
//     ctx.fill();
//
//     ctx.restore();
//   } else {
//     // reset nếu không còn person
//     personAnim = null;
//   }

  if (true) {
    const now = Date.now();
    const range = Math.max(w, d) * 6;
    const fov = Math.PI / 2;

    // =========================
    // 🎯 SPAWN (random theo thời gian)
    // =========================
    if (persons.length < MAX_PERSONS &&
        now - lastSpawnTime > SPAWN_INTERVAL) { // tần suất spawn (tweak)
      lastSpawnTime = now;
      persons.push({
        startTime: now,
        duration: 2000 + Math.random() * 1000, // random speed
        direction: Math.random() > 0.5 ? 'far-to-near' : 'near-to-far',
        angle: (Math.random() - 0.5) * fov * 0.8 // tránh sát mép
      });
    }

    // =========================
    // 🔄 UPDATE + DRAW
    // =========================
    persons = persons.filter(p => {
      let t = (now - p.startTime) / p.duration;

      // ❌ nếu xong → remove
      if (t >= 1) return false;

      t = Math.max(0, Math.min(t, 1));

      // =========================
      // 🎯 POSITION
      // =========================
      let r;

      if (p.direction === 'far-to-near') {
        r = range * (0.9 - t * 0.8);
      } else {
        r = range * (0.1 + t * 0.8);
      }

      const x = Math.cos(p.angle) * r;
      const y = Math.sin(p.angle) * r;

      ctx.save();
      ctx.translate(x, y);

      // =========================
      // 🎨 DRAW
      // =========================

      ctx.globalCompositeOperation = 'lighter';

      // scale theo khoảng cách
      const scale = 0.5 + (1 - r / range);
      ctx.scale(scale, scale);

      // fade out khi gần hết
      ctx.globalAlpha = 1 - t;

      // glow
      // const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
      // glow.addColorStop(0, 'rgba(255,0,0,0.8)');
      // glow.addColorStop(1, 'rgba(255,0,0,0)');
      if (!personGlow) {
        personGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
        personGlow.addColorStop(0, 'rgba(255,0,0,0.8)');
        personGlow.addColorStop(1, 'rgba(255,0,0,0)');
      }

      ctx.fillStyle = personGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.fill();

      // body
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();

      ctx.restore();

      return true; // giữ lại object
    });

  } else {
    // reset nếu không detect
    persons = [];
  }

  // =========================
  // 📷 CAMERA BODY
  // =========================

  // Body
  ctx.fillStyle = color + '40';
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  roundRect(ctx, -w / 2, -d / 2, w, d, bodyRadius);
  ctx.fill();
  ctx.stroke();

  // Lens
  ctx.beginPath();
  ctx.arc(0, 0, lensR, 0, Math.PI * 2);
  ctx.fillStyle = color + '80';
  ctx.fill();
  ctx.stroke();

  // Inner lens
  ctx.beginPath();
  ctx.arc(0, 0, lensR * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  // Detail line
  ctx.beginPath();
  ctx.moveTo(-w / 2 + 4, d * 0.1);
  ctx.lineTo(w / 2 - 4, d * 0.1);
  ctx.strokeStyle = color + '80';
  ctx.lineWidth = 0.5;
  ctx.stroke();
};

/** Registry mapping catalogId → custom draw function */
const iconDrawers: Record<string, DrawFn> = {
  camera: drawCamera,
  sofa: drawSofa,
  loveseat: drawLoveseat,
  chair: drawChair,
  coffee_table: drawTable,
  tv_stand: drawTvStand,
  bookshelf: drawBookshelf,
  side_table: drawSideTable,
  bed_queen: drawBed,
  bed_twin: drawBed,
  nightstand: drawNightstand,
  dresser: drawDresser,
  wardrobe: drawWardrobe,
  stove: drawStove,
  fridge: drawFridge,
  sink_k: drawSink,
  counter: drawCounter,
  dishwasher: drawDishwasher,
  oven: drawOven,
  toilet: drawToilet,
  bathtub: drawBathtub,
  shower: drawShower,
  sink_b: drawSink,
  washer_dryer: drawWasherDryer,
  desk: drawDesk,
  office_chair: drawOfficeChair,
  dining_table: drawDiningTable,
  dining_chair: drawDiningChair,
  fireplace: drawFireplace,
  television: drawTelevision,
  storage: drawStorage,
  table: drawGenericTable,
  // Decor
  rug: drawRug,
  round_rug: drawRoundRug,
  runner_rug: drawRug,
  potted_plant: drawPlant,
  floor_plant: drawPlant,
  hanging_plant: drawPlant,
  curtain: drawCurtain,
  sheer_curtain: drawCurtain,
  wall_art: drawWallArt,
  mirror: drawMirror,
  clock: drawClock,
  // Lighting
  ceiling_light: drawCeilingLight,
  chandelier: drawChandelier,
  recessed_light: drawRecessedLight,
  floor_lamp: drawFloorLamp,
  table_lamp: drawTableLamp,
  wall_sconce: drawWallSconce,
  pendant_light: drawPendantLight,
  // Electrical symbols
  sym_outlet: drawSymOutlet,
  sym_switch: drawSymSwitch,
  sym_ceiling_light: drawSymCeilingLight,
  sym_recessed_light: drawSymRecessedLight,
  sym_pendant: drawSymPendant,
  sym_ceiling_fan: drawSymCeilingFan,
  sym_junction: drawSymJunction,
  sym_smoke: drawSymSmoke,
  // Plumbing symbols
  sym_water_supply: drawSymWaterSupply,
  sym_drain: drawSymDrain,
  sym_water_heater: drawSymWaterHeater,
  sym_washer_hookup: drawSymWasherHookup,
  sym_gas_line: drawSymGasLine,
};

/**
 * Draw an architectural top-down icon for the given furniture item.
 * Context should already be translated to center and rotated.
 * @param w - pixel width (catalogWidth * zoom)
 * @param d - pixel depth (catalogDepth * zoom)
 */
export function drawFurnitureIcon(
  ctx: CanvasRenderingContext2D,
  catalogId: string,
  w: number,
  d: number,
  color: string,
  strokeColor: string,
  heatmapMatrix?: any,
  hasPerson = false
) {
  ctx.fillStyle = color + '60';
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1;

  const drawer = iconDrawers[catalogId];
  if (drawer) {
    drawer(ctx, w, d, color, heatmapMatrix, hasPerson);
  } else {
    // Fallback: simple rect
    roundRect(ctx, -w/2, -d/2, w, d, 2);
    ctx.fill();
    ctx.stroke();
  }
}
