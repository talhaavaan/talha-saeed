import { useRef, useState, useEffect, useCallback } from 'react';

const VIDEO_CATEGORIES = [
  {
    id: 'brands',
    label: 'Brands',
    folder: '/assets/brands',
    description: 'Brand identity, campaigns & digital marketing',
    accent: '#3B82F6',
  },
  {
    id: 'restaurant',
    label: 'Ek 2000',
    folder: '/assets/restaurant',
    description: 'Food cinematography & hospitality content',
    accent: '#22D3EE',
  },
  {
    id: 'films',
    label: 'Films',
    folder: '/assets/films',
    description: 'Cinematic short films & narrative edits',
    accent: '#F59E0B',
  },
];

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function VideoCard({ category, index }) {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hovered, setHovered] = useState(false);

  const updateProgress = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.duration) {
      setProgress((v.currentTime / v.duration) * 100);
      setCurrentTime(v.currentTime);
    }
    rafRef.current = requestAnimationFrame(updateProgress);
  }, []);

  const startVideo = () => {
    if (videoRef.current && !error) {
      videoRef.current.play().catch(() => setError(true));
      setPlaying(true);
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    startVideo();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (playing) {
      pauseVideo();
    } else {
      startVideo();
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = pct * videoRef.current.duration;
      setProgress(pct * 100);
    }
  };

  const handleVolume = (e) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const accent = category.accent;

  return (
    <div
      className="video-card reveal"
      style={{ '--accent': accent, animationDelay: `${index * 0.1}s` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-card-inner">
        {!error ? (
          <video
            ref={videoRef}
            className="video-card-media"
            src={`${category.folder}/1.mp4`}
            muted={volume === 0}
            loop
            playsInline
            preload="metadata"
            onError={() => setError(true)}
            onLoadedMetadata={handleLoadedMetadata}
          />
        ) : (
          <div className="video-card-placeholder">
            <div className="vp-icon">
              {category.id === 'brands' ? '◈' : category.id === 'restaurant' ? '◆' : '◉'}
            </div>
          </div>
        )}

        <div className="video-card-overlay" />

        {/* Controls — visible on hover */}
        <div className="vc-controls" style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? 'all' : 'none' }}>

          {/* Timeline */}
          <div className="vc-timeline-wrap" onClick={handleSeek}>
            <div className="vc-timeline-track">
              <div className="vc-timeline-fill" style={{ width: `${progress}%`, background: accent }} />
              <div className="vc-timeline-thumb" style={{ left: `${progress}%`, background: accent }} />
            </div>
            <div className="vc-time-labels">
              <span>{fmt(currentTime)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>

          {/* Bottom row: play/pause + volume */}
          <div className="vc-bottom-row">
            {/* Play / Pause */}
            <button className="vc-playpause" onClick={togglePlay} style={{ color: accent, borderColor: `${accent}44` }}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>

            {/* Volume */}
            <div className="vc-volume-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                {volume > 0 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
                {volume > 0.5 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
              </svg>
              <input
                type="range" min="0" max="1" step="0.01" value={volume}
                onChange={handleVolume}
                onClick={e => e.stopPropagation()}
                className="vc-volume-slider"
                style={{ '--accent': accent }}
              />
              <span className="vc-vol-pct">{Math.round(volume * 100)}%</span>
            </div>
          </div>

        </div>

        <div className="video-card-content">
          <div className="vc-tag">{category.label}</div>
          <div className="vc-desc">{category.description}</div>
          {!hovered && <div className="vc-play-hint">Hover to preview</div>}
        </div>

        <div className="video-card-num">0{index + 1}</div>
      </div>
    </div>
  );
}

export function VideoSection() {
  return (
    <section id="showreel" className="video-section-wrap">
      <div className="section-tag reveal">Showreel</div>
      <h2 className="section-h2 reveal">
        Work That <span className="gradient-text">Speaks</span>
        <br />For Itself.
      </h2>
      <p className="video-section-sub reveal">
        Hover over each category to preview the work.
      </p>
      <div className="video-cards-grid">
        {VIDEO_CATEGORIES.map((cat, i) => (
          <VideoCard key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </section>
  );
}
