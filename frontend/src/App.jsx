import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import SolarSystem from './components/SolarSystem';
import OverlayPanel from './components/OverlayPanel';
import LoadingScreen from './components/LoadingScreen';
import Admin from './pages/Admin';

function CameraController({ activeSection, targetPosition }) {
    const { camera, controls } = useThree();

    useEffect(() => {
        if (activeSection && targetPosition) {
            gsap.to(camera.position, {
                x: targetPosition.x + 5,
                y: targetPosition.y + 2,
                z: targetPosition.z + 10,
                duration: 2,
                ease: "power2.inOut",
                onUpdate: () => camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z)
            });

            if (controls) {
                gsap.to(controls.target, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    z: targetPosition.z,
                    duration: 2,
                    ease: "power2.inOut"
                });
            }
        } else {
            gsap.to(camera.position, {
                x: 0,
                y: 20,
                z: 40,
                duration: 2,
                ease: "power2.inOut"
            });

            if (controls) {
                gsap.to(controls.target, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 2,
                    ease: "power2.inOut"
                });
            }
        }
    }, [activeSection, targetPosition, camera, controls]);

    return null;
}

function Portfolio() {
    const [activeSection, setActiveSection] = useState(null);
    const [targetPosition, setTargetPosition] = useState(null);
    const [loading, setLoading] = useState(true);

    const handlePlanetClick = (name, position) => {
        setActiveSection(name);
        setTargetPosition(position);
    };

    return (
        <div className="w-full h-screen bg-[#050505] relative overflow-hidden">
            {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

            <Canvas shadows gl={{ antialias: true }}>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 20, 40]} fov={45} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[0, 0, 0]} intensity={2} decay={1} color="#ffcc00" />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    <SolarSystem onPlanetClick={handlePlanetClick} />

                    <OrbitControls
                        enablePan={false}
                        maxDistance={80}
                        minDistance={5}
                        makeDefault
                    />

                    <CameraController activeSection={activeSection} targetPosition={targetPosition} />
                </Suspense>
            </Canvas>

            <OverlayPanel
                section={activeSection}
                onClose={() => {
                    setActiveSection(null);
                    setTargetPosition(null);
                }}
            />

            {!activeSection && !loading && (
                <div className="absolute top-10 left-10 z-10 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Suraj Prakash
                        </h1>
                        <p className="text-xl text-gray-400 mt-2">
                            Aspiring Software Developer | Lovely Professional University
                        </p>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;
