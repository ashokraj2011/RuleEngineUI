import React, { useState } from 'react';
import { SchemaField } from '../types';
import { Plus, Trash2, Database, Key } from 'lucide-react';

interface DataSchemaProps {
  fields: SchemaField[];
  setFields: React.Dispatch<React.SetStateAction<SchemaField[]>>;
}

export default function DataSchema({ fields, setFields }: DataSchemaProps) {
  const [newFieldName, setNewFieldName] = useState<string>('');
  const [newFieldType, setNewFieldType] = useState<SchemaField['type']>('str');
  const [newFieldEntity, setNewFieldEntity] = useState<SchemaField['entity']>('User Context');
  const [newFieldDesc, setNewFieldDesc] = useState<string>('');

  const handleAddField = () => {
    const trimmedName = newFieldName.trim().toLowerCase();
    if (!trimmedName) return;
    if (fields.some((f) => f.name === trimmedName && f.entity === newFieldEntity)) {
      alert('Field already exists on this Entity!');
      return;
    }

    const newField: SchemaField = {
      name: trimmedName,
      type: newFieldType,
      entity: newFieldEntity,
      description: newFieldDesc || 'Custom declared schema element.',
    };

    setFields((prev) => [...prev, newField]);
    setNewFieldName('');
    setNewFieldDesc('');
  };

  const handleDeleteField = (name: string, entity: string) => {
    setFields((prev) => prev.filter((f) => !(f.name === name && f.entity === entity)));
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-background flex flex-col gap-6 max-h-[calc(100vh-56px)] custom-scrollbar">
      {/* Page Header */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-5 shadow-sm">
        <h2 className="font-serif text-lg font-bold text-on-surface">Data Schema Explorer</h2>
        <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
          Define database entities, declare parameters, and specify data types for real-time condition evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Declare New Field */}
        <div className="bg-white border border-outline-variant rounded-lg p-5 shadow-sm h-fit">
          <h3 className="text-sm font-bold text-on-surface mb-4 pb-2 border-b border-outline-variant flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            <span>Declare Attribute</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                Attribute Name
              </label>
              <input
                type="text"
                placeholder="e.g. device_country"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                className="w-full h-8 px-3 text-xs border border-outline-variant rounded bg-white text-on-background focus:border-secondary focus:ring-1 focus:ring-secondary outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                Entity Context
              </label>
              <select
                value={newFieldEntity}
                onChange={(e) => setNewFieldEntity(e.target.value as any)}
                className="w-full h-8 px-2 text-xs border border-outline-variant rounded bg-white text-on-background focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer"
              >
                <option value="User Context">User Context</option>
                <option value="Transaction">Transaction</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                Data Type
              </label>
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value as any)}
                className="w-full h-8 px-2 text-xs border border-outline-variant rounded bg-white text-on-background focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer font-mono"
              >
                <option value="str">str (String)</option>
                <option value="num">num (Decimal/Float)</option>
                <option value="int">int (Integer)</option>
                <option value="bool">bool (Boolean)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                Description
              </label>
              <textarea
                placeholder="Declare usage details for risk analysis..."
                value={newFieldDesc}
                onChange={(e) => setNewFieldDesc(e.target.value)}
                rows={3}
                className="w-full p-3 text-xs border border-outline-variant rounded bg-white text-on-background focus:border-secondary focus:ring-1 focus:ring-secondary outline-none resize-none"
              />
            </div>

            <button
              onClick={handleAddField}
              className="w-full h-8 bg-primary text-white font-bold text-xs rounded hover:bg-primary-hover transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Schema</span>
            </button>
          </div>
        </div>

        {/* Right Side: Active Declared Attributes list */}
        <div className="lg:col-span-2 space-y-6">
          {['User Context', 'Transaction'].map((entityName) => {
            const entityFields = fields.filter((f) => f.entity === entityName);
            
            return (
              <div key={entityName} className="bg-white border border-outline-variant rounded-lg p-5 shadow-sm">
                <h3 className="text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
                  {entityName === 'User Context' ? (
                    <Key className="w-4 h-4 text-primary" />
                  ) : (
                    <Database className="w-4 h-4 text-secondary" />
                  )}
                  <span>{entityName} Declared Attributes</span>
                  <span className="text-xs bg-surface-container px-2 py-0.5 rounded font-mono text-on-surface-variant">
                    {entityFields.length} attributes
                  </span>
                </h3>

                <div className="divide-y divide-outline-variant">
                  {entityFields.map((field) => (
                    <div
                      key={field.name}
                      className="py-3 flex items-start justify-between gap-4 hover:bg-surface-container-low/30 transition-all rounded px-2"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-on-surface">{field.name}</span>
                          <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider bg-surface-container border border-outline-variant px-1.5 py-0.5 rounded text-on-surface-variant">
                            {field.type}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                          {field.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteField(field.name, field.entity)}
                        className="p-1.5 text-on-surface-variant hover:text-red-600 rounded hover:bg-red-50 transition-all cursor-pointer shrink-0"
                        title="Delete from schema"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
