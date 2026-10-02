import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type TopologyMode = 'sphere' | 'manifold' | 'clusters';

interface DataNetwork3DProps {
  className?: string;
}

export const DataNetwork3D: React.FC<DataNetwork3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [topologyMode, setTopologyMode] = useState<TopologyMode>('sphere');
  const modeRef = useRef<TopologyMode>('sphere');

  useEffect(() => {
    modeRef.current = topologyMode;
  }, [topologyMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      const testCanvas = document.createElement('canvas');
      const gl =
        testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Clear any existing children before mounting canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 6.2);

    // Main root group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Generate 3 distinct target geometries for the 130 nodes
    const NODE_COUNT = 130;
    const sphereTargets: THREE.Vector3[] = [];
    const manifoldTargets: THREE.Vector3[] = [];
    const clusterTargets: THREE.Vector3[] = [];
    const currentPositions: THREE.Vector3[] = [];

    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < NODE_COUNT; i++) {
      // 1. Fibonacci Data Sphere + Inner Core
      const isInner = i % 5 === 0;
      const radius = isInner ? 1.15 : 2.05;
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
      const sx = radius * Math.sin(phi) * Math.cos(theta);
      const sy = radius * Math.sin(phi) * Math.sin(theta);
      const sz = radius * Math.cos(phi);
      sphereTargets.push(new THREE.Vector3(sx, sy, sz));
      currentPositions.push(new THREE.Vector3(sx, sy, sz));

      // 2. Regression Manifold (3D Predictive Surface Grid)
      const cols = 13;
      const rows = 10;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const mx = ((col / (cols - 1)) - 0.5) * 3.8;
      const mz = ((row / (rows - 1)) - 0.5) * 3.4;
      const my =
        Math.sin(mx * 1.15) * Math.cos(mz * 1.15) * 0.75 +
        Math.sin((mx + mz) * 0.8) * 0.25;
      manifoldTargets.push(new THREE.Vector3(mx, my, mz));

      // 3. 3-Class Latent Clusters (Positive / Neutral / Negative)
      const clusterIdx = i % 3;
      const centers = [
        new THREE.Vector3(-1.35, 0.75, 0.2),
        new THREE.Vector3(1.35, 0.55, -0.25),
        new THREE.Vector3(0.0, -1.25, 0.35),
      ];
      const cCenter = centers[clusterIdx];
      // Deterministic pseudo-random offset around cluster centroid
      const seed1 = Math.sin(i * 12.9898) * 43758.5453;
      const seed2 = Math.sin(i * 78.233) * 43758.5453;
      const seed3 = Math.sin(i * 39.425) * 43758.5453;
      const r1 = (seed1 - Math.floor(seed1) - 0.5) * 1.35;
      const r2 = (seed2 - Math.floor(seed2) - 0.5) * 1.35;
      const r3 = (seed3 - Math.floor(seed3) - 0.5) * 1.35;
      clusterTargets.push(
        new THREE.Vector3(cCenter.x + r1, cCenter.y + r2, cCenter.z + r3)
      );
    }

    // Create Node Points BufferGeometry
    const nodePositionsArray = new Float32Array(NODE_COUNT * 3);
    const nodeColorsArray = new Float32Array(NODE_COUNT * 3);

    const colorCyan = new THREE.Color('#38BDF8');
    const colorViolet = new THREE.Color('#8B5CF6');
    const colorWhite = new THREE.Color('#F8FAFC');

    for (let i = 0; i < NODE_COUNT; i++) {
      nodePositionsArray[i * 3] = currentPositions[i].x;
      nodePositionsArray[i * 3 + 1] = currentPositions[i].y;
      nodePositionsArray[i * 3 + 2] = currentPositions[i].z;

      const c = i % 4 === 0 ? colorWhite : i % 2 === 0 ? colorCyan : colorViolet;
      nodeColorsArray[i * 3] = c.r;
      nodeColorsArray[i * 3 + 1] = c.g;
      nodeColorsArray[i * 3 + 2] = c.b;
    }

    const nodesGeometry = new THREE.BufferGeometry();
    nodesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(nodePositionsArray, 3)
    );
    nodesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(nodeColorsArray, 3)
    );

    // Create crisp circular sprite texture on an offscreen canvas
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const sCtx = spriteCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.35, 'rgba(255,255,255,0.9)');
      grad.addColorStop(0.7, 'rgba(56,189,248,0.25)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 64, 64);
    }
    const pointTexture = new THREE.CanvasTexture(spriteCanvas);

    const nodesMaterial = new THREE.PointsMaterial({
      size: 0.14,
      map: pointTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const nodesPoints = new THREE.Points(nodesGeometry, nodesMaterial);
    networkGroup.add(nodesPoints);

    // Precompute neighbor pairs based on initial sphere adjacency
    const edgePairs: [number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const d = sphereTargets[i].distanceTo(sphereTargets[j]);
        if (d < 0.92 && edgePairs.length < 260) {
          edgePairs.push([i, j]);
        }
      }
    }

    const linePositions = new Float32Array(edgePairs.length * 6);
    const lineColors = new Float32Array(edgePairs.length * 6);

    for (let e = 0; e < edgePairs.length; e++) {
      const [a, b] = edgePairs[e];
      const cA = a % 2 === 0 ? colorCyan : colorViolet;
      const cB = b % 2 === 0 ? colorCyan : colorViolet;
      lineColors[e * 6] = cA.r;
      lineColors[e * 6 + 1] = cA.g;
      lineColors[e * 6 + 2] = cA.b;
      lineColors[e * 6 + 3] = cB.r;
      lineColors[e * 6 + 4] = cB.g;
      lineColors[e * 6 + 5] = cB.b;
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3)
    );
    linesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    networkGroup.add(linesMesh);

    // Signal packets traveling along edges
    const PACKET_COUNT = 24;
    const packetPositions = new Float32Array(PACKET_COUNT * 3);
    const packetData = Array.from({ length: PACKET_COUNT }, (_, idx) => ({
      edgeIndex: (idx * 11) % Math.max(1, edgePairs.length),
      t: (idx / PACKET_COUNT) % 1,
      speed: 0.004 + (idx % 5) * 0.0012,
    }));

    const packetGeometry = new THREE.BufferGeometry();
    packetGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(packetPositions, 3)
    );
    const packetMaterial = new THREE.PointsMaterial({
      size: 0.19,
      map: pointTexture,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const packetPoints = new THREE.Points(packetGeometry, packetMaterial);
    networkGroup.add(packetPoints);

    // Subtle Coordinate Grid Rings
    const ringGroup = new THREE.Group();
    const ringGeo1 = new THREE.RingGeometry(2.38, 2.4, 72);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.3;
    ringGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(2.58, 2.595, 72);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.1,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = Math.PI / 5;
    ringGroup.add(ring2);

    networkGroup.add(ringGroup);

    // Subtle ambient outer dust particles
    const DUST_COUNT = 75;
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const r = 2.6 + (i % 7) * 0.15;
      const a = i * 1.7;
      const b = i * 0.9;
      dustPositions[i * 3] = r * Math.sin(a) * Math.cos(b);
      dustPositions[i * 3 + 1] = r * Math.sin(a) * Math.sin(b);
      dustPositions[i * 3 + 2] = r * Math.cos(a);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.35,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    networkGroup.add(dustPoints);

    // Mouse interaction state
    const mouseTarget = { x: 0, y: 0 };
    const mouseCurrent = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseTarget.x = Math.max(-1, Math.min(1, nx));
      mouseTarget.y = Math.max(-1, Math.min(1, ny));
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Pause animation when not visible in viewport
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Handle WebGL Context Lost / Restored gracefully
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setWebglSupported(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 480;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let frameId = 0;
    let clock = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      clock += prefersReducedMotion ? 0.001 : 0.006;

      // Smoothly interpolate node positions toward active topology mode
      const activeTargets =
        modeRef.current === 'manifold'
          ? manifoldTargets
          : modeRef.current === 'clusters'
          ? clusterTargets
          : sphereTargets;

      const posAttr = nodesGeometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < NODE_COUNT; i++) {
        currentPositions[i].lerp(activeTargets[i], 0.06);
        const subtleWave = prefersReducedMotion
          ? 0
          : Math.sin(clock * 2.2 + i * 0.35) * 0.022;
        posAttr.setXYZ(
          i,
          currentPositions[i].x,
          currentPositions[i].y + subtleWave,
          currentPositions[i].z
        );
      }
      posAttr.needsUpdate = true;

      // Update connecting edges
      const linePosAttr = linesGeometry.getAttribute(
        'position'
      ) as THREE.BufferAttribute;
      for (let e = 0; e < edgePairs.length; e++) {
        const [a, b] = edgePairs[e];
        const pA = currentPositions[a];
        const pB = currentPositions[b];
        linePosAttr.setXYZ(e * 2, pA.x, pA.y, pA.z);
        linePosAttr.setXYZ(e * 2 + 1, pB.x, pB.y, pB.z);
      }
      linePosAttr.needsUpdate = true;

      // Update flowing signal packets
      const pktPosAttr = packetGeometry.getAttribute(
        'position'
      ) as THREE.BufferAttribute;
      for (let p = 0; p < PACKET_COUNT; p++) {
        const pkt = packetData[p];
        if (!prefersReducedMotion) {
          pkt.t += pkt.speed;
          if (pkt.t > 1) {
            pkt.t = 0;
            pkt.edgeIndex = (pkt.edgeIndex + 7) % Math.max(1, edgePairs.length);
          }
        }
        const [a, b] = edgePairs[pkt.edgeIndex] || [0, 1];
        const pA = currentPositions[a];
        const pB = currentPositions[b];
        pktPosAttr.setXYZ(
          p,
          pA.x + (pB.x - pA.x) * pkt.t,
          pA.y + (pB.y - pA.y) * pkt.t,
          pA.z + (pB.z - pA.z) * pkt.t
        );
      }
      pktPosAttr.needsUpdate = true;

      // Smoothly damp mouse rotation
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;

      networkGroup.rotation.y = clock * 0.45 + mouseCurrent.x * 0.38;
      networkGroup.rotation.x = mouseCurrent.y * 0.25 + 0.15;

      ring1.rotation.z = -clock * 0.3;
      ring2.rotation.z = clock * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener(
        'webglcontextlost',
        handleContextLost
      );
      nodesGeometry.dispose();
      nodesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      packetGeometry.dispose();
      packetMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      pointTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`relative w-full h-[360px] sm:h-[430px] lg:h-[490px] rounded-2xl bg-[#101522]/65 border border-white/[0.07] overflow-hidden select-none ${className}`}
      aria-label="Interactive 3D Data Science and Machine Learning topology visualization"
    >
      {/* Subtle radial ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.11) 0%, rgba(139, 92, 246, 0.07) 42%, rgba(8, 11, 18, 0) 75%)',
        }}
      />

      {webglSupported ? (
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        /* Graceful 2D Analytical Network Fallback if WebGL is unavailable */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <svg
            viewBox="0 0 320 240"
            className="w-64 h-48 mb-3"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="fallbackGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <circle
              cx="160"
              cy="120"
              r="85"
              fill="none"
              stroke="url(#fallbackGrad)"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            <circle
              cx="160"
              cy="120"
              r="52"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1"
              opacity="0.25"
            />
            <g stroke="url(#fallbackGrad)" strokeWidth="1.2" opacity="0.55">
              <line x1="160" y1="45" x2="225" y2="90" />
              <line x1="225" y1="90" x2="205" y2="175" />
              <line x1="205" y1="175" x2="115" y2="175" />
              <line x1="115" y1="175" x2="95" y2="90" />
              <line x1="95" y1="90" x2="160" y2="45" />
              <line x1="160" y1="120" x2="160" y2="45" />
              <line x1="160" y1="120" x2="225" y2="90" />
              <line x1="160" y1="120" x2="205" y2="175" />
              <line x1="160" y1="120" x2="115" y2="175" />
              <line x1="160" y1="120" x2="95" y2="90" />
            </g>
            <g fill="#38BDF8">
              <circle cx="160" cy="120" r="5" fill="#F8FAFC" />
              <circle cx="160" cy="45" r="4" />
              <circle cx="225" cy="90" r="4" fill="#8B5CF6" />
              <circle cx="205" cy="175" r="4" />
              <circle cx="115" cy="175" r="4" fill="#8B5CF6" />
              <circle cx="95" cy="90" r="4" />
            </g>
          </svg>
          <p className="text-xs font-mono text-[#94A3B8]">
            Analytical Graph Representation · Python · ML · NLP
          </p>
        </div>
      )}

      {/* Subtle Floating HUD Overlay: Interactive Topology Selector */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#080B12]/75 backdrop-blur-md border border-white/[0.08] z-10">
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#38BDF8]" />
          <span className="font-mono text-[11px] text-[#F8FAFC] whitespace-nowrap">
            {topologyMode === 'sphere'
              ? 'Data Network Graph'
              : topologyMode === 'manifold'
              ? 'Regression Manifold (R²: 82%)'
              : 'NLP Cluster Space (Acc: 86%)'}
          </span>
        </div>

        <div
          className="flex items-center gap-1 bg-[#101522] p-0.5 rounded-lg border border-white/[0.06]"
          role="group"
          aria-label="Select 3D data representation mode"
        >
          {(
            [
              { id: 'sphere', label: 'Network' },
              { id: 'manifold', label: 'Regression' },
              { id: 'clusters', label: 'Clusters' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTopologyMode(item.id)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#38BDF8] ${
                topologyMode === item.id
                  ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
