import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Sun = ({ onClick }) => {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.rotation.y += 0.005;
    });

    return (
        <group onClick={() => {
            const worldPos = new THREE.Vector3(0, 0, 0);
            onClick('About Me', worldPos);
        }}>
            <Sphere ref={meshRef} args={[5, 64, 64]}>
                <MeshDistortMaterial
                    color="#ffcc00"
                    emissive="#ff4400"
                    emissiveIntensity={2}
                    distort={0.3}
                    speed={1.5}
                    roughness={0}
                />
            </Sphere>
            {/* Sun Glow */}
            <pointLight intensity={10} distance={100} color="#ffcc00" castShadow />
            <mesh>
                <sphereGeometry args={[5.5, 64, 64]} />
                <meshBasicMaterial color="#ffcc00" transparent opacity={0.1} />
            </mesh>
        </group>
    );
};

export default Sun;
