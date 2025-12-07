import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tv, Radio, Film, Music, Volume2, Maximize2 } from 'lucide-react';

interface Channel {
    id: string;
    name: string;
    category: string;
    icon: React.ElementType;
    videoId: string; // YouTube Video ID
    color: string;
}

export const LiveTV: React.FC = () => {
    const channels: Channel[] = [
        { id: 'news', name: 'J-News 24/7', category: 'News', icon: Radio, videoId: 'CoT7_4F9iVE', color: 'bg-blue-500' }, // ANN News Live
        { id: 'variety', name: 'Tokyo Walk', category: 'Variety', icon: Tv, videoId: 'fE2h3lGlOsk', color: 'bg-pink-500' }, // Tokyo Walk
        { id: 'anime', name: 'Anime Music', category: 'Music', icon: Music, videoId: '4FBW3mkdKOs', color: 'bg-purple-500' }, // Lofi/Anime
        { id: 'scenery', name: 'Japan View', category: 'Relax', icon: Film, videoId: 'P-1B3uJbaMs', color: 'bg-green-500' }, // Train view
    ];

    const [activeChannel, setActiveChannel] = useState<Channel>(channels[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="min-h-screen bg-slate-900 pb-24">
            {/* Video Player Area */}
            <div className="sticky top-0 z-10 bg-black aspect-video w-full shadow-2xl">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeChannel.videoId}?autoplay=1&mute=0&controls=1&rel=0`}
                    title={activeChannel.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeChannel.color}`}>
                            <activeChannel.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-white font-bold">{activeChannel.name}</h2>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-white/70 text-xs uppercase tracking-wider">LIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Channel Guide */}
            <div className="p-4">
                <h3 className="text-white/60 text-sm font-semibold mb-4 uppercase tracking-wider">Live Channels</h3>
                <div className="space-y-3">
                    {channels.map((channel) => (
                        <motion.button
                            key={channel.id}
                            onClick={() => setActiveChannel(channel)}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${activeChannel.id === channel.id
                                    ? 'bg-white/10 border border-white/20'
                                    : 'bg-slate-800/50 border border-transparent hover:bg-slate-800'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-xl ${channel.color} flex items-center justify-center shadow-lg relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                                <channel.icon className="w-6 h-6 text-white relative z-10" />
                            </div>
                            <div className="flex-1 text-left">
                                <h4 className={`font-bold ${activeChannel.id === channel.id ? 'text-white' : 'text-white/80'}`}>
                                    {channel.name}
                                </h4>
                                <p className="text-white/40 text-xs">{channel.category}</p>
                            </div>
                            {activeChannel.id === channel.id && (
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5 items-end h-3">
                                        <span className="w-0.5 bg-green-400 h-2 animate-[bounce_1s_infinite]" />
                                        <span className="w-0.5 bg-green-400 h-3 animate-[bounce_1.2s_infinite]" />
                                        <span className="w-0.5 bg-green-400 h-1 animate-[bounce_0.8s_infinite]" />
                                    </div>
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Glitch Fix Spacer */}
            <div className="h-20" />
        </div>
    );
};
