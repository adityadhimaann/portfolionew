"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// Initialize RectAreaLight uniforms once
if (typeof window !== "undefined") {
  RectAreaLightUniformsLib.init();
}

/* ------------------------------------------------------------------ */
/*  Ocean surface – a subdivided plane displaced by layered sin waves */
/* ------------------------------------------------------------------ */
interface OceanProps {
  color?: number;
  speed?: number;
}

function Ocean({ color = 0x0a0a2e, speed = 1 }: OceanProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.PlaneGeometry>(null);

  // Store original positions
  const origPositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 60, 64, 64);
    return new Float32Array(geo.attributes.position.array);
  }, []);

  useFrame(({ clock }) => {
    if (!geoRef.current) return;
    const pos = geoRef.current.attributes.position;
    const t = clock.getElapsedTime() * speed;

    for (let i = 0; i < pos.count; i++) {
      const ox = origPositions[i * 3];
      const oy = origPositions[i * 3 + 1];

      const wave1 = Math.sin(ox * 0.3 + t * 0.6) * 0.4;
      const wave2 = Math.sin(oy * 0.2 + t * 0.4) * 0.35;
      const wave3 = Math.cos((ox + oy) * 0.15 + t * 0.5) * 0.25;
      const wave4 = Math.sin(ox * 0.5 - oy * 0.3 + t * 0.7) * 0.15;

      pos.setZ(i, wave1 + wave2 + wave3 + wave4);
    }
    pos.needsUpdate = true;
    geoRef.current.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry ref={geoRef} args={[60, 60, 64, 64]} />
      <meshStandardMaterial
        color={color}
        metalness={0.2}
        roughness={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating "boat" boxes lit by RectAreaLights                       */
/* ------------------------------------------------------------------ */
interface BoatData {
  x: number;
  z: number;
  scale: number;
  speedMul: number;
  phase: number;
  color: THREE.Color;
}

interface BoatProps {
  data: BoatData;
  accentColor: number;
  speed: number;
}

function Boat({ data, accentColor, speed }: BoatProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.RectAreaLight>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * speed * data.speedMul;

    // Bob up and down
    groupRef.current.position.y =
      Math.sin(t * 0.8 + data.phase) * 0.35 +
      Math.cos(t * 0.5 + data.phase * 1.3) * 0.2 -
      0.8;

    // Gentle rocking
    groupRef.current.rotation.z = Math.sin(t * 0.6 + data.phase) * 0.08;
    groupRef.current.rotation.x = Math.cos(t * 0.4 + data.phase) * 0.06;
  });

  const accent = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  return (
    <group ref={groupRef} position={[data.x, -0.8, data.z]}>
      {/* Box body */}
      <mesh scale={[data.scale, data.scale * 0.4, data.scale]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={data.color}
          metalness={0.3}
          roughness={0.5}
          emissive={accent}
          emissiveIntensity={0.05}
        />
      </mesh>
      {/* RectAreaLight on top of box */}
      <rectAreaLight
        ref={lightRef}
        color={accent}
        intensity={3}
        width={data.scale * 0.8}
        height={data.scale * 0.8}
        position={[0, data.scale * 0.25, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Camera rig – slow orbit                                           */
/* ------------------------------------------------------------------ */
function CameraRig({ speed }: { speed: number }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 4, 12);
    camera.lookAt(0, -1, 0);
  }, [camera]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed * 0.15;
    camera.position.x = Math.sin(t) * 3;
    camera.position.z = 12 + Math.cos(t) * 2;
    camera.lookAt(0, -1, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Main exported component                                           */
/* ------------------------------------------------------------------ */
export interface LiquidOceanProps {
  children?: React.ReactNode;
  className?: string;
  /** Background colour of the scene (hex number). Default: 0x020210 */
  backgroundColor?: number;
  /** Accent / light colour (hex number). Default: 0x4466ff */
  accentColor?: number;
  /** Number of floating boxes. Default: 5 */
  boatCount?: number;
  /** Animation speed multiplier. Default: 1 */
  speed?: number;
}

export function LiquidOcean({
  children,
  className,
  backgroundColor = 0x020210,
  accentColor = 0x4466ff,
  boatCount = 5,
  speed = 1,
}: LiquidOceanProps) {
  const boats = useMemo<BoatData[]>(() => {
    const arr: BoatData[] = [];
    for (let i = 0; i < boatCount; i++) {
      const angle = (i / boatCount) * Math.PI * 2;
      const radius = 2 + Math.random() * 5;
      arr.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius - 2,
        scale: 0.6 + Math.random() * 0.8,
        speedMul: 0.7 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.15, 0.3, 0.15 + Math.random() * 0.1),
      });
    }
    return arr;
  }, [boatCount]);

  const bgColor = useMemo(() => new THREE.Color(backgroundColor), [backgroundColor]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Three.js canvas – fills parent absolutely */}
      <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
        <Canvas
          gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 1]}
          frameloop="always"
          style={{ width: "100%", height: "100%" }}
        >
          <color attach="background" args={[bgColor.r, bgColor.g, bgColor.b]} />
          <fog attach="fog" args={[bgColor, 10, 35]} />

          {/* Ambient + directional fill */}
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 8, 5]} intensity={0.4} color={0x8899cc} />

          {/* Ocean surface */}
          <Ocean color={backgroundColor} speed={speed} />

          {/* Floating boats */}
          {boats.map((b, i) => (
            <Boat key={i} data={b} accentColor={accentColor} speed={speed} />
          ))}

          <CameraRig speed={speed} />
        </Canvas>
      </div>

      {/* Overlay content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
