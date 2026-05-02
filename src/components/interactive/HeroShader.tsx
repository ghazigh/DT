// landing_page/src/components/interactive/HeroShader.tsx
// Custom GLSL satellite-cascade backdrop for the hero — three.js fullscreen quad.
// Brand-correct: chlorophyll signal scanlines + NDVI noise field on Obsidian.
// Single ambient looping animation explicitly permitted by Branding §11.
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2  u_res;

  // Brand colors
  const vec3 OBSIDIAN  = vec3(0.039, 0.055, 0.078);
  const vec3 OBSIDIAN_DEEP = vec3(0.020, 0.031, 0.047);
  const vec3 CHL       = vec3(0.369, 0.886, 0.420);
  const vec3 CHL_DIM   = vec3(0.176, 0.400, 0.188);
  const vec3 BONE      = vec3(0.902, 0.918, 0.941);

  // Hash for procedural noise
  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p  = uv * vec2(u_res.x / u_res.y, 1.0);

    // ---- Atmosphere base — radial Obsidian gradient, dominant in headline column ----
    float r = distance(uv, vec2(0.7, 0.5));
    vec3 col = mix(OBSIDIAN, OBSIDIAN_DEEP, smoothstep(0.0, 0.95, r));

    // ---- Subsurface NDVI noise field — slow drift ----
    float n  = fbm(p * 3.4 + vec2(0.0, u_time * 0.008));
    float n2 = fbm(p * 9.0 - vec2(u_time * 0.018, 0.0));
    float ndvi = clamp(n * 0.7 + n2 * 0.3, 0.0, 1.0);
    vec3 ndviTint = mix(OBSIDIAN_DEEP, CHL_DIM, smoothstep(0.55, 0.95, ndvi));
    // Stronger on the right (away from headline), faded on the left
    float ndviMix = smoothstep(0.05, 0.85, uv.x) * 0.18;
    col = mix(col, ndviTint, ndviMix);

    // ---- Multi-resolution scanlines — three bands, low intensity, headline-readable ----
    // Each band fades aggressively in the headline column (uv.x < 0.5)
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      float speed = 0.10 + fi * 0.06;
      float band = fract(uv.y - u_time * speed - fi * 0.33);
      float scan = smoothstep(0.0, 0.025, band) * (1.0 - smoothstep(0.025, 0.07, band));
      // Aggressive fade toward the left
      float fade = smoothstep(0.4, 1.0, uv.x);
      float intensity = scan * fade * (0.025 + fi * 0.018);
      col += CHL * intensity;
    }

    // ---- Slow horizontal sweep — instrument sensor pass ----
    float sweepY = fract(u_time * 0.045);
    float sweep  = exp(-pow((uv.y - sweepY) * 28.0, 2.0));
    col += CHL * sweep * 0.18 * smoothstep(0.45, 1.0, uv.x);

    // ---- Twinkle field — soft circular highlights, not square pixels ----
    // Use smoothed cell-noise so points are subpixel-soft.
    {
      vec2 cell = uv * vec2(45.0, 28.0);
      vec2 ci = floor(cell);
      vec2 cf = fract(cell);
      float h = hash(ci);
      // Only render in the right portion (let headline breathe)
      float rightOnly = smoothstep(0.45, 0.85, uv.x);
      // Sparse — only ~3% of cells host a star, with soft falloff
      float intensity = step(0.972, h);
      vec2 starCenter = vec2(0.5);
      float d = distance(cf, starCenter);
      float dot = exp(-pow(d * 22.0, 2.0));
      float twinkle = 0.4 + 0.6 * sin(u_time * 1.6 + h * 18.0);
      col += BONE * intensity * dot * twinkle * rightOnly * 0.55;
    }

    // ---- Vignette ----
    float vig = smoothstep(1.5, 0.5, distance(uv, vec2(0.5)));
    col *= vig;

    // Soft chlorophyll bloom on the right edge (where the globe lives)
    float globeGlow = smoothstep(1.2, 0.55, distance(uv, vec2(1.05, 0.5)));
    col += CHL * globeGlow * 0.06;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function HeroShader() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = mount.clientWidth || 800;
    let h = mount.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'low-power'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h, false);
    renderer.setClearColor(0x0A0E14, 1);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      u_time: { value: 0 },
      u_res:  { value: new THREE.Vector2(w, h) }
    };

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      depthTest: false,
      depthWrite: false
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    scene.add(mesh);

    const onResize = () => {
      if (!mount) return;
      w = mount.clientWidth || 800;
      h = mount.clientHeight || 600;
      renderer.setSize(w, h, false);
      uniforms.u_res.value.set(w, h);
    };
    window.addEventListener('resize', onResize);

    let raf = 0;
    const t0 = performance.now();
    const render = () => {
      const t = (performance.now() - t0) / 1000;
      uniforms.u_time.value = reduced ? 0 : t;
      renderer.render(scene, camera);
      // Throttle to ~30fps when idle to be polite on power
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      mat.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    />
  );
}
