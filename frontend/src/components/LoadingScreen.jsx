import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 1000);
                    return 100;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 150);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center"
        >
            <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-blue-400 font-mono text-sm tracking-widest uppercase"
            >
                Initializing Galaxy... {Math.round(progress)}%
            </motion.p>

            {/* Spaceship entering galaxy simulation */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-10"
            >
                <div className="w-4 h-4 bg-white rounded-full blur-sm" />
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;
