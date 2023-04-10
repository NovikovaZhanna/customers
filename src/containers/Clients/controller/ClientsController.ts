import { nanoid } from "nanoid";
import { makeAutoObservable } from "mobx";
import { TCustomer } from "../types";
import { MODEL, server } from "@/lib/server";

export enum CLIENT_FORM_SECIONS {
  CLIENT_DETAILS = "CLIENT_DETAILS",
  ORGANISATION_DETAILS = "ORGANISATION_DETAILS",
  BANK_ACCOUNTS = "BANK_ACCOUNTS",
  EMAIL_ACCOUNTS = "EMAIL_ACCOUNTS",
  META = "META",
}

export const CLIENT_FORM_SECIONS_TITLES = {
  [CLIENT_FORM_SECIONS.CLIENT_DETAILS]: "Детали клиента",
  [CLIENT_FORM_SECIONS.ORGANISATION_DETAILS]: "Детали организации",
  [CLIENT_FORM_SECIONS.BANK_ACCOUNTS]: "Банковские счета",
  [CLIENT_FORM_SECIONS.EMAIL_ACCOUNTS]: "Emails для счетов",
  [CLIENT_FORM_SECIONS.META]: "Мета",
};

export default class ClientsController {
  constructor() {
    makeAutoObservable(this);
  }

  customers: TCustomer[] = [];
  clientFormValues: Record<string, string> = {};

  isClientFormSubmitted = false;
  isClientDialogOpen = false;
  copyNotificationOpen = false;

  setCopyNotificationOpen = (isOpen: boolean) => {
    this.copyNotificationOpen = isOpen;
  };

  setClientFormValues = (clientFormValues: Record<string, any> | null) => {
    if (!clientFormValues) {
      this.clientFormValues = {};
      return;
    }

    this.clientFormValues = clientFormValues;
  };

  setClientFormValue = (name: string, value: any) => {
    this.clientFormValues[name] = value;
  };

  setClientFormSubmitted = (isSubmitted: boolean) => {
    this.isClientFormSubmitted = isSubmitted;
  };

  setIsClientDialogOpen = (isOpen: boolean) => {
    this.isClientDialogOpen = isOpen;
  };

  setCustomers = (customers: TCustomer[]) => {
    this.customers = customers;
  };

  onClientFormSubmit = () => {
    const data = this.clientFormValues;

    const bankAccountArray: string[] = [];
    const invoiceEmailsArray: string[] = [];
    const metadata: Record<string, string> = {};

    Object.keys(data).forEach((item, index) => {
      if (item.includes("bank_name_")) {
        bankAccountArray.push(item);
      }
      if (item.includes("meta_key_")) {
        metadata[`meta_key_${index}`] = metadata[`metaValue_${index}`];
      }
      if (item.includes("invoice_emails_")) {
        invoiceEmailsArray.push(item);
      }
    });

    const date = new Date().toISOString();

    const customer: TCustomer = {
      id: nanoid(),
      name: data.name,
      email: data.email,
      deferral_days: +data.deferral_days,
      metadata: metadata,
      created_at: date,
      updated_at: date,
      status: "active",
      invoice_prefix: "L1RFJG",
      invoice_emails: invoiceEmailsArray.map(
        (_, index) => data[`invoice_emails_${index}`]
      ),
      balance: {
        currency: "RUB",
        current_amount: 90000,
        credit_limit: +data.credit_limit,
        available_amount: 90000,
      },
      org: {
        name: data.org_name,
        id: nanoid(),
        inn: data.org_inn,
        kpp: data.org_kpp,
        ogrn: data.org_ogrn,
        addr: data.org_address,
        created_at: date,
        updated_at: date,
        bank_accounts: bankAccountArray.map((_, bankIndex) => ({
          id: nanoid(),
          name: data[`bank_name_${bankIndex}`],
          bik: data[`bank_bik_${bankIndex}`],
          account_number: data[`bank_number_${bankIndex}`],
          corr_account_number: data[`bank_cor_number_${bankIndex}`],
          is_default: data[`is_default_${bankIndex}`] === "true" ? true : false,
          created_at: date,
          updated_at: date,
        })),
      },
    };

    this.customers = [customer, ...this.customers];

    server.create(MODEL.CUSTOMER, customer);

    this.setClientFormValues(null);
    this.setIsClientDialogOpen(false);
  };
}
