'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Maximize,
  Minimize,
  Pause,
  PictureInPicture2,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { cn } from '@/lib/utils';

const VIDEO_SRC = '/Video/demo.mp4';
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;
const FRAME_W = 900;
const FRAME_H = 600;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

export function VideoModal({ open, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [speedOpen, setSpeedOpen] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [seeking, setSeeking] = useState(false);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const scheduleHideControls = useCallback(() => {
    clearHideTimer();
    if (!playing || seeking) return;
    hideTimerRef.current = setTimeout(() => setControlsVisible(false), 2800);
  }, [playing, seeking]);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    scheduleHideControls();
  }, [scheduleHideControls]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  const seekBy = useCallback((delta: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(Math.max(0, video.currentTime + delta), video.duration || 0);
  }, []);

  const seekToRatio = useCallback((ratio: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.currentTime = Math.min(Math.max(0, ratio), 1) * video.duration;
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  const setVol = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video) return;
    const next = Math.min(Math.max(value, 0), 1);
    video.volume = next;
    video.muted = next === 0;
    setVolume(next);
    setMuted(next === 0);
  }, []);

  const togglePiP = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await video.requestPictureInPicture();
      }
    } catch {
      /* PiP unsupported / blocked */
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const shell = shellRef.current;
    if (!shell) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await shell.requestFullscreen();
      }
    } catch {
      /* fullscreen blocked */
    }
  }, []);

  // Open / close lifecycle
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.playbackRate = speed;
      video.volume = volume;
      video.muted = muted;
      setLoading(true);
      void video.play().catch(() => setPlaying(false));
    }

    setControlsVisible(true);
    scheduleHideControls();

    return () => {
      document.body.style.overflow = previousOverflow;
      clearHideTimer();
      video?.pause();
      setPlaying(false);
      setSpeedOpen(false);
      setVolumeOpen(false);
    };
    // intentionally only when open flips
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Video media events
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !open) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => {
      if (!seeking) setCurrent(video.currentTime);
    };
    const onMeta = () => {
      setDuration(video.duration || 0);
      setLoading(false);
    };
    const onWaiting = () => setLoading(true);
    const onPlaying = () => setLoading(false);
    const onProgress = () => {
      if (!video.buffered.length) return;
      setBuffered(video.buffered.end(video.buffered.length - 1));
    };
    const onEnded = () => {
      setPlaying(false);
      setControlsVisible(true);
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('progress', onProgress);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('progress', onProgress);
      video.removeEventListener('ended', onEnded);
    };
  }, [open, seeking]);

  // Fullscreen change sync
  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      switch (e.key.toLowerCase()) {
        case 'escape':
          if (document.fullscreenElement) {
            void document.exitFullscreen();
          } else {
            onClose();
          }
          break;
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          showControls();
          break;
        case 'arrowleft':
        case 'j':
          e.preventDefault();
          seekBy(-10);
          showControls();
          break;
        case 'arrowright':
        case 'l':
          e.preventDefault();
          seekBy(10);
          showControls();
          break;
        case 'arrowup':
          e.preventDefault();
          setVol(volume + 0.05);
          showControls();
          break;
        case 'arrowdown':
          e.preventDefault();
          setVol(volume - 0.05);
          showControls();
          break;
        case 'm':
          toggleMute();
          showControls();
          break;
        case 'f':
          void toggleFullscreen();
          showControls();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, togglePlay, seekBy, setVol, volume, toggleMute, toggleFullscreen, showControls]);

  const onProgressPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seekToRatio(ratio);
  };

  const onProgressDragStart = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setSeeking(true);
    onProgressPointer(e);
  };

  const onProgressDragMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!seeking) return;
    onProgressPointer(e);
  };

  const onProgressDragEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!seeking) return;
    setSeeking(false);
    onProgressPointer(e);
    scheduleHideControls();
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;

  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.45 ? Volume1 : Volume2;

  const stopBubble = (e: ReactMouseEvent) => e.stopPropagation();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close video"
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Product video player"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="relative z-10 w-full max-w-[900px]"
            onClick={stopBubble}
          >
            {/* Fixed 900×600 stage (scales down on smaller screens, keeps 3:2) */}
            <div
              ref={shellRef}
              className={cn(
                'group relative mx-auto overflow-hidden rounded-2xl bg-slate-950 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65)] ring-1 ring-white/10',
                fullscreen && 'rounded-none',
              )}
              style={{
                width: '100%',
                maxWidth: FRAME_W,
                aspectRatio: `${FRAME_W} / ${FRAME_H}`,
              }}
              onMouseMove={showControls}
              onMouseLeave={() => {
                if (playing) setControlsVisible(false);
              }}
            >
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
                onClick={togglePlay}
                onDoubleClick={() => void toggleFullscreen()}
              />

              {/* Loading */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/30"
                  >
                    <span className="size-10 animate-spin rounded-full border-2 border-white/25 border-t-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Center play affordance */}
              <AnimatePresence>
                {!playing && !loading && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={togglePlay}
                    className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary shadow-[0_16px_40px_-8px_rgba(0,0,0,0.45)] ring-1 ring-white/80 backdrop-blur-sm transition hover:scale-105"
                    aria-label="Play"
                  >
                    <Play className="ml-0.5 size-7 fill-current" strokeWidth={1.5} />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Top bar */}
              <div
                className={cn(
                  'absolute inset-x-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/70 via-black/30 to-transparent px-3 pb-10 pt-3 transition-opacity duration-300 sm:px-4',
                  controlsVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
              >
                <div>
                  <p className="text-xs font-semibold text-white/90 sm:text-sm">Zantrra Demo</p>
                  <p className="text-[10px] text-white/50 sm:text-xs">Product walkthrough</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-white/20"
                >
                  <X className="size-4" strokeWidth={1.75} />
                </button>
              </div>

              {/* Bottom controls */}
              <div
                className={cn(
                  'absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-3 pb-3 pt-12 transition-opacity duration-300 sm:px-4 sm:pb-4',
                  controlsVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
              >
                {/* Progress */}
                <div
                  className="group/progress relative mb-3 h-1.5 cursor-pointer rounded-full bg-white/20"
                  onPointerDown={onProgressDragStart}
                  onPointerMove={onProgressDragMove}
                  onPointerUp={onProgressDragEnd}
                  onPointerCancel={onProgressDragEnd}
                  role="slider"
                  aria-label="Seek"
                  aria-valuemin={0}
                  aria-valuemax={Math.floor(duration)}
                  aria-valuenow={Math.floor(current)}
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-white/30"
                    style={{ width: `${bufferedPct}%` }}
                  />
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-violet-400"
                    style={{ width: `${progress}%` }}
                  />
                  <div
                    className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-md ring-2 ring-primary transition-opacity group-hover/progress:opacity-100"
                    style={{ left: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <ControlBtn label="Rewind 10 seconds" onClick={() => seekBy(-10)}>
                    <SkipBack className="size-4" strokeWidth={1.75} />
                  </ControlBtn>

                  <ControlBtn label={playing ? 'Pause' : 'Play'} onClick={togglePlay} emphasize>
                    {playing ? (
                      <Pause className="size-4 fill-current" strokeWidth={1.5} />
                    ) : (
                      <Play className="ml-0.5 size-4 fill-current" strokeWidth={1.5} />
                    )}
                  </ControlBtn>

                  <ControlBtn label="Forward 10 seconds" onClick={() => seekBy(10)}>
                    <SkipForward className="size-4" strokeWidth={1.75} />
                  </ControlBtn>

                  <span className="ml-1 hidden tabular-nums text-[11px] font-medium text-white/80 sm:inline">
                    {formatTime(current)} / {formatTime(duration)}
                  </span>
                  <span className="ml-1 tabular-nums text-[10px] font-medium text-white/80 sm:hidden">
                    {formatTime(current)}
                  </span>

                  <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
                    {/* Volume */}
                    <div
                      className="relative flex items-center"
                      onMouseEnter={() => setVolumeOpen(true)}
                      onMouseLeave={() => setVolumeOpen(false)}
                    >
                      <ControlBtn label={muted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
                        <VolumeIcon className="size-4" strokeWidth={1.75} />
                      </ControlBtn>
                      <div
                        className={cn(
                          'overflow-hidden transition-all duration-200',
                          volumeOpen ? 'ml-1 w-20 opacity-100' : 'w-0 opacity-0',
                        )}
                      >
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={muted ? 0 : volume}
                          onChange={(e) => setVol(Number(e.target.value))}
                          className="zantra-volume h-1 w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-primary"
                          aria-label="Volume"
                        />
                      </div>
                    </div>

                    {/* Speed */}
                    <div className="relative">
                      <ControlBtn
                        label="Playback speed"
                        onClick={() => {
                          setSpeedOpen((v) => !v);
                          setVolumeOpen(false);
                        }}
                        className="min-w-[2.75rem] px-1.5 text-[11px] font-bold tabular-nums"
                      >
                        {speed === 1 ? '1x' : `${speed}x`}
                      </ControlBtn>
                      <AnimatePresence>
                        {speedOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            className="absolute bottom-[calc(100%+8px)] right-0 z-30 min-w-[5.5rem] overflow-hidden rounded-xl bg-slate-900/95 py-1 shadow-xl ring-1 ring-white/10 backdrop-blur-xl"
                          >
                            {SPEEDS.map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => {
                                  if (videoRef.current) videoRef.current.playbackRate = s;
                                  setSpeed(s);
                                  setSpeedOpen(false);
                                }}
                                className={cn(
                                  'flex w-full items-center justify-between px-3 py-1.5 text-left text-xs font-medium text-white/80 transition hover:bg-white/10',
                                  speed === s && 'bg-primary/30 text-white',
                                )}
                              >
                                {s === 1 ? 'Normal' : `${s}x`}
                                {speed === s && <span className="size-1.5 rounded-full bg-primary" />}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <ControlBtn label="Picture in picture" onClick={() => void togglePiP()}>
                      <PictureInPicture2 className="size-4" strokeWidth={1.75} />
                    </ControlBtn>

                    <ControlBtn
                      label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                      onClick={() => void toggleFullscreen()}
                    >
                      {fullscreen ? (
                        <Minimize className="size-4" strokeWidth={1.75} />
                      ) : (
                        <Maximize className="size-4" strokeWidth={1.75} />
                      )}
                    </ControlBtn>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 hidden text-center text-[10px] text-white/40 sm:block">
              Space play/pause · ← → seek · ↑ ↓ volume · M mute · F fullscreen · Esc close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ControlBtn({
  children,
  label,
  onClick,
  emphasize,
  className,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  emphasize?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex size-8 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/15 hover:text-white sm:size-9',
        emphasize && 'bg-white/15 ring-1 ring-white/10',
        className,
      )}
    >
      {children}
    </button>
  );
}
