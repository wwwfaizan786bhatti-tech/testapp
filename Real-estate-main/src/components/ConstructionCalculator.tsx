import React, { useState, useMemo } from 'react';
import { Hammer, Layers, CheckCircle2, ArrowUpRight, MessageCircle, ShieldCheck, Building2, Sparkles } from 'lucide-react';

interface ConstructionCalculatorProps {
  currency: 'PKR' | 'USD';
  onRequestBOQ: (summary: string) => void;
}

type PlotSize = '5 Marla' | '10 Marla' | '1 Kanal';
type QualityTier = 'grey' | 'turnkey_a' | 'luxury_aplus';
type FloorConfig = 'double' | 'basement_double';
type CityOption = 'Lahore' | 'Islamabad' | 'Karachi';

interface PlotSpec {
  label: PlotSize;
  plotDimensions: string;
  doubleStoreySqFt: number;
  withBasementSqFt: number;
  typicalBeds: string;
  timelineMonths: string;
}

const PLOT_SPECS: Record<PlotSize, PlotSpec> = {
  '5 Marla': {
    label: '5 Marla',
    plotDimensions: '25 × 45 ft (1,125 Sq. Ft.)',
    doubleStoreySqFt: 1950,
    withBasementSqFt: 2750,
    typicalBeds: '3 - 4 Bedrooms',
    timelineMonths: '7 - 9 Months',
  },
  '10 Marla': {
    label: '10 Marla',
    plotDimensions: '35 × 65 ft (2,250 Sq. Ft.)',
    doubleStoreySqFt: 3400,
    withBasementSqFt: 4850,
    typicalBeds: '4 - 5 Bedrooms',
    timelineMonths: '10 - 12 Months',
  },
  '1 Kanal': {
    label: '1 Kanal',
    plotDimensions: '50 × 90 ft (4,500 Sq. Ft.)',
    doubleStoreySqFt: 6200,
    withBasementSqFt: 8900,
    typicalBeds: '5 - 6 Bedrooms + Staff Quarter',
    timelineMonths: '14 - 18 Months',
  },
};

const QUALITY_TIERS: Record<
  QualityTier,
  {
    name: string;
    subtitle: string;
    ratePerSqFt: number;
    basementRateMultiplier: number;
    features: string[];
  }
> = {
  grey: {
    name: 'Grey Structure Only',
    subtitle: 'A-Grade structural shell with steel, brick & conduits',
    ratePerSqFt: 2950,
    basementRateMultiplier: 1.22,
    features: [
      'A-Class Awal Bricks & 60-Grade Deformed Steel',
      'DG / Maple Leaf Cement & Lawrencepur Sand',
      'PPRC / UPVC Piping (Dadex / Popular)',
      ' Newage / Pakistan Cables Concealed Conduits',
      'Termite Proofing & Bitumen Waterproofing',
    ],
  },
  turnkey_a: {
    name: 'A-Class Turnkey',
    subtitle: 'Complete move-in ready modern residence',
    ratePerSqFt: 5650,
    basementRateMultiplier: 1.18,
    features: [
      'Complete Grey Structure Included',
      'Master / Sonex Porcelain Tiles & Granite Stairs',
      'Semi-Solid Ashwood Doors & UV High-Gloss Kitchen',
      'Double-Glazed Aluminum Windows (Chawla / Prime)',
      'Porta / Master Sanitary & Philips LED Lighting',
    ],
  },
  luxury_aplus: {
    name: 'A+ Bespoke Luxury',
    subtitle: 'Designer architectural villa with imported finishes',
    ratePerSqFt: 7900,
    basementRateMultiplier: 1.15,
    features: [
      'Complete Grey Structure + Travertine Facade',
      'Imported Spanish / Italian Porcelain & Marble',
      'Grohe / Kohler Sanitary & Walk-in Rain Showers',
      'Solid Burma Teak / Walnut Doors & Designer Kitchen',
      'Smart Home Automation & Solar Hybrid Readiness',
    ],
  },
};

const CITY_MULTIPLIERS: Record<CityOption, { factor: number; note: string }> = {
  Lahore: { factor: 1.0, note: 'DHA / Bahria Town / LDA Standard Baseline' },
  Islamabad: { factor: 1.05, note: '+5% CDA Stone Excavation & Margalla Zoning' },
  Karachi: { factor: 1.04, note: '+4% Coastal Sulfate-Resistant Cement & Piling' },
};

export const ConstructionCalculator: React.FC<ConstructionCalculatorProps> = ({
  currency,
  onRequestBOQ,
}) => {
  const [selectedPlot, setSelectedPlot] = useState<PlotSize>('10 Marla');
  const [qualityTier, setQualityTier] = useState<QualityTier>('turnkey_a');
  const [floorConfig, setFloorConfig] = useState<FloorConfig>('double');
  const [city, setCity] = useState<CityOption>('Lahore');

  const calculation = useMemo(() => {
    const plot = PLOT_SPECS[selectedPlot];
    const tier = QUALITY_TIERS[qualityTier];
    const cityInfo = CITY_MULTIPLIERS[city];

    const coveredArea =
      floorConfig === 'double' ? plot.doubleStoreySqFt : plot.withBasementSqFt;

    const baseRate = tier.ratePerSqFt * cityInfo.factor;
    const effectiveRate = Math.round(
      floorConfig === 'basement_double'
        ? baseRate * tier.basementRateMultiplier
        : baseRate
    );

    const totalCostPKR = Math.round(coveredArea * effectiveRate);

    // Breakdown calculations
    let greyCost = 0;
    let finishingCost = 0;
    let mepFixturesCost = 0;
    let archApprovalsCost = 0;

    if (qualityTier === 'grey') {
      greyCost = Math.round(totalCostPKR * 0.82);
      mepFixturesCost = Math.round(totalCostPKR * 0.12);
      archApprovalsCost = totalCostPKR - greyCost - mepFixturesCost;
    } else {
      greyCost = Math.round(totalCostPKR * 0.48);
      finishingCost = Math.round(totalCostPKR * 0.32);
      mepFixturesCost = Math.round(totalCostPKR * 0.15);
      archApprovalsCost = totalCostPKR - greyCost - finishingCost - mepFixturesCost;
    }

    return {
      coveredArea,
      effectiveRate,
      totalCostPKR,
      greyCost,
      finishingCost,
      mepFixturesCost,
      archApprovalsCost,
      plot,
      tier,
      cityInfo,
    };
  }, [selectedPlot, qualityTier, floorConfig, city]);

  const formatPKR = (amount: number) => {
    if (currency === 'USD') {
      const usd = Math.round(amount / 280);
      return `$${usd.toLocaleString()} USD`;
    }
    if (amount >= 10000000) {
      const crore = amount / 10000000;
      return `PKR ${crore.toFixed(2)} Crore`;
    }
    const lacs = amount / 100000;
    return `PKR ${lacs.toFixed(1)} Lacs`;
  };

  const formatExactPKR = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-PK')}`;
  };

  const whatsappText = encodeURIComponent(
    `Assalam-o-Alaikum Bhatti Real Estate, I used your Construction Cost Calculator and would like a detailed BOQ for:\n` +
      `• Plot Size: ${selectedPlot} (${calculation.coveredArea.toLocaleString()} sq.ft)\n` +
      `• Package: ${calculation.tier.name}\n` +
      `• Floors: ${floorConfig === 'double' ? 'Double Storey' : 'Basement + Double Storey'}\n` +
      `• City: ${city}\n` +
      `• Estimated Budget: ${formatPKR(calculation.totalCostPKR)}`
  );

  return (
    <section id="construction-calculator" className="py-24 bg-[#0a0f1a] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 mb-3">
            <Hammer className="w-4 h-4 text-sky-400" />
            <span>Bhatti Real Estate · Turnkey Build Estimator (CEO Haji Fayyaz)</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance">
            Bhatti Real Estate Construction Cost Calculator
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
            Select your plot size (<strong className="text-slate-200 font-medium">5 Marla, 10 Marla, or 1 Kanal</strong>) and finishing standard to get an instant construction budget in Pakistani Rupees from <strong className="text-slate-200 font-medium">Bhatti Real Estate</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Interactive Controls */}
          <div className="lg:col-span-7 bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
            {/* Step 1: Select Plot Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  01. Select Plot Size
                </label>
                <span className="text-xs font-mono text-sky-400">
                  {calculation.plot.plotDimensions}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {(['5 Marla', '10 Marla', '1 Kanal'] as PlotSize[]).map((size) => {
                  const active = selectedPlot === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedPlot(size)}
                      className={`p-4 rounded-xl border text-left transition-all duration-150 ${
                        active
                          ? 'bg-sky-600/15 border-sky-500 text-white shadow-lg shadow-sky-950/40'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-heading text-lg sm:text-xl font-bold text-white">
                        {size}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">
                        {PLOT_SPECS[size].doubleStoreySqFt.toLocaleString()} sq.ft base
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Construction Package */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                02. Construction Specification & Material Grade
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(QUALITY_TIERS) as QualityTier[]).map((key) => {
                  const tier = QUALITY_TIERS[key];
                  const active = qualityTier === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setQualityTier(key)}
                      className={`p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between ${
                        active
                          ? 'bg-sky-600/15 border-sky-500 text-white shadow-lg shadow-sky-950/40'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-white">{tier.name}</div>
                        <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                          {tier.subtitle}
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800/80 text-xs font-mono font-semibold text-sky-400 tabular-nums">
                        Rs. {tier.ratePerSqFt.toLocaleString()} / sq.ft
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Floor Configuration & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                  03. Floor Plan Configuration
                </label>
                <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setFloorConfig('double')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      floorConfig === 'double'
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Double Storey
                  </button>
                  <button
                    type="button"
                    onClick={() => setFloorConfig('basement_double')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      floorConfig === 'basement_double'
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    + Full Basement
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                  04. Construction City
                </label>
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
                  {(['Lahore', 'Islamabad', 'Karachi'] as CityOption[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCity(c)}
                      className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                        city === c
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Package Specifications Included */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Included in {calculation.tier.name}:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {calculation.tier.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Live PKR Budget Estimate Breakdown */}
          <div className="lg:col-span-5 bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 block">
                  Estimated Construction Budget
                </span>
                <span className="text-xs text-slate-400">
                  {selectedPlot} · {floorConfig === 'double' ? 'Double Storey' : 'With Basement'} · {city}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {calculation.plot.timelineMonths}
              </span>
            </div>

            {/* Primary Total Cost Display */}
            <div className="p-5 rounded-xl bg-[#080c14] border border-slate-800/90">
              <div className="text-xs text-slate-400 mb-1">
                Total Estimated Turnkey Cost
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-white tabular-nums tracking-tight">
                {formatPKR(calculation.totalCostPKR)}
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-sky-400 mt-2 pt-2 border-t border-slate-800/80 tabular-nums">
                <span>{formatExactPKR(calculation.totalCostPKR)}</span>
                <span>
                  {calculation.coveredArea.toLocaleString()} sq.ft @ Rs.{' '}
                  {calculation.effectiveRate.toLocaleString()}/sq.ft
                </span>
              </div>
            </div>

            {/* Phase-by-Phase Cost Breakdown */}
            <div className="space-y-3.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Stage-Wise Cost Allocation (PKR)
              </div>

              {/* 1. Grey Structure */}
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">
                    Grey Structure & Foundation
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Steel, bricks, cement, RCC slabs & piping
                  </div>
                </div>
                <div className="text-right font-mono tabular-nums">
                  <div className="text-xs font-bold text-sky-400">
                    {formatPKR(calculation.greyCost)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {formatExactPKR(calculation.greyCost)}
                  </div>
                </div>
              </div>

              {/* 2. Finishing & Woodwork */}
              {calculation.finishingCost > 0 && (
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Finishing, Tiles & Woodwork
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Flooring, kitchen, doors, wardrobes & glass
                    </div>
                  </div>
                  <div className="text-right font-mono tabular-nums">
                    <div className="text-xs font-bold text-emerald-400">
                      {formatPKR(calculation.finishingCost)}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {formatExactPKR(calculation.finishingCost)}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. MEP, Sanitary & Electrical */}
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">
                    MEP, Sanitary & Electrification
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Wiring, switchgear, bath fittings & paint
                  </div>
                </div>
                <div className="text-right font-mono tabular-nums">
                  <div className="text-xs font-bold text-slate-200">
                    {formatPKR(calculation.mepFixturesCost)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {formatExactPKR(calculation.mepFixturesCost)}
                  </div>
                </div>
              </div>

              {/* 4. Architecture & Approvals */}
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">
                    Architecture, Soil Test & Approvals
                  </div>
                  <div className="text-[11px] text-slate-400">
                    3D elevation, structural drawing & DHA/CDA NOC
                  </div>
                </div>
                <div className="text-right font-mono tabular-nums">
                  <div className="text-xs font-bold text-slate-200">
                    {formatPKR(calculation.archApprovalsCost)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {formatExactPKR(calculation.archApprovalsCost)}
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  onRequestBOQ(
                    `${selectedPlot} ${calculation.tier.name} Construction in ${city} (~${formatPKR(
                      calculation.totalCostPKR
                    )})`
                  )
                }
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-sky-950/50 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>REQUEST DETAILED BOQ & CONSULTATION</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/923084476211?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/30 text-emerald-300 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>GET BOQ ON WHATSAPP (0308 4476211)</span>
              </a>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{calculation.cityInfo.note}. Excludes land acquisition cost.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
