import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const Planet = ({
    name,
    radius,
    speed,
    size,
    color,
    onClick
}) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * speed;
        const x = Math.cos(t) * radius;
        const z = Math.sin(t) * radius;
        meshRef.current.position.set(x, 0, z);
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <group>
            {/* Orbit Line */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius - 0.05, radius + 0.05, 128]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>

            <mesh
                ref={meshRef}
                onClick={(e) => {
                    e.stopPropagation();
                    // Pass the world position to the click handler
                    const worldPos = new THREE.Vector3();
                    meshRef.current.getWorldPosition(worldPos);
                    onClick(name, worldPos);
                }}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 0.8 : 0.2}
                    roughness={0.7}
                />

                {hovered && (
                    <Html distanceFactor={20} position={[0, size + 1.5, 0]}>
                        <div className="bg-black/80 text-white px-4 py-2 rounded-xl border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] whitespace-nowrap backdrop-blur-md font-medium text-sm transition-all animate-in fade-in zoom-in">
                            {name}
                        </div>
                    </Html>
                )}
            </mesh>
        </group>
    );
};

export default Planet;
