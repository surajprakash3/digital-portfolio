import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Linkedin, Mail, Download, Trophy, Briefcase, Award, GraduationCap, Code2, BookOpen, Send, Loader2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const OverlayPanel = ({ section, onClose }) => {
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formStatus, setFormStatus] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    useEffect(() => {
        if (section && section !== 'Contact') {
            const fetchContent = async () => {
                try {
                    const res = await fetch(`${API_BASE_URL}/content`);
                    const data = await res.json();
                    setApiData(data);
                } catch (err) {
                    console.error("Failed to fetch content:", err);
                }
            };
            fetchContent();
        }
    }, [section]);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setFormStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setFormStatus('error');
            }
        } catch (err) {
            setFormStatus('error');
        } finally {
            setLoading(false);
            setTimeout(() => setFormStatus(null), 5000);
        }
    };

    if (!section) return null;

    const content = {
        'About Me': {
            icon: <GraduationCap className="text-blue-400" size={48} />,
            title: "Suraj Prakash",
            subtitle: "Aspiring Software Developer",
            body: (
                <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        I am a final-year student at <span className="text-white font-semibold">Lovely Professional University</span> with a passion for building robust software solutions. My journey is fueled by a curiosity for cloud computing and DevOps.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <h4 className="text-blue-400 font-semibold mb-2">Leadership</h4>
                            <p className="text-gray-400 text-sm">NSS Unit Umang Leader | Glad Bharat Foundation</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <a href="#" className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold">
                            <Download size={18} /> Resume
                        </a>
                        <div className="flex gap-4">
                            <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition border border-white/10">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition border border-white/10">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            )
        },
        'Skills': {
            icon: <Code2 className="text-glow" size={48} />,
            title: "Technical Arsenal",
            body: (
                <div className="grid grid-cols-1 gap-6">
                    {(apiData?.skills || [
                        { name: 'Python', level: '90%' },
                        { name: 'JavaScript', level: '85%' },
                        { name: 'Cloud Computing', level: '80%' },
                        { name: 'Docker', level: '75%' },
                        { name: 'Kubernetes', level: '70%' },
                        { name: 'AWS', level: '75%' }
                    ]).map((skill) => (
                        <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-white font-medium">{skill.name}</span>
                                <span className="text-blue-400">{skill.level}</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: skill.level }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-blue-600 to-glow shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )
        },
        'Projects': {
            icon: <Briefcase className="text-purple-400" size={48} />,
            title: "Featured Quests",
            body: (
                <div className="space-y-6">
                    {(apiData?.projects || [
                        { title: 'Project Alpha', desc: 'Secure cloud-native application with microservices.', tech: ['AWS', 'K8s'] },
                        { title: 'Neural Flow', desc: 'Real-time data processing engine using Python.', tech: ['Python', 'Docker'] }
                    ]).map((proj) => (
                        <div key={proj.title} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all group">
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{proj.title}</h4>
                            <p className="text-gray-400 text-sm mb-4">{proj.desc}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {proj.tech.map(t => <span key={t} className="text-[10px] uppercase tracking-widest bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">{t}</span>)}
                            </div>
                            <a href="#" className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-white transition">
                                View Project <ExternalLink size={14} />
                            </a>
                        </div>
                    ))}
                </div>
            )
        },
        'Experience': {
            icon: <Briefcase className="text-blue-500" size={48} />,
            title: "Timeline",
            body: (
                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
                    {(apiData?.experiences || [
                        { role: 'Aspiring Developer', org: 'LPU', date: '2022 - Present' },
                        { role: 'Umang Leader', org: 'NSS', date: '2023 - 2024' }
                    ]).map((exp, i) => (
                        <div key={exp.role} className="pl-8 relative">
                            <div className="absolute left-0 top-1 w-6 h-6 bg-[#050505] border-2 border-blue-500 rounded-full z-10" />
                            <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                            <p className="text-blue-400 text-sm">{exp.org}</p>
                            <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{exp.date}</p>
                        </div>
                    ))}
                </div>
            )
        },
        'Contact': {
            icon: <Send className="text-glow" size={48} />,
            title: "Signal Me",
            body: (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">Identification</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">Comms Channel</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">Transmission</label>
                        <textarea
                            placeholder="Message..."
                            rows={4}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-glow py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Initiate Contact'} <Send size={18} />
                    </button>

                    {formStatus === 'success' && (
                        <p className="text-green-400 text-sm text-center animate-pulse">Transmission Received successfully!</p>
                    )}
                    {formStatus === 'error' && (
                        <p className="text-red-400 text-sm text-center">Engine Failure: Could not send signal.</p>
                    )}
                </form>
            )
        }
    };

    const defaultContent = {
        icon: <Award className="text-orange-400" size={48} />,
        title: section,
        body: (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                <BookOpen size={64} className="mb-4 text-gray-700" />
                <p className="italic">Exploring this sector of the galaxy...</p>
                <p className="text-xs mt-2 uppercase tracking-tighter">Transmission pending</p>
            </div>
        )
    };

    const activeContent = content[section] || defaultContent;

    return (
        <AnimatePresence>
            {section && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                    className="fixed top-0 right-0 w-full md:w-[500px] h-full bg-[#050505]/95 backdrop-blur-3xl border-l border-white/10 z-[60] overflow-y-auto shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
                >
                    <div className="sticky top-0 p-8 flex justify-between items-center bg-[#050505]/50 backdrop-blur-md border-b border-white/5 z-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                {React.cloneElement(activeContent.icon, { size: 24 })}
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-white">{activeContent.title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-white/10 rounded-2xl transition-all text-gray-400 hover:text-white border border-transparent hover:border-white/10"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-8 pb-20">
                        {activeContent.subtitle && (
                            <p className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-8">
                                {activeContent.subtitle}
                            </p>
                        )}
                        {activeContent.body}
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center opacity-30 text-[10px] uppercase tracking-[0.2em]">
                        <span>Suraj Prakash // 2026</span>
                        <span>Orbital Sector: {section}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OverlayPanel;
