import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchemaField } from '../../types';

@Component({
  selector: 'app-data-schema',
  standalone: true,
  imports: [CommonModule, FormsModule],
  host: { class: 'flex-1 flex flex-col overflow-hidden' },
  template: `
    <div class="flex-1 overflow-y-auto p-6 bg-background flex flex-col gap-6 max-h-[calc(100vh-56px)] custom-scrollbar">
      <!-- Page Header -->
      <div class="bg-surface-container-lowest border border-outline-variant rounded-lg p-5 shadow-sm">
        <h2 class="font-serif text-lg font-bold text-on-surface">Data Schema Explorer</h2>
        <p class="text-xs text-on-surface-variant leading-relaxed mt-1">
          Define database entities, declare parameters, and specify data types for real-time condition evaluation.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Side: Declare New Field -->
        <div class="bg-white border border-outline-variant rounded-lg p-5 shadow-sm h-fit">
          <h3 class="text-sm font-bold text-on-surface mb-4 pb-2 border-b border-outline-variant flex items-center gap-2">
            <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/><path d="M12 5v14"/>
            </svg>
            <span>Declare Attribute</span>
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                Attribute Name
              </label>
              <input
                type="text"
                placeholder="e.g. device_country"
                [(ngModel)]="newFieldName"
                class="w-full h-8 px-3 text-xs border border-outline-variant rounded bg-white text-on-background focus:border-secondary focus:ring-1 focus:ring-secondary outline-none font-mono"
              />
            </div>

            <div>
              <label class="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                Entity Context
              </label>
              <select
                [(ngModel)]="newFieldEntity"
                class="w-full h-8 px-2 text-xs border border-outline-variant rounded bg-white text-on-background focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer"
              >
                <option value="User Context">User Context</option>
                <option value="Transaction">Transaction</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                Data Type
              </label>
              <select
                [(ngModel)]="newFieldType"
                class="w-full h-8 px-2 text-xs border border-outline-variant rounded bg-white text-on-background focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer font-mono"
              >
                <option value="str">str (String)</option>
                <option value="num">num (Decimal/Float)</option>
                <option value="int">int (Integer)</option>
                <option value="bool">bool (Boolean)</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                Description
              </label>
              <textarea
                placeholder="Declare usage details for risk analysis..."
                [(ngModel)]="newFieldDesc"
                rows="3"
                class="w-full p-3 text-xs border border-outline-variant rounded bg-white text-on-background focus:border-secondary focus:ring-1 focus:ring-secondary outline-none resize-none"
              ></textarea>
            </div>

            <button
              (click)="handleAddField()"
              class="w-full h-8 bg-primary text-white font-bold text-xs rounded hover:bg-primary-hover transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/><path d="M12 5v14"/>
              </svg>
              <span>Add to Schema</span>
            </button>
          </div>
        </div>

        <!-- Right Side: Active Declared Attributes list -->
        <div class="lg:col-span-2 space-y-6">
          <div *ngFor="let entityName of entities" class="bg-white border border-outline-variant rounded-lg p-5 shadow-sm">
            <h3 class="text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
              <ng-container *ngIf="entityName === 'User Context'; else transTemplate">
                <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3M17 6l3 3"/>
                </svg>
              </ng-container>
              <ng-template #transTemplate>
                <svg class="w-4 h-4 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
                </svg>
              </ng-template>
              <span>{{ entityName }} Declared Attributes</span>
              <span class="text-xs bg-surface-container px-2 py-0.5 rounded font-mono text-on-surface-variant">
                {{ getEntityFields(entityName).length }} attributes
              </span>
            </h3>

            <div class="divide-y divide-outline-variant">
              <div
                *ngFor="let field of getEntityFields(entityName)"
                class="py-3 flex items-start justify-between gap-4 hover:bg-surface-container-low/30 transition-all rounded px-2"
              >
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-bold text-on-surface">{{ field.name }}</span>
                    <span class="font-mono text-[9px] font-extrabold uppercase tracking-wider bg-surface-container border border-outline-variant px-1.5 py-0.5 rounded text-on-surface-variant">
                      {{ field.type }}
                    </span>
                  </div>
                  <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {{ field.description }}
                  </p>
                </div>

                <button
                  (click)="handleDeleteField(field.name, field.entity)"
                  class="p-1.5 text-on-surface-variant hover:text-red-600 rounded hover:bg-red-50 transition-all cursor-pointer shrink-0"
                  title="Delete from schema"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DataSchemaComponent {
  @Input() fields: SchemaField[] = [];
  @Output() fieldsChange = new EventEmitter<SchemaField[]>();

  entities: SchemaField['entity'][] = ['User Context', 'Transaction'];

  newFieldName: string = '';
  newFieldType: SchemaField['type'] = 'str';
  newFieldEntity: SchemaField['entity'] = 'User Context';
  newFieldDesc: string = '';

  getEntityFields(entity: string): SchemaField[] {
    return this.fields.filter(f => f.entity === entity);
  }

  handleAddField() {
    const trimmedName = this.newFieldName.trim().toLowerCase();
    if (!trimmedName) return;

    if (this.fields.some(f => f.name === trimmedName && f.entity === this.newFieldEntity)) {
      alert('Field already exists on this Entity!');
      return;
    }

    const newField: SchemaField = {
      name: trimmedName,
      type: this.newFieldType,
      entity: this.newFieldEntity,
      description: this.newFieldDesc || 'Custom declared schema element.',
    };

    const updated = [...this.fields, newField];
    this.fieldsChange.emit(updated);

    this.newFieldName = '';
    this.newFieldDesc = '';
  }

  handleDeleteField(name: string, entity: string) {
    const updated = this.fields.filter(f => !(f.name === name && f.entity === entity));
    this.fieldsChange.emit(updated);
  }
}
