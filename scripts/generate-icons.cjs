#!/usr/bin/env node
// Generates PWA icons for The Note You Needed Today.
// Run once: node scripts/generate-icons.js
// Outputs to public/icons/ — commit the generated PNGs.
// No extra packages required; uses only Node.js built-ins.

const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Brand palette (hex approximations of brand OKLCH values)
// --background: oklch(0.97 0.018 80)  → warm parchment
// --foreground: oklch(0.28 0.03 55)   → dark warm ink
// ---------------------------------------------------------------------------
const PARCHMENT = [247, 241, 232]; // #f7f1e8
const INK       = [61,  43,  26];  // #3d2b1a
const SHADOW    = [220, 208, 190]; // subtle border/shadow tint

// ---------------------------------------------------------------------------
// Pure-Node.js minimal PNG encoder (RGB, no extra deps)
// ---------------------------------------------------------------------------
function crc32(buf) {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = t[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function mkChunk(type, data) {
  const tb  = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const ci  = Buffer.concat([tb, data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(ci));
  return Buffer.concat([len, tb, data, crc]);
}

function buildPNG(size, pixelFn) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // 8-bit
  ihdr[9] = 2; // RGB colour type

  const rows = [];
  for (let y = 0; y < size; y++) {
    rows.push(0); // filter byte: None
    for (let x = 0; x < size; x++) {
      const [r, g, b] = pixelFn(x, y, size);
      rows.push(r, g, b);
    }
  }

  const idat = zlib.deflateSync(Buffer.from(rows), { level: 6 });
  const sig  = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  return Buffer.concat([
    sig,
    mkChunk("IHDR", ihdr),
    mkChunk("IDAT", idat),
    mkChunk("IEND", Buffer.alloc(0)),
  ]);
}

// ---------------------------------------------------------------------------
// Icon pixel function
// Parchment background + a centred mathematical heart in dark ink.
// The heart uses the classical implicit curve:
//   (x² + y² − 1)³ − x²y³ ≤ 0
// scaled so it fills ~55% of the icon (safe zone for maskable).
// A subtle shadow ring gives it depth.
// ---------------------------------------------------------------------------
function iconPixel(px, py, size) {
  // Normalise to [-1, 1] with y-up
  const nx = (px / (size - 1)) * 2 - 1;
  const ny = -((py / (size - 1)) * 2 - 1); // flip: SVG y+ is down

  // Background with very faint border darkening
  const edgeDist = Math.min(px, py, size - 1 - px, size - 1 - py) / (size * 0.03);
  const edgeFactor = Math.min(1, edgeDist); // 0 at edges → 1 inside
  const bg = PARCHMENT.map((c, i) =>
    Math.round(c * edgeFactor + SHADOW[i] * (1 - edgeFactor))
  );

  // Heart scale — 0.55 leaves safe-zone padding for maskable
  const s = 0.55;
  const hx = nx / s;
  const hy = (ny - 0.08) / s; // shift centre slightly upward for visual balance

  const val = Math.pow(hx * hx + hy * hy - 1, 3) - hx * hx * Math.pow(hy, 3);

  if (val <= 0) {
    // Inside heart — soft anti-alias using distance gradient
    // For RGB-only PNG, approximate aa with a mid-tone transition pixel
    return INK;
  }

  // Simple 1-pixel anti-alias ring
  const aaVal = Math.pow(hx * hx + hy * hy - 1, 3) - hx * hx * Math.pow(hy, 3);
  const antiAliasDist = 0.04 / (s * s); // threshold in normalised units
  if (aaVal <= antiAliasDist) {
    const t = aaVal / antiAliasDist; // 0=ink, 1=bg
    return bg.map((c, i) => Math.round(INK[i] * (1 - t) + c * t));
  }

  return bg;
}

// ---------------------------------------------------------------------------
// Write files
// ---------------------------------------------------------------------------
const outDir = path.join(__dirname, "..", "public", "icons");
fs.mkdirSync(outDir, { recursive: true });

const sizes = [
  { name: "icon-192.png",        size: 192 },
  { name: "icon-512.png",        size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

for (const { name, size } of sizes) {
  const buf = buildPNG(size, iconPixel);
  const out = path.join(outDir, name);
  fs.writeFileSync(out, buf);
  console.log(`  ✓ ${name}  (${buf.length} bytes)`);
}

console.log("\nIcons written to public/icons/. Commit these files.");
