import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  RotateCw,
  Layers,
  Sun,
  Moon,
  Sunset,
  Sparkles,
  ArrowUpRight,
  Move3d,
  CheckCircle2,
  Send,
  MessageCircle,
  Phone,
  ShieldCheck,
  Home,
  Compass,
  Sliders,
  FileCheck2,
  Eye,
} from 'lucide-react';

interface Interactive3DVillaProps {
  onBookConsultation: (topic: string) => void;
}

type PlotScale = '5 Marla' | '10 Marla' | '1 Kanal' | '2 Kanal';
type ArchStyle = 'modern_cubist' | 'spanish_mediterranean' | 'royal_classical' | 'glass_pavilion';
type FloorMode = 'single' | 'double' | 'basement_double';
type LightingMode = 'dusk' | 'day' | 'night';
type FacadeMaterial = 'travertine' | 'limestone' | 'obsidian' | 'sandstone';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
  depth: number;
}

export const Interactive3DVilla: React.FC<Interactive3DVillaProps> = ({
  onBookConsultation,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Client Custom House Design State
  const [archStyle, setArchStyle] = useState<ArchStyle>('modern_cubist');
  const [plotScale, setPlotScale] = useState<PlotScale>('1 Kanal');
  const [floorMode, setFloorMode] = useState<FloorMode>('double');
  const [bedrooms, setBedrooms] = useState<number>(5);
  const [material, setMaterial] = useState<FacadeMaterial>('travertine');
  const [lighting, setLighting] = useState<LightingMode>('dusk');

  // Custom Add-on Features (Rendered live in 3D!)
  const [hasPool, setHasPool] = useState<boolean>(true);
  const [hasSolar, setHasSolar] = useState<boolean>(true);
  const [hasRooftopGazebo, setHasRooftopGazebo] = useState<boolean>(true);
  const [hasHomeTheater, setHasHomeTheater] = useState<boolean>(true);
  const [hasSmartAutomation, setHasSmartAutomation] = useState<boolean>(true);

  // 3D Camera & Inspection Controls
  const [exploded, setExploded] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [cameraPreset, setCameraPreset] = useState<
    'perspective' | 'front_elevation' | 'side_elevation' | 'top_blueprint'
  >('perspective');
  const [yaw, setYaw] = useState<number>(0.68);
  const [pitch, setPitch] = useState<number>(0.38);

  // Deal Finalization Form State
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientCity, setClientCity] = useState<'Lahore' | 'Islamabad' | 'Karachi'>('Lahore');
  const [clientSociety, setClientSociety] = useState<string>('DHA Phase 8');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [dealSubmitted, setDealSubmitted] = useState<boolean>(false);
  const [designCode] = useState<string>(() => `BRE-3D-${Math.floor(1000 + Math.random() * 9000)}`);

  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const yawRef = useRef(yaw);
  const pitchRef = useRef(pitch);
  const targetYawRef = useRef<number | null>(null);
  const targetPitchRef = useRef<number>(0.38);
  const explodedProgressRef = useRef(0);

  useEffect(() => {
    yawRef.current = yaw;
  }, [yaw]);

  useEffect(() => {
    pitchRef.current = pitch;
  }, [pitch]);

  const handleCameraPreset = (
    preset: 'perspective' | 'front_elevation' | 'side_elevation' | 'top_blueprint'
  ) => {
    setCameraPreset(preset);
    if (preset === 'top_blueprint') {
      // Natural high-altitude aerial view (pitched at 1.05 rad so walls & roof retain natural 3D depth)
      setAutoRotate(false);
      targetYawRef.current = 0.45;
      targetPitchRef.current = 1.05;
    } else if (preset === 'front_elevation') {
      setAutoRotate(false);
      targetYawRef.current = 0.06;
      targetPitchRef.current = 0.22;
    } else if (preset === 'side_elevation') {
      // Natural Side Wing & Courtyard Elevation View
      setAutoRotate(false);
      targetYawRef.current = 1.28;
      targetPitchRef.current = 0.28;
    } else {
      targetYawRef.current = null;
      targetPitchRef.current = 0.38;
      setAutoRotate(true);
    }
  };

  const styleLabels: Record<ArchStyle, { name: string; subtitle: string; rateMultiplier: number }> = {
    modern_cubist: {
      name: 'Modern Cubist Villa',
      subtitle: 'Cantilevered slabs, frameless glass & linear geometry',
      rateMultiplier: 1.0,
    },
    spanish_mediterranean: {
      name: 'Spanish Mediterranean',
      subtitle: 'Terracotta pitched roofs, arched colonnades & courtyard',
      rateMultiplier: 1.06,
    },
    royal_classical: {
      name: 'Grand Royal Classical',
      subtitle: 'Symmetrical Corinthian columns, high crown & portico',
      rateMultiplier: 1.1,
    },
    glass_pavilion: {
      name: 'Minimalist Glass Pavilion',
      subtitle: 'Panoramic curtain walls, floating roof & zen deck',
      rateMultiplier: 1.08,
    },
  };

  const plotConfigs: Record<
    PlotScale,
    {
      scaleX: number;
      scaleZ: number;
      baseSqFt: number;
      dimensions: string;
      defaultBeds: number;
      cars: number;
    }
  > = {
    '5 Marla': {
      scaleX: 0.68,
      scaleZ: 0.76,
      baseSqFt: 1950,
      dimensions: '25 × 45 ft (1,125 Sq.Ft)',
      defaultBeds: 3,
      cars: 2,
    },
    '10 Marla': {
      scaleX: 0.86,
      scaleZ: 0.92,
      baseSqFt: 3400,
      dimensions: '35 × 65 ft (2,250 Sq.Ft)',
      defaultBeds: 4,
      cars: 3,
    },
    '1 Kanal': {
      scaleX: 1.08,
      scaleZ: 1.08,
      baseSqFt: 6200,
      dimensions: '50 × 90 ft (4,500 Sq.Ft)',
      defaultBeds: 5,
      cars: 4,
    },
    '2 Kanal': {
      scaleX: 1.28,
      scaleZ: 1.22,
      baseSqFt: 10500,
      dimensions: '75 × 120 ft (9,000 Sq.Ft)',
      defaultBeds: 6,
      cars: 6,
    },
  };

  // Live Budget & Area Calculation in PKR
  const pricingSummary = useMemo(() => {
    const plot = plotConfigs[plotScale];
    const style = styleLabels[archStyle];

    let floorMultiplier = 1.0;
    if (floorMode === 'single') floorMultiplier = 0.58;
    if (floorMode === 'double') floorMultiplier = 1.0;
    if (floorMode === 'basement_double') floorMultiplier = 1.44;

    const bedroomAdjustment = (bedrooms - plot.defaultBeds) * 180;
    const totalCoveredSqFt = Math.max(
      1100,
      Math.round(plot.baseSqFt * floorMultiplier + bedroomAdjustment)
    );

    const baseRatePerSqFt = 6200 * style.rateMultiplier;
    const structureAndFinishPKR = Math.round(totalCoveredSqFt * baseRatePerSqFt);

    const poolCostPKR = hasPool ? (plotScale === '2 Kanal' ? 4800000 : 3200000) : 0;
    const solarCostPKR = hasSolar ? (plotScale === '5 Marla' ? 1800000 : 3200000) : 0;
    const gazeboCostPKR = hasRooftopGazebo ? 1250000 : 0;
    const theaterCostPKR = hasHomeTheater ? 2200000 : 0;
    const smartCostPKR = hasSmartAutomation ? 1600000 : 0;

    const addonsTotalPKR =
      poolCostPKR + solarCostPKR + gazeboCostPKR + theaterCostPKR + smartCostPKR;
    const grandTotalPKR = structureAndFinishPKR + addonsTotalPKR;

    const formatCroreLacs = (pkr: number) => {
      if (pkr >= 10000000) {
        return `PKR ${(pkr / 10000000).toFixed(2)} Crore`;
      }
      return `PKR ${(pkr / 100000).toFixed(1)} Lacs`;
    };

    return {
      totalCoveredSqFt,
      structureAndFinishPKR,
      addonsTotalPKR,
      grandTotalPKR,
      formattedTotal: formatCroreLacs(grandTotalPKR),
      formattedStructure: formatCroreLacs(structureAndFinishPKR),
      formattedAddons: formatCroreLacs(addonsTotalPKR),
      exactPKR: `Rs. ${grandTotalPKR.toLocaleString('en-PK')}`,
      plot,
      style,
    };
  }, [
    plotScale,
    archStyle,
    floorMode,
    bedrooms,
    hasPool,
    hasSolar,
    hasRooftopGazebo,
    hasHomeTheater,
    hasSmartAutomation,
  ]);

  // 3D Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const project = (
      p: Point3D,
      cx: number,
      cy: number,
      scale: number,
      rotY: number,
      rotX: number
    ): Point2D => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const fov = 920;
      const viewerDist = 780;
      const persp = fov / (viewerDist + z2);

      return {
        x: cx + x1 * scale * persp,
        y: cy - y2 * scale * persp,
        depth: z2,
      };
    };

    interface Face3D {
      verts: Point3D[];
      color: string;
      stroke?: string;
      alpha?: number;
    }

    const createBoxFaces = (
      minX: number,
      minY: number,
      minZ: number,
      maxX: number,
      maxY: number,
      maxZ: number,
      colors: {
        top: string;
        front: string;
        right: string;
        back: string;
        left: string;
      },
      stroke?: string,
      alpha = 1
    ): Face3D[] => {
      const v000 = { x: minX, y: minY, z: minZ };
      const v100 = { x: maxX, y: minY, z: minZ };
      const v101 = { x: maxX, y: minY, z: maxZ };
      const v001 = { x: minX, y: minY, z: maxZ };

      const v010 = { x: minX, y: maxY, z: minZ };
      const v110 = { x: maxX, y: maxY, z: minZ };
      const v111 = { x: maxX, y: maxY, z: maxZ };
      const v011 = { x: minX, y: maxY, z: maxZ };

      return [
        { verts: [v010, v110, v111, v011], color: colors.top, stroke, alpha },
        { verts: [v000, v100, v110, v010], color: colors.front, stroke, alpha },
        { verts: [v100, v101, v111, v110], color: colors.right, stroke, alpha },
        { verts: [v101, v001, v011, v111], color: colors.back, stroke, alpha },
        { verts: [v001, v000, v010, v011], color: colors.left, stroke, alpha },
      ];
    };

    // Pitched hip roof helper for Spanish Mediterranean style
    const createHipRoofFaces = (
      minX: number,
      baseY: number,
      minZ: number,
      maxX: number,
      peakY: number,
      maxZ: number,
      colors: { front: string; right: string; back: string; left: string },
      stroke?: string
    ): Face3D[] => {
      const insetX = (maxX - minX) * 0.22;
      const insetZ = (maxZ - minZ) * 0.22;

      const b0 = { x: minX, y: baseY, z: minZ };
      const b1 = { x: maxX, y: baseY, z: minZ };
      const b2 = { x: maxX, y: baseY, z: maxZ };
      const b3 = { x: minX, y: baseY, z: maxZ };

      const t0 = { x: minX + insetX, y: peakY, z: minZ + insetZ };
      const t1 = { x: maxX - insetX, y: peakY, z: minZ + insetZ };
      const t2 = { x: maxX - insetX, y: peakY, z: maxZ - insetZ };
      const t3 = { x: minX + insetX, y: peakY, z: maxZ - insetZ };

      return [
        { verts: [b0, b1, t1, t0], color: colors.front, stroke },
        { verts: [b1, b2, t2, t1], color: colors.right, stroke },
        { verts: [b2, b3, t3, t2], color: colors.back, stroke },
        { verts: [b3, b0, t0, t3], color: colors.left, stroke },
        { verts: [t0, t1, t2, t3], color: colors.front, stroke },
      ];
    };

    const render = () => {
      time += 0.016;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (
        canvas.width !== Math.floor(rect.width * dpr) ||
        canvas.height !== Math.floor(rect.height * dpr)
      ) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;
      const cx = width * 0.5;
      // Dynamically balance vertical center so Top View and Side View sit naturally in frame
      const cy = height * (0.6 - pitchRef.current * 0.08);

      if (autoRotate && !isDraggingRef.current) {
        yawRef.current += 0.004;
        setYaw(yawRef.current);
      } else if (!isDraggingRef.current && targetYawRef.current !== null) {
        yawRef.current += (targetYawRef.current - yawRef.current) * 0.08;
        setYaw(yawRef.current);
      }

      if (!isDraggingRef.current) {
        pitchRef.current += (targetPitchRef.current - pitchRef.current) * 0.08;
        setPitch(pitchRef.current);
      }

      const targetExplode = exploded ? 1 : 0;
      explodedProgressRef.current += (targetExplode - explodedProgressRef.current) * 0.08;
      const exp = explodedProgressRef.current;

      // Sky Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (lighting === 'day') {
        bgGrad.addColorStop(0, '#0c192c');
        bgGrad.addColorStop(0.55, '#163052');
        bgGrad.addColorStop(1, '#08101d');
      } else if (lighting === 'dusk') {
        bgGrad.addColorStop(0, '#070b14');
        bgGrad.addColorStop(0.5, '#151e34');
        bgGrad.addColorStop(1, '#080c14');
      } else {
        bgGrad.addColorStop(0, '#03050a');
        bgGrad.addColorStop(0.6, '#080d18');
        bgGrad.addColorStop(1, '#04070d');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Material Palettes
      const matPalettes: Record<
        FacadeMaterial,
        { top: string; front: string; right: string; back: string; left: string; stroke: string }
      > = {
        travertine: {
          top: lighting === 'day' ? '#e7dec8' : '#d6cbb5',
          front: lighting === 'day' ? '#d5c7ad' : '#b8a990',
          right: lighting === 'day' ? '#bfb094' : '#9c8d74',
          back: '#8c7d65',
          left: '#afa086',
          stroke: 'rgba(255,255,255,0.18)',
        },
        limestone: {
          top: lighting === 'day' ? '#f8fafc' : '#e2e8f0',
          front: lighting === 'day' ? '#e2e8f0' : '#cbd5e1',
          right: lighting === 'day' ? '#cbd5e1' : '#94a3b8',
          back: '#64748b',
          left: '#94a3b8',
          stroke: 'rgba(255,255,255,0.24)',
        },
        obsidian: {
          top: '#334155',
          front: '#1e293b',
          right: '#0f172a',
          back: '#090d16',
          left: '#1e293b',
          stroke: 'rgba(56,189,248,0.28)',
        },
        sandstone: {
          top: '#f3d5b5',
          front: '#e6be94',
          right: '#cc9f74',
          back: '#a87d56',
          left: '#d4ab82',
          stroke: 'rgba(254, 243, 199, 0.22)',
        },
      };

      const woodColors = {
        top: '#92400e',
        front: '#78350f',
        right: '#5b280b',
        back: '#451a03',
        left: '#6b2f0e',
      };

      const terracottaColors = {
        front: '#b45309',
        right: '#92400e',
        back: '#78350f',
        left: '#d97706',
      };

      const glassGlowColors =
        lighting === 'day'
          ? {
              top: 'rgba(125, 211, 252, 0.6)',
              front: 'rgba(56, 189, 248, 0.52)',
              right: 'rgba(14, 165, 233, 0.45)',
              back: 'rgba(2, 132, 199, 0.4)',
              left: 'rgba(56, 189, 248, 0.48)',
            }
          : {
              top: 'rgba(253, 224, 71, 0.78)',
              front: 'rgba(251, 191, 36, 0.72)',
              right: 'rgba(245, 158, 11, 0.65)',
              back: 'rgba(217, 119, 6, 0.55)',
              left: 'rgba(251, 191, 36, 0.68)',
            };

      const wallColors = matPalettes[material];
      const spec = plotConfigs[plotScale];
      const sx = spec.scaleX;
      const sz = spec.scaleZ;
      const baseScale = Math.min(width, height) * 0.002;

      const rotY = yawRef.current;
      const rotX = pitchRef.current;

      // Ground Blueprint Grid
      ctx.lineWidth = 1;
      const gridExtent = 195;
      const gridStep = 30;
      for (let g = -gridExtent; g <= gridExtent; g += gridStep) {
        const p1 = project({ x: g, y: 0, z: -gridExtent }, cx, cy, baseScale, rotY, rotX);
        const p2 = project({ x: g, y: 0, z: gridExtent }, cx, cy, baseScale, rotY, rotX);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.09)';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        const p3 = project({ x: -gridExtent, y: 0, z: g }, cx, cy, baseScale, rotY, rotX);
        const p4 = project({ x: gridExtent, y: 0, z: g }, cx, cy, baseScale, rotY, rotX);
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }

      const faces: Face3D[] = [];

      // 0. Optional Basement Foundation Layer (if Basement + Double selected)
      if (floorMode === 'basement_double') {
        const bOffset = -exp * 28;
        faces.push(
          ...createBoxFaces(
            -102 * sx,
            -26 + bOffset,
            -18 * sz,
            95 * sx,
            bOffset,
            92 * sz,
            {
              top: '#334155',
              front: '#1e293b',
              right: '#0f172a',
              back: '#0f172a',
              left: '#1e293b',
            },
            'rgba(56, 189, 248, 0.35)'
          )
        );
      }

      // 1. Plot Plinth & Lawn
      faces.push(
        ...createBoxFaces(
          -132 * sx,
          0,
          -126 * sz,
          132 * sx,
          8,
          126 * sz,
          {
            top: '#1e293b',
            front: '#0f172a',
            right: '#090d16',
            back: '#090d16',
            left: '#0f172a',
          },
          'rgba(148, 163, 184, 0.22)'
        )
      );

      faces.push(
        ...createBoxFaces(
          -124 * sx,
          8,
          -118 * sz,
          124 * sx,
          10,
          118 * sz,
          {
            top: lighting === 'night' ? '#064e3b' : '#047857',
            front: '#065f46',
            right: '#064e3b',
            back: '#064e3b',
            left: '#065f46',
          }
        )
      );

      // Car Porch Driveway (Left Front)
      faces.push(
        ...createBoxFaces(
          -118 * sx,
          10,
          -118 * sz,
          -35 * sx,
          11.5,
          -20 * sz,
          {
            top: '#334155',
            front: '#1e293b',
            right: '#1e293b',
            back: '#1e293b',
            left: '#1e293b',
          },
          'rgba(255,255,255,0.1)'
        )
      );

      // 2. Custom Infinity Swimming Pool (if enabled by client)
      if (hasPool) {
        faces.push(
          ...createBoxFaces(
            -18 * sx,
            10,
            -110 * sz,
            114 * sx,
            13,
            -16 * sz,
            wallColors,
            wallColors.stroke
          )
        );

        const shimmer = Math.sin(time * 2.5) * 8;
        faces.push(
          ...createBoxFaces(
            4 * sx,
            11,
            -102 * sz,
            104 * sx,
            14.5,
            -26 * sz,
            {
              top: lighting === 'night' ? '#0284c7' : '#38bdf8',
              front: '#0369a1',
              right: '#075985',
              back: '#0369a1',
              left: '#0284c7',
            },
            `rgba(125, 211, 252, ${0.45 + shimmer * 0.01})`,
            0.92
          )
        );
      }

      // Vertical Explode Offsets
      const groundY = 10;
      const firstFloorOffset = exp * 48;
      const roofOffset = exp * 96;

      // 3. Ground Floor Main Architectural Volume
      faces.push(
        ...createBoxFaces(
          -105 * sx,
          groundY,
          -20 * sz,
          28 * sx,
          groundY + 52,
          95 * sz,
          wallColors,
          wallColors.stroke
        )
      );

      // Ground Floor Living Glass Pavilion
      faces.push(
        ...createBoxFaces(
          -90 * sx,
          groundY + 4,
          -23 * sz,
          20 * sx,
          groundY + 46,
          48 * sz,
          glassGlowColors,
          'rgba(255,255,255,0.38)',
          archStyle === 'glass_pavilion' ? 0.95 : 0.88
        )
      );

      // Ground Floor Right Wing
      faces.push(
        ...createBoxFaces(
          28 * sx,
          groundY,
          8 * sz,
          102 * sx,
          groundY + 48,
          95 * sz,
          wallColors,
          wallColors.stroke
        )
      );

      faces.push(
        ...createBoxFaces(
          40 * sx,
          groundY + 5,
          5 * sz,
          90 * sx,
          groundY + 40,
          26 * sz,
          glassGlowColors,
          'rgba(255,255,255,0.3)',
          0.88
        )
      );

      // Royal Classical Grand Columns on Front Portico
      if (archStyle === 'royal_classical') {
        const colPositions = [-85, -55, -25, 5];
        for (const cxPos of colPositions) {
          faces.push(
            ...createBoxFaces(
              (cxPos - 4) * sx,
              groundY,
              -28 * sz,
              (cxPos + 4) * sx,
              groundY + 52,
              -20 * sz,
              matPalettes.limestone,
              'rgba(255,255,255,0.3)'
            )
          );
        }
      }

      // 4. First Floor Volume (if Double Storey or Basement + Double)
      const hasSecondLevel = floorMode !== 'single';
      const f1Y = groundY + 52 + firstFloorOffset;

      if (hasSecondLevel) {
        faces.push(
          ...createBoxFaces(
            -112 * sx,
            f1Y,
            -44 * sz,
            68 * sx,
            f1Y + 6,
            100 * sz,
            wallColors,
            wallColors.stroke
          )
        );

        faces.push(
          ...createBoxFaces(
            -105 * sx,
            f1Y + 6,
            -38 * sz,
            58 * sx,
            f1Y + 52,
            92 * sz,
            archStyle === 'modern_cubist' ? woodColors : wallColors,
            'rgba(251, 191, 36, 0.22)'
          )
        );

        faces.push(
          ...createBoxFaces(
            -96 * sx,
            f1Y + 10,
            -41 * sz,
            38 * sx,
            f1Y + 46,
            25 * sz,
            glassGlowColors,
            'rgba(255,255,255,0.4)',
            0.9
          )
        );

        // Glass Balcony Railing
        faces.push(
          ...createBoxFaces(
            28 * sx,
            f1Y + 6,
            -15 * sz,
            100 * sx,
            f1Y + 20,
            90 * sz,
            {
              top: 'rgba(186, 230, 253, 0.35)',
              front: 'rgba(125, 211, 252, 0.25)',
              right: 'rgba(56, 189, 248, 0.25)',
              back: 'rgba(56, 189, 248, 0.2)',
              left: 'rgba(125, 211, 252, 0.25)',
            },
            'rgba(186, 230, 253, 0.45)',
            0.55
          )
        );
      }

      // 5. Roof Structure (Adapts to Architectural Style!)
      const roofBaseY = hasSecondLevel ? groundY + 104 + roofOffset : groundY + 52 + firstFloorOffset;

      if (archStyle === 'spanish_mediterranean') {
        faces.push(
          ...createHipRoofFaces(
            -114 * sx,
            roofBaseY,
            -46 * sz,
            66 * sx,
            roofBaseY + 32,
            98 * sz,
            terracottaColors,
            'rgba(254, 215, 170, 0.25)'
          )
        );
      } else {
        faces.push(
          ...createBoxFaces(
            -116 * sx,
            roofBaseY,
            -48 * sz,
            72 * sx,
            roofBaseY + (archStyle === 'royal_classical' ? 14 : 8),
            102 * sz,
            wallColors,
            wallColors.stroke
          )
        );
      }

      // Optional Solar Hybrid Panels on Roof
      if (hasSolar && archStyle !== 'spanish_mediterranean') {
        faces.push(
          ...createBoxFaces(
            -85 * sx,
            roofBaseY + 9,
            -20 * sz,
            25 * sx,
            roofBaseY + 12,
            65 * sz,
            {
              top: '#0284c7',
              front: '#0369a1',
              right: '#075985',
              back: '#075985',
              left: '#0369a1',
            },
            'rgba(56, 189, 248, 0.55)'
          )
        );
      }

      // Optional Rooftop Gazebo & Sky Lounge (Right Terrace)
      if (hasRooftopGazebo && hasSecondLevel) {
        const gazY = f1Y + 6;
        faces.push(
          ...createBoxFaces(
            62 * sx,
            gazY,
            20 * sz,
            96 * sx,
            gazY + 34,
            78 * sz,
            woodColors,
            'rgba(251, 191, 36, 0.35)',
            0.85
          )
        );
      }

      // 6. Side-Elevation Architectural Windows & Landscaped Garden Trees (for natural Side & Top Views)
      faces.push(
        ...createBoxFaces(
          100 * sx,
          groundY + 8,
          24 * sz,
          104 * sx,
          groundY + 40,
          76 * sz,
          glassGlowColors,
          'rgba(255,255,255,0.35)',
          0.9
        )
      );
      faces.push(
        ...createBoxFaces(
          -107 * sx,
          groundY + 8,
          12 * sz,
          -103 * sx,
          groundY + 42,
          74 * sz,
          glassGlowColors,
          'rgba(255,255,255,0.35)',
          0.9
        )
      );

      // Landscaped Garden Cypress Trees around Perimeter
      const treeCoords = [
        { x: -116 * sx, z: 98 * sz },
        { x: 114 * sx, z: 102 * sz },
        { x: 115 * sx, z: -92 * sz },
      ];
      for (const tc of treeCoords) {
        faces.push(
          ...createBoxFaces(
            tc.x - 8,
            groundY,
            tc.z - 8,
            tc.x + 8,
            groundY + 36,
            tc.z + 8,
            {
              top: '#10b981',
              front: '#059669',
              right: '#047857',
              back: '#065f46',
              left: '#059669',
            },
            'rgba(110, 231, 183, 0.25)',
            0.9
          )
        );
      }

      // Sort all 3D faces back-to-front
      const projectedFaces = faces.map((face) => {
        const pts = face.verts.map((v) => project(v, cx, cy, baseScale, rotY, rotX));
        const avgDepth = pts.reduce((acc, p) => acc + p.depth, 0) / pts.length;
        return { ...face, pts, avgDepth };
      });

      projectedFaces.sort((a, b) => b.avgDepth - a.avgDepth);

      for (const pf of projectedFaces) {
        ctx.save();
        ctx.globalAlpha = pf.alpha ?? 1;
        ctx.beginPath();
        ctx.moveTo(pf.pts[0].x, pf.pts[0].y);
        for (let i = 1; i < pf.pts.length; i++) {
          ctx.lineTo(pf.pts[i].x, pf.pts[i].y);
        }
        ctx.closePath();
        ctx.fillStyle = pf.color;
        ctx.fill();

        if (pf.stroke) {
          ctx.strokeStyle = pf.stroke;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3D Callout Labels when Exploded
      if (exp > 0.1) {
        const drawCallout = (pt3d: Point3D, label: string) => {
          const p = project(pt3d, cx, cy, baseScale, rotY, rotX);
          ctx.save();
          ctx.globalAlpha = Math.min(1, exp * 1.2);
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + 26, p.y - 16);
          ctx.stroke();

          ctx.fillStyle = 'rgba(8, 12, 20, 0.88)';
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
          ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
          const textWidth = ctx.measureText(label).width;
          ctx.fillRect(p.x + 26, p.y - 30, textWidth + 14, 22);
          ctx.strokeRect(p.x + 26, p.y - 30, textWidth + 14, 22);

          ctx.fillStyle = '#f8fafc';
          ctx.fillText(label, p.x + 33, p.y - 15);
          ctx.restore();
        };

        drawCallout(
          { x: 0, y: roofBaseY + 14, z: 0 },
          hasSolar ? 'Solar Hybrid Roof Deck' : 'Architectural Roof Crown'
        );
        if (hasSecondLevel) {
          drawCallout(
            { x: -30 * sx, y: f1Y + 28, z: -38 * sz },
            `${bedrooms} Bedroom Suites & Lounge`
          );
        }
        drawCallout(
          { x: 50 * sx, y: groundY + 18, z: -55 * sz },
          hasPool ? 'Ground Pavilion & Infinity Pool' : 'Ground Reception & Lawn'
        );
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [
    plotScale,
    archStyle,
    floorMode,
    bedrooms,
    material,
    lighting,
    hasPool,
    hasSolar,
    hasRooftopGazebo,
    exploded,
    autoRotate,
  ]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    targetYawRef.current = null;
    setAutoRotate(false);
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    const nextYaw = yawRef.current + dx * 0.008;
    const nextPitch = Math.max(0.15, Math.min(1.22, pitchRef.current + dy * 0.006));
    yawRef.current = nextYaw;
    pitchRef.current = nextPitch;
    targetPitchRef.current = nextPitch;
    setYaw(nextYaw);
    setPitch(nextPitch);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Build WhatsApp Message to Finalize Deal with CEO Haji Fayyaz
  const selectedAddonsList = [
    hasPool ? 'Private Swimming Pool' : null,
    hasSolar ? 'Solar Hybrid System' : null,
    hasRooftopGazebo ? 'Rooftop Sky Gazebo' : null,
    hasHomeTheater ? 'Cinema Room' : null,
    hasSmartAutomation ? 'Smart Automation' : null,
  ]
    .filter(Boolean)
    .join(', ');

  const whatsappDealText = encodeURIComponent(
    `Assalam-o-Alaikum CEO Haji Fayyaz (Bhatti Real Estate),\n\n` +
      `I have designed my custom house in your 3D Studio and want to finalize the deal:\n` +
      `• Design Code: ${designCode}\n` +
      `• Client Name: ${clientName || 'Valued Client'}\n` +
      `• Phone: ${clientPhone || 'Provided on chat'}\n` +
      `• Target Location: ${clientSociety}, ${clientCity}\n` +
      `• Architectural Style: ${pricingSummary.style.name}\n` +
      `• Plot Size: ${plotScale} (${pricingSummary.totalCoveredSqFt.toLocaleString()} sq.ft covered)\n` +
      `• Floors: ${
        floorMode === 'single'
          ? 'Single Storey'
          : floorMode === 'double'
          ? 'Double Storey'
          : 'Basement + Double Storey'
      }\n` +
      `• Bedrooms: ${bedrooms} Master Bedrooms\n` +
      `• Facade Finish: ${material.toUpperCase()}\n` +
      `• Custom Features: ${selectedAddonsList || 'Standard Turnkey'}\n` +
      `• Estimated Turnkey Deal Price: ${pricingSummary.formattedTotal} (${pricingSummary.exactPKR})\n` +
      (clientNotes ? `• Special Notes: ${clientNotes}\n` : '') +
      `\nPlease review my 3D design so we can finalize the contract.`
  );

  const handleFinalizeDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDealSubmitted(true);
  };

  return (
    <section
      id="custom-3d-designer"
      className="py-24 bg-[#080c14] border-t border-slate-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 mb-3">
              <Move3d className="w-4 h-4 text-sky-400" />
              <span>Bhatti Real Estate · Custom 3D House Design & Deal Studio</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance">
              Design Your Custom House in 3D & Finalize Your Deal
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base font-light leading-relaxed">
              Choose your preferred architectural style, customize your plot size, floors, bedrooms, and luxury amenities, inspect your residence live in <strong className="text-white font-medium">360° 3D</strong>, and send your finalized blueprint directly to <strong className="text-sky-400 font-medium">CEO Haji Fayyaz — Bhatti Real Estate</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-[#0e1422] border border-slate-800 px-4 py-2.5 rounded-xl self-start lg:self-auto">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Design ID: </span>
            <strong className="text-sky-400">{designCode}</strong>
          </div>
        </div>

        {/* Main Studio Grid: Left 7 Cols (3D Viewport) + Right 5 Cols (Custom Configurator & Deal Finalizer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLUMNS: Interactive 3D Viewport */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#070b14] shadow-2xl">
              <div className="relative w-full h-[460px] sm:h-[560px]">
                <canvas
                  ref={canvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  className="w-full h-full cursor-grab active:cursor-grabbing block touch-none"
                />

                {/* Top-Left Live 3D Blueprint Telemetry HUD */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 pointer-events-none bg-black/65 backdrop-blur-md border border-white/10 rounded-xl p-4 max-w-xs">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-sky-400">
                    Bhatti Real Estate · Live 3D CAD
                  </div>
                  <div className="font-heading text-base sm:text-lg font-bold text-white mt-0.5">
                    {plotScale} {pricingSummary.style.name}
                  </div>
                  <div className="text-xs text-slate-300 mt-1 font-mono tabular-nums">
                    {pricingSummary.totalCoveredSqFt.toLocaleString()} Sq.Ft · {bedrooms} Beds
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-400 mt-1 tabular-nums">
                    Est. Deal: {pricingSummary.formattedTotal}
                  </div>
                </div>

                {/* Top-Right 3D Camera & Floor Explode Controls */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setExploded(!exploded)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      exploded
                        ? 'bg-sky-600 text-white border-sky-400 shadow-lg'
                        : 'bg-black/60 text-slate-200 border-white/15 hover:border-white/30'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{exploded ? 'Merge Floors' : 'Explode 3D Floors'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      autoRotate
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                        : 'bg-black/60 text-slate-300 border-white/15 hover:border-white/30'
                    }`}
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                    <span>360° Spin</span>
                  </button>
                </div>

                {/* Bottom Bar inside 3D Viewport: Camera Angles & Lighting */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10 flex flex-wrap items-center justify-between gap-2 bg-black/65 backdrop-blur-md border border-white/10 rounded-xl p-3">
                  {/* Camera Angle Presets */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 font-medium mr-1 hidden sm:inline">
                      View:
                    </span>
                    {(
                      [
                        { id: 'perspective', label: '3D Perspective' },
                        { id: 'front_elevation', label: 'Front View' },
                        { id: 'side_elevation', label: 'Side View' },
                        { id: 'top_blueprint', label: 'Top Aerial View' },
                      ] as const
                    ).map((cam) => (
                      <button
                        key={cam.id}
                        type="button"
                        onClick={() => handleCameraPreset(cam.id)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                          cameraPreset === cam.id
                            ? 'bg-sky-600 text-white'
                            : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700'
                        }`}
                      >
                        {cam.label}
                      </button>
                    ))}
                  </div>

                  {/* Time of Day Lighting */}
                  <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setLighting('day')}
                      className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                        lighting === 'day' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      <span>Day</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLighting('dusk')}
                      className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                        lighting === 'dusk' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sunset className="w-3.5 h-3.5" />
                      <span>Dusk</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLighting('night')}
                      className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                        lighting === 'night' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      <span>Night</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Facade Material Swatches Bar below 3D Canvas */}
            <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Exterior Facade Material:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    { id: 'travertine', label: 'Italian Travertine' },
                    { id: 'limestone', label: 'White Limestone' },
                    { id: 'obsidian', label: 'Obsidian & Teak' },
                    { id: 'sandstone', label: 'Spanish Sandstone' },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMaterial(m.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      material === m.id
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: Custom House Configurator & Deal Finalizer */}
          <div className="lg:col-span-5 bg-[#0e1422] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
            {/* Step 1: Choose Preferred House Design Style */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-sky-400 block mb-2.5">
                01. Choose House Architectural Design
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {(Object.keys(styleLabels) as ArchStyle[]).map((styleKey) => {
                  const item = styleLabels[styleKey];
                  const active = archStyle === styleKey;
                  return (
                    <button
                      key={styleKey}
                      type="button"
                      onClick={() => setArchStyle(styleKey)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        active
                          ? 'bg-sky-600/20 border-sky-500 text-white shadow-md'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold text-white leading-snug">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Plot Size & Floors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-sky-400 block mb-2">
                  02. Plot Size
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['5 Marla', '10 Marla', '1 Kanal', '2 Kanal'] as PlotScale[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setPlotScale(s);
                        setBedrooms(plotConfigs[s].defaultBeds);
                      }}
                      className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                        plotScale === s
                          ? 'bg-sky-600 border-sky-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-sky-400 block mb-2">
                  03. Storeys / Elevations
                </label>
                <div className="flex flex-col gap-1.5">
                  {(
                    [
                      { id: 'single', label: 'Single Storey' },
                      { id: 'double', label: 'Double Storey' },
                      { id: 'basement_double', label: 'Basement + Double Storey' },
                    ] as const
                  ).map((fl) => (
                    <button
                      key={fl.id}
                      type="button"
                      onClick={() => setFloorMode(fl.id)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-semibold border text-left transition-all ${
                        floorMode === fl.id
                          ? 'bg-sky-600 border-sky-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {fl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Bedrooms & Custom Features */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  04. Master Bedrooms & Custom Amenities
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400">Beds:</span>
                  {[3, 4, 5, 6, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setBedrooms(num)}
                      className={`w-6 h-6 rounded text-xs font-mono font-bold transition-colors ${
                        bedrooms === num
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {[
                  { label: 'Swimming Pool (3D)', state: hasPool, setter: setHasPool },
                  { label: 'Solar Hybrid Roof (3D)', state: hasSolar, setter: setHasSolar },
                  { label: 'Rooftop Gazebo (3D)', state: hasRooftopGazebo, setter: setHasRooftopGazebo },
                  { label: 'Basement Cinema', state: hasHomeTheater, setter: setHasHomeTheater },
                ].map((addon) => (
                  <button
                    key={addon.label}
                    type="button"
                    onClick={() => addon.setter(!addon.state)}
                    className={`p-2.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition-all ${
                      addon.state
                        ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        addon.state ? 'text-emerald-400' : 'text-slate-600'
                      }`}
                    />
                    <span className="truncate">{addon.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Deal Summary Box */}
            <div className="p-4 rounded-2xl bg-[#080c14] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Estimated Turnkey Deal Budget:</span>
                <span className="font-mono text-sky-400">
                  {pricingSummary.totalCoveredSqFt.toLocaleString()} Sq.Ft
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                {pricingSummary.formattedTotal}
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/80">
                <span>Structure: {pricingSummary.formattedStructure}</span>
                <span>Add-ons: {pricingSummary.formattedAddons}</span>
              </div>
            </div>

            {/* Step 5: Send Design & Finalize Deal with CEO Haji Fayyaz */}
            {dealSubmitted ? (
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3 text-center">
                <div className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">
                  3D Design Sent to CEO Haji Fayyaz!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your custom <strong className="text-white">{plotScale} {pricingSummary.style.name}</strong> blueprint (<strong className="text-sky-400 font-mono">{designCode}</strong>) has been registered with <strong className="text-white">Bhatti Real Estate</strong>. Click below to open your instant WhatsApp deal thread with <strong className="text-white">CEO Haji Fayyaz</strong>.
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  <a
                    href={`https://wa.me/923084476211?text=${whatsappDealText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>OPEN WHATSAPP DEAL CHAT (0308 4476211)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setDealSubmitted(false)}
                    className="text-[11px] text-slate-400 hover:text-white underline"
                  >
                    Modify 3D Design Specifications
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFinalizeDealSubmit} className="space-y-3 pt-1 border-t border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  05. Send 3D Design to CEO Haji Fayyaz to Finalize Deal
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp *"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <select
                    value={clientCity}
                    onChange={(e) => setClientCity(e.target.value as 'Lahore' | 'Islamabad' | 'Karachi')}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Karachi">Karachi</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Sector / Society (e.g. DHA 8)"
                    value={clientSociety}
                    onChange={(e) => setClientSociety(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-sky-950/50 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>REGISTER 3D DESIGN & FINALIZE DEAL</span>
                  </button>

                  <a
                    href={`https://wa.me/923084476211?text=${whatsappDealText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>SEND 3D DESIGN ON WHATSAPP (CEO HAJI FAYYAZ)</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
