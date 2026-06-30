import React, { useState } from 'react';
import { SchemaField } from '../types';
import { SCHEMA_FIELDS } from '../data';
import { Undo2, Redo2, ZoomIn, ZoomOut, Maximize2, Trash2, PlusCircle, Sparkles, ChevronRight, Check, X, GripVertical } from 'lucide-react';

interface RuleSetsProps {
  fields: SchemaField[];
}

export default function RuleSets({ fields }: RuleSetsProps) {
  // Logic Builder State representing Mockup Logic
  const [riskScore, setRiskScore] = useState<string>('85.0');
  const [amountUsd, setAmountUsd] = useState<string>('10000');
  const [accountAgeDays, setAccountAgeDays] = useState<string>('30');
  const [mccList, setMccList] = useState<string[]>(['7995', '6051']);
  const [newMcc, setNewMcc] = useState<string>('');
  const [thenAction, setThenAction] = useState<string>('Flag for Review');
  const [thenReason, setThenReason] = useState<string>('High Risk Merchant Alert');

  // Interactive checklist in Data Explorer
  const [explorerChecked, setExplorerChecked] = useState<Record<string, boolean>>({
    user_id: true,
    risk_score: true,
    account_age_days: false,
    amount_usd: true,
    merchant_mcc: true,
  });

  const handleToggleExplorer = (name: string) => {
    setExplorerChecked((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleAddMcc = () => {
    const trimmed = newMcc.trim();
    if (trimmed && !mccList.includes(trimmed)) {
      setMccList((prev) => [...prev, trimmed]);
      setNewMcc('');
    }
  };

  const handleRemoveMcc = (val: string) => {
    setMccList((prev) => prev.filter((item) => item !== val));
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-surface-container relative max-h-[calc(100vh-56px)]">
      {/* Rule Canvas Area */}
      <div className="flex-1 relative overflow-y-auto dot-grid p-8 custom-scrollbar">
        {/* Canvas Toolbar floating top left */}
        <div className="absolute top-4 left-4 z-10 flex gap-1.5 bg-surface-container-lowest p-1 rounded shadow-sm border border-outline-variant">
          <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant cursor-pointer" title="Undo">
            <Undo2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant cursor-pointer" title="Redo">
            <Redo2 className="w-4 h-4" />
          </button>
          <div className="w-px bg-outline-variant mx-1 my-1"></div>
          <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant cursor-pointer" title="Zoom In">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant cursor-pointer" title="Zoom Out">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant cursor-pointer" title="Fit Screen">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* AI Generator prompt floating top right */}
        <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-300 rounded px-3 py-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
          <span className="text-[11px] font-bold text-emerald-800">Gemini Active Suggestion</span>
        </div>

        {/* Logic Flow Builder */}
        <div className="max-w-4xl mx-auto space-y-6 pt-10 pb-32">
          {/* Root Logic Block (IF) */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded shadow-sm relative z-10">
            {/* Header of Block */}
            <div className="flex items-center gap-3 p-3 border-b border-outline-variant bg-surface-container-lowest rounded-t">
              <GripVertical className="w-4 h-4 text-on-surface-variant cursor-grab" />
              <div className="bg-on-surface text-white px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider">
                IF
              </div>
              <span className="text-sm font-extrabold text-primary">Fraud Prevention Ruleset Alpha</span>

              <div className="ml-auto flex items-center gap-4">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-outline-variant rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                  </div>
                  <span className="ml-2 text-xs text-on-surface-variant font-semibold">Active</span>
                </label>
              </div>
            </div>

            {/* Logical branches */}
            <div className="p-5 space-y-4">
              {/* Outer AND Group (Green vertical line) */}
              <div className="relative pl-8 border-l-2 border-emerald-600 ml-2 space-y-3">
                {/* Rotated Group Badge */}
                <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 bg-surface-container-lowest border border-emerald-600 text-emerald-700 px-1.5 py-0.5 rounded text-[9px] font-extrabold z-10 -rotate-90">
                  AND
                </div>

                {/* Condition 1 */}
                <div className="flex items-center gap-2 bg-surface-container-lowest p-2 rounded border border-outline-variant hover:shadow-sm transition-all">
                  <GripVertical className="w-3.5 h-3.5 text-on-surface-variant cursor-grab" />
                  <select className="h-8 text-xs border border-outline-variant rounded bg-surface-container font-mono min-w-[150px] focus:ring-1 focus:ring-primary focus:border-primary px-2">
                    <option>User Context.risk_score</option>
                    <option>Transaction.amount_usd</option>
                  </select>
                  <select className="h-8 text-xs border border-outline-variant rounded bg-surface-container min-w-[100px] text-center font-bold focus:ring-1 focus:ring-primary focus:border-primary px-2">
                    <option>is greater than</option>
                    <option>equals</option>
                    <option>less than</option>
                  </select>
                  <input
                    type="text"
                    value={riskScore}
                    onChange={(e) => setRiskScore(e.target.value)}
                    className="h-8 text-xs border border-outline-variant rounded w-20 font-mono px-2 text-right focus:ring-1 focus:ring-primary"
                  />
                  <button className="ml-auto text-on-surface-variant hover:text-red-600 p-1 rounded cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* OR Subgroup (Orange vertical line) */}
                <div className="relative pl-8 border-l-2 border-amber-500 ml-4 space-y-3 mt-4">
                  <div className="absolute -left-[11px] top-1/2 -translate-y-1/2 bg-surface-container-lowest border border-amber-500 text-amber-700 px-1.5 py-0.5 rounded text-[9px] font-extrabold z-10 -rotate-90">
                    OR
                  </div>

                  {/* Condition 2 */}
                  <div className="flex items-center gap-2 bg-surface-container-lowest p-2 rounded border border-outline-variant hover:shadow-sm transition-all">
                    <GripVertical className="w-3.5 h-3.5 text-on-surface-variant cursor-grab" />
                    <select className="h-8 text-xs border border-outline-variant rounded bg-surface-container font-mono min-w-[150px] focus:ring-1 focus:ring-primary focus:border-primary px-2">
                      <option>Transaction.amount_usd</option>
                    </select>
                    <select className="h-8 text-xs border border-outline-variant rounded bg-surface-container min-w-[100px] text-center font-bold focus:ring-1 focus:ring-primary focus:border-primary px-2">
                      <option>is greater than</option>
                    </select>
                    <input
                      type="text"
                      value={amountUsd}
                      onChange={(e) => setAmountUsd(e.target.value)}
                      className="h-8 text-xs border border-outline-variant rounded w-24 font-mono px-2 text-right focus:ring-1 focus:ring-primary"
                    />
                    <button className="ml-auto text-on-surface-variant hover:text-red-600 p-1 rounded cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Condition 3 (List matching) */}
                  <div className="flex items-center gap-2 bg-surface-container-lowest p-2 rounded border border-outline-variant hover:shadow-sm transition-all">
                    <GripVertical className="w-3.5 h-3.5 text-on-surface-variant cursor-grab" />
                    <select className="h-8 text-xs border border-outline-variant rounded bg-surface-container font-mono min-w-[150px] focus:ring-1 focus:ring-primary focus:border-primary px-2">
                      <option>Transaction.merchant_mcc</option>
                    </select>
                    <select className="h-8 text-xs border border-outline-variant rounded bg-surface-container min-w-[100px] text-center font-bold focus:ring-1 focus:ring-primary focus:border-primary px-2">
                      <option>is in list</option>
                    </select>

                    <div className="flex gap-1 items-center border border-outline-variant bg-surface-container rounded px-2 h-8">
                      {mccList.map((mcc) => (
                        <span
                          key={mcc}
                          className="bg-surface-container-highest px-1.5 py-0.5 rounded text-[10px] font-mono border border-outline-variant flex items-center gap-1"
                        >
                          <span>"{mcc}"</span>
                          <button
                            onClick={() => handleRemoveMcc(mcc)}
                            className="text-xs hover:text-red-600 font-sans font-bold cursor-pointer"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        placeholder="Add MCC"
                        value={newMcc}
                        onChange={(e) => setNewMcc(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddMcc()}
                        className="bg-transparent border-none p-0 outline-none w-14 text-[10px] font-mono focus:ring-0"
                      />
                    </div>
                    <button className="ml-auto text-on-surface-variant hover:text-red-600 p-1 rounded cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Nested AND Sub-sub-group (Blue vertical line) */}
                  <div className="relative pl-8 border-l-2 border-blue-600 ml-4 space-y-3 mt-4">
                    <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 bg-surface-container-lowest border border-blue-600 text-blue-700 px-1.5 py-0.5 rounded text-[9px] font-extrabold z-10 -rotate-90">
                      AND
                    </div>

                    {/* Condition 4 */}
                    <div className="flex items-center gap-2 bg-surface-container-lowest p-2 rounded border border-outline-variant hover:shadow-sm transition-all">
                      <GripVertical className="w-3.5 h-3.5 text-on-surface-variant cursor-grab" />
                      <select className="h-8 text-xs border border-outline-variant rounded bg-surface-container font-mono min-w-[150px] focus:ring-1 focus:ring-primary focus:border-primary px-2">
                        <option>User Context.account_age_days</option>
                      </select>
                      <select className="h-8 text-xs border border-outline-variant rounded bg-surface-container min-w-[100px] text-center font-bold focus:ring-1 focus:ring-primary focus:border-primary px-2">
                        <option>less than</option>
                      </select>
                      <input
                        type="text"
                        value={accountAgeDays}
                        onChange={(e) => setAccountAgeDays(e.target.value)}
                        className="h-8 text-xs border border-outline-variant rounded w-20 font-mono px-2 text-right focus:ring-1 focus:ring-primary"
                      />
                      <button className="ml-auto text-on-surface-variant hover:text-red-600 p-1 rounded cursor-pointer">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button className="text-xs text-primary hover:text-primary-hover font-bold flex items-center gap-1 mt-2 cursor-pointer">
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Add Condition</span>
                    </button>
                  </div>

                  <button className="text-xs text-primary hover:text-primary-hover font-bold flex items-center gap-1 mt-2 cursor-pointer">
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Condition</span>
                  </button>
                </div>
              </div>

              <button className="text-xs text-primary hover:text-primary-hover font-bold flex items-center gap-1 mt-3 ml-3 cursor-pointer">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Rule to AND Group</span>
              </button>
            </div>
          </div>

          {/* Connectors */}
          <div className="flex justify-center -my-2 relative z-0">
            <div className="w-px h-10 bg-outline-variant"></div>
            <div className="absolute bottom-0 w-2 h-2 border-b-2 border-r-2 border-outline-variant rotate-45 transform translate-y-[3px]"></div>
          </div>

          {/* Then Action Block */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded shadow-sm relative z-10 w-3/4 mx-auto mt-2">
            <div className="flex items-center gap-3 p-3 border-b border-outline-variant bg-surface-container-lowest rounded-t">
              <div className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider">
                THEN
              </div>
              <span className="text-sm font-bold text-on-surface">Execute Action</span>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap items-center gap-3 bg-surface-container-lowest p-3 rounded border border-outline-variant">
                <select
                  value={thenAction}
                  onChange={(e) => setThenAction(e.target.value)}
                  className="h-8 text-xs border border-outline-variant rounded bg-surface-container font-semibold min-w-[150px] focus:ring-1 focus:ring-primary px-2 cursor-pointer"
                >
                  <option value="Flag for Review">Flag for Review</option>
                  <option value="Decline Transaction">Decline Transaction</option>
                  <option value="Route to Analyst">Route to Analyst</option>
                  <option value="Return Record">Return Record</option>
                </select>

                <span className="text-xs text-on-surface-variant font-semibold">with reason</span>

                <input
                  type="text"
                  value={thenReason}
                  onChange={(e) => setThenReason(e.target.value)}
                  className="h-8 text-xs border border-outline-variant rounded flex-1 focus:ring-1 focus:ring-primary px-3 font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Data Explorer Panel on the Right */}
      <aside className="w-72 bg-surface-container-lowest border-l border-outline-variant flex flex-col z-20 shadow-md">
        <div className="p-3 border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center rounded-t">
          <h2 className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-wider">
            Data Explorer
          </h2>
          <div className="flex gap-1 items-center">
            <button className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-container cursor-pointer">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          {/* Tree View Structure */}
          <div className="space-y-4">
            {/* Entity: User Context */}
            <div>
              <div className="flex items-center gap-1.5 p-1 rounded hover:bg-surface-container cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant rotate-90" />
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                <span className="font-semibold text-xs text-on-surface">User Context</span>
              </div>

              <div className="ml-5 border-l border-outline-variant pl-3 space-y-2 py-1">
                {fields
                  .filter((f) => f.entity === 'User Context')
                  .map((f) => (
                    <div
                      key={f.name}
                      onClick={() => handleToggleExplorer(f.name)}
                      className="flex items-center gap-2 p-1 text-xs hover:bg-surface-container rounded cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={!!explorerChecked[f.name]}
                        onChange={() => {}} // handled by click on parent div
                        className="rounded border-outline-variant text-primary focus:ring-primary w-3.5 h-3.5"
                      />
                      <span className="font-mono text-xs text-on-surface">{f.name}</span>
                      <span className="text-[9px] text-on-surface-variant ml-auto bg-surface-container-high px-1 rounded border border-outline-variant font-mono">
                        {f.type}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Entity: Transaction */}
            <div>
              <div className="flex items-center gap-1.5 p-1 rounded hover:bg-surface-container cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant rotate-90" />
                <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                <span className="font-semibold text-xs text-on-surface">Transaction</span>
              </div>

              <div className="ml-5 border-l border-outline-variant pl-3 space-y-2 py-1">
                {fields
                  .filter((f) => f.entity === 'Transaction')
                  .map((f) => (
                    <div
                      key={f.name}
                      onClick={() => handleToggleExplorer(f.name)}
                      className="flex items-center gap-2 p-1 text-xs hover:bg-surface-container rounded cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={!!explorerChecked[f.name]}
                        onChange={() => {}} // handled by click on parent div
                        className="rounded border-outline-variant text-primary focus:ring-primary w-3.5 h-3.5"
                      />
                      <span className="font-mono text-xs text-on-surface">{f.name}</span>
                      <span className="text-[9px] text-on-surface-variant ml-auto bg-surface-container-high px-1 rounded border border-outline-variant font-mono">
                        {f.type}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
