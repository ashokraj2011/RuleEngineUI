import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  host: { class: 'block' },
  template: `
    <aside class="w-[280px] h-screen bg-surface-container-low dark:bg-primary-container border-r border-outline-variant flex flex-col fixed left-0 top-0 bottom-0 z-50">
      <!-- Header -->
      <div class="p-5 border-b border-outline-variant">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-serif text-lg font-bold">
            U
          </div>
          <div>
            <h1 class="font-serif text-lg font-bold text-primary leading-tight">Logic Engine</h1>
            <p class="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Enterprise v4.2
            </p>
          </div>
        </div>
        <button
          (click)="newRule.emit()"
          class="w-full bg-primary text-white hover:bg-primary-hover transition-all duration-150 py-2 px-3 rounded flex items-center justify-center gap-2 font-medium cursor-pointer active:scale-98 shadow-sm text-sm"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="M12 5v14"/>
          </svg>
          <span>New Rule</span>
        </button>
      </div>

      <!-- Main Navigation -->
      <nav class="flex-1 overflow-y-auto py-4">
        <ul class="flex flex-col gap-1 px-2">
          <li *ngFor="let item of menuItems">
            <button
              (click)="activeTabChange.emit(item.id)"
              [ngClass]="{
                'bg-primary text-white font-semibold shadow-sm': activeTab === item.id,
                'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high': activeTab !== item.id
              }"
              class="w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition-all duration-150 cursor-pointer text-left"
            >
              <div [innerHTML]="item.svg" class="w-4 h-4 shrink-0" [ngClass]="{'text-white': activeTab === item.id, 'text-on-surface-variant': activeTab !== item.id}"></div>
              <span>{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Footer Navigation -->
      <div class="p-4 border-t border-outline-variant">
        <ul class="flex flex-col gap-1 mb-4">
          <li *ngFor="let item of footerItems">
            <button
              (click)="activeTabChange.emit(item.id)"
              [ngClass]="{
                'bg-primary text-white font-semibold shadow-sm': activeTab === item.id,
                'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high': activeTab !== item.id
              }"
              class="w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition-all duration-150 cursor-pointer text-left"
            >
              <div [innerHTML]="item.svg" class="w-4 h-4 shrink-0" [ngClass]="{'text-white': activeTab === item.id, 'text-on-surface-variant': activeTab !== item.id}"></div>
              <span>{{ item.label }}</span>
            </button>
          </li>
        </ul>

        <!-- User Card -->
        <div class="flex items-center gap-3 pt-3 border-t border-outline-variant">
          <div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
            <img
              class="object-cover w-full h-full"
              alt="Logic Author avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQO6UJ0kM4jzaarCjzFq2wK6MsvyvE7l5Wv8mTUhbHYfNM9H2FcUVjZndOPqqtRfSzmSwO-8I223DE17XaE8Ybg1WSb8SXgd_MzG_aXTYzxvtilizt3PVEyTnTQmLsZ5itryDWqHpOubqDO5m79INZhhhhIPgBEONQ4mzZffkNY0r0zzpEKXeZpOcetG8y1KUV4-bHadf7LaKL8EtY-ODhaDDk6xCJBq1OqkCbZjA6BpS5JZ8nLnU5MtKPtbNYrgUoCifyBtLUHZb4"
            />
          </div>
          <div class="min-w-0">
            <div class="text-xs font-bold text-on-surface truncate">Logic Author</div>
            <div className="text-[10px] text-on-surface-variant opacity-80 truncate">Admin Console</div>
          </div>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  @Input() activeTab: string = '';
  @Output() activeTabChange = new EventEmitter<string>();
  @Output() newRule = new EventEmitter<void>();

  menuItems = [
    {
      id: 'schema',
      label: 'Data Schema',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`
    },
    {
      id: 'rulesets',
      label: 'Rules',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`
    },
    {
      id: 'functions',
      label: 'Functions',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M18 7V5H6l6 7-6 7h12v-2"/></svg>`
    },
    {
      id: 'history',
      label: 'History',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>`
    }
  ];

  footerItems = [
    {
      id: 'settings',
      label: 'Settings',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`
    },
    {
      id: 'support',
      label: 'Support',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`
    }
  ];
}
