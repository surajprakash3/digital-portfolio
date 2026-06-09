import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Admin = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/admin/messages`);
                const data = await res.json();
                if (data.success) {
                    setMessages(data.messages);
                }
            } catch (err) {
                console.error("Failed to fetch messages:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Transmission Logs
                        </h1>
                        <p className="text-gray-500 mt-2">Incoming signals from the digital galaxy</p>
                    </div>
                    <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                        <ArrowLeft size={18} /> Back to Solar System
                    </Link>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 italic border border-white/5 rounded-3xl bg-white/5">
                        No transmissions received yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-blue-500/30 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                                        <Mail size={20} />
                                    </div>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
                                        <Calendar size={12} /> {new Date(msg.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-1">
                                    <User size={16} className="text-gray-400" /> {msg.name}
                                </h3>
                                <p className="text-blue-400 text-sm mb-4">{msg.email}</p>
                                <p className="text-gray-300 text-sm line-clamp-4 italic">
                                    "{msg.message}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
