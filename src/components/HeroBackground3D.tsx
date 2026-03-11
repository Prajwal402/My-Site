import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const CrystalGeometry = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.12;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = -state.clock.elapsedTime * 0.08;
      glowRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.02 + 0.07;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1.5}>
      <group position={position} scale={scale}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#00e5ff"
            transparent
            opacity={0.12}
            wireframe
            roughness={0}
            metalness={0.9}
            emissive="#00e5ff"
            emissiveIntensity={0.15}
          />
        </mesh>
        <mesh ref={glowRef}>
          <octahedronGeometry args={[1.3, 0]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.06} wireframe />
        </mesh>
      </group>
    </Float>
  );
};

const AnimatedTorusKnot = () => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.06;
      ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <Float speed={0.6} floatIntensity={0.8}>
      <mesh ref={ref} position={[0, 0, -5]} scale={2.2}>
        <torusKnotGeometry args={[1, 0.02, 200, 8, 3, 5]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.08} />
      </mesh>
    </Float>
  );
};

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
          opacity={0.06}
          wireframe
          distort={0.35}
          speed={1.2}
          roughness={0}
        />
      </mesh>
    </Float>
  );
};

const HolographicRing = ({ position, color, radius = 2, tubeRadius = 0.015 }: { position: [number, number, number]; color: string; radius?: number; tubeRadius?: number }) => {
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
        <torusGeometry args={[radius, tubeRadius, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </Float>
  );
};

const ParticleNebula = ({ count = 600 }) => {
  const points = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00e5ff");
    const purple = new THREE.Color("#9333ea");

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 18;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mix = Math.random();
      const color = cyan.clone().lerp(purple, mix);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.012;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.15;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
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
    for (let i = 0; i < 12; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      );
      const end = new THREE.Vector3(
        start.x + (Math.random() - 0.5) * 5,
        start.y + (Math.random() - 0.5) * 4,
        start.z + (Math.random() - 0.5) * 3
      );
      result.push({ start, end });
    }
    return result;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.04) * 0.15;
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([line.start, line.end]);
        const material = new THREE.LineBasicMaterial({ color: "#00e5ff", transparent: true, opacity: 0.04 });
        const lineObj = new THREE.Line(geometry, material);
        return <primitive key={i} object={lineObj} />;
      })}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#00e5ff" />
      <pointLight position={[-5, -3, -5]} intensity={0.25} color="#9333ea" />
      <pointLight position={[0, -5, 3]} intensity={0.15} color="#00e5ff" />
      <pointLight position={[3, 4, -3]} intensity={0.1} color="#6366f1" />

      <AnimatedTorusKnot />

      <CrystalGeometry position={[-4.5, 2.5, -3]} scale={1.1} />
      <CrystalGeometry position={[5, -2, -4]} scale={0.7} />

      <GlowingSphere position={[-3, -2, -4]} color="#00e5ff" scale={0.9} />
      <GlowingSphere position={[3, 3, -6]} color="#9333ea" scale={1.3} />

      <HolographicRing position={[0, 0.5, -3]} color="#00e5ff" radius={4} />
      <HolographicRing position={[-1, -1, -6]} color="#9333ea" radius={2.5} tubeRadius={0.01} />
      <HolographicRing position={[2, 2, -4]} color="#6366f1" radius={1.5} tubeRadius={0.008} />

      <ConnectingLines />
      <ParticleNebula count={700} />
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
