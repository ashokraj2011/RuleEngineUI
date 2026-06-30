import React from 'react';
import { Database, GitBranch, TableProperties, Sigma, History, Settings, HelpCircle, Plus } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewRule: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onNewRule }: SidebarProps) {
  const menuItems = [
    { id: 'schema', label: 'Data Schema', icon: Database },
    { id: 'rulesets', label: 'Rule Sets', icon: GitBranch },
    { id: 'tables', label: 'Decision Tables', icon: TableProperties },
    { id: 'functions', label: 'Functions', icon: Sigma },
    { id: 'history', label: 'History', icon: History },
  ];

  const footerItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <aside className="w-[280px] h-screen bg-surface-container-low dark:bg-primary-container border-r border-outline-variant flex flex-col fixed left-0 top-0 bottom-0 z-50">
      {/* Header */}
      <div className="p-5 border-b border-outline-variant">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-serif text-lg font-bold">
            U
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-primary leading-tight">Logic Engine</h1>
            <p className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Enterprise v4.2
            </p>
          </div>
        </div>
        <button
          onClick={onNewRule}
          className="w-full bg-primary text-white hover:bg-primary-hover transition-all duration-150 py-2 px-3 rounded flex items-center justify-center gap-2 font-medium cursor-pointer active:scale-98 shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Rule</span>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="flex flex-col gap-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition-all duration-150 cursor-pointer text-left ${
                    isActive
                      ? 'bg-primary text-white font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-on-surface-variant'}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-outline-variant">
        <ul className="flex flex-col gap-1 mb-4">
          {footerItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition-all duration-150 cursor-pointer text-left ${
                    isActive
                      ? 'bg-primary text-white font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* User Card */}
        <div className="flex items-center gap-3 pt-3 border-t border-outline-variant">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
            <img
              className="object-cover w-full h-full"
              alt="Logic Author avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQO6UJ0kM4jzaarCjzFq2wK6MsvyvE7l5Wv8mTUhbHYfNM9H2FcUVjZndOPqqtRfSzmSwO-8I223DE17XaE8Ybg1WSb8SXgd_MzG_aXTYzxvtilizt3PVEyTnTQmLsZ5itryDWqHpOubqDO5m79INZhhhhIPgBEONQ4mzZffkNY0r0zzpEKXeZpOcetG8y1KUV4-bHadf7LaKL8EtY-ODhaDDk6xCJBq1OqkCbZjA6BpS5JZ8nLnU5MtKPtbNYrgUoCifyBtLUHZb4"
            />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-on-surface truncate">Logic Author</div>
            <div className="text-[10px] text-on-surface-variant opacity-80 truncate">Admin Console</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
