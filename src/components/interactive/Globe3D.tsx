// landing_page/src/components/interactive/Globe3D.tsx
// Sat Lab globe — Obsidian canvas, dense Chlorophyll signal points,
// multiple animated arcs + a low-orbit data-mote shower.
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const OBSIDIAN   = 0x0A0E14;
const SLATE      = 0x1A2233;
const STEEL      = 0x3F4859;
const BONE       = 0xE6EAF0;
const CHL        = 0x5EE26B;
const CHL_DEEP   = 0x46993F;
const CHL_DIM    = 0x2D6630;

export default function Globe3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(OBSIDIAN, 9, 24);

    let w = mount.clientWidth || 800;
    let h = mount.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.DirectionalLight(CHL, 1.1);
    keyLight.position.set(-3, 2, 4);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(BONE, 0.4);
    rimLight.position.set(3, -1, -2);
    scene.add(rimLight);

    // --- Earth core ---
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);
    const R = 2;

    // Inner sphere — slate, slightly more luminous so dots read well
    const innerGeo = new THREE.SphereGeometry(R * 0.99, 64, 64);
    const innerMat = new THREE.MeshPhongMaterial({
      color: SLATE,
      shininess: 14,
      specular: 0x335577,
      emissive: 0x0d1622,
      emissiveIntensity: 0.5,
      transparent: false,
      opacity: 1
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    earthGroup.add(inner);

    // ---------- Surface dots — chlorophyll point cloud ----------
    // Two layers: bright "continents" (high density) + dim background graticule dots.
    const dotPositions: number[] = [];
    const dotPhases: number[] = [];     // for per-point twinkle
    const N = 5500;
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(-1 + (2 * i) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;
      const mask =
        Math.sin(phi * 3) * Math.cos(theta * 2) +
        Math.sin(theta * 3 + phi) * 0.5 +
        Math.sin(phi * 7 + 1.2) * 0.3;
      // Drop the threshold a lot so far more points draw — but keep a "continent" mask shape
      if (mask < -0.35) continue;
      const x = R * Math.cos(theta) * Math.sin(phi);
      const y = R * Math.sin(theta) * Math.sin(phi);
      const z = R * Math.cos(phi);
      dotPositions.push(x, y, z);
      dotPhases.push(Math.random() * Math.PI * 2);
    }
    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    const dotsMaterial = new THREE.PointsMaterial({
      color: CHL,
      size: 0.026,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: true
    });
    const dots = new THREE.Points(dotsGeo, dotsMaterial);
    earthGroup.add(dots);

    // Secondary dimmer background layer — fills the "ocean" with very faint chlorophyll
    const oceanPositions: number[] = [];
    const Nocean = 3000;
    for (let i = 0; i < Nocean; i++) {
      const phi = Math.acos(-1 + (2 * i) / Nocean);
      const theta = Math.sqrt(Nocean * Math.PI) * phi;
      const x = R * Math.cos(theta) * Math.sin(phi);
      const y = R * Math.sin(theta) * Math.sin(phi);
      const z = R * Math.cos(phi);
      oceanPositions.push(x, y, z);
    }
    const oceanGeo = new THREE.BufferGeometry();
    oceanGeo.setAttribute('position', new THREE.Float32BufferAttribute(oceanPositions, 3));
    const oceanMat = new THREE.PointsMaterial({
      color: CHL_DIM,
      size: 0.014,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      sizeAttenuation: true
    });
    const oceanDots = new THREE.Points(oceanGeo, oceanMat);
    earthGroup.add(oceanDots);

    // ---------- Atmosphere halo ----------
    const haloGeo = new THREE.SphereGeometry(R * 1.13, 48, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: CHL,
      transparent: true,
      opacity: 0.10,
      side: THREE.BackSide
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    earthGroup.add(halo);

    // ---------- Equator pulse ring ----------
    const eqGeo = new THREE.RingGeometry(R * 1.025, R * 1.04, 96);
    const eqMat = new THREE.MeshBasicMaterial({
      color: CHL,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const equator = new THREE.Mesh(eqGeo, eqMat);
    equator.rotation.x = Math.PI / 2;
    earthGroup.add(equator);

    // ---------- Orbit rings ----------
    const ringGroup = new THREE.Group();
    earthGroup.add(ringGroup);

    function makeOrbit(radius: number, tilt: number, colour: number, opacity = 0.22) {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.97, 0, Math.PI * 2, false, 0);
      const points = curve.getPoints(128).map((p) => new THREE.Vector3(p.x, 0, p.y));
      const g = new THREE.BufferGeometry().setFromPoints(points);
      const m = new THREE.LineBasicMaterial({ color: colour, transparent: true, opacity });
      const line = new THREE.LineLoop(g, m);
      line.rotation.x = tilt;
      return line;
    }

    ringGroup.add(makeOrbit(R * 1.32, Math.PI * 0.10, STEEL,    0.55));
    ringGroup.add(makeOrbit(R * 1.50, Math.PI * 0.35, STEEL,    0.40));
    ringGroup.add(makeOrbit(R * 1.72, Math.PI * -0.20, CHL,     0.65));
    ringGroup.add(makeOrbit(R * 1.95, Math.PI * 0.55, CHL_DEEP, 0.45));

    // ---------- Satellites (icosahedrons + glow sprites) ----------
    type Sat = { mesh: THREE.Mesh; radius: number; speed: number; phase: number; tilt: number };
    const sats: Sat[] = [];

    function makeGlowTexture(hex: number) {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      const colour = new THREE.Color(hex);
      const r = Math.round(colour.r * 255);
      const g = Math.round(colour.g * 255);
      const b = Math.round(colour.b * 255);
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0,   `rgba(${r},${g},${b},1)`);
      grad.addColorStop(0.4, `rgba(${r},${g},${b},0.35)`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    function makeSat(colour: number, radius: number, speed: number, phase: number, tilt: number, size = 0.05) {
      const g = new THREE.IcosahedronGeometry(size, 1);
      const m = new THREE.MeshBasicMaterial({ color: colour });
      const mesh = new THREE.Mesh(g, m);
      const spriteMat = new THREE.SpriteMaterial({
        map: makeGlowTexture(colour),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.55, 0.55, 1);
      mesh.add(sprite);
      scene.add(mesh);
      sats.push({ mesh, radius, speed, phase, tilt });
    }

    makeSat(BONE,     R * 1.32, 0.22, 0,           Math.PI * 0.10);
    makeSat(BONE,     R * 1.50, 0.14, Math.PI,     Math.PI * 0.35);
    makeSat(CHL,      R * 1.72, 0.12, Math.PI / 2, Math.PI * -0.20, 0.06);
    makeSat(CHL,      R * 1.72, 0.12, Math.PI * 1.2, Math.PI * -0.20, 0.045);
    makeSat(CHL_DEEP, R * 1.95, 0.07, Math.PI * 0.6, Math.PI * 0.55, 0.045);

    // ---------- Data-mote orbital shower (the headline "more green moving") ----------
    // ~600 chlorophyll motes in many tilted circular orbits at varied radii.
    type Mote = { speed: number; phase: number; tilt: THREE.Vector3; radius: number };
    const MOTE_COUNT = 700;
    const motePositions = new Float32Array(MOTE_COUNT * 3);
    const motes: Mote[] = [];
    for (let i = 0; i < MOTE_COUNT; i++) {
      const radius = R * (1.04 + Math.random() * 0.55);   // close orbit shell
      const tilt = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();
      const speed = (0.012 + Math.random() * 0.045) * (Math.random() < 0.5 ? 1 : -1);
      const phase = Math.random() * Math.PI * 2;
      motes.push({ radius, tilt, speed, phase });
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
    const moteMat = new THREE.PointsMaterial({
      color: CHL,
      size: 0.028,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });
    const moteCloud = new THREE.Points(moteGeo, moteMat);
    earthGroup.add(moteCloud);

    // Pre-compute each mote's basis (perpendicular to its tilt axis)
    const moteBasis: Array<{ u: THREE.Vector3; v: THREE.Vector3 }> = motes.map((m) => {
      // u = arbitrary vector perpendicular to tilt
      const arbitrary = Math.abs(m.tilt.x) > 0.5 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
      const u = new THREE.Vector3().crossVectors(m.tilt, arbitrary).normalize();
      const v = new THREE.Vector3().crossVectors(m.tilt, u).normalize();
      return { u, v };
    });

    // ---------- Great-circle data flow arcs ----------
    type Arc = { line: THREE.Line; length: number; offset: number; speed: number };
    const arcs: Arc[] = [];

    function latLonToVec3(lat: number, lon: number, r: number) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    }

    function makeArc(from: THREE.Vector3, to: THREE.Vector3, colour: number, altitude = 0.45): Arc {
      const mid = from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(R + altitude);
      const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
      const pts = curve.getPoints(72);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: colour, transparent: true, opacity: 0.7 });
      const line = new THREE.Line(geo, mat);
      geo.setDrawRange(0, 0);
      earthGroup.add(line);
      return { line, length: pts.length, offset: Math.random() * pts.length, speed: 0.22 + Math.random() * 0.28 };
    }

    const nodes: Array<[number, number]> = [
      [46.85, -71.12],  // Quebec
      [40.71, -74.00],  // NY
      [51.50,   0.00],  // London
      [35.68, 139.69],  // Tokyo
      [-23.55, -46.63], // Sao Paulo
      [-33.87, 151.21], // Sydney
      [55.75,  37.62],  // Moscow
      [1.35,  103.82],  // Singapore
      [37.77, -122.42], // SF
      [28.61,  77.21],  // Delhi
      [25.20,  55.27],  // Dubai
      [-34.60, -58.38]  // Buenos Aires
    ];
    const arcColors = [CHL, CHL_DEEP, BONE, CHL, CHL, CHL_DEEP];
    for (let i = 0; i < 14; i++) {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      let b = nodes[Math.floor(Math.random() * nodes.length)];
      if (b === a) b = nodes[(nodes.indexOf(a) + 1) % nodes.length];
      const from = latLonToVec3(a[0], a[1], R);
      const to = latLonToVec3(b[0], b[1], R);
      arcs.push(makeArc(from, to, arcColors[i % arcColors.length], 0.35 + Math.random() * 0.4));
    }

    // ---------- Ground pulse markers on every node ----------
    const pulses: { mesh: THREE.Mesh; phase: number }[] = [];
    nodes.forEach(([lat, lon]) => {
      const pos = latLonToVec3(lat, lon, R * 1.005);
      const g = new THREE.RingGeometry(0.018, 0.026, 18);
      const m = new THREE.MeshBasicMaterial({
        color: CHL,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.copy(pos);
      mesh.lookAt(0, 0, 0);
      earthGroup.add(mesh);
      pulses.push({ mesh, phase: Math.random() * Math.PI * 2 });
    });

    // ---------- Mouse parallax ----------
    let targetRotY = 0;
    let targetRotX = 0;
    const onMouseMove = (e: MouseEvent) => {
      if (!mount) return;
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotY = nx * 0.35;
      targetRotX = -ny * 0.2;
    };
    window.addEventListener('mousemove', onMouseMove);

    function resize() {
      if (!mount) return;
      w = mount.clientWidth || 800;
      h = mount.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', resize);

    earthGroup.rotation.x = 0.25;

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      if (!prefersReduced) elapsed += dt;
      const t = elapsed;

      if (!prefersReduced) earthGroup.rotation.y += dt * 0.03;
      camera.position.x += (targetRotY * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (0.5 + targetRotX * 1.0 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // Subtle global twinkle on surface dots
      dotsMaterial.opacity = 0.78 + 0.18 * Math.sin(t * 0.45);

      // Equator opacity pulse
      eqMat.opacity = 0.20 + 0.18 * Math.sin(t * 0.35);

      // Satellites along orbits
      for (const s of sats) {
        const a = s.phase + t * s.speed;
        const x = Math.cos(a) * s.radius;
        const z = Math.sin(a) * s.radius;
        s.mesh.position.set(x, 0, z);
        s.mesh.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), s.tilt);
      }

      // Data-mote shower — circle each mote in its own tilted plane
      const positions = moteCloud.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        const basis = moteBasis[i];
        const angle = m.phase + t * m.speed;
        const ca = Math.cos(angle);
        const sa = Math.sin(angle);
        const idx = i * 3;
        positions[idx]     = (basis.u.x * ca + basis.v.x * sa) * m.radius;
        positions[idx + 1] = (basis.u.y * ca + basis.v.y * sa) * m.radius;
        positions[idx + 2] = (basis.u.z * ca + basis.v.z * sa) * m.radius;
      }
      moteCloud.geometry.attributes.position.needsUpdate = true;

      // Arc draws — sweeping lasers
      for (const a of arcs) {
        a.offset = (a.offset + a.speed) % (a.length * 2);
        const draw = Math.min(a.offset, a.length);
        const geom = a.line.geometry as THREE.BufferGeometry;
        geom.setDrawRange(0, Math.floor(draw));
        (a.line.material as THREE.LineBasicMaterial).opacity =
          0.2 + 0.7 * (1 - Math.abs((a.offset - a.length) / a.length));
      }

      // Pulse rings on node markers
      for (const p of pulses) {
        const k = 1 + Math.sin(t * 0.9 + p.phase) * 0.6;
        p.mesh.scale.setScalar(k);
        (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0.9 - 0.7 * (k - 1);
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      if (mount && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if ((obj as any).geometry) (obj as any).geometry.dispose?.();
        if ((obj as any).material) {
          const m = (obj as any).material;
          if (Array.isArray(m)) m.forEach((mm) => mm.dispose?.());
          else m.dispose?.();
        }
      });
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
