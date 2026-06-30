import React from 'react';
import { Search, Bell, Cloud } from 'lucide-react';

interface TopNavBarProps {
  title: string;
  activeNavGroup: 'Drafts' | 'Staging' | 'Production';
  setActiveNavGroup: (group: 'Drafts' | 'Staging' | 'Production') => void;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onPublish: () => void;
}

export default function TopNavBar({
  title,
  activeNavGroup,
  setActiveNavGroup,
  searchPlaceholder = 'Search rules...',
  searchValue,
  onSearchChange,
  onPublish,
}: TopNavBarProps) {
  return (
    <header className="bg-surface-container-lowest text-primary h-14 w-full flex items-center justify-between border-b border-outline-variant sticky top-0 z-40 px-6">
      {/* Left side: Brand/Title & Search */}
      <div className="flex items-center gap-6 flex-1 max-w-xl">
        <span className="text-md font-bold text-on-surface whitespace-nowrap">{title}</span>
        
        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4 opacity-70" />
          <input
            className="w-full pl-9 pr-3 py-1 bg-surface-container rounded border-none text-xs focus:ring-1 focus:ring-primary outline-none h-8 text-on-surface placeholder-on-surface-variant"
            placeholder={searchPlaceholder}
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Center navigation */}
      <nav className="flex items-center gap-6 h-full font-label-caps text-xs">
        {(['Drafts', 'Staging', 'Production'] as const).map((group) => {
          const isActive = activeNavGroup === group;
          return (
            <button
              key={group}
              onClick={() => setActiveNavGroup(group)}
              className={`h-full flex items-center px-2 cursor-pointer transition-all duration-150 relative ${
                isActive
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              {group}
            </button>
          );
        })}
      </nav>

      {/* Right side action buttons */}
      <div className="flex items-center gap-4">
        {/* Sync Status & Notifications */}
        <div className="flex items-center gap-2 text-on-surface-variant">
          <button className="w-8 h-8 rounded hover:bg-surface-container transition-all flex items-center justify-center cursor-pointer">
            <Bell className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded hover:bg-surface-container transition-all flex items-center justify-center cursor-pointer">
            <Cloud className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Buttons */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded border border-outline-variant text-on-surface font-semibold text-xs hover:bg-surface-container transition-all h-8 flex items-center cursor-pointer">
            Version
          </button>
          <button
            onClick={onPublish}
            className="px-4 py-1 rounded bg-primary text-white font-semibold text-xs hover:bg-primary-hover transition-all h-8 flex items-center cursor-pointer shadow-sm"
          >
            Publish
          </button>
        </div>

        {/* Profile Avatar */}
        <img
          alt="Admin profile"
          className="w-8 h-8 rounded-full border border-outline-variant object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPMdrrqWyzeOWydYDZ5GiEusaaccNuwwSzgUaeSCNdY0rzEod9mZhgtdB-AexNkKdDmk8VMnw50e3_A57G4e246PIAsj5STVCYnoX1VBbJ979-dCzxGdiAe2pmicSzaiZhM31RIDWa_lJ6tVD4mp6-nihoNTdiGyBCJQtB_81TXkox0ForwrvheiRC9oRco748uZGIhs4yQFKIHmiU_V54KTaAHPGPSrwZpxhfK6a_HlM26-1dqzVadUjIYlueVBZj_pfl_4PeL1Ea"
        />
      </div>
    </header>
  );
}
