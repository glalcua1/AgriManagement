// Core types for the farm management system

export interface Farm {
  id: string;
  name: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  totalArea: number;
  areaUnit: 'acres' | 'hectares' | 'sqmeters' | 'bighas';
  soilType: string;
  waterSource: string[];
  qualityRating: number; // 1-5 scale
  plots: Plot[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Plot {
  id: string;
  farmId: string;
  plotNumber: string;
  area: number;
  currentCrop?: CropType;
  soilQuality: number;
  irrigationType: 'drip' | 'sprinkler' | 'flood' | 'none';
  boundaries?: {
    coordinates: Array<{ lat: number; lng: number }>;
  };
}

export type CropType = 'sugarcane' | 'wheat' | 'rice' | 'mangoes';

export interface Lessee {
  id: string;
  name: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  documents: {
    type: string;
    number: string;
    expiryDate?: Date;
  }[];
  creditRating: number; // 1-5 scale
  reliabilityScore: number; // 1-5 scale
  previousLeases: string[]; // lease IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface Lease {
  id: string;
  farmId: string;
  plotId: string;
  lesseeId: string;
  cropType: CropType;
  ratePerUnit: number; // rate per bigha/acre/hectare
  rateUnit: 'per_acre' | 'per_hectare' | 'per_sqmeter' | 'per_bigha';
  leaseType: 'annual' | 'seasonal' | 'multi_year';
  startDate: Date;
  endDate: Date;
  securityDeposit: number;
  totalAmount: number;
  status: 'active' | 'expired' | 'terminated' | 'renewed';
  paymentSchedule: PaymentSchedule[];
  contractDocument?: string; // URL to contract
  autoRenewal: boolean;
  terms: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentSchedule {
  id: string;
  leaseId: string;
  dueDate: Date;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'partially_paid';
  paidAmount: number;
  paidDate?: Date;
  penaltyAmount: number;
  notes?: string;
}

export interface Expense {
  id: string;
  farmId?: string;
  category: 'maintenance' | 'utilities' | 'labor' | 'equipment' | 'supplies' | 'taxes' | 'insurance' | 'other';
  subcategory: string;
  amount: number;
  description: string;
  date: Date;
  vendor?: string;
  receipt?: string; // URL to receipt image
  isRecurring: boolean;
  recurringSchedule?: {
    frequency: 'monthly' | 'quarterly' | 'yearly';
    nextDue: Date;
  };
  taxDeductible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Revenue {
  id: string;
  farmId: string;
  plotId?: string;
  leaseId: string;
  amount: number;
  source: 'lease_payment' | 'bonus' | 'penalty_waiver' | 'other';
  date: Date;
  description?: string;
  createdAt: Date;
}

export interface WeatherData {
  location: {
    lat: number;
    lng: number;
  };
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    pressure: number;
    condition: string;
    icon: string;
    visibility: number;
    uvIndex: number;
  };
  forecast: Array<{
    date: Date;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
    humidity: number;
    windSpeed: number;
  }>;
  alerts: Array<{
    type: string;
    severity: 'minor' | 'moderate' | 'severe' | 'extreme';
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
  }>;
}

export interface CropCalendar {
  id: string;
  farmId: string;
  plotId: string;
  cropType: CropType;
  plantingDate: Date;
  expectedHarvest: Date;
  growthStages: Array<{
    stage: string;
    startDate: Date;
    endDate: Date;
    description: string;
    tasks: string[];
  }>;
  inputs: Array<{
    type: 'seed' | 'fertilizer' | 'pesticide' | 'water';
    name: string;
    quantity: number;
    unit: string;
    applicationDate: Date;
    cost: number;
  }>;
  yieldPrediction?: number;
  actualYield?: number;
}

export interface FinancialSummary {
  farmId?: string;
  period: {
    startDate: Date;
    endDate: Date;
  };
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  roi: number;
  leaseUtilization: number; // percentage of land leased
  revenueBySource: Record<string, number>;
  expensesByCategory: Record<string, number>;
  monthlyTrends: Array<{
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
  }>;
}

export interface DashboardMetrics {
  totalFarms: number;
  totalPlots: number;
  activeLeasesCount: number;
  expiringLeasesCount: number; // expiring in next 30 days
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  leaseUtilization: number;
  averageRatePerBigha: number;
  topPerformingCrop: CropType;
  overduePayments: number;
  weatherAlerts: number;
}

// UI/UX related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'viewer';
  preferences: {
    defaultCurrency: string;
    defaultAreaUnit: 'acres' | 'hectares' | 'sqmeters' | 'bighas';
    dashboardLayout: string[];
    notifications: {
      email: boolean;
      push: boolean;
      leaseExpiry: boolean;
      paymentDue: boolean;
      weatherAlerts: boolean;
    };
  };
}

export interface Notification {
  id: string;
  type: 'lease_expiry' | 'payment_due' | 'weather_alert' | 'maintenance_due' | 'info';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  actionRequired: boolean;
  relatedEntityId?: string;
  relatedEntityType?: 'farm' | 'lease' | 'payment' | 'expense';
  createdAt: Date;
  expiresAt?: Date;
} 