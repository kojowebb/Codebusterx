import React, { useState } from 'react';
import { Video, Play, Youtube, Filter } from 'lucide-react';

type VideoCategory = 'Tutorials' | 'Announcements' | 'Interviews';

interface VideoItem {
  id: string;
  videoId: string;
  title: string;
  category: VideoCategory;
  duration: string;
}

// Mock Data Generation
const CATEGORIES: VideoCategory[] = ['Tutorials', 'Announcements', 'Interviews'];

const MOCK_VIDEOS: VideoItem[] = Array.from({ length: 20 }).map((_, i) => {
  const category = CATEGORIES[i % 3];
  let title = '';
  let videoId = '';
  
  switch (category) {
      case 'Tutorials':
          title = `Mastering Recycling: Step ${i+1}`;
          videoId = 'Q8Cpa1-8jRA'; // Placeholder
          break;
      case 'Announcements':
          title = `Community Update: Month ${i+1} Achievements`;
          videoId = '9m4ej8c8_O0'; // Placeholder
          break;
      case 'Interviews':
          title = `Participant Spotlight: Success Story #${i+1}`;
          videoId = 'Q8Cpa1-8jRA'; // Placeholder
          break;
  }

  return {
    id: `vid-${i}`,
    videoId,
    title,
    category: category,
    duration: `${5 + (i % 10)} min`
  };
});

export const VideoGallery = () => {
  const [activeCategory, setActiveCategory] = useState<VideoCategory | 'All'>('All');

  const filteredVideos = activeCategory === 'All' 
    ? MOCK_VIDEOS 
    : MOCK_VIDEOS.filter(v => v.category === activeCategory);

  const categories: (VideoCategory | 'All')[] = ['All', ...CATEGORIES];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600/20 rounded-lg"><Youtube className="text-red-500 w-8 h-8" /></div>
            <div>
                <h2 className="text-2xl font-bold text-white">Video Library</h2>
                <p className="text-slate-400">Educational content, updates, and recycling tutorials.</p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                        activeCategory === cat 
                        ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/20' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-200'
                    }`}
                >
                    {cat}
                </button>
            ))}
          </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
            <div key={video.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden group hover:border-red-500/50 transition-all flex flex-col">
                <div className="relative aspect-video bg-black">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${video.videoId}?modestbranding=1&rel=0`} 
                        title={video.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="absolute inset-0"
                    ></iframe>
                    <div className="absolute top-2 left-2 pointer-events-none">
                         <span className={`text-[10px] px-2 py-1 rounded border uppercase font-bold backdrop-blur-md shadow-sm
                            ${video.category === 'Tutorials' ? 'bg-blue-900/80 text-blue-200 border-blue-500/30' : 
                              video.category === 'Announcements' ? 'bg-pink-900/80 text-pink-200 border-pink-500/30' : 
                              'bg-purple-900/80 text-purple-200 border-purple-500/30'
                            }
                         `}>
                            {video.category}
                         </span>
                    </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 p-1.5 bg-red-600 text-white rounded-full shrink-0">
                            <Play size={10} fill="currentColor" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm line-clamp-2 group-hover:text-red-400 transition-colors">
                                {video.title}
                            </h3>
                            <p className="text-slate-500 text-xs mt-1">{video.duration} watch</p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        {filteredVideos.length === 0 && (
            <div className="col-span-full text-center py-12 bg-slate-800/30 rounded-xl border border-slate-800 border-dashed">
                <p className="text-slate-500 italic">No videos found for category "{activeCategory}".</p>
            </div>
        )}
      </div>
    </div>
  );
};