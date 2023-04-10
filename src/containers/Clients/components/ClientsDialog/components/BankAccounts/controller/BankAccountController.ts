import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";

type TBankAccount = {
  id: string;
  isDefault: boolean;
};

const DEFAULT_BANK_ACCOUNT = {
  id: nanoid(),
  isDefault: true,
};

export default class BankAccountControler {
  constructor() {
    makeAutoObservable(this);
  }
  bankAccounts: TBankAccount[] = [DEFAULT_BANK_ACCOUNT];

  addBankAccouts = () => {
    const bankId = nanoid();
    this.bankAccounts.push({ id: bankId, isDefault: false });
  };

  setDefaultBankAccount = (isDefault: boolean, index: number) => {
    if (this.bankAccounts.length === 1 && !isDefault) {
      return;
    }

    this.bankAccounts = this.bankAccounts.map((item, itemIndex) => ({
      id: item.id,
      isDefault: itemIndex === index ? isDefault : false,
    }));
  };

  removeBankAccount = (id: string) => {
    const currentBankIndex = this.bankAccounts.findIndex(
      (item) => item.id === id
    );
    this.checkDefaultBankAccount(currentBankIndex);
    this.bankAccounts.splice(currentBankIndex, 1);
  };

  checkDefaultBankAccount = (index: number) => {
    if (this.bankAccounts[index].isDefault || this.bankAccounts.length === 1) {
      this.setDefaultBankAccount(true, 0);
    }
  };
}
