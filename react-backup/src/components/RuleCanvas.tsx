import React, { useState } from 'react';
import { CanvasNode, CanvasConnection } from '../types';
import { Play, ClipboardList, Database, Split, MapPin, Plus, HelpCircle, X, ZoomIn, ZoomOut, Maximize2, PlayCircle, Terminal, Check, Info } from 'lucide-react';

interface RuleCanvasProps {
  nodes: CanvasNode[];
  connections: CanvasConnection[];
  setNodes: React.Dispatch<React.SetStateAction<CanvasNode[]>>;
}

export default function RuleCanvas({ nodes, connections, setNodes }: RuleCanvasProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-2'); // Presetting Customer CRM Lookup node as active!
  const [zoom, setZoom] = useState<number>(100);
  const [activeScenario, setActiveScenario] = useState<'vip' | 'standard'>('vip');
  const [testRunnerLogs, setTestRunnerLogs] = useState<string[]>([
    '# Execution Trace started at 14:32:01.445',
    '[START] Initializing event flow...',
    "[NODE] 'Customer CRM Lookup' executed. (42ms)",
    '> Context updated: { tier: "VIP", segment: "Retail" }',
    "[NODE] 'Tier Check' evaluating conditions...",
    "> Condition (tier == 'VIP') == true",
    '[END] Routing to VIP_SUPPORT.',
    '# Execution completed successfully. (45ms total)',
  ]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const handleUpdateNodeProp = (prop: string, value: any) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === selectedNodeId) {
          return { ...n, [prop]: value };
        }
        return n;
      })
    );
  };

  const handleUpdateInputMapping = (key: string, value: string) => {
    if (!selectedNode || !selectedNode.inputs) return;
    const updatedInputs = selectedNode.inputs.map((inp) => {
      if (inp.key === key) {
        return { ...inp, value };
      }
      return inp;
    });
    handleUpdateNodeProp('inputs', updatedInputs);
  };

  const handleAddNode = (type: CanvasNode['type']) => {
    const id = `node-${Date.now()}`;
    const newNode: CanvasNode = {
      id,
      type,
      name: `New ${type} Node`,
      description: 'Configure attributes',
      x: 200 + Math.random() * 200,
      y: 150 + Math.random() * 150,
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(id);
  };

  const handleRunTest = () => {
    if (activeScenario === 'vip') {
      setTestRunnerLogs([
        '# Execution Trace started at 14:32:01.445',
        '[START] Initializing event flow...',
        "[NODE] 'Customer CRM Lookup' executed. (42ms)",
        '> Context updated: { tier: "VIP", segment: "Retail" }',
        "[NODE] 'Tier Check' evaluating conditions...",
        "> Condition (tier == 'VIP') == true",
        '[END] Routing to VIP_SUPPORT.',
        '# Execution completed successfully. (45ms total)',
      ]);
    } else {
      setTestRunnerLogs([
        '# Execution Trace started at 14:35:12.105',
        '[START] Initializing event flow...',
        "[NODE] 'Customer CRM Lookup' executed. (38ms)",
        '> Context updated: { tier: "Standard", segment: "Wholesale" }',
        "[NODE] 'Tier Check' evaluating conditions...",
        "> Condition (tier == 'VIP') == false",
        "[NODE] routing fallback logic",
        '[END] Routing to VOICEMAIL.',
        '# Execution completed successfully. (52ms total)',
      ]);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-surface-container-lowest max-h-[calc(100vh-56px)]">
      {/* Top / Main visual container divided into Library, Canvas, and Inspector */}
      <div className="flex-grow flex overflow-hidden">
        
        {/* Left Side: Node Library */}
        <aside className="bg-surface-taupe border-r border-border-subtle w-[280px] flex flex-col h-full shrink-0 z-40 relative">
          <div className="p-4 border-b border-border-subtle">
            <h2 className="font-serif text-lg font-bold text-primary">Rule Canvas</h2>
            <p className="text-on-surface-variant text-[11px] mt-1 uppercase font-bold tracking-wider opacity-85">
              V2.4.0-Stable
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            <div className="text-[10px] font-extrabold text-on-surface-variant mb-2 px-2 uppercase tracking-wider">
              Node Library
            </div>
            
            <button
              onClick={() => handleAddNode('Start')}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-surface-container transition-colors text-left text-on-surface cursor-pointer"
            >
              <div className="w-8 h-8 rounded flex items-center justify-center bg-emerald-50 text-emerald-700">
                <Play className="w-4 h-4 fill-emerald-700" />
              </div>
              <span className="font-semibold text-xs text-on-surface">Start Node</span>
            </button>

            <button
              onClick={() => handleAddNode('Start')}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-surface-container transition-colors text-left text-on-surface cursor-pointer"
            >
              <div className="w-8 h-8 rounded flex items-center justify-center bg-blue-50 text-blue-700">
                <ClipboardList className="w-4 h-4" />
              </div>
              <span className="font-semibold text-xs text-on-surface">Rule Evaluation</span>
            </button>

            <button
              onClick={() => handleAddNode('Decision')}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-surface-container transition-colors text-left text-on-surface cursor-pointer"
            >
              <div className="w-8 h-8 rounded flex items-center justify-center bg-amber-50 text-amber-700">
                <Split className="w-4 h-4" />
              </div>
              <span className="font-semibold text-xs text-on-surface">Decision Split</span>
            </button>

            <button
              onClick={() => handleAddNode('DataLookup')}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-surface-container transition-colors text-left text-on-surface cursor-pointer"
            >
              <div className="w-8 h-8 rounded flex items-center justify-center bg-teal-50 text-teal-700">
                <Database className="w-4 h-4" />
              </div>
              <span className="font-semibold text-xs text-on-surface">Data Lookup</span>
            </button>

            <button
              onClick={() => handleAddNode('Route')}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-surface-container transition-colors text-left text-on-surface cursor-pointer"
            >
              <div className="w-8 h-8 rounded flex items-center justify-center bg-purple-50 text-purple-700">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="font-semibold text-xs text-on-surface">Route Action</span>
            </button>
          </div>

          <div className="p-4 border-t border-border-subtle">
            <button
              onClick={() => handleAddNode('Decision')}
              className="w-full border-2 border-fidelty-blue text-fidelty-blue hover:bg-surface-container py-2 rounded font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Node</span>
            </button>
          </div>
        </aside>

        {/* Main interactive Canvas Viewport */}
        <main className="flex-1 relative bg-surface-container-lowest dot-grid overflow-hidden">
          
          {/* Floating canvas details top left */}
          <div className="absolute top-4 left-4 z-10 bg-white border border-border-subtle p-3 rounded shadow-sm flex items-center gap-4">
            <div>
              <h1 className="text-xs font-bold text-on-surface">Inbound Support Routing</h1>
              <div className="flex items-center gap-2 text-[10px] text-on-surface-variant mt-1 font-semibold">
                <span className="bg-surface-container-high px-1.5 py-0.5 rounded font-mono">Draft v12</span>
                <span className="flex items-center text-success-green gap-1">
                  <Check className="w-3 h-3 text-success-green font-bold" />
                  <span>Valid</span>
                </span>
              </div>
            </div>
          </div>

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: '1000px', minHeight: '800px' }}>
            {/* Draw direct curve connectors */}
            <path d="M 180 150 C 265 150, 265 240, 350 240" fill="none" stroke="#D1D1D1" strokeWidth="2" />
            
            {/* Animated primary path representing the VIP path in mockup */}
            <path
              className="flow-line"
              d="M 570 240 C 625 240, 625 150, 680 150"
              fill="none"
              stroke="#008542"
              strokeWidth="3"
            />
            
            <path d="M 900 150 C 940 150, 940 260, 980 260" fill="none" stroke="#D1D1D1" strokeWidth="2" />
          </svg>

          {/* Render Nodes */}
          {nodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            let headerBg = 'bg-emerald-50 text-emerald-800';
            let iconColor = 'text-emerald-700';
            let IconComp = Play;

            if (node.type === 'DataLookup') {
              headerBg = 'bg-teal-50 text-teal-800';
              iconColor = 'text-teal-700';
              IconComp = Database;
            } else if (node.type === 'Decision') {
              headerBg = 'bg-amber-50 text-amber-800';
              iconColor = 'text-amber-700';
              IconComp = Split;
            } else if (node.type === 'Route') {
              headerBg = 'bg-purple-50 text-purple-800';
              iconColor = 'text-purple-700';
              IconComp = MapPin;
            }

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                style={{ left: `${node.x}px`, top: `${node.y}px` }}
                className={`absolute w-56 bg-white border rounded shadow-sm cursor-pointer transition-all ${
                  isSelected ? 'border-fidelty-blue ring-2 ring-fidelty-blue/20 z-20' : 'border-border-subtle hover:shadow'
                }`}
              >
                {/* Node Top bar */}
                <div className={`border-b border-border-subtle p-2 flex items-center gap-2 rounded-t ${headerBg}`}>
                  <IconComp className={`w-3.5 h-3.5 ${iconColor}`} />
                  <span className="font-bold text-xs truncate">{node.name}</span>
                </div>

                {/* Node Contents */}
                <div className="p-3">
                  {node.inputs && node.inputs.length > 0 ? (
                    <div className="text-[11px] font-mono text-on-surface mb-2">
                      Input:{' '}
                      <span className="bg-surface-container px-1 py-0.5 rounded text-primary">
                        {node.inputs[0].value}
                      </span>
                    </div>
                  ) : null}
                  <div className="text-[10px] text-on-surface-variant leading-snug">{node.description}</div>
                  
                  {node.logic ? (
                    <div className="bg-surface-container-low p-1.5 rounded border border-outline-variant text-[10px] font-mono mt-2 truncate text-on-surface">
                      <span className="text-gray-500 font-bold">IF</span> {node.logic}
                    </div>
                  ) : null}

                  {node.action ? (
                    <div className="flex justify-between items-center text-[10px] mt-2 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      <span>{node.action}</span>
                      <Check className="w-3.5 h-3.5 text-success-green stroke-[3px]" />
                    </div>
                  ) : null}
                </div>

                {/* Input/Output port circles representing interactive nodes */}
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-border-subtle rounded-full" />
                <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-fidelty-blue border-2 border-white rounded-full shadow-sm" />
              </div>
            );
          })}

          {/* Zoom & Viewport toolbar bottom left */}
          <div className="absolute bottom-4 left-4 flex gap-2 pointer-events-auto z-10">
            <div className="bg-white border border-border-subtle rounded flex items-center shadow-sm h-8 px-1">
              <button
                onClick={() => setZoom((z) => Math.max(50, z - 10))}
                className="p-1 hover:bg-surface-container rounded text-on-surface-variant cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-mono text-[11px] text-on-surface-variant border-x border-border-subtle h-4 flex items-center">
                {zoom}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(150, z + 10))}
                className="p-1 hover:bg-surface-container rounded text-on-surface-variant cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <button
              onClick={() => setZoom(100)}
              className="bg-white border border-border-subtle rounded p-2 shadow-sm hover:bg-surface-container text-on-surface-variant cursor-pointer flex items-center justify-center h-8"
              title="Fit Screen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </main>

        {/* Right Properties Panel Inspector */}
        <aside className="bg-white w-[320px] border-l border-border-subtle flex flex-col shrink-0 z-40">
          <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-surface-container-lowest">
            <h3 className="font-serif text-md font-bold text-on-surface">Properties</h3>
            <button className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-container cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto custom-scrollbar space-y-5">
            {selectedNode ? (
              <>
                {/* Node Name input */}
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Node Name
                  </label>
                  <input
                    type="text"
                    value={selectedNode.name}
                    onChange={(e) => handleUpdateNodeProp('name', e.target.value)}
                    className="w-full bg-white border border-border-subtle rounded px-3 py-1.5 text-xs focus:border-success-green focus:ring-1 focus:ring-success-green outline-none"
                  />
                </div>

                {/* Input Mapping Container */}
                {selectedNode.inputs && selectedNode.inputs.length > 0 ? (
                  <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                      Input Mapping
                    </label>
                    
                    <div className="bg-surface-container-low border border-border-subtle rounded p-3 space-y-3">
                      {selectedNode.inputs.map((inp) => (
                        <div key={inp.key} className="flex items-center gap-2">
                          <div className="w-1/3 text-[10px] font-bold text-on-surface-variant uppercase">
                            {inp.key}
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={inp.value}
                              onChange={(e) => handleUpdateInputMapping(inp.key, e.target.value)}
                              className="w-full bg-white border border-border-subtle rounded px-2 py-1 text-[11px] font-mono"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Conditional toggle for Fail-safe mode */}
                <div className="border-t border-border-subtle pt-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-semibold text-on-surface">Fail-safe mode</span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={selectedNode.failSafe ?? false}
                        onChange={(e) => handleUpdateNodeProp('failSafe', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-outline-variant rounded-full peer peer-checked:bg-success-green after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                    </div>
                  </label>
                  <p className="text-[10px] text-on-surface-variant mt-1.5 leading-snug">
                    If lookup fails, route to fallback queue.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-on-surface-variant text-xs">
                <Info className="w-8 h-8 text-on-surface-variant mx-auto mb-2 opacity-50" />
                Select any node on the canvas to configure properties.
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Bottom Scenario Test Runner Drawer */}
      <footer className="bg-surface-container-highest border-t border-border-subtle h-[200px] shrink-0 z-50 flex flex-col shadow-sm">
        {/* Test runner top controls */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border-subtle bg-surface-container-low">
          <div className="flex items-center gap-4">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span>Test Runner</span>
            </h4>
            <div className="text-[11px] text-on-surface-variant font-medium flex items-center gap-1">
              Active Scenario:{' '}
              <span className="font-bold text-on-surface">
                {activeScenario === 'vip' ? 'VIP caller · open hours' : 'Standard caller · closed'}
              </span>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded text-[10px] font-extrabold shadow-sm">
              Expected: {activeScenario === 'vip' ? 'VIP_SUPPORT' : 'VOICEMAIL'}
            </span>
            <button
              onClick={handleRunTest}
              className="text-primary hover:text-fidelty-blue transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 fill-primary text-white" />
              <span>Run Test</span>
            </button>
          </div>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* Scenarios Panel */}
          <div className="w-1/4 border-r border-border-subtle bg-white overflow-y-auto p-2">
            <button
              onClick={() => setActiveScenario('vip')}
              className={`w-full text-left px-3 py-2 border rounded mb-1 cursor-pointer transition-all ${
                activeScenario === 'vip'
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'hover:bg-surface-container-low border-transparent'
              }`}
            >
              <div className="text-xs font-bold text-emerald-800">VIP caller · open hours</div>
              <div className="text-[10px] text-on-surface-variant">Expects: VIP_SUPPORT</div>
            </button>

            <button
              onClick={() => setActiveScenario('standard')}
              className={`w-full text-left px-3 py-2 border rounded mb-1 cursor-pointer transition-all ${
                activeScenario === 'standard'
                  ? 'bg-purple-50 border-purple-300'
                  : 'hover:bg-surface-container-low border-transparent'
              }`}
            >
              <div className="text-xs font-bold text-purple-800">Standard caller · closed</div>
              <div className="text-[10px] text-on-surface-variant">Expects: VOICEMAIL</div>
            </button>
          </div>

          {/* Terminal logs output */}
          <div className="flex-1 bg-black text-emerald-400 font-mono text-[11px] p-4 overflow-y-auto custom-scrollbar select-all">
            {testRunnerLogs.map((log, idx) => {
              let color = 'text-emerald-400';
              if (log.startsWith('#')) color = 'text-gray-500';
              else if (log.includes('[START]') || log.includes('[NODE]')) color = 'text-blue-400';
              else if (log.includes('[END]')) color = 'text-purple-400';
              else if (log.startsWith('>')) color = 'text-green-300';

              return (
                <div key={idx} className={`${color} mb-1 leading-relaxed`}>
                  {log}
                </div>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
