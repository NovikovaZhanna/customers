export type TBankAccount = {
  id: string;
  name: string;
  bik: string;
  account_number: string;
  corr_account_number: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type TOrganization = {
  id: string;
  name: string;
  inn: string;
  kpp: string;
  ogrn: string;
  addr: string;
  bank_accounts: TBankAccount[];
  created_at: string;
  updated_at: string;
};

export type TBalance = {
  currency: string;
  current_amount: number;
  credit_limit: number;
  available_amount: number;
};

export type Metadata = {
  [key: string]: string;
};

export type TCustomer = {
  id: string;
  name: string;
  email: string;
  deferral_days: number;
  org: TOrganization;
  balance: TBalance;
  metadata: Metadata;
  created_at: string;
  updated_at: string;
  status: string;
  invoice_prefix: string;
  invoice_emails: string[];
};
