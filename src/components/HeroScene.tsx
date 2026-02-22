import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const Particles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const count = 400;
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const [positions, velocities, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel, orig];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const mx = mouseRef.current.x * viewport.width * 0.5;
    const my = mouseRef.current.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Base drift
      arr[idx] += velocities[idx];
      arr[idx + 1] += velocities[idx + 1];
      arr[idx + 2] += velocities[idx + 2];

      // Mouse repulsion
      const dx = arr[idx] - mx;
      const dy = arr[idx + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) {
        const force = (2 - dist) * 0.015;
        arr[idx] += dx * force;
        arr[idx + 1] += dy * force;
      }

      // Gentle return to origin
      arr[idx] += (originalPositions[idx] - arr[idx]) * 0.001;
      arr[idx + 1] += (originalPositions[idx + 1] - arr[idx + 1]) * 0.001;

      for (let j = 0; j < 3; j++) {
        if (Math.abs(arr[idx + j]) > 5) velocities[idx + j] *= -1;
      }
    }
    posAttr.needsUpdate = true;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#d4a843"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default HeroScene;
