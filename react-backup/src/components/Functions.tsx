import React, { useState, useMemo } from 'react';
import {
  Sigma,
  Code,
  Play,
  HelpCircle,
  Terminal,
  Plus,
  Search,
  Database,
  Filter,
  ArrowUpDown,
  CheckSquare,
  Save,
  ArrowLeft,
  ArrowRight,
  Edit3,
  Calculator,
  Sliders,
  ChevronRight,
  Trash2,
  FileText
} from 'lucide-react';

interface RuleFx {
  id: string;
  name: string;
  category: 'filters' | 'aggregates' | 'sorting';
  signature: string;
  description: string;
  syntax: string;
  returnType: string;
  parameters?: { name: string; type: string; description: string }[];
  sampleOutput?: string;
  isCustom?: boolean;
  builderDetails?: {
    sourceCollection: string;
    filterField: string;
    filterOperator: string;
    filterValue: string;
    sortByField: string;
    sortDirection: 'asc' | 'desc';
    selectionType: 'all' | 'first' | 'last' | 'range';
    selectionCount: number;
    selectionFrom: number;
    selectionTo: number;
    aggregateOperation: string;
    aggregateField: string;
  };
}

const INITIAL_FUNCTIONS: RuleFx[] = [
  // Filter Functions
  {
    id: 'date_range',
    name: 'Date Range',
    category: 'filters',
    signature: 'IS_BETWEEN(target_date, start_date, end_date) -> bool',
    description: 'Evaluates if a target date falls strictly within a specified start and end period.',
    syntax: 'IS_BETWEEN(target_date, start_date, end_date)',
    returnType: 'BOOLEAN',
    parameters: [
      { name: 'target_date', type: 'datetime', description: 'The date value to be checked.' },
      { name: 'start_date', type: 'datetime', description: 'The beginning of the allowed period.' },
      { name: 'end_date', type: 'datetime', description: 'The end of the allowed period.' }
    ],
    sampleOutput: 'true'
  },
  {
    id: 'value_match',
    name: 'Value Match',
    category: 'filters',
    signature: 'EQUALS(attribute, value) -> bool',
    description: 'Performs a strict equality check against a defined scalar value.',
    syntax: 'EQUALS(attribute, value)',
    returnType: 'BOOLEAN',
    parameters: [
      { name: 'attribute', type: 'any', description: 'The variable to compare.' },
      { name: 'value', type: 'any', description: 'The absolute value to compare against.' }
    ],
    sampleOutput: 'false'
  },
  {
    id: 'contains_list',
    name: 'Contains List',
    category: 'filters',
    signature: 'IN_ARRAY(target, [list_values]) -> bool',
    description: 'Checks if the target string exists within a defined array of acceptable strings.',
    syntax: 'IN_ARRAY(target, [list_values])',
    returnType: 'BOOLEAN',
    parameters: [
      { name: 'target', type: 'str', description: 'The value being verified.' },
      { name: 'list_values', type: 'str[]', description: 'Array of valid comparison values.' }
    ],
    sampleOutput: 'true'
  },
  // Aggregates
  {
    id: 'sum_total',
    name: 'Sum Total',
    category: 'aggregates',
    signature: "SUM(collection, 'field_name') -> num",
    description: 'Calculates the total numeric sum of a specific field across a collection.',
    syntax: "SUM(collection, 'field_name')",
    returnType: 'FLOAT',
    parameters: [
      { name: 'collection', type: 'array', description: 'The array of records to compute.' },
      { name: 'field_name', type: 'str', description: 'The numeric field identifier inside each record.' }
    ],
    sampleOutput: '45000.00'
  },
  {
    id: 'count_items',
    name: 'Count Items',
    category: 'aggregates',
    signature: 'COUNT(collection, [condition]) -> int',
    description: 'Returns the number of items in a collection that match an optional condition.',
    syntax: 'COUNT(collection, [condition])',
    returnType: 'INTEGER',
    parameters: [
      { name: 'collection', type: 'array', description: 'The records to evaluate.' },
      { name: 'condition', type: 'expr', description: 'Optional logical filter expression.' }
    ],
    sampleOutput: '18'
  },
  {
    id: 'rolling_average',
    name: 'Rolling Average',
    category: 'aggregates',
    signature: "AVERAGE(collection, 'field', window) -> num",
    description: 'Computes the mean value of a field over a specified time window.',
    syntax: "AVERAGE(collection, 'field', window)",
    returnType: 'FLOAT',
    parameters: [
      { name: 'collection', type: 'array', description: 'The record history dataset.' },
      { name: 'field', type: 'str', description: 'The numeric field name.' },
      { name: 'window', type: 'str', description: 'Rolling time limit (e.g. 30d).' }
    ],
    sampleOutput: '1240.25'
  },
  // Record Selection & Sorting
  {
    id: 'first_n',
    name: 'First N Records',
    category: 'sorting',
    signature: 'FIRST(collection, sort_attr, n) -> array',
    description: 'Selects the first N records after sorting by a specific attribute.',
    syntax: 'FIRST(collection, sort_attr, n)',
    returnType: 'COLLECTION',
    parameters: [
      { name: 'collection', type: 'array', description: 'Source record elements.' },
      { name: 'sort_attr', type: 'str', description: 'The sorting attribute name.' },
      { name: 'n', type: 'int', description: 'Count limit to extract.' }
    ],
    sampleOutput: '[{id: 1, val: 500}, {id: 2, val: 450}]'
  },
  {
    id: 'last_n',
    name: 'Last N Records',
    category: 'sorting',
    signature: 'LAST(collection, sort_attr, n) -> array',
    description: 'Selects the last N records after sorting by a specific attribute.',
    syntax: 'LAST(collection, sort_attr, n)',
    returnType: 'COLLECTION',
    parameters: [
      { name: 'collection', type: 'array', description: 'Source record elements.' },
      { name: 'sort_attr', type: 'str', description: 'The sorting attribute name.' },
      { name: 'n', type: 'int', description: 'Count limit from the tail.' }
    ],
    sampleOutput: '[{id: 99, val: 5}, {id: 100, val: 2}]'
  },
  {
    id: 'record_range',
    name: 'Record Range',
    category: 'sorting',
    signature: 'RANGE(collection, sort_attr, start, end) -> array',
    description: 'Selects a specific range of records based on sorting criteria.',
    syntax: 'RANGE(collection, sort_attr, start, end)',
    returnType: 'COLLECTION',
    parameters: [
      { name: 'collection', type: 'array', description: 'Source record elements.' },
      { name: 'sort_attr', type: 'str', description: 'The sorting attribute name.' },
      { name: 'start', type: 'int', description: 'Lower index offset.' },
      { name: 'end', type: 'int', description: 'Upper index limit.' }
    ],
    sampleOutput: '[{id: 5, val: 120}, {id: 6, val: 110}]'
  }
];

export default function Functions() {
  const [functions, setFunctions] = useState<RuleFx[]>(INITIAL_FUNCTIONS);
  const [currentView, setCurrentView] = useState<'library' | 'wizard'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'filters' | 'aggregates' | 'sorting'>('all');

  // Interactive sandbox / detail state
  const [selectedFx, setSelectedFx] = useState<RuleFx | null>(INITIAL_FUNCTIONS[0]);
  const [testParamInput, setTestParamInput] = useState('transactions, amount_usd, 30');
  const [executionOutput, setExecutionOutput] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  // Wizard state
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardMode, setWizardMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [fxName, setFxName] = useState('Total High Value Txns');
  const [fxSource, setFxSource] = useState('Transactions');
  const [fxDescription, setFxDescription] = useState('Aggregate high-value cardholder transactions for volume checks.');
  const [enableFilter, setEnableFilter] = useState(true);
  const [filterField, setFilterField] = useState('amount');
  const [filterOperator, setFilterOperator] = useState('>');
  const [filterValue, setFilterValue] = useState('1000');
  const [sortByField, setSortByField] = useState('transaction_timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectionType, setSelectionType] = useState<'all' | 'first' | 'last' | 'range'>('first');
  const [selectionCount, setSelectionCount] = useState(100);
  const [selectionFrom, setSelectionFrom] = useState(1);
  const [selectionTo, setSelectionTo] = useState(50);
  const [aggregateOperation, setAggregateOperation] = useState('sum');
  const [aggregateField, setAggregateField] = useState('amount_usd');

  // Dynamic values helper
  const formattedSignatureName = useMemo(() => {
    return fxName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  }, [fxName]);

  const outputSignaturePreview = useMemo(() => {
    const returnType = ['sum', 'avg', 'rolling'].includes(aggregateOperation) ? 'Float' : aggregateOperation === 'count' ? 'Integer' : 'Float';
    return `fn: ${formattedSignatureName || 'unnamed_function'}() -> ${returnType}`;
  }, [formattedSignatureName, aggregateOperation]);

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered functions
  const filteredFunctions = useMemo(() => {
    return functions.filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.syntax.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || f.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [functions, searchQuery, activeCategory]);

  const filterCategoryItems = (cat: 'filters' | 'aggregates' | 'sorting') => {
    return filteredFunctions.filter(f => f.category === cat);
  };

  // Load function into tester playground
  const handleLoadTester = (fx: RuleFx) => {
    setSelectedFx(fx);
    setExecutionOutput('');
    if (fx.isCustom && fx.builderDetails) {
      setTestParamInput(fx.builderDetails.sourceCollection);
    } else {
      if (fx.id === 'date_range') setTestParamInput('2026-06-27, 2026-06-01, 2026-06-30');
      else if (fx.id === 'value_match') setTestParamInput('status, "completed"');
      else if (fx.id === 'contains_list') setTestParamInput('"US", ["US", "CA", "MX"]');
      else if (fx.id === 'sum_total') setTestParamInput('transactions, "amount_usd"');
      else if (fx.id === 'count_items') setTestParamInput('transactions, "amount_usd > 500"');
      else if (fx.id === 'rolling_average') setTestParamInput('transactions, "amount_usd", "30d"');
      else setTestParamInput('transactions, "amount_usd", 10');
    }
  };

  // Run calculation sandbox simulation
  const handleTestRun = () => {
    if (!selectedFx) return;
    setIsTesting(true);
    setExecutionOutput('Compiling formula code execution block...\n');

    setTimeout(() => {
      let outputSim = '';
      if (selectedFx.isCustom && selectedFx.builderDetails) {
        const details = selectedFx.builderDetails;
        outputSim = `[COMPILER] Instantiating logical pipeline:
- Target Collection: "${details.sourceCollection}"
- Filter Query: [${details.filterField} ${details.filterOperator} ${details.filterValue}]
- Sorting: Order by "${details.sortByField}" (${details.sortDirection.toUpperCase()})
- Scope constraints: "${details.selectionType.toUpperCase()}" selection
- Aggregate reducer: ${details.aggregateOperation.toUpperCase()}(${details.aggregateField})

[SUCCESS] Executed evaluation on simulated context.
[RESULT] Return value (Float): 125,480.50 USD
[LOGS] Evaluated 1,420 records in collection, isolated ${details.selectionType === 'all' ? 'All' : '100'} subset records. Pipeline OK.`;
      } else {
        outputSim = `[COMPILER] Invoking evaluation: ${selectedFx.syntax}
- Params parsed: [${testParamInput}]
- Return type definition: ${selectedFx.returnType}

[SUCCESS] Logical criteria matched.
[RESULT] Evaluated output value: "${selectedFx.sampleOutput || 'true'}"`;
      }
      setExecutionOutput(outputSim);
      setIsTesting(false);
    }, 900);
  };

  // Open builder to create a new custom logic
  const handleOpenCreateWizard = () => {
    setWizardMode('create');
    setEditingId(null);
    setFxName('Total High Value Txns');
    setFxSource('Transactions');
    setFxDescription('Aggregate high-value cardholder transactions for volume checks.');
    setEnableFilter(true);
    setFilterField('amount');
    setFilterOperator('>');
    setFilterValue('1000');
    setSortByField('transaction_timestamp');
    setSortDirection('desc');
    setSelectionType('first');
    setSelectionCount(100);
    setSelectionFrom(1);
    setSelectionTo(50);
    setAggregateOperation('sum');
    setAggregateField('amount_usd');
    setWizardStep(1);
    setCurrentView('wizard');
  };

  // Open builder with populated custom values to Edit
  const handleOpenEditWizard = (fx: RuleFx) => {
    if (!fx.isCustom || !fx.builderDetails) {
      triggerToast('Built-in system functions cannot be edited directly.');
      return;
    }
    setWizardMode('edit');
    setEditingId(fx.id);
    setFxName(fx.name);
    setFxDescription(fx.description);

    const b = fx.builderDetails;
    setFxSource(b.sourceCollection);
    setEnableFilter(!!b.filterField);
    setFilterField(b.filterField || 'amount');
    setFilterOperator(b.filterOperator || '>');
    setFilterValue(b.filterValue || '1000');
    setSortByField(b.sortByField || 'transaction_timestamp');
    setSortDirection(b.sortDirection || 'desc');
    setSelectionType(b.selectionType || 'first');
    setSelectionCount(b.selectionCount || 100);
    setSelectionFrom(b.selectionFrom || 1);
    setSelectionTo(b.selectionTo || 50);
    setAggregateOperation(b.aggregateOperation || 'sum');
    setAggregateField(b.aggregateField || 'amount_usd');

    setWizardStep(1);
    setCurrentView('wizard');
  };

  // Save the custom function
  const handleFinishAndSave = () => {
    const returnType = ['sum', 'avg', 'rolling'].includes(aggregateOperation) ? 'FLOAT' : aggregateOperation === 'count' ? 'INTEGER' : 'FLOAT';

    const customFx: RuleFx = {
      id: editingId || `custom_${Date.now()}`,
      name: fxName,
      category: 'aggregates',
      signature: `${formattedSignatureName}() -> ${returnType.toLowerCase()}`,
      description: fxDescription || `Custom mathematical ${aggregateOperation} evaluation over ${fxSource}.`,
      syntax: `${formattedSignatureName}()`,
      returnType: returnType,
      sampleOutput: '125480.50',
      isCustom: true,
      parameters: [
        { name: 'context', type: 'object', description: 'Evaluation payload context containing pipeline parameters.' }
      ],
      builderDetails: {
        sourceCollection: fxSource,
        filterField: enableFilter ? filterField : '',
        filterOperator: enableFilter ? filterOperator : '',
        filterValue: enableFilter ? filterValue : '',
        sortByField: sortByField,
        sortDirection: sortDirection,
        selectionType: selectionType,
        selectionCount: selectionCount,
        selectionFrom: selectionFrom,
        selectionTo: selectionTo,
        aggregateOperation: aggregateOperation,
        aggregateField: aggregateField
      }
    };

    if (wizardMode === 'edit' && editingId) {
      setFunctions(prev => prev.map(f => f.id === editingId ? customFx : f));
      triggerToast(`Successfully updated function "${fxName}".`);
    } else {
      setFunctions(prev => [...prev, customFx]);
      triggerToast(`Successfully authored custom logic function "${fxName}".`);
    }

    setSelectedFx(customFx);
    setCurrentView('library');
  };

  // Delete custom function
  const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFunctions(prev => prev.filter(f => f.id !== id));
    triggerToast('Custom function removed successfully.');
    if (selectedFx?.id === id) {
      setSelectedFx(INITIAL_FUNCTIONS[0]);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-[#F9FAFB] relative min-h-0">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary border-2 border-emerald-300 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce text-xs font-bold">
          <span>{toastMessage}</span>
        </div>
      )}

      {currentView === 'library' ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Main List & Grid view on left */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 select-text">
            {/* Header section with CTA */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-on-surface">Functions Library</h1>
                <p className="text-xs text-on-surface-variant mt-1">
                  Manage and author core logic functions for advanced rule evaluation.
                </p>
              </div>
              <button
                onClick={handleOpenCreateWizard}
                className="bg-secondary hover:bg-secondary/90 text-on-secondary px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Function</span>
              </button>
            </div>

            {/* Filter Categories Chips & Search Bar */}
            <div className="bg-white border border-outline-variant rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'filters', 'aggregates', 'sorting'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-primary text-white'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {cat === 'sorting' ? 'Record Selection & Sorting' : cat === 'filters' ? 'Filter Functions' : cat}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative max-w-md w-full md:w-72">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  type="text"
                  placeholder="Search functions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-8 pl-9 pr-3 bg-surface-container-low border border-outline-variant rounded-lg text-xs focus:outline-none focus:border-secondary transition-colors"
                />
              </div>
            </div>

            {/* CATEGORY 1: Filter Functions */}
            {(activeCategory === 'all' || activeCategory === 'filters') && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/50">
                  <Filter className="w-4 h-4 text-on-surface-variant" />
                  <h2 className="text-base font-bold text-on-surface">Filter Functions</h2>
                </div>
                {filterCategoryItems('filters').length === 0 ? (
                  <p className="text-xs text-on-surface-variant italic">No filter functions match your search criteria.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterCategoryItems('filters').map((fx) => (
                      <div
                        key={fx.id}
                        onClick={() => handleLoadTester(fx)}
                        className={`bg-white border rounded-xl flex flex-col transition-all cursor-pointer shadow-sm hover:shadow relative overflow-hidden group ${
                          selectedFx?.id === fx.id ? 'border-secondary ring-2 ring-secondary/10' : 'border-outline-variant/60 hover:border-secondary/40'
                        }`}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                        <div className="p-4 flex-grow">
                          <div className="flex justify-between items-start mb-2 gap-2">
                            <h3 className="font-bold text-xs text-on-surface truncate">{fx.name}</h3>
                            <span className="bg-surface-container-high text-on-surface-variant font-mono text-[9px] px-1.5 py-0.5 rounded tracking-wide shrink-0">
                              {fx.returnType}
                            </span>
                          </div>
                          <p className="text-[11px] text-on-surface-variant mb-4 leading-normal min-h-[32px]">
                            {fx.description}
                          </p>
                          <div className="bg-surface-container-low border border-outline-variant/30 rounded p-2.5">
                            <code className="font-mono text-[10px] text-secondary break-all">{fx.syntax}</code>
                          </div>
                        </div>
                        <div className="px-4 py-2 border-t border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
                          <span className="text-[10px] text-on-surface-variant italic">Built-in</span>
                          <button className="text-secondary text-[11px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-3 h-3 fill-secondary" /> Test
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* CATEGORY 2: Aggregates */}
            {(activeCategory === 'all' || activeCategory === 'aggregates') && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/50">
                  <Sigma className="w-4 h-4 text-on-surface-variant" />
                  <h2 className="text-base font-bold text-on-surface">Aggregates</h2>
                </div>
                {filterCategoryItems('aggregates').length === 0 ? (
                  <p className="text-xs text-on-surface-variant italic">No aggregates match your search criteria.</p>
                ) : (
                  <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 px-4 py-2.5 bg-surface-container-low border-b border-outline-variant/40 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                      <div className="col-span-3">Function Name</div>
                      <div className="col-span-4">Description</div>
                      <div className="col-span-4">Syntax Formula</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-outline-variant/20">
                      {filterCategoryItems('aggregates').map((fx) => (
                        <div
                          key={fx.id}
                          onClick={() => handleLoadTester(fx)}
                          className={`grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-surface-container-lowest transition-colors cursor-pointer group ${
                            selectedFx?.id === fx.id ? 'bg-secondary/5' : ''
                          }`}
                        >
                          <div className="col-span-3 flex items-center gap-2 min-w-0">
                            <div className={`w-1 h-6 rounded-full shrink-0 ${fx.isCustom ? 'bg-secondary' : 'bg-amber-500'}`}></div>
                            <div className="min-w-0">
                              <span className="font-bold text-xs text-on-surface block truncate">{fx.name}</span>
                              {fx.isCustom && (
                                <span className="inline-block bg-secondary/10 text-secondary text-[8px] px-1 rounded font-extrabold uppercase mt-0.5">
                                  Custom Logic
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-span-4 text-[11px] text-on-surface-variant leading-relaxed line-clamp-2">
                            {fx.description}
                          </div>
                          <div className="col-span-4">
                            <code className="font-mono text-[10px] text-secondary bg-surface-container-low px-2 py-1 rounded border border-outline-variant/30 select-all block truncate max-w-full">
                              {fx.syntax}
                            </code>
                          </div>
                          <div className="col-span-1 flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            {fx.isCustom ? (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenEditWizard(fx);
                                  }}
                                  className="text-on-surface-variant hover:text-secondary p-1 rounded hover:bg-surface-container"
                                  title="Edit Function"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => handleDeleteCustom(fx.id, e)}
                                  className="text-on-surface-variant hover:text-error p-1 rounded hover:bg-red-50"
                                  title="Delete Custom Logic"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            ) : (
                              <span className="text-[10px] text-on-surface-variant mr-1 italic">System</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* CATEGORY 3: Record Selection & Sorting */}
            {(activeCategory === 'all' || activeCategory === 'sorting') && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/50">
                  <ArrowUpDown className="w-4 h-4 text-on-surface-variant" />
                  <h2 className="text-base font-bold text-on-surface">Record Selection & Sorting</h2>
                </div>
                {filterCategoryItems('sorting').length === 0 ? (
                  <p className="text-xs text-on-surface-variant italic">No sorting functions match your search criteria.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterCategoryItems('sorting').map((fx) => (
                      <div
                        key={fx.id}
                        onClick={() => handleLoadTester(fx)}
                        className={`bg-white border rounded-xl flex flex-col transition-all cursor-pointer shadow-sm hover:shadow relative overflow-hidden group ${
                          selectedFx?.id === fx.id ? 'border-secondary ring-2 ring-secondary/10' : 'border-outline-variant/60 hover:border-secondary/40'
                        }`}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500"></div>
                        <div className="p-4 flex-grow">
                          <div className="flex justify-between items-start mb-2 gap-2">
                            <h3 className="font-bold text-xs text-on-surface truncate">{fx.name}</h3>
                            <span className="bg-surface-container-high text-on-surface-variant font-mono text-[9px] px-1.5 py-0.5 rounded tracking-wide shrink-0">
                              {fx.returnType}
                            </span>
                          </div>
                          <p className="text-[11px] text-on-surface-variant mb-4 leading-normal min-h-[32px]">
                            {fx.description}
                          </p>
                          <div className="bg-surface-container-low border border-outline-variant/30 rounded p-2.5">
                            <code className="font-mono text-[10px] text-secondary break-all">{fx.syntax}</code>
                          </div>
                        </div>
                        <div className="px-4 py-2 border-t border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
                          <span className="text-[10px] text-on-surface-variant italic">Built-in</span>
                          <button className="text-secondary text-[11px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-3 h-3 fill-secondary" /> Test
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Persistent Dynamic Inspector & Compiler sandbox panel on right */}
          <aside className="w-96 border-l border-outline-variant bg-white flex flex-col shrink-0">
            {selectedFx ? (
              <div className="h-full flex flex-col min-h-0 select-text">
                <div className="p-5 border-b border-outline-variant">
                  <div className="flex items-center gap-2 mb-1.5 text-secondary">
                    <Sliders className="w-4.5 h-4.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Function Inspector</span>
                  </div>
                  <h2 className="text-base font-bold text-on-surface leading-tight">{selectedFx.name}</h2>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Evaluate and inspect active logical boundaries.
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-5 min-h-0 custom-scrollbar">
                  {/* Signature block */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Programmatic Signature
                    </label>
                    <pre className="bg-surface-container p-3 rounded-lg font-mono text-xs text-primary font-bold border border-outline-variant overflow-x-auto select-all leading-normal whitespace-pre">
                      {selectedFx.signature}
                    </pre>
                  </div>

                  {/* Description details */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Evaluation Goal
                    </label>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {selectedFx.description}
                    </p>
                  </div>

                  {/* Parameters config */}
                  {selectedFx.parameters && selectedFx.parameters.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                        Parameters Defined
                      </label>
                      <div className="border border-outline-variant rounded-lg divide-y divide-outline-variant overflow-hidden">
                        {selectedFx.parameters.map((p) => (
                          <div key={p.name} className="p-2.5 bg-surface-container-lowest flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-secondary">{p.name}</span>
                              <span className="font-mono text-[9px] bg-outline-variant/30 px-1 py-0.5 rounded text-on-surface-variant font-extrabold uppercase">
                                {p.type}
                              </span>
                            </div>
                            <span className="text-[11px] text-on-surface-variant leading-normal">
                              {p.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom configuration specifications summary (only for custom) */}
                  {selectedFx.isCustom && selectedFx.builderDetails && (
                    <div className="space-y-2 bg-surface-container-low border border-outline-variant p-3 rounded-xl">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                        Custom Pipeline Logic Specs
                      </label>
                      <div className="text-[11px] text-on-surface space-y-1.5 font-mono">
                        <div>• Collection: <span className="font-bold">{selectedFx.builderDetails.sourceCollection}</span></div>
                        {selectedFx.builderDetails.filterField && (
                          <div>• Criteria: <span className="font-bold text-teal-600">{selectedFx.builderDetails.filterField} {selectedFx.builderDetails.filterOperator} {selectedFx.builderDetails.filterValue}</span></div>
                        )}
                        <div>• Sort Key: <span className="font-bold">{selectedFx.builderDetails.sortByField} ({selectedFx.builderDetails.sortDirection.toUpperCase()})</span></div>
                        <div>• Limit Selection: <span className="font-bold text-secondary">{selectedFx.builderDetails.selectionType.toUpperCase()} {selectedFx.builderDetails.selectionType !== 'all' && `(${selectedFx.builderDetails.selectionCount})`}</span></div>
                        <div>• Reducer Operation: <span className="font-bold text-amber-600">{selectedFx.builderDetails.aggregateOperation.toUpperCase()}({selectedFx.builderDetails.aggregateField})</span></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tester console section */}
                <div className="p-5 border-t border-outline-variant bg-surface-container-low shrink-0">
                  <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-3 block">
                    Interactive Sandbox Tester
                  </h3>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-[9px] font-extrabold text-on-surface-variant mb-1 uppercase tracking-wide">
                        Mock Input Payload / Context Arguments
                      </label>
                      <input
                        type="text"
                        value={testParamInput}
                        onChange={(e) => setTestParamInput(e.target.value)}
                        className="w-full h-8 px-3 text-xs border border-outline-variant rounded-lg bg-white text-on-surface font-mono focus:border-secondary outline-none focus:ring-1 focus:ring-secondary"
                      />
                    </div>

                    <button
                      onClick={handleTestRun}
                      disabled={isTesting}
                      className="w-full h-8 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-lg transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Play className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : 'fill-white text-white'}`} />
                      <span>{isTesting ? 'Computing Pipeline...' : 'Run Simulated Evaluation'}</span>
                    </button>

                    {executionOutput && (
                      <div className="bg-black text-emerald-400 font-mono text-[11px] rounded-lg p-3 border border-outline-variant shadow-inner select-all overflow-x-auto">
                        <div className="text-gray-500 mb-1 flex items-center gap-1 text-[9px] font-bold uppercase">
                          <Terminal className="w-3 h-3" />
                          <span>Compiler Sandbox Log</span>
                        </div>
                        <pre className="leading-relaxed whitespace-pre-wrap">{executionOutput}</pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 h-full space-y-2 text-on-surface-variant">
                <HelpCircle className="w-10 h-10 stroke-[1.5]" />
                <h3 className="text-xs font-bold text-on-surface">No Function Selected</h3>
                <p className="text-[11px] leading-relaxed max-w-[200px]">
                  Select any built-in or custom logic from the library to test its bounds and inspect signature protocols.
                </p>
              </div>
            )}
          </aside>
        </div>
      ) : (
        /* FUNCTION BUILDER INTERACTIVE WIZARD VIEW */
        <div className="flex-1 flex flex-col overflow-hidden bg-surface-container-low select-text">
          {/* Breadcrumb Header */}
          <div className="bg-white border-b border-outline-variant px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 shadow-sm z-10">
            <div>
              <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px] font-semibold mb-1">
                <Sigma className="w-3.5 h-3.5" />
                <span>Functions</span>
                <ChevronRight className="w-3 h-3 text-on-surface-variant/50" />
                <span className="text-primary font-bold capitalize">{wizardMode} Custom Logic</span>
              </div>
              <h2 className="text-lg font-bold text-primary leading-tight">
                {wizardStep === 1 && 'Step 1: Source & Identification'}
                {wizardStep === 2 && 'Step 2: Filter Specification'}
                {wizardStep === 3 && 'Step 3: Record Sorting & Selection'}
                {wizardStep === 4 && 'Step 4: Mathematical Aggregation'}
              </h2>
            </div>

            {/* Step Counter Pills */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center h-7 px-3 rounded-full text-[11px] font-bold tracking-wide border transition-all ${
                    wizardStep === step
                      ? 'bg-secondary text-on-secondary border-secondary shadow-sm'
                      : wizardStep > step
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-on-surface-variant border-outline-variant/60'
                  }`}
                >
                  <span className="mr-1">{step}.</span>
                  {step === 1 && 'Source'}
                  {step === 2 && 'Filter'}
                  {step === 3 && 'Sort & Select'}
                  {step === 4 && 'Aggregate'}
                </div>
              ))}
            </div>
          </div>

          {/* Stepper Wizard Content Area */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 flex justify-center items-start min-h-0">
            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Form controls (span-2) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* STEP 1: Identification & Source Collection */}
                {wizardStep === 1 && (
                  <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm space-y-5 animate-fadeIn">
                    <div className="flex items-center gap-3 mb-2 border-b border-outline-variant pb-3">
                      <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
                      <h2 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                        <FileText className="w-4.5 h-4.5 text-secondary" />
                        <span>Function Meta Information</span>
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Output Name (Display Identifier)
                        </label>
                        <input
                          type="text"
                          value={fxName}
                          onChange={(e) => setFxName(e.target.value)}
                          className="w-full h-8 px-3 text-xs border border-outline-variant rounded bg-white text-on-surface font-semibold focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                          placeholder="e.g. Total High Value Txns"
                        />
                        <p className="text-[10px] text-on-surface-variant mt-1.5">
                          This identifier will represent your computed logic cell inside decision tables and rule sets.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Source Collection Dataset
                        </label>
                        <div className="relative">
                          <select
                            value={fxSource}
                            onChange={(e) => setFxSource(e.target.value)}
                            className="w-full h-8 pl-3 pr-8 text-xs border border-outline-variant rounded bg-white text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary appearance-none"
                          >
                            <option value="Transactions">Transactions (Ledger ledger collection)</option>
                            <option value="Users">Users (Verified client directory)</option>
                            <option value="Logins">Logins (Session telemetry collection)</option>
                            <option value="Devices">Devices (Hardware profiles registry)</option>
                          </select>
                          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none rotate-90" />
                        </div>
                        <p className="text-[10px] text-on-surface-variant mt-1.5">
                          Select the target raw collection framework that this logic function queries.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Business Objective Description
                        </label>
                        <textarea
                          value={fxDescription}
                          onChange={(e) => setFxDescription(e.target.value)}
                          rows={3}
                          className="w-full p-2.5 text-xs border border-outline-variant rounded bg-white text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                          placeholder="Brief explanation of logic rules, boundary constraints or business trigger..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Conditional filter logic */}
                {wizardStep === 2 && (
                  <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm space-y-5 animate-fadeIn">
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
                        <h2 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                          <Filter className="w-4.5 h-4.5 text-secondary" />
                          <span>Collection Logic Filters</span>
                        </h2>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Enable Filters</span>
                        <input
                          type="checkbox"
                          checked={enableFilter}
                          onChange={(e) => setEnableFilter(e.target.checked)}
                          className="rounded border-outline-variant text-secondary focus:ring-secondary w-4 h-4"
                        />
                      </label>
                    </div>

                    {enableFilter ? (
                      <div className="space-y-4">
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          Define matching criteria to isolate specific record subsets before performing the mathematical reduce aggregate operation.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                              Match Target Field
                            </label>
                            <input
                              type="text"
                              value={filterField}
                              onChange={(e) => setFilterField(e.target.value)}
                              className="w-full h-8 px-3 text-xs border border-outline-variant rounded bg-white text-on-surface font-mono focus:outline-none focus:border-secondary"
                              placeholder="e.g. amount"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                              Operator
                            </label>
                            <div className="relative">
                              <select
                                value={filterOperator}
                                onChange={(e) => setFilterOperator(e.target.value)}
                                className="w-full h-8 pl-3 pr-8 text-xs border border-outline-variant rounded bg-white text-on-surface font-bold focus:outline-none focus:border-secondary appearance-none"
                              >
                                <option value=">">{"Greater Than (>)"}</option>
                                <option value="<">{"Less Than (<)"}</option>
                                <option value="==">{"Strict Equals (==)"}</option>
                                <option value="!=">{"Not Equals (!=)"}</option>
                                <option value="contains">{"Contains Pattern"}</option>
                                <option value="starts_with">{"Starts With"}</option>
                              </select>
                              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none rotate-90" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                              Constraint Value
                            </label>
                            <input
                              type="text"
                              value={filterValue}
                              onChange={(e) => setFilterValue(e.target.value)}
                              className="w-full h-8 px-3 text-xs border border-outline-variant rounded bg-white text-on-surface font-mono focus:outline-none focus:border-secondary"
                              placeholder="e.g. 1000"
                            />
                          </div>
                        </div>

                        <div className="bg-surface-container-low border border-dashed border-outline-variant p-3.5 rounded-lg flex items-center justify-between text-xs text-on-surface-variant">
                          <span>Synthesized Filter SQL:</span>
                          <code className="font-mono text-[10px] text-secondary font-bold bg-white px-2 py-0.5 rounded border">
                            {filterField || 'field'} {filterOperator} "{filterValue || 'value'}"
                          </code>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-surface-container rounded-xl border border-outline-variant/60">
                        <p className="text-xs text-on-surface-variant italic">
                          No logical constraints active. The entire raw collection dataset will be pulled into step 3.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: Record Sorting & selection bounds */}
                {wizardStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Sorting criteria */}
                    <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 mb-2 border-b border-outline-variant pb-2">
                        <ArrowUpDown className="w-4 h-4 text-secondary" />
                        <h3 className="text-sm font-bold text-on-surface">Sorting Order Configuration</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Define the primary sorting database key and direction to sort filtered elements before selection.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                            Sort By Field
                          </label>
                          <div className="relative">
                            <select
                              value={sortByField}
                              onChange={(e) => setSortByField(e.target.value)}
                              className="w-full h-8 pl-3 pr-8 text-xs border border-outline-variant rounded bg-white text-on-surface font-mono focus:outline-none focus:border-secondary appearance-none"
                            >
                              <option value="transaction_timestamp">transaction_timestamp</option>
                              <option value="amount">amount</option>
                              <option value="merchant_id">merchant_id</option>
                              <option value="status">status</option>
                            </select>
                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none rotate-90" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                            Direction
                          </label>
                          <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant/40 h-8">
                            <button
                              type="button"
                              onClick={() => setSortDirection('asc')}
                              className={`flex-1 rounded text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                                sortDirection === 'asc'
                                  ? 'bg-white text-primary shadow-sm font-bold'
                                  : 'text-on-surface-variant hover:text-on-surface'
                              }`}
                            >
                              <ArrowUpDown className="w-3.5 h-3.5" />
                              <span>Ascending</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSortDirection('desc')}
                              className={`flex-1 rounded text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                                sortDirection === 'desc'
                                  ? 'bg-white text-primary shadow-sm font-bold'
                                  : 'text-on-surface-variant hover:text-on-surface'
                              }`}
                            >
                              <ArrowUpDown className="w-3.5 h-3.5 rotate-180" />
                              <span>Descending</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Record Selection Choices */}
                    <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 mb-2 border-b border-outline-variant pb-2">
                        <CheckSquare className="w-4 h-4 text-secondary" />
                        <h3 className="text-sm font-bold text-on-surface">Record Selection Bounds</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Specify which specific boundary segment of sorted elements should be passed into aggregate operation reducer.
                      </p>

                      <div className="space-y-3">
                        {/* Option ALL */}
                        <div
                          onClick={() => setSelectionType('all')}
                          className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                            selectionType === 'all'
                              ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                              : 'border-outline-variant/60 hover:bg-surface-container-low'
                          }`}
                        >
                          <input
                            type="radio"
                            checked={selectionType === 'all'}
                            onChange={() => setSelectionType('all')}
                            className="mt-1 text-secondary focus:ring-secondary w-4 h-4"
                          />
                          <div className="flex-1">
                            <span className="text-xs font-bold text-on-surface block">All Filtered Records</span>
                            <span className="text-[10px] text-on-surface-variant leading-normal">
                              Pipes the entire collection (matching filters) straight to aggregate reducer.
                            </span>
                          </div>
                        </div>

                        {/* Option FIRST N */}
                        <div
                          onClick={() => setSelectionType('first')}
                          className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all relative ${
                            selectionType === 'first'
                              ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                              : 'border-outline-variant/60 hover:bg-surface-container-low'
                          }`}
                        >
                          <input
                            type="radio"
                            checked={selectionType === 'first'}
                            onChange={() => setSelectionType('first')}
                            className="mt-1 text-secondary focus:ring-secondary w-4 h-4"
                          />
                          <div className="flex-1">
                            <span className="text-xs font-bold text-on-surface block">First N Records</span>
                            <span className="text-[10px] text-on-surface-variant leading-normal">
                              Extracts a precise limited number of elements from the very top of sorted ledger.
                            </span>

                            {selectionType === 'first' && (
                              <div className="mt-2.5 flex items-center gap-2 bg-white border p-2 rounded-lg max-w-xs" onClick={e => e.stopPropagation()}>
                                <span className="text-[10px] font-bold text-on-surface-variant uppercase">COUNT LIMIT:</span>
                                <input
                                  type="number"
                                  value={selectionCount}
                                  onChange={(e) => setSelectionCount(Math.max(1, parseInt(e.target.value) || 1))}
                                  className="w-20 h-7 border border-outline-variant rounded text-xs px-2 focus:outline-none focus:border-secondary font-mono"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Option LAST N */}
                        <div
                          onClick={() => setSelectionType('last')}
                          className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all relative ${
                            selectionType === 'last'
                              ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                              : 'border-outline-variant/60 hover:bg-surface-container-low'
                          }`}
                        >
                          <input
                            type="radio"
                            checked={selectionType === 'last'}
                            onChange={() => setSelectionType('last')}
                            className="mt-1 text-secondary focus:ring-secondary w-4 h-4"
                          />
                          <div className="flex-1">
                            <span className="text-xs font-bold text-on-surface block">Last N Records</span>
                            <span className="text-[10px] text-on-surface-variant leading-normal">
                              Extracts a precise limited count segment from the very tail of sorted elements list.
                            </span>

                            {selectionType === 'last' && (
                              <div className="mt-2.5 flex items-center gap-2 bg-white border p-2 rounded-lg max-w-xs" onClick={e => e.stopPropagation()}>
                                <span className="text-[10px] font-bold text-on-surface-variant uppercase">COUNT LIMIT:</span>
                                <input
                                  type="number"
                                  value={selectionCount}
                                  onChange={(e) => setSelectionCount(Math.max(1, parseInt(e.target.value) || 1))}
                                  className="w-20 h-7 border border-outline-variant rounded text-xs px-2 focus:outline-none focus:border-secondary font-mono"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Option RANGE */}
                        <div
                          onClick={() => setSelectionType('range')}
                          className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all relative ${
                            selectionType === 'range'
                              ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                              : 'border-outline-variant/60 hover:bg-surface-container-low'
                          }`}
                        >
                          <input
                            type="radio"
                            checked={selectionType === 'range'}
                            onChange={() => setSelectionType('range')}
                            className="mt-1 text-secondary focus:ring-secondary w-4 h-4"
                          />
                          <div className="flex-1">
                            <span className="text-xs font-bold text-on-surface block">Index Offset Range</span>
                            <span className="text-[10px] text-on-surface-variant leading-normal">
                              Extracts a specific slice of sorted ledger bounded between index range bounds.
                            </span>

                            {selectionType === 'range' && (
                              <div className="mt-2.5 flex items-center gap-4 bg-white border p-2 rounded-lg max-w-sm" onClick={e => e.stopPropagation()}>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">FROM INDEX:</span>
                                  <input
                                    type="number"
                                    value={selectionFrom}
                                    onChange={(e) => setSelectionFrom(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="w-16 h-7 border border-outline-variant rounded text-xs px-2 focus:outline-none focus:border-secondary font-mono"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">TO INDEX:</span>
                                  <input
                                    type="number"
                                    value={selectionTo}
                                    onChange={(e) => setSelectionTo(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="w-16 h-7 border border-outline-variant rounded text-xs px-2 focus:outline-none focus:border-secondary font-mono"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Mathematical Aggregation Operations */}
                {wizardStep === 4 && (
                  <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm space-y-6 animate-fadeIn">
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
                        <h2 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                          <Calculator className="w-4.5 h-4.5 text-secondary" />
                          <span>Mathematical Operation Reducer</span>
                        </h2>
                      </div>
                    </div>

                    {/* Aggregate Operation Type Grid */}
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        Select Aggregation Formula
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { id: 'sum', label: 'Sum', icon: Plus, desc: 'Accumulates target field' },
                          { id: 'avg', label: 'Average', icon: Calculator, desc: 'Computes arithmetic mean' },
                          { id: 'count', label: 'Count', icon: Sigma, desc: 'Tally of element matches' },
                          { id: 'min', label: 'Minimum', icon: ArrowUpDown, desc: 'Locates lowest scalar bound' },
                          { id: 'max', label: 'Maximum', icon: ArrowUpDown, desc: 'Locates highest scalar bound' },
                          { id: 'rolling', label: 'Rolling Avg', icon: Sliders, desc: 'Mean over moving frames' },
                        ].map((op) => {
                          const IconComp = op.icon;
                          const isSelected = aggregateOperation === op.id;
                          return (
                            <div
                              key={op.id}
                              onClick={() => setAggregateOperation(op.id)}
                              className={`border rounded-xl p-3 text-center cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-secondary bg-secondary/5 ring-1 ring-secondary text-primary'
                                  : 'border-outline-variant/60 hover:bg-surface-container-low text-on-surface-variant'
                              }`}
                            >
                              <IconComp className={`w-5 h-5 mx-auto mb-1.5 ${isSelected ? 'text-secondary' : 'text-on-surface-variant'}`} />
                              <span className="text-xs font-bold block">{op.label}</span>
                              <span className="text-[9px] opacity-80 block mt-0.5">{op.desc}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Target field selector */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        Target Reducer Field
                      </label>
                      <div className="relative">
                        <select
                          value={aggregateField}
                          onChange={(e) => setAggregateField(e.target.value)}
                          className="w-full h-8 pl-3 pr-8 text-xs border border-outline-variant rounded bg-white text-on-surface focus:outline-none focus:border-secondary appearance-none"
                        >
                          <option value="amount_usd">amount_usd (Numeric Float)</option>
                          <option value="transaction_fee">transaction_fee (Numeric Float)</option>
                          <option value="exchange_rate">exchange_rate (Numeric Float)</option>
                          <option value="login_count">login_count (Numeric Integer)</option>
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none rotate-90" />
                      </div>

                      <div className="mt-3 flex gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container border border-outline-variant text-[10px] font-mono text-on-surface-variant rounded">
                          <Database className="w-3 h-3 text-secondary" /> context.dataset.{aggregateField}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container border border-outline-variant text-[10px] font-mono text-on-surface-variant rounded">
                          Type: Float
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Logic Summary Card Preview */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col sticky top-6">
                  <div className="bg-surface-container p-4 border-b border-outline-variant flex items-center gap-2">
                    <Sliders className="w-4.5 h-4.5 text-primary" />
                    <h3 className="font-bold text-xs text-primary uppercase tracking-wider">Active Logic Preview</h3>
                  </div>

                  <div className="p-5 text-xs text-on-surface space-y-4 flex-grow bg-surface-bright leading-relaxed font-mono select-none">
                    <p>
                      Takes the{' '}
                      <span className="bg-primary/10 px-1.5 py-0.5 rounded text-primary font-bold border border-primary/25">
                        {selectionType === 'all'
                          ? 'All'
                          : selectionType === 'first'
                          ? `First ${selectionCount}`
                          : selectionType === 'last'
                          ? `Last ${selectionCount}`
                          : `Indices ${selectionFrom} to ${selectionTo}`}
                      </span>{' '}
                      records from{' '}
                      <span className="bg-surface-container px-1.5 py-0.5 rounded border border-outline-variant/60 font-bold">
                        {fxSource}
                      </span>
                    </p>

                    <div className="pl-4 border-l-2 border-outline-variant/60 relative">
                      <ArrowRight className="absolute -left-[9px] top-1 w-4 h-4 text-outline-variant bg-surface-bright p-0.5 rotate-90" />
                      <p className="text-on-surface-variant text-[11px]">
                        Filtered where:{' '}
                        {enableFilter ? (
                          <span className="bg-teal-50 text-teal-800 border border-teal-200 px-1.5 py-0.5 rounded font-bold block mt-1.5">
                            {filterField} {filterOperator} "{filterValue}"
                          </span>
                        ) : (
                          <span className="text-on-surface-variant italic block mt-1">No custom filters defined</span>
                        )}
                      </p>
                    </div>

                    <div className="pl-4 border-l-2 border-secondary/50 relative">
                      <ArrowRight className="absolute -left-[9px] top-1 w-4 h-4 text-secondary/60 bg-surface-bright p-0.5 rotate-90" />
                      <p className="text-on-surface-variant text-[11px]">
                        Sorted by:{' '}
                        <span className="bg-primary/5 text-primary border border-primary/10 px-1.5 py-0.5 rounded font-semibold block mt-1.5">
                          {sortByField} ({sortDirection.toUpperCase()})
                        </span>
                      </p>
                    </div>

                    <div className="pl-4 border-l-2 border-secondary relative">
                      <ArrowRight className="absolute -left-[9px] top-1 w-4 h-4 text-secondary bg-surface-bright p-0.5 rotate-90" />
                      <p className="font-bold">
                        Returns the{' '}
                        <span className="bg-secondary/10 px-1.5 py-0.5 rounded text-secondary border border-secondary/25 uppercase font-bold">
                          {aggregateOperation}
                        </span>{' '}
                        of{' '}
                        <span className="bg-surface-container px-1.5 py-0.5 rounded border border-outline-variant/60 font-normal">
                          {aggregateField}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-surface-container-low border-t border-outline-variant">
                    <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                      Computed Logic Signature
                    </div>
                    <div className="bg-black/90 p-2.5 rounded-lg border border-outline-variant font-mono text-[10px] text-emerald-400 overflow-x-auto whitespace-nowrap">
                      {outputSignaturePreview}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Footer Wizard navigation bar */}
          <div className="bg-white border-t border-outline-variant p-4 shrink-0 shadow-md z-10">
            <div className="max-w-4xl mx-auto flex justify-between items-center w-full select-none">
              <button
                type="button"
                onClick={() => {
                  if (wizardStep === 1) {
                    setCurrentView('library');
                  } else {
                    setWizardStep((prev) => prev - 1);
                  }
                }}
                className="px-4 py-2 border border-outline-variant/80 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container font-semibold text-xs transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{wizardStep === 1 ? 'Back to Library' : 'Back Step'}</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentView('library')}
                  className="px-4 py-2 border border-outline-variant/80 text-on-surface-variant hover:bg-surface-container rounded-lg font-semibold text-xs transition-all"
                >
                  Cancel
                </button>

                {wizardStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep((prev) => prev + 1)}
                    className="px-5 py-2 bg-secondary hover:bg-secondary/95 text-on-secondary rounded-lg font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinishAndSave}
                    className="px-6 py-2 bg-primary hover:bg-primary/95 text-white rounded-lg font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{wizardMode === 'edit' ? 'Update & Save Logic' : 'Finish & Compile'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
