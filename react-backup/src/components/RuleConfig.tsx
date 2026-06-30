import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, PlusCircle, ExternalLink, Trash2 } from 'lucide-react';

export default function RuleConfig() {
  const [ruleName, setRuleName] = useState<string>('High-Value Transaction Flagging');
  const [technicalId] = useState<string>('RULE-8472-B');
  const [description, setDescription] = useState<string>(
    'Flags incoming domestic transactions exceeding $50,000 for manual compliance review before clearing.'
  );
  const [teamOwnership, setTeamOwnership] = useState<string>('Risk Management');
  const [lifecycleStatus, setLifecycleStatus] = useState<string>('Draft');
  
  // Toggles
  const [deriveFacts, setDeriveFacts] = useState<boolean>(true);
  const [sendBackData, setSendBackData] = useState<boolean>(false);
  const [cacheTtl, setCacheTtl] = useState<number>(3600);

  // Connectors
  const [connectors, setConnectors] = useState<Record<string, boolean>>({
    'CRM Pipeline': true,
    'Transactional Log': true,
    'User Profile DB': false,
    'Geo-IP Service': false,
  });

  // Resource Tags state
  const [tags, setTags] = useState<{ key: string; value: string }[]>([
    { key: 'Environment', value: 'Production' },
    { key: 'Department', value: 'Risk Mgt' },
  ]);

  const handleToggleConnector = (name: string) => {
    setConnectors((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleAddTag = () => {
    setTags((prev) => [...prev, { key: 'NewKey', value: 'NewValue' }]);
  };

  const handleRemoveTag = (idx: number) => {
    setTags((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateTag = (idx: number, field: 'key' | 'value', val: string) => {
    setTags((prev) =>
      prev.map((tag, i) => {
        if (i === idx) {
          return { ...tag, [field]: val };
        }
        return tag;
      })
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-surface-container-low max-h-[calc(100vh-56px)] custom-scrollbar">
      {/* Page Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-wider">
              Rule Configuration
            </span>
            <span className="text-outline-variant font-bold text-xs">/</span>
            <span className="font-mono text-xs text-secondary px-2 py-0.5 bg-secondary-container bg-opacity-25 rounded">
              {technicalId}
            </span>
          </div>
          <h2 className="font-serif text-lg font-bold text-on-background leading-snug">{ruleName}</h2>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold text-xs rounded hover:bg-surface-container-highest transition-all cursor-pointer">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-primary text-white font-bold text-xs rounded hover:bg-primary-hover transition-all cursor-pointer shadow-sm">
            Save Configuration
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Identity, Description & Attached Tasks */}
        <div className="xl:col-span-2 space-y-6">
          {/* Identity & Ownership card */}
          <section className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-bold text-on-background mb-4 flex items-center gap-2 border-b border-outline-variant pb-2">
              <span className="w-2.5 h-2.5 bg-primary rounded-full inline-block"></span>
              <span>Identity &amp; Ownership</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                  Rule Name
                </label>
                <input
                  type="text"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  className="w-full h-8 px-3 text-xs border border-outline-variant rounded bg-white text-on-background focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                  Technical ID
                </label>
                <input
                  type="text"
                  value={technicalId}
                  disabled
                  className="w-full h-8 px-3 text-xs font-mono border border-outline-variant rounded bg-surface-container-low text-on-surface-variant outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                  Team Ownership
                </label>
                <select
                  value={teamOwnership}
                  onChange={(e) => setTeamOwnership(e.target.value)}
                  className="w-full h-8 px-2 text-xs border border-outline-variant rounded bg-white text-on-background focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer"
                >
                  <option>Risk Management</option>
                  <option>Fraud Ops</option>
                  <option>Compliance</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full p-3 text-xs border border-outline-variant rounded bg-white text-on-background focus:border-secondary focus:ring-1 focus:ring-secondary outline-none resize-none"
                />
              </div>
            </div>
          </section>

          {/* Attached Tasks card */}
          <section className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-outline-variant pb-2 mb-4">
              <h3 className="text-sm font-bold text-on-background flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-secondary rounded-full inline-block"></span>
                <span>Attached Tasks</span>
              </h3>
              <button className="flex items-center gap-1 text-secondary font-bold text-xs hover:text-secondary-hover cursor-pointer">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Task 1 */}
              <div className="border border-outline-variant rounded p-4 bg-surface-container-lowest hover:border-secondary transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                    <span className="text-xs font-bold text-on-background">Manual Compliance Review</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-secondary transition-colors" />
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Route flagged transaction to Level 2 Compliance Queue.
                </p>
              </div>

              {/* Task 2 */}
              <div className="border border-outline-variant rounded p-4 bg-surface-container-lowest hover:border-secondary transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs font-bold text-on-background">Slack Alert: Risk Ops</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-secondary transition-colors" />
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Post immediate notification to #alert-risk-ops channel.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar Options (Lifecycle, Behaviors, tags) */}
        <div className="space-y-6">
          {/* Lifecycle Status card */}
          <section className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-bold text-on-background mb-4 flex items-center gap-2 border-b border-outline-variant pb-2">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full inline-block"></span>
              <span>Lifecycle Status</span>
            </h3>

            <div className="flex flex-col gap-3 mt-4">
              {(['Draft', 'Active', 'Paused'] as const).map((status) => {
                const isSelected = lifecycleStatus === status;
                let activeBorder = isSelected ? 'border-secondary bg-surface-container-low' : 'border-outline-variant';
                if (isSelected && status === 'Active') {
                  activeBorder = 'border-emerald-500 bg-emerald-50/20 border-l-4 border-l-emerald-500';
                }

                return (
                  <label
                    key={status}
                    onClick={() => setLifecycleStatus(status)}
                    className={`flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-surface-container transition-all ${activeBorder}`}
                  >
                    <input
                      type="radio"
                      name="lifecycle"
                      checked={isSelected}
                      onChange={() => {}} // click handler on label
                      className="text-secondary focus:ring-secondary w-4 h-4"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-on-background flex items-center gap-1.5">
                        {status}
                        {status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                      </span>
                      <span className="text-[10px] text-on-surface-variant font-medium mt-0.5">
                        {status === 'Draft'
                          ? 'Not evaluating traffic.'
                          : status === 'Active'
                          ? 'Live in production environment.'
                          : 'Temporarily disabled.'}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          {/* Execution Behaviors card */}
          <section className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-bold text-on-background mb-4 flex items-center gap-2 border-b border-outline-variant pb-2">
              <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full inline-block"></span>
              <span>Execution Behaviors</span>
            </h3>

            <div className="space-y-4 mt-4 text-xs font-medium">
              {/* Derive Facts Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-bold text-on-background text-xs">Derive Facts</span>
                  <span className="text-[10px] text-on-surface-variant font-medium mt-0.5">
                    Generate secondary data points.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deriveFacts}
                    onChange={(e) => setDeriveFacts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-outline-variant rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>

              {/* Send Back Data Toggle */}
              <div className="flex items-center justify-between border-t border-outline-variant pt-4">
                <div className="flex flex-col">
                  <span className="font-bold text-on-background text-xs">Send Back Data</span>
                  <span className="text-[10px] text-on-surface-variant font-medium mt-0.5">
                    Return enriched payload to caller.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendBackData}
                    onChange={(e) => setSendBackData(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-outline-variant rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>

              {/* Cache TTL (visible conditionally/always for completeness) */}
              <div className="border-t border-outline-variant pt-4">
                <label className="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                  Cache TTL (ms)
                </label>
                <input
                  type="number"
                  value={cacheTtl}
                  onChange={(e) => setCacheTtl(Number(e.target.value))}
                  className="w-full h-8 px-2 border border-outline-variant rounded bg-white text-on-background focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-right font-mono"
                />
              </div>
            </div>
          </section>

          {/* Resource Tags card */}
          <section className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-outline-variant pb-2 mb-4">
              <h3 className="text-sm font-bold text-on-background flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-purple-600 rounded-full inline-block"></span>
                <span>Resource Tags</span>
              </h3>
              <button
                onClick={handleAddTag}
                className="text-secondary hover:text-secondary-hover cursor-pointer p-0.5 rounded hover:bg-surface-container"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded border border-outline-variant border-opacity-50 text-xs font-mono"
                >
                  <input
                    type="text"
                    value={tag.key}
                    onChange={(e) => handleUpdateTag(idx, 'key', e.target.value)}
                    className="w-[45%] h-7 px-1.5 text-[11px] border border-outline-variant rounded bg-white text-on-background outline-none font-semibold text-center"
                  />
                  <span className="text-outline-variant">:</span>
                  <input
                    type="text"
                    value={tag.value}
                    onChange={(e) => handleUpdateTag(idx, 'value', e.target.value)}
                    className="w-[45%] h-7 px-1.5 text-[11px] border border-outline-variant rounded bg-white text-on-background outline-none text-center"
                  />
                  <button
                    onClick={() => handleRemoveTag(idx)}
                    className="text-on-surface-variant hover:text-red-600 p-0.5 rounded cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Metadata Display Footer */}
          <div className="bg-white border border-outline-variant rounded-lg p-4 shadow-sm text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase text-on-surface-variant">Version</span>
              <span className="font-mono text-[10px] bg-surface-container px-1 py-0.5 rounded border border-outline-variant text-primary font-bold">
                v2.1.4-draft
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase text-on-surface-variant">Created By</span>
              <span className="font-semibold text-on-surface">sys_admin</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase text-on-surface-variant">Last Mod</span>
              <span className="font-mono text-[11px] text-on-surface">2026-06-27 14:32</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
