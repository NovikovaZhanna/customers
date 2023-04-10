import { makeAutoObservable, observable } from "mobx";
import { nanoid } from "nanoid";

const DEFAULT_EMAIL = nanoid();

export default class EmailControler {
  constructor() {
    makeAutoObservable(this);
  }
  emails = observable.array<string>([DEFAULT_EMAIL]);

  addEmailItem = () => {
    const id = nanoid();
    this.emails.push(id);
  };

  removeEmailItem = (id: string) => {
    this.emails.remove(id);
  };
}
