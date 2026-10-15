import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, ShieldCheck } from 'lucide-react';

export const InvestmentCalculator: React.FC = () => {
  const [propertyPriceCrore, setPropertyPriceCrore] = useState<number>(10); // in Crore PKR
  const [expectedAppreciation, setExpectedAppreciation] = useState<number>(14); // % per year
  const [rentalYieldPercent, setRentalYieldPercent] = useState<number>(7.5); // % per year
  const [holdingYears, setHoldingYears] = useState<number>(5);

  const propertyPricePKR = propertyPriceCrore * 10000000;
  const annualRentalIncomePKR = (propertyPricePKR * rentalYieldPercent) / 100;
  const monthlyRentalIncomePKR = Math.round(annualRentalIncomePKR / 12);

  // Compound future value
  const futureValuePKR = propertyPricePKR * Math.pow(1 + expectedAppreciation / 100, holdingYears);
  const totalRentalIncomePKR = annualRentalIncomePKR * holdingYears;
  const totalReturnPKR = futureValuePKR + totalRentalIncomePKR - propertyPricePKR;

  const formatCrore = (pkr: number) => {
    const crore = pkr / 10000000;
    return `PKR ${crore.toFixed(2)} Crore`;
  };

  const formatLacs = (pkr: number) => {
    const lacs = pkr / 100000;
    return `PKR ${lacs.toFixed(1)} Lacs`;
  };

  return (
    <section className="py-24 bg-[#080c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0e1422] border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading and Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
                <Calculator className="w-4 h-4 text-sky-400" />
                <span>Bhatti Real Estate · Wealth Modeling</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Bhatti Real Estate ROI & Yield Calculator
              </h2>

              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Estimate projected capital appreciation and net annual rental yield with <strong className="text-slate-200 font-medium">Bhatti Real Estate</strong> (CEO Haji Fayyaz) across prime residential and commercial corridors in Lahore, Islamabad, and Karachi.
              </p>

              {/* Sliders */}
              <div className="space-y-5 pt-2">
                {/* Property Value */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                    <span>Acquisition Budget (PKR Crore):</span>
                    <span className="font-mono text-sky-400 font-bold">{propertyPriceCrore} Crore ({formatCrore(propertyPricePKR)})</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="50"
                    step="0.5"
                    value={propertyPriceCrore}
                    onChange={(e) => setPropertyPriceCrore(parseFloat(e.target.value))}
                    className="w-full accent-sky-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>PKR 3 Crore</span>
                    <span>PKR 25 Crore</span>
                    <span>PKR 50 Crore</span>
                  </div>
                </div>

                {/* Annual Appreciation Rate */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                    <span>Expected Annual Appreciation:</span>
                    <span className="font-mono text-emerald-400 font-bold">{expectedAppreciation}% / year</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="22"
                    step="0.5"
                    value={expectedAppreciation}
                    onChange={(e) => setExpectedAppreciation(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>8% (Conservative)</span>
                    <span>14% (DHA / Diplomatic Average)</span>
                    <span>22% (High-Growth)</span>
                  </div>
                </div>

                {/* Rental Yield Rate */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                    <span>Target Rental Yield (Annual):</span>
                    <span className="font-mono text-sky-400 font-bold">{rentalYieldPercent}% / year</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="12"
                    step="0.25"
                    value={rentalYieldPercent}
                    onChange={(e) => setRentalYieldPercent(parseFloat(e.target.value))}
                    className="w-full accent-sky-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>4% (Residential)</span>
                    <span>7.5% (Executive Villa/Duplex)</span>
                    <span>12% (Grade-A Commercial)</span>
                  </div>
                </div>

                {/* Holding Horizon */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                    <span>Investment Horizon:</span>
                    <span className="font-mono text-white font-bold">{holdingYears} Years</span>
                  </div>
                  <div className="flex gap-2">
                    {[3, 5, 7, 10].map((years) => (
                      <button
                        key={years}
                        type="button"
                        onClick={() => setHoldingYears(years)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          holdingYears === years
                            ? 'bg-sky-600 border-sky-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {years} Years
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Projection Dashboard */}
            <div className="lg:col-span-5 bg-[#080c14] border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-800/80">
                  {holdingYears}-Year Financial Projection
                </div>

                <div className="space-y-5 my-6">
                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">Projected Asset Value ({holdingYears} Yrs)</span>
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums tracking-tight">
                      {formatCrore(futureValuePKR)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-800/80">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Est. Monthly Rental</span>
                      <span className="text-sm font-bold font-mono text-sky-400 tabular-nums">
                        {formatLacs(monthlyRentalIncomePKR)} / mo
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Cumulative Rent</span>
                      <span className="text-sm font-bold font-mono text-slate-200 tabular-nums">
                        {formatCrore(totalRentalIncomePKR)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">Net Wealth Created (Growth + Rent)</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                      +{formatCrore(totalReturnPKR)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 font-light flex items-center gap-1.5 pt-3 border-t border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Figures are illustrative projections based on historical prime Pakistan urban indices.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
