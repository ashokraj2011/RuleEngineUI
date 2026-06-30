import { DecisionRule, SchemaField, CanvasNode, CanvasConnection, ExecutionTraceLog } from './types';

export const INITIAL_DECISION_RULES: DecisionRule[] = [
  {
    id: '1',
    ruleId: 'R-001',
    userType: 'New User',
    spendMin: 5000,
    regions: ['NA', 'EU'],
    conditionFx: 'vel(24h) > 5',
    thenAction: 'Block',
    thenRiskScore: 95,
    thenReturnRecord: true,
    isActive: true,
  },
  {
    id: '2',
    ruleId: 'R-002',
    userType: 'Existing',
    spendMin: 10000,
    regions: ['*Any*'],
    conditionFx: '*Any*',
    thenAction: 'Review',
    thenRiskScore: 75,
    thenReturnRecord: false,
    isActive: true,
  },
  {
    id: '3',
    ruleId: 'R-003',
    userType: 'VIP',
    spendMin: 50000,
    regions: ['*Any*'],
    conditionFx: 'avgSpend(30d) < 5k',
    thenAction: 'Approve',
    thenRiskScore: 10,
    thenReturnRecord: true,
    isActive: true,
  },
];

export const SCHEMA_FIELDS: SchemaField[] = [
  { name: 'user_id', type: 'str', entity: 'User Context', description: 'Unique identifier of the transacting user.' },
  { name: 'risk_score', type: 'num', entity: 'User Context', description: 'Calculated baseline user security risk score.' },
  { name: 'account_age_days', type: 'int', entity: 'User Context', description: 'Days passed since account activation.' },
  { name: 'amount_usd', type: 'num', entity: 'Transaction', description: 'The current transaction volume in US Dollars.' },
  { name: 'merchant_mcc', type: 'str', entity: 'Transaction', description: 'Merchant Category Code (MCC) representing the purchase sector.' },
  { name: 'device_velocity_1h', type: 'int', entity: 'Transaction', description: 'Number of discrete payments on this device within the hour.' },
  { name: 'geo_match', type: 'bool', entity: 'User Context', description: 'Whether the current location matches known user hotspots.' },
];

export const INITIAL_CANVAS_NODES: CanvasNode[] = [
  {
    id: 'node-1',
    type: 'Start',
    name: 'Transaction Received',
    description: 'Trigger: Inbound Transaction Event',
    x: 80,
    y: 240,
  },
  {
    id: 'node-2',
    type: 'DataLookup',
    name: 'User Profile Lookup',
    description: 'Fetch risk_score & account_age',
    x: 340,
    y: 200,
    inputs: [
      { key: 'Source Key', value: 'event.user_id' },
      { key: 'Target Param', value: 'userId' },
    ],
    failSafe: true,
  },
  {
    id: 'node-3',
    type: 'Decision',
    name: 'High Risk Check',
    description: 'IF risk_score > 80 OR amount > 10000',
    x: 640,
    y: 160,
    decisionLogic: {
      operator: 'AND',
      terms: [
        {
          id: 'term-a',
          operator: 'OR',
          conditions: [
            { id: 'cond-1', field: 'User.risk_score',       op: '>',  value: '80'    },
            { id: 'cond-2', field: 'Transaction.amount_usd', op: '>',  value: '10000' },
          ]
        }
      ]
    }
  } as any,
  {
    id: 'node-4',
    type: 'Decision',
    name: 'Velocity Check',
    description: 'IF device_velocity_1h > 5',
    x: 640,
    y: 380,
    decisionLogic: {
      operator: 'AND',
      terms: [
        {
          id: 'term-b',
          operator: 'AND',
          conditions: [
            { id: 'cond-3', field: 'Transaction.device_velocity_1h', op: '>', value: '5' },
          ]
        }
      ]
    }
  } as any,
  {
    id: 'node-5',
    type: 'Route',
    name: 'Decline',
    description: 'Terminal: block transaction',
    x: 960,
    y: 100,
    action: 'Decline Transaction',
    actionReason: 'Critical Risk Detected',
  } as any,
  {
    id: 'node-6',
    type: 'Route',
    name: 'Flag for Review',
    description: 'Terminal: analyst queue',
    x: 960,
    y: 320,
    action: 'Flag for Review',
    actionReason: 'Elevated Velocity',
  } as any,
  {
    id: 'node-7',
    type: 'Route',
    name: 'Approve',
    description: 'Terminal: transaction approved',
    x: 960,
    y: 500,
    action: 'Approve',
    actionReason: 'No risk signals detected',
  } as any,
];

export const INITIAL_CANVAS_CONNECTIONS: CanvasConnection[] = [
  { fromNodeId: 'node-1', toNodeId: 'node-2',  label: ''    } as any,
  { fromNodeId: 'node-2', toNodeId: 'node-3',  label: ''    } as any,
  { fromNodeId: 'node-3', toNodeId: 'node-5',  label: 'YES' } as any,
  { fromNodeId: 'node-3', toNodeId: 'node-4',  label: 'NO'  } as any,
  { fromNodeId: 'node-4', toNodeId: 'node-6',  label: 'YES' } as any,
  { fromNodeId: 'node-4', toNodeId: 'node-7',  label: 'NO'  } as any,
];

export const EXECUTION_LOGS: ExecutionTraceLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-06-27 14:32:01.452',
    executionId: 'exec_9a8b7c6d',
    ruleName: 'Risk_Assessment_v2',
    action: '-',
    latency: 1240,
    status: 'Error',
    rawInput: {
      user_id: 'usr_99281a',
      transaction_amount: 4500.0,
      currency: 'USD',
      merchant_category_code: '5942',
      ip_address: '192.168.1.104',
    },
    rawOutput: {
      status: 'FAILED',
      error_code: 'ERR_ENRICHMENT_TIMEOUT',
      message: "Required dependency 'GeoIP' failed to respond within threshold (1000ms)",
    },
    steps: [
      {
        name: 'Input Validation',
        duration: '12ms',
        status: 'success',
        details: "Schema 'TransactionRequest' passed",
      },
      {
        name: 'API Enrichment (GeoIP)',
        duration: '1228ms',
        status: 'error',
        details: 'Timeout connection to ext_geoip_service (exceeded threshold of 1000ms)',
      },
    ],
  },
  {
    id: 'log-2',
    timestamp: '2026-06-27 14:31:55.102',
    executionId: 'exec_9a8b7c6c',
    ruleName: 'Fraud_Velocity_Check',
    action: 'Approve',
    latency: 45,
    status: 'Success',
    rawInput: {
      user_id: 'usr_abc772',
      transaction_amount: 120.5,
      currency: 'USD',
      merchant_category_code: '5411',
      device_velocity_1h: 1,
    },
    rawOutput: {
      status: 'APPROVED',
      reasons: ['Velocity index falls below threshold', 'Known trusted IP subnet'],
    },
    steps: [
      {
        name: 'Velocity Extraction',
        duration: '15ms',
        status: 'success',
        details: 'Parsed redis velocity key velocity:usr_abc772 = 1',
      },
      {
        name: 'Rules Evaluation',
        duration: '30ms',
        status: 'success',
        details: 'Evaluated Fraud_Velocity_Check -> Approved',
      },
    ],
  },
  {
    id: 'log-3',
    timestamp: '2026-06-27 14:31:42.881',
    executionId: 'exec_9a8b7c6b',
    ruleName: 'KYC_Status_Eval',
    action: 'Manual Review',
    latency: 210,
    status: 'Warning',
    rawInput: {
      user_id: 'usr_inactive_99',
      kyc_document: 'driving_license',
      country_code: 'US',
    },
    rawOutput: {
      status: 'WARNING',
      reasons: ['KYC document near expiry', 'Secondary address mismatch'],
    },
    steps: [
      {
        name: 'Document Analysis',
        duration: '180ms',
        status: 'warning',
        details: 'Expiry date is within 15 days',
      },
      {
        name: 'Route to Desk',
        duration: '30ms',
        status: 'success',
        details: 'Successfully flagged transaction for Tier 2 support queue',
      },
    ],
  },
  {
    id: 'log-4',
    timestamp: '2026-06-27 14:30:15.220',
    executionId: 'exec_9a8b7c6a',
    ruleName: 'Risk_Assessment_v2',
    action: 'Decline',
    latency: 115,
    status: 'Success',
    rawInput: {
      user_id: 'usr_flagged_22',
      transaction_amount: 15000.0,
      currency: 'USD',
    },
    rawOutput: {
      status: 'DECLINED',
      reasons: ['Transaction exceeds maximum limit for non-verified users'],
    },
    steps: [
      {
        name: 'Database Fetch',
        duration: '45ms',
        status: 'success',
        details: 'Fetched user security profile: tier = Basic',
      },
      {
        name: 'Limit Enforcement',
        duration: '70ms',
        status: 'success',
        details: 'Limit is 10k, transaction amount is 15k -> Decline',
      },
    ],
  },
];
