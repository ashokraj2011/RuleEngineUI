import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNavBar from './components/TopNavBar';
import DecisionTable from './components/DecisionTable';
import RuleSets from './components/RuleSets';
import RuleCanvas from './components/RuleCanvas';
import HistoryLogs from './components/HistoryLogs';
import RuleConfig from './components/RuleConfig';
import DataSchema from './components/DataSchema';
import Functions from './components/Functions';

import {
  INITIAL_DECISION_RULES,
  SCHEMA_FIELDS,
  INITIAL_CANVAS_NODES,
  INITIAL_CANVAS_CONNECTIONS,
  EXECUTION_LOGS,
} from './data';

import { DecisionRule, SchemaField, CanvasNode, CanvasConnection } from './types';
import { Sparkles, Terminal, Info, Bell, CheckCircle } from 'lucide-react';

export default function App() {
  // Navigation & view states
  const [activeTab, setActiveTab] = useState<string>('tables'); // Default to Decision Tables per mockup first screen!
  const [activeNavGroup, setActiveNavGroup] = useState<'Drafts' | 'Staging' | 'Production'>('Drafts');
  
  // Rule Sets secondary sub-view toggle
  const [rulesetsSubView, setRulesetsSubView] = useState<'designer' | 'canvas' | 'config'>('designer');

  // Shared Data States
  const [rules, setRules] = useState<DecisionRule[]>(INITIAL_DECISION_RULES);
  const [schemaFields, setSchemaFields] = useState<SchemaField[]>(SCHEMA_FIELDS);
  const [canvasNodes, setCanvasNodes] = useState<CanvasNode[]>(INITIAL_CANVAS_NODES);
  const [canvasConnections] = useState<CanvasConnection[]>(INITIAL_CANVAS_CONNECTIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Alerts & Notifications Simulation
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handlePublish = () => {
    triggerNotification(`Rules successfully compiled and published to ${activeNavGroup}!`);
  };

  const handleNewRule = () => {
    // Navigate to tables and trigger new rule additions
    setActiveTab('tables');
    triggerNotification('Adding a new Fraud Detection rule template.');
  };

  // Determine header title based on active navigation
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'schema':
        return 'Data Schema Explorer';
      case 'rulesets':
        if (rulesetsSubView === 'designer') return 'Rule Designer';
        if (rulesetsSubView === 'canvas') return 'Rule Orchestrator';
        return 'Rule Configuration';
      case 'tables':
        return 'Decision Tables';
      case 'functions':
        return 'Mathematical Functions';
      case 'history':
        return 'Execution History logs';
      default:
        return 'Logic Engine Console';
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex font-sans select-none overflow-hidden relative">
      
      {/* Floating System-Wide Toast Alert */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary border-2 border-emerald-300 text-white px-5 py-3.5 rounded-lg shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-300 stroke-[3px]" />
          <div>
            <div className="font-bold text-xs">System Operation Alert</div>
            <div className="text-[11px] opacity-90 mt-0.5">{notification}</div>
          </div>
        </div>
      )}

      {/* Side Navigation Bar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Auto-reset sub-view if selecting rule sets
          if (tab === 'rulesets') {
            setRulesetsSubView('designer');
          }
        }}
        onNewRule={handleNewRule}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col ml-[280px] h-screen overflow-hidden">
        
        {/* Header / Top Bar */}
        <TopNavBar
          title={getHeaderTitle()}
          activeNavGroup={activeNavGroup}
          setActiveNavGroup={setActiveNavGroup}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onPublish={handlePublish}
        />

        {/* RuleSets visual secondary sub-navigation tabs (Only visible when activeTab === 'rulesets') */}
        {activeTab === 'rulesets' && (
          <div className="bg-surface border-b border-outline-variant px-6 py-2 flex items-center justify-between shadow-sm z-30">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-wider mr-2">
                Rule Sets Modules:
              </span>
              
              <button
                onClick={() => setRulesetsSubView('designer')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                  rulesetsSubView === 'designer'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                1. Visual Rule Designer
              </button>

              <button
                onClick={() => setRulesetsSubView('canvas')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                  rulesetsSubView === 'canvas'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                2. DAG Flow Canvas
              </button>

              <button
                onClick={() => setRulesetsSubView('config')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                  rulesetsSubView === 'config'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                3. Rule Configuration Grid
              </button>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold text-primary bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Layer Editor</span>
            </div>
          </div>
        )}

        {/* Selected Dashboard Screen Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'schema' && (
            <DataSchema fields={schemaFields} setFields={setSchemaFields} />
          )}

          {activeTab === 'rulesets' && (
            <>
              {rulesetsSubView === 'designer' && (
                <RuleSets fields={schemaFields} />
              )}
              {rulesetsSubView === 'canvas' && (
                <RuleCanvas
                  nodes={canvasNodes}
                  connections={canvasConnections}
                  setNodes={setCanvasNodes}
                />
              )}
              {rulesetsSubView === 'config' && (
                <RuleConfig />
              )}
            </>
          )}

          {activeTab === 'tables' && (
            <DecisionTable rules={rules} setRules={setRules} />
          )}

          {activeTab === 'functions' && (
            <Functions />
          )}

          {activeTab === 'history' && (
            <HistoryLogs logs={EXECUTION_LOGS} />
          )}

          {activeTab === 'settings' && (
            <div className="p-8 text-center max-w-md mx-auto my-auto space-y-3">
              <h3 className="text-sm font-bold text-on-surface">Settings Console</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Configure standard API credentials, sync parameters, local storage bindings, and deployment triggers for the compiled evaluation rulesets.
              </p>
              <button
                onClick={() => triggerNotification('Settings saved successfully.')}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded font-bold text-xs cursor-pointer shadow-sm"
              >
                Save Settings
              </button>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="p-8 text-center max-w-md mx-auto my-auto space-y-3">
              <h3 className="text-sm font-bold text-on-surface">Institutional Support Console</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Connect directly with Enterprise Support Desk to report runtime compile exceptions or schema conflicts.
              </p>
              <button
                onClick={() => triggerNotification('Support ticket initialized.')}
                className="px-4 py-2 border border-outline-variant text-on-surface font-bold text-xs rounded hover:bg-surface-container cursor-pointer"
              >
                Submit Incident Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
