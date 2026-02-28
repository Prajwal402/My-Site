import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const GlowingSphere = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.08}
          wireframe
          distort={0.4}
          speed={1.5}
          roughness={0}
        />
      </mesh>
    </Float>
  );
};

const HolographicRing = ({ position, color, radius = 2 }: { position: [number, number, number]; color: string; radius?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5 + 0.8;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={0.8} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </Float>
  );
};

const Particles = ({ count = 400 }) => {
  const points = useRef<THREE.Points>(null!);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 15;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 0.04 + 0.01;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.015;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#00e5ff"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const ConnectingLines = () => {
  const linesRef = useRef<THREE.Group>(null!);

  const lines = useMemo(() => {
    const result: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    for (let i = 0; i < 8; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      );
      const end = new THREE.Vector3(
        start.x + (Math.random() - 0.5) * 6,
        start.y + (Math.random() - 0.5) * 4,
        start.z + (Math.random() - 0.5) * 3
      );
      result.push({ start, end });
    }
    return result;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([line.start, line.end]);
        const material = new THREE.LineBasicMaterial({ color: "#00e5ff", transparent: true, opacity: 0.06 });
        const lineObj = new THREE.Line(geometry, material);
        return <primitive key={i} object={lineObj} />;
      })}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#00e5ff" />
      <pointLight position={[-5, -3, -5]} intensity={0.2} color="#9333ea" />
      <pointLight position={[0, -5, 3]} intensity={0.15} color="#00e5ff" />

      <GlowingSphere position={[-4, 2, -3]} color="#00e5ff" scale={1.2} />
      <GlowingSphere position={[4, -1.5, -4]} color="#9333ea" scale={0.9} />
      <GlowingSphere position={[-2, -2.5, -2]} color="#00e5ff" scale={0.7} />
      <GlowingSphere position={[2.5, 3, -5]} color="#9333ea" scale={1.4} />

      <HolographicRing position={[0, 0, -3]} color="#00e5ff" radius={3.5} />
      <HolographicRing position={[1, -1, -5]} color="#9333ea" radius={2} />

      <ConnectingLines />
      <Particles count={500} />
    </>
  );
};

const HeroBackground3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroBackground3D;
