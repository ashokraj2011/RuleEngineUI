import React, { useState } from 'react';
import { DecisionRule } from '../types';
import { ArrowUpDown, Filter, Plus, ChevronLeft, ChevronRight, MoreVertical, ShieldAlert, AlertTriangle, CheckCircle, Trash2, Check, X } from 'lucide-react';

interface DecisionTableProps {
  rules: DecisionRule[];
  setRules: React.Dispatch<React.SetStateAction<DecisionRule[]>>;
}

export default function DecisionTable({ rules, setRules }: DecisionTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeCell, setActiveCell] = useState<{ id: string; field: string } | null>({ id: '2', field: 'spendMin' }); // Preset R-002 spendMin as active per mockup!

  // Sort state
  const [sortBy, setSortBy] = useState<'spend_desc' | 'spend_asc'>('spend_desc');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(rules.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleAddRule = () => {
    const nextId = String(Math.max(...rules.map((r) => Number(r.id)), 0) + 1);
    const paddedIdStr = String(nextId).padStart(3, '0');
    const newRule: DecisionRule = {
      id: nextId,
      ruleId: `R-${paddedIdStr}`,
      userType: 'New User',
      spendMin: 1000,
      regions: ['US'],
      conditionFx: 'vel(1h) > 2',
      thenAction: 'Review',
      thenRiskScore: 50,
      thenReturnRecord: true,
      isActive: true,
    };
    setRules((prev) => [...prev, newRule]);
    setActiveCell({ id: nextId, field: 'spendMin' });
  };

  const handleDeleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleCellUpdate = (id: string, field: keyof DecisionRule, value: any) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return { ...r, [field]: value };
        }
        return r;
      })
    );
  };

  const handleRegionKeyDown = (id: string, regions: string[], e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.currentTarget;
      const newRegion = target.value.trim().toUpperCase();
      if (newRegion && !regions.includes(newRegion)) {
        handleCellUpdate(id, 'regions', [...regions, newRegion]);
        target.value = '';
      }
    }
  };

  const handleRemoveRegion = (id: string, regions: string[], regToRemove: string) => {
    handleCellUpdate(
      id,
      'regions',
      regions.filter((r) => r !== regToRemove)
    );
  };

  // Sort implementation
  const sortedRules = [...rules].sort((a, b) => {
    if (sortBy === 'spend_desc') {
      return b.spendMin - a.spendMin;
    } else {
      return a.spendMin - b.spendMin;
    }
  });

  return (
    <div className="flex flex-col gap-4 p-6 bg-background overflow-y-auto max-h-[calc(100vh-56px)]">
      {/* Table Toolbar */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 flex flex-wrap items-center justify-between shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-lg font-bold text-on-surface">Fraud Detection Rules</h2>
          <div className="h-4 w-px bg-outline-variant hidden sm:block"></div>
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded border border-outline-variant text-xs font-medium">
            <span className="text-on-surface-variant">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-none p-0 focus:ring-0 font-bold text-on-surface cursor-pointer text-xs"
            >
              <option value="spend_desc">Spend (Desc)</option>
              <option value="spend_asc">Spend (Asc)</option>
            </select>
          </div>

          {/* Page Display Size */}
          <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded border border-outline-variant text-xs font-medium">
            <span className="text-on-surface-variant">Showing:</span>
            <span className="font-bold text-on-surface">Rows 1-{rules.length}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded border border-outline-variant text-on-surface font-semibold text-xs hover:bg-surface-container flex items-center gap-2 transition-all cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
          <button
            onClick={handleAddRule}
            className="px-3 py-1.5 rounded bg-primary text-white font-semibold text-xs hover:bg-primary-hover flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Rule</span>
          </button>
        </div>
      </div>

      {/* Decision Table Container */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto custom-scrollbar w-full">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                {/* Select All */}
                <th className="px-3 py-3 border-r border-outline-variant w-12 text-center sticky left-0 bg-surface-container-low z-30">
                  <input
                    type="checkbox"
                    checked={rules.length > 0 && selectedIds.length === rules.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                  />
                </th>
                
                {/* Rule ID */}
                <th className="px-4 py-3 border-r border-outline-variant w-24 font-bold text-[11px] uppercase tracking-wider text-on-surface-variant sticky left-12 bg-surface-container-low z-30">
                  Rule ID
                </th>

                {/* Condition Columns (IF) */}
                <th className="px-4 py-3 border-r border-outline-variant font-bold text-[11px] uppercase tracking-wider text-primary bg-surface-container-low">
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-3 h-3" />
                    <span>IF User Type</span>
                  </div>
                </th>

                <th className="px-4 py-3 border-r border-outline-variant font-bold text-[11px] uppercase tracking-wider text-primary bg-surface-container-low">
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-3 h-3" />
                    <span>AND Spend &gt;</span>
                  </div>
                </th>

                <th className="px-4 py-3 border-r border-outline-variant font-bold text-[11px] uppercase tracking-wider text-primary bg-surface-container-low">
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-3 h-3" />
                    <span>AND Region IN</span>
                  </div>
                </th>

                <th className="px-4 py-3 border-r border-outline-variant font-bold text-[11px] uppercase tracking-wider text-primary bg-surface-container-low">
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-3 h-3" />
                    <span>AND Condition (fx)</span>
                  </div>
                </th>

                {/* Action Columns (THEN) */}
                <th className="px-4 py-3 border-r border-outline-variant font-bold text-[11px] uppercase tracking-wider text-secondary bg-surface-container">
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-3 h-3" />
                    <span>THEN Action</span>
                  </div>
                </th>

                <th className="px-4 py-3 border-r border-outline-variant font-bold text-[11px] uppercase tracking-wider text-secondary bg-surface-container">
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-3 h-3" />
                    <span>THEN Risk Score</span>
                  </div>
                </th>

                <th className="px-4 py-3 border-r border-outline-variant font-bold text-[11px] uppercase tracking-wider text-secondary bg-surface-container">
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-3 h-3" />
                    <span>THEN Return Record</span>
                  </div>
                </th>

                {/* Operations Column */}
                <th className="px-3 py-3 w-14 text-center bg-surface-container-low">Actions</th>
              </tr>
            </thead>

            <tbody className="font-mono text-xs text-on-surface">
              {sortedRules.map((rule) => {
                const isSelected = selectedIds.includes(rule.id);
                
                return (
                  <tr
                    key={rule.id}
                    className={`border-b border-outline-variant hover:bg-surface transition-colors group ${
                      isSelected ? 'bg-surface-container-low' : 'bg-white'
                    }`}
                  >
                    {/* Row checkbox selection */}
                    <td className="px-3 py-2 border-r border-outline-variant text-center sticky left-0 bg-inherit z-20">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(rule.id, e.target.checked)}
                        className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                      />
                    </td>

                    {/* Rule ID display */}
                    <td className="px-4 py-2 border-r border-outline-variant font-sans font-bold text-on-surface sticky left-12 bg-inherit z-20">
                      {rule.ruleId}
                    </td>

                    {/* IF User Type Select */}
                    <td className="p-2 border-r border-outline-variant min-w-[150px]">
                      <div className="relative">
                        <select
                          value={rule.userType}
                          onChange={(e) => handleCellUpdate(rule.id, 'userType', e.target.value)}
                          className="w-full h-8 px-2 bg-surface-container rounded border border-outline-variant text-xs outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                        >
                          <option value="New User">New User</option>
                          <option value="Existing">Existing</option>
                          <option value="VIP">VIP</option>
                          <option value="Anonymous">Anonymous</option>
                        </select>
                      </div>
                    </td>

                    {/* AND Spend input */}
                    <td className="p-2 border-r border-outline-variant min-w-[140px]">
                      {activeCell?.id === rule.id && activeCell?.field === 'spendMin' ? (
                        <div className="flex items-center relative">
                          <input
                            type="number"
                            value={rule.spendMin}
                            onBlur={() => setActiveCell(null)}
                            onChange={(e) => handleCellUpdate(rule.id, 'spendMin', Number(e.target.value))}
                            autoFocus
                            className="w-full h-8 px-2 bg-white rounded border-2 border-primary outline-none text-xs focus:ring-0"
                          />
                        </div>
                      ) : (
                        <div
                          onClick={() => setActiveCell({ id: rule.id, field: 'spendMin' })}
                          className="px-2 py-1.5 bg-surface-container rounded border border-outline-variant cursor-pointer hover:border-primary/50 text-left min-h-8"
                        >
                          ${rule.spendMin.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      )}
                    </td>

                    {/* AND Region tag editor */}
                    <td className="p-2 border-r border-outline-variant min-w-[180px]">
                      <div className="px-2 py-1 bg-surface-container rounded border border-outline-variant flex items-center gap-1.5 flex-wrap min-h-8">
                        {rule.regions.map((reg, idx) => (
                          <span
                            key={idx}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                              reg === '*Any*'
                                ? 'bg-surface-container-high text-on-surface-variant italic'
                                : 'bg-primary-container text-white'
                            }`}
                          >
                            <span>{reg}</span>
                            {reg !== '*Any*' && (
                              <button
                                onClick={() => handleRemoveRegion(rule.id, rule.regions, reg)}
                                className="hover:text-red-300 font-sans cursor-pointer"
                              >
                                &times;
                              </button>
                            )}
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="+ Reg"
                          onKeyDown={(e) => handleRegionKeyDown(rule.id, rule.regions, e)}
                          className="bg-transparent border-none p-0 outline-none w-12 text-[10px] font-sans placeholder-on-surface-variant focus:ring-0"
                        />
                      </div>
                    </td>

                    {/* AND Condition function formula */}
                    <td className="p-2 border-r border-outline-variant min-w-[180px]">
                      {activeCell?.id === rule.id && activeCell?.field === 'conditionFx' ? (
                        <input
                          type="text"
                          value={rule.conditionFx}
                          onBlur={() => setActiveCell(null)}
                          onChange={(e) => handleCellUpdate(rule.id, 'conditionFx', e.target.value)}
                          autoFocus
                          className="w-full h-8 px-2 bg-white rounded border-2 border-primary outline-none text-xs focus:ring-0"
                        />
                      ) : (
                        <div
                          onClick={() => setActiveCell({ id: rule.id, field: 'conditionFx' })}
                          className="px-2 py-1.5 bg-surface-container-low rounded border border-outline-variant text-primary flex items-center gap-1.5 cursor-pointer hover:border-primary/50 min-h-8"
                        >
                          <span className="text-primary text-[10px] font-bold">∑</span>
                          <span className={rule.conditionFx === '*Any*' ? 'italic text-on-surface-variant' : ''}>
                            {rule.conditionFx}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* THEN Action Column */}
                    <td className="p-2 border-r border-outline-variant min-w-[140px] bg-surface-container-low/10">
                      <div className="relative">
                        <select
                          value={rule.thenAction}
                          onChange={(e) => handleCellUpdate(rule.id, 'thenAction', e.target.value)}
                          className={`w-full h-8 px-2 bg-white rounded border text-xs outline-none focus:ring-1 cursor-pointer font-bold appearance-none ${
                            rule.thenAction === 'Block'
                              ? 'border-red-200 text-red-700'
                              : rule.thenAction === 'Review'
                              ? 'border-amber-200 text-amber-700'
                              : 'border-emerald-200 text-emerald-700'
                          }`}
                        >
                          <option value="Block">Block</option>
                          <option value="Review">Review</option>
                          <option value="Approve">Approve</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                          {rule.thenAction === 'Block' ? (
                            <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
                          ) : rule.thenAction === 'Review' ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                          ) : (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                          )}
                        </div>
                      </div>
                    </td>

                    {/* THEN Risk Score */}
                    <td className="p-2 border-r border-outline-variant min-w-[100px] bg-surface-container-low/10">
                      {activeCell?.id === rule.id && activeCell?.field === 'thenRiskScore' ? (
                        <input
                          type="number"
                          value={rule.thenRiskScore}
                          onBlur={() => setActiveCell(null)}
                          onChange={(e) => handleCellUpdate(rule.id, 'thenRiskScore', Number(e.target.value))}
                          autoFocus
                          className="w-full h-8 px-2 bg-white rounded border-2 border-primary outline-none text-xs focus:ring-0 text-center font-bold"
                        />
                      ) : (
                        <div
                          onClick={() => setActiveCell({ id: rule.id, field: 'thenRiskScore' })}
                          className="px-2 py-1.5 bg-white rounded border border-outline-variant text-center font-bold cursor-pointer hover:border-primary/50"
                        >
                          {rule.thenRiskScore}
                        </div>
                      )}
                    </td>

                    {/* THEN Return Record Checkbox */}
                    <td className="p-2 border-r border-outline-variant min-w-[140px] bg-surface-container-low/10">
                      <div className="px-2 py-1.5 bg-surface-container rounded border border-outline-variant flex items-center justify-between text-on-surface h-8">
                        <span>{rule.thenReturnRecord ? 'True' : 'False'}</span>
                        <input
                          type="checkbox"
                          checked={rule.thenReturnRecord}
                          onChange={(e) => handleCellUpdate(rule.id, 'thenReturnRecord', e.target.checked)}
                          className="rounded border-outline-variant text-primary focus:ring-primary w-3.5 h-3.5"
                        />
                      </div>
                    </td>

                    {/* Operations */}
                    <td className="px-2 py-2 text-center text-on-surface-variant bg-inherit">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleDeleteRule(rule.id)}
                          className="p-1 rounded text-on-surface-variant hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                          title="Delete Rule"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-1 rounded text-on-surface-variant hover:bg-surface-container transition-all cursor-pointer">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-3 border-t border-outline-variant bg-surface-container-low flex items-center justify-between">
          <span className="font-sans text-xs text-on-surface-variant font-medium">
            Showing {rules.length} of 142 rules
          </span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded border border-outline-variant bg-white flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-40 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-sans text-xs font-bold text-on-surface px-2">Page 1 of 3</span>
            <button className="w-8 h-8 rounded border border-outline-variant bg-white flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
