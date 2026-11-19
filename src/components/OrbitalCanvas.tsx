import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface OrbitalCanvasProps {
  className?: string;
}

export function OrbitalCanvas({ className = '' }: OrbitalCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 5.0;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Primary wireframe geodesic globe
    const sphereGeo = new THREE.IcosahedronGeometry(1.38, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const sphere = new THREE.Mesh(sphereGeo, wireframeMat);
    rootGroup.add(sphere);

    // 2. Electric Lime primary flight-path orbital ring
    const ringGeo = new THREE.TorusGeometry(1.88, 0.032, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc7f000,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.36;
    ring.rotation.y = Math.PI * 0.18;
    rootGroup.add(ring);

    // 3. Secondary obsidian meridian ring
    const ring2Geo = new THREE.TorusGeometry(2.14, 0.012, 10, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.38,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.28;
    ring2.rotation.y = Math.PI * 0.42;
    rootGroup.add(ring2);

    // 4. Floating geometric compass octahedron (layered 3D object)
    const compassGeo = new THREE.OctahedronGeometry(0.24, 0);
    const compassMat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      wireframe: false,
    });
    const compass = new THREE.Mesh(compassGeo, compassMat);
    compass.position.set(1.88, 0, 0);
    ring.add(compass);

    // 5. Secondary neon lime waypoint marker on outer ring
    const waypointGeo = new THREE.SphereGeometry(0.085, 16, 16);
    const waypointMat = new THREE.MeshBasicMaterial({ color: 0xc7f000 });
    const waypoint = new THREE.Mesh(waypointGeo, waypointMat);
    waypoint.position.set(-2.14, 0, 0);
    ring2.add(waypoint);

    let pointerX = 0;
    let pointerY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 0.55;
      pointerY = (e.clientY / window.innerHeight - 0.5) * 0.55;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    let rafId = 0;
    let clock = 0;
    const animate = () => {
      if (!prefersReducedMotion) {
        clock += 0.015;
        sphere.rotation.y += 0.0028;
        sphere.rotation.x = Math.sin(clock * 0.4) * 0.08;
        ring.rotation.z += 0.0045;
        ring2.rotation.z -= 0.0024;
        compass.rotation.y += 0.025;
        compass.rotation.x += 0.015;
        rootGroup.position.y = Math.sin(clock) * 0.08;
        rootGroup.rotation.y += (pointerX - rootGroup.rotation.y) * 0.05;
        rootGroup.rotation.x += (pointerY - rootGroup.rotation.x) * 0.05;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      sphereGeo.dispose();
      wireframeMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      compassGeo.dispose();
      compassMat.dispose();
      waypointGeo.dispose();
      waypointMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
