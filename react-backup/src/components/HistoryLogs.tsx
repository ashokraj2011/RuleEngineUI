import React, { useState } from 'react';
import { ExecutionTraceLog } from '../types';
import { Calendar, Filter, RefreshCw, ChevronRight, AlertCircle, CheckCircle2, ChevronLeft, ChevronDown } from 'lucide-react';

interface HistoryLogsProps {
  logs: ExecutionTraceLog[];
}

export default function HistoryLogs({ logs }: HistoryLogsProps) {
  const [expandedLogId, setExpandedLogId] = useState<string | null>('log-1'); // Preset log-1 (Error) as expanded per mockup!
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [timeFilter, setTimeFilter] = useState<string>('Last 15 minutes');

  const filteredLogs = logs.filter((log) => {
    if (statusFilter === 'All Statuses') return true;
    return log.status === statusFilter;
  });

  const toggleRow = (id: string) => {
    if (expandedLogId === id) {
      setExpandedLogId(null);
    } else {
      setExpandedLogId(id);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-background flex flex-col gap-6 max-h-[calc(100vh-56px)] custom-scrollbar">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-lowest p-5 rounded-lg border border-outline-variant shadow-sm">
        <div>
          <h2 className="font-serif text-lg font-bold text-on-surface">Execution Logs</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Debug and trace rule execution history
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Calendar Select */}
          <div className="flex items-center border border-outline-variant rounded bg-surface-container-lowest h-8 px-2 space-x-2 text-xs">
            <Calendar className="w-3.5 h-3.5 text-on-surface-variant" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-transparent border-none focus:ring-0 p-0 pr-6 text-on-surface font-semibold cursor-pointer text-xs"
            >
              <option>Last 15 minutes</option>
              <option>Last 1 hour</option>
              <option>Last 24 hours</option>
              <option>Last 7 days</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center border border-outline-variant rounded bg-surface-container-lowest h-8 px-2 space-x-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-on-surface-variant" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none focus:ring-0 p-0 pr-6 text-on-surface font-semibold cursor-pointer text-xs"
            >
              <option>All Statuses</option>
              <option>Success</option>
              <option>Error</option>
              <option>Warning</option>
            </select>
          </div>

          {/* Refresh Button */}
          <button className="h-8 px-3 border border-outline-variant rounded hover:bg-surface-container transition-all flex items-center space-x-1.5 text-on-surface text-xs font-semibold cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Dense Execution Logs Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex-1 flex flex-col relative shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-surface-container sticky top-0 z-10 border-b border-outline-variant font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Execution ID</th>
                <th className="p-3">Rule Name</th>
                <th className="p-3">Result (Action)</th>
                <th className="p-3 text-right">Latency</th>
                <th className="p-3">Status</th>
                <th className="p-3 w-10"></th>
              </tr>
            </thead>

            <tbody className="font-mono text-xs text-on-surface divide-y divide-outline-variant">
              {filteredLogs.map((log) => {
                const isExpanded = expandedLogId === log.id;
                
                return (
                  <React.Fragment key={log.id}>
                    {/* Main Log Row */}
                    <tr
                      onClick={() => toggleRow(log.id)}
                      className={`hover:bg-surface-container-low cursor-pointer transition-colors ${
                        isExpanded ? 'bg-surface-container-low' : 'bg-white'
                      }`}
                    >
                      <td className="p-3 text-on-surface-variant font-sans whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="p-3 text-secondary font-bold">
                        {log.executionId}
                      </td>
                      <td className="p-3 font-sans font-bold text-on-surface">
                        {log.ruleName}
                      </td>
                      <td className="p-3 font-sans">{log.action}</td>
                      <td className="p-3 text-right text-on-surface-variant whitespace-nowrap">
                        {log.latency}ms
                      </td>
                      <td className="p-3">
                        {log.status === 'Error' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                            <AlertCircle className="w-3 h-3 mr-1 text-red-600" />
                            <span>Error</span>
                          </span>
                        ) : log.status === 'Warning' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <AlertCircle className="w-3 h-3 mr-1 text-amber-600" />
                            <span>Warning</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                            <span>Success</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-on-surface-variant" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                        )}
                      </td>
                    </tr>

                    {/* Expandable Trace Details */}
                    {isExpanded && (
                      <tr className="bg-surface-container-lowest border-b-2 border-outline-variant">
                        <td className="p-0" colSpan={7}>
                          <div className={`p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 border-l-4 ${
                            log.status === 'Error' ? 'border-red-600' : log.status === 'Warning' ? 'border-amber-500' : 'border-emerald-600'
                          }`}>
                            {/* Left Column: Execution Trace timeline */}
                            <div>
                              <h4 className="font-label-caps text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant mb-4">
                                Execution Trace
                              </h4>

                              <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-outline-variant pl-1">
                                {log.steps.map((step, sIdx) => {
                                  const bulletColor = step.status === 'success' ? 'bg-emerald-500' : step.status === 'error' ? 'bg-red-500' : 'bg-amber-500';
                                  
                                  return (
                                    <div key={sIdx} className="relative flex items-start space-x-3">
                                      {/* Connected timeline circle */}
                                      <div className="w-6 h-6 rounded-full bg-surface-container border-2 border-outline flex items-center justify-center z-10 mt-0.5">
                                        <div className={`w-2 h-2 rounded-full ${bulletColor}`} />
                                      </div>

                                      <div className={`flex-1 rounded border p-3 shadow-inner ${
                                        step.status === 'error'
                                          ? 'bg-red-50/20 border-red-300 text-red-900'
                                          : step.status === 'warning'
                                          ? 'bg-amber-50/20 border-amber-300 text-amber-900'
                                          : 'bg-surface border-outline-variant text-on-surface'
                                      }`}>
                                        <div className="flex justify-between items-center mb-1 font-sans">
                                          <span className="text-xs font-bold">{step.name}</span>
                                          <span className="text-[10px] text-on-surface-variant opacity-85 font-semibold">
                                            {step.duration}
                                          </span>
                                        </div>
                                        <div className="text-[11px] text-on-surface-variant leading-relaxed">
                                          {step.details}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Right Column: Raw JSON payloads */}
                            <div className="flex flex-col space-y-4 font-mono">
                              <div>
                                <h4 className="font-label-caps text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant mb-2">
                                  Raw Input Context
                                </h4>
                                <div className="bg-primary-container text-white rounded-lg p-3 overflow-x-auto border border-outline-variant shadow-inner max-h-48 overflow-y-auto custom-scrollbar">
                                  <pre className="text-[10px] leading-relaxed text-emerald-300">
                                    {JSON.stringify(log.rawInput, null, 2)}
                                  </pre>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-label-caps text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant mb-2">
                                  {log.status === 'Error' ? 'Error Output' : 'Output Payload'}
                                </h4>
                                <div className={`rounded-lg p-3 overflow-x-auto max-h-48 overflow-y-auto custom-scrollbar border ${
                                  log.status === 'Error'
                                    ? 'bg-red-50/10 border-red-300 text-red-600'
                                    : 'bg-surface border-outline-variant text-on-surface'
                                }`}>
                                  <pre className="text-[10px] leading-relaxed">
                                    {JSON.stringify(log.rawOutput, null, 2)}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-surface-container border-t border-outline-variant p-3 flex items-center justify-between text-xs">
          <span className="text-on-surface-variant font-medium">
            Showing 1 to {filteredLogs.length} of 10,234 entries
          </span>
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded hover:bg-surface-container-highest disabled:opacity-40 text-on-surface-variant cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 text-on-surface font-bold">1</span>
            <button className="p-1 rounded hover:bg-surface-container-highest text-on-surface-variant cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
