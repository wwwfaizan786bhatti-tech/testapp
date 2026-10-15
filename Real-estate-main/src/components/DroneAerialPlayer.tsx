import React, { useEffect, useRef, useState } from 'react';
import { Video, Maximize2, RotateCw } from 'lucide-react';
import { lahoreVillaImg } from '../data/mockData';

export type DroneCameraAngle =
  | 'establishing_glide'
  | 'side_view_orbit'
  | 'top_aerial_view'
  | 'courtyard_push';

interface DroneAerialPlayerProps {
  images: string[];
  title: string;
  location?: string;
  price?: string;
  isHovered?: boolean;
  autoPlayAlways?: boolean;
  showControls?: boolean;
  onExpandClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const DroneAerialPlayer: React.FC<DroneAerialPlayerProps> = ({
  images,
  title,
  isHovered = false,
  autoPlayAlways = false,
  showControls = true,
  onExpandClick,
  className = '',
}) => {
  const [activeAngle, setActiveAngle] = useState<DroneCameraAngle>('establishing_glide');
  const [autoCycle, setAutoCycle] = useState<boolean>(true);
  const [manualOffset, setManualOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [animTick, setAnimTick] = useState<number>(0);

  const isPlaying = autoPlayAlways || isHovered;
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const fxCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Select the most appropriate photo for the angle if the property has multiple photos,
  // while always keeping the exact house visually consistent and natural
  const primarySrc = images[0] || lahoreVillaImg;
  const secondarySrc = images[1] || primarySrc;
  const tertiarySrc = images[2] || primarySrc;

  // Auto-cycle through the 4 natural drone camera views every 5.5 seconds
  useEffect(() => {
    if (!isPlaying || !autoCycle) return;
    const sequence: DroneCameraAngle[] = [
      'establishing_glide',
      'side_view_orbit',
      'top_aerial_view',
      'courtyard_push',
    ];
    const interval = setInterval(() => {
      setActiveAngle((prev) => {
        const idx = sequence.indexOf(prev);
        return sequence[(idx + 1) % sequence.length];
      });
    }, 5500);

    return () => clearInterval(interval);
  }, [isPlaying, autoCycle]);

  // Smooth 60FPS animation driver for continuous natural drone physics & environmental lighting
  useEffect(() => {
    if (!isPlaying) return;
    let frameId: number;
    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) / 1000;
      setAnimTick(elapsed);

      // Render natural atmospheric effects (sunlight rays, drifting cloud shadow, subtle pool shimmer)
      const canvas = fxCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const rect = canvas.getBoundingClientRect();
          if (canvas.width !== Math.floor(rect.width) || canvas.height !== Math.floor(rect.height)) {
            canvas.width = Math.floor(rect.width);
            canvas.height = Math.floor(rect.height);
          }
          const w = canvas.width;
          const h = canvas.height;
          ctx.clearRect(0, 0, w, h);

          // 1. Natural Golden-Hour Directional Sunlight Glow
          const sunX =
            activeAngle === 'side_view_orbit'
              ? w * (0.5 + Math.sin(elapsed * 0.65) * 0.38)
              : activeAngle === 'top_aerial_view'
              ? w * 0.72
              : w * (0.78 + Math.sin(elapsed * 0.4) * 0.1);
          const sunY = activeAngle === 'top_aerial_view' ? h * 0.12 : h * 0.18;

          const sunGrad = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, w * 0.75);
          sunGrad.addColorStop(0, 'rgba(255, 244, 214, 0.28)');
          sunGrad.addColorStop(0.35, 'rgba(253, 224, 171, 0.11)');
          sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = sunGrad;
          ctx.fillRect(0, 0, w, h);

          // 2. Subtle Drifting Cloud Shadow Pass (Especially natural in Top Aerial & Side Views)
          const shadowX = ((elapsed * 28) % (w * 1.8)) - w * 0.4;
          const shadowGrad = ctx.createLinearGradient(
            shadowX - w * 0.35,
            0,
            shadowX + w * 0.35,
            h * 0.6
          );
          shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          shadowGrad.addColorStop(0.5, 'rgba(8, 12, 22, 0.14)');
          shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = shadowGrad;
          ctx.fillRect(0, 0, w, h);

          // 3. Subtle Floating Golden-Hour Light Motes in the Air
          for (let i = 0; i < 10; i++) {
            const px = ((w * (i * 0.11 + 0.07) + Math.sin(elapsed * 0.5 + i) * 28) % w + w) % w;
            const py = ((h * (i * 0.09 + 0.15) - elapsed * (6 + (i % 4) * 2)) % h + h) % h;
            const alpha = 0.15 + 0.15 * Math.sin(elapsed * 2 + i);
            ctx.fillStyle = `rgba(254, 243, 199, ${alpha})`;
            ctx.beginPath();
            ctx.arc(px, py, 1.3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, activeAngle]);

  // Compute natural, distortion-free 3D optical camera transform for each drone view
  const getCameraTransform = (): string => {
    if (!isPlaying) {
      return 'perspective(1400px) scale3d(1, 1, 1) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)';
    }

    const t = animTick;
    const userX = manualOffset.x;
    const userY = manualOffset.y;

    if (activeAngle === 'establishing_glide') {
      // Smooth forward drone approach with gentle natural breathing
      const scale = 1.12 + Math.sin(t * 0.55) * 0.05;
      const tx = Math.sin(t * 0.45) * 2.2 + userX;
      const ty = Math.cos(t * 0.4) * 1.5 + userY;
      const rx = Math.sin(t * 0.35) * 1.2;
      const ry = Math.cos(t * 0.45) * 1.8;
      return `perspective(1400px) scale3d(${scale.toFixed(4)}, ${scale.toFixed(
        4
      )}, 1) translate3d(${tx.toFixed(2)}%, ${ty.toFixed(2)}%, 0px) rotateX(${rx.toFixed(
        2
      )}deg) rotateY(${ry.toFixed(2)}deg)`;
    }

    if (activeAngle === 'side_view_orbit') {
      // Natural Side-to-Side Lateral Drone Orbit:
      // Smoothly pans across the left and right wings with a subtle, realistic 3D yaw angle (max ±4.5 deg)
      // so the side view looks completely natural without stretching or warping
      const sweep = Math.sin(t * 0.65); // -1 (left wing) to +1 (right wing)
      const scale = 1.2 + Math.cos(t * 0.65) * 0.03;
      const tx = sweep * 6.5 + userX;
      const ty = Math.sin(t * 0.4) * 1.2 + userY;
      const ry = -sweep * 4.2; // Natural optical side-angle perspective
      const rx = 0.8;
      const rz = sweep * 0.45; // Subtle drone bank into the turn
      return `perspective(1500px) scale3d(${scale.toFixed(4)}, ${scale.toFixed(
        4
      )}, 1) translate3d(${tx.toFixed(2)}%, ${ty.toFixed(2)}%, 0px) rotateX(${rx.toFixed(
        2
      )}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
    }

    if (activeAngle === 'top_aerial_view') {
      // Natural High-Altitude Top-Down / Elevated Drone View:
      // Elevates camera framing toward the roofline & upper terrace and gently tilts downward
      // with a clean, realistic pitch (-3.8 deg to -1.5 deg) so the top view feels natural and undistorted
      const cycle = Math.sin(t * 0.5);
      const scale = 1.22 - cycle * 0.04;
      const tx = Math.cos(t * 0.4) * 3.0 + userX;
      const ty = 4.2 - cycle * 3.2 + userY; // Starts high above roofline, glides down naturally
      const rx = -3.6 + cycle * 1.4; // Natural downward aerial camera pitch
      const ry = Math.sin(t * 0.4) * 2.0;
      return `perspective(1500px) scale3d(${scale.toFixed(4)}, ${scale.toFixed(
        4
      )}, 1) translate3d(${tx.toFixed(2)}%, ${ty.toFixed(2)}%, 0px) rotateX(${rx.toFixed(
        2
      )}deg) rotateY(${ry.toFixed(2)}deg)`;
    }

    // courtyard_push: Low-altitude dolly-in toward the grand entrance, lawn & pool
    const push = 0.5 + 0.5 * Math.sin(t * 0.6);
    const scale = 1.15 + push * 0.12;
    const tx = Math.sin(t * 0.5) * 2.5 + userX;
    const ty = -2.8 + push * 1.6 + userY;
    const rx = 1.6 - push * 0.8;
    const ry = Math.cos(t * 0.5) * 1.5;
    return `perspective(1400px) scale3d(${scale.toFixed(4)}, ${scale.toFixed(
      4
    )}, 1) translate3d(${tx.toFixed(2)}%, ${ty.toFixed(2)}%, 0px) rotateX(${rx.toFixed(
      2
    )}deg) rotateY(${ry.toFixed(2)}deg)`;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setAutoCycle(false);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    setManualOffset((prev) => ({
      x: Math.max(-7, Math.min(7, prev.x + dx * 0.04)),
      y: Math.max(-6, Math.min(6, prev.y + dy * 0.04)),
    }));
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const angleMeta: Record<DroneCameraAngle, { label: string; shortLabel: string }> = {
    establishing_glide: {
      label: 'DRONE CAM 01 · FRONT ESTABLISHING GLIDE',
      shortLabel: 'Front Glide',
    },
    side_view_orbit: {
      label: 'DRONE CAM 02 · NATURAL SIDE-WING ORBIT',
      shortLabel: 'Side View',
    },
    top_aerial_view: {
      label: 'DRONE CAM 03 · HIGH-ALTITUDE TOP VIEW',
      shortLabel: 'Top View',
    },
    courtyard_push: {
      label: 'DRONE CAM 04 · COURTYARD & ENTRANCE DOLLY',
      shortLabel: 'Close-Up',
    },
  };

  const currentMeta = angleMeta[activeAngle];

  // Choose active image smoothly if multiple real photos of the property exist
  const activePhotoSrc =
    activeAngle === 'side_view_orbit'
      ? secondarySrc
      : activeAngle === 'top_aerial_view'
      ? tertiarySrc
      : primarySrc;

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative w-full h-full overflow-hidden select-none bg-[#070b14] ${
        isPlaying ? 'cursor-grab active:cursor-grabbing' : ''
      } ${className}`}
    >
      {/* Seamless, High-Resolution 3D Optical Drone Camera Layer on the Actual House Photo */}
      <div
        style={{
          transform: getCameraTransform(),
          transition: isPlaying ? 'transform 120ms linear' : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
        className="w-full h-full relative"
      >
        <img
          src={activePhotoSrc}
          alt={title}
          className="w-full h-full object-cover object-center transition-opacity duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Natural Window Warmth & Pool Reflection Shimmer Overlay */}
        {isPlaying && (
          <div
            style={{
              opacity: 0.35 + 0.15 * Math.sin(animTick * 2.2),
            }}
            className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-amber-300/15 mix-blend-screen pointer-events-none"
          />
        )}
      </div>

      {/* Atmospheric Sunlight, Cloud Shadow & Light Particles Canvas */}
      <canvas
        ref={fxCanvasRef}
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Idle Prompt Badge */}
      {!isPlaying && (
        <div className="absolute bottom-3 right-3 z-20 pointer-events-none flex items-center gap-1.5 bg-black/65 backdrop-blur-md border border-white/15 text-slate-100 px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide shadow-lg">
          <Video className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span>Hover / Click for Drone Video</span>
        </div>
      )}

      {/* Clean, Minimal Camera View Controls */}
      {isPlaying && (
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="bg-black/55 backdrop-blur-md border border-white/15 rounded-md px-2.5 py-1 text-[10px] font-mono text-white flex items-center gap-1.5 shadow">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
              <span>{currentMeta.label}</span>
            </div>

            {onExpandClick && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onExpandClick(e);
                }}
                className="pointer-events-auto px-2 py-1 rounded-md bg-black/60 hover:bg-sky-600 text-white text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 border border-white/15 transition-all"
                title="Expand Fullscreen Video"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            )}
          </div>

          {showControls && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto flex items-center justify-between gap-1 bg-black/55 backdrop-blur-md border border-white/15 rounded-lg p-1 self-center"
            >
              <div className="flex items-center gap-1">
                {(Object.keys(angleMeta) as DroneCameraAngle[]).map((angleKey) => {
                  const active = activeAngle === angleKey;
                  return (
                    <button
                      key={angleKey}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAutoCycle(false);
                        setManualOffset({ x: 0, y: 0 });
                        setActiveAngle(angleKey);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                        active
                          ? 'bg-sky-500 text-white'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {angleMeta[angleKey].shortLabel}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setManualOffset({ x: 0, y: 0 });
                  setAutoCycle((prev) => !prev);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 whitespace-nowrap ${
                  autoCycle
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-900/80 text-slate-300'
                }`}
              >
                <RotateCw className={`w-2.5 h-2.5 ${autoCycle ? 'animate-spin' : ''}`} />
                <span>Auto</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
