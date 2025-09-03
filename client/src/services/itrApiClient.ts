import { apiRequest } from '../lib/queryClient';

export interface ITRAuthRequest {
  username: string;
  password: string;
}

export interface AddClientRequest {
  pan: string;
  consent: boolean;
}

export interface PrefillDataRequest {
  pan: string;
  assessmentYear: string;
}

export interface TaxHealthScoreRequest {
  itrData: any;
}

export interface InvestmentNudgesRequest {
  itrData: any;
}

export class ITRAPIClient {
  private baseURK = '/api/itr';

  // Authentication
  async authenticate(credentials: ITRAuthRequest): Promise<{ success: boolean; message: string }> {
    return apiRequest(`${this.baseURK}/auth/login`, {
      method: 'POST',
      body: credentials
    });
  }

  // Client Management
  async addClient(clientData: AddClientRequest): Promise<{ success: boolean; clientId?: string; message: string }> {
    return apiRequest(`${this.baseURK}/client/add`, {
      method: 'POST',
      body: clientData
    });
  }

  // Data Retrieval
  async getPrefillData(request: PrefillDataRequest): Promise<{ success: boolean; itrData?: any; message: string }> {
    return apiRequest(`${this.baseURK}/prefill/get`, {
      method: 'POST',
      body: request
    });
  }

  // Analysis Services
  async calculateTaxHealthScore(request: TaxHealthScoreRequest): Promise<{ success: boolean; healthScore?: any; message: string }> {
    return apiRequest(`${this.baseURK}/tax-health-score`, {
      method: 'POST',
      body: request
    });
  }

  async generateInvestmentNudges(request: InvestmentNudgesRequest): Promise<{ success: boolean; nudges?: any[]; message: string }> {
    return apiRequest(`${this.baseURK}/investment-nudges`, {
      method: 'POST',
      body: request
    });
  }

  // Session Management
  async refreshSession(): Promise<{ success: boolean; message: string }> {
    return apiRequest(`${this.baseURK}/session/refresh`, {
      method: 'POST'
    });
  }

  async logout(): Promise<{ success: boolean; message: string }> {
    return apiRequest(`${this.baseURK}/session/logout`, {
      method: 'POST'
    });
  }

  // Status Check
  async getStatus(): Promise<{ success: boolean; service: string; version: string; status: string }> {
    return apiRequest(`${this.baseURK}/status`, {
      method: 'GET'
    });
  }
}

export const itrApiClient = new ITRAPIClient();