import { FC } from "react";
import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SingleBankAccount from "./components/SingleBankAccount";
import BankAccountControler from "./controller/BankAccountController";

const bankAccountControler = new BankAccountControler();

const BankAccounts: FC = () => {
  const {
    bankAccounts,
    addBankAccouts,
    removeBankAccount,
    setDefaultBankAccount,
  } = bankAccountControler;

  return (
    <Stack gap={2}>
      {bankAccounts.map((bank, index) => (
        <SingleBankAccount
          key={bank.id}
          fieldIndex={index}
          defaultChecked={bankAccounts[index].isDefault}
          onDelete={() => removeBankAccount(bank.id)}
          onSwich={(isChecked) => setDefaultBankAccount(isChecked, index)}
        />
      ))}
      <Button
        startIcon={<AddIcon />}
        fullWidth
        variant="outlined"
        onClick={() => addBankAccouts()}
      >
        Добавить банковский аккаунт
      </Button>
    </Stack>
  );
};

export default observer(BankAccounts);
