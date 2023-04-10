import { FC } from "react";
import { Stack, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import AddIcon from "@mui/icons-material/Add";
import SingleEmail from "./components/SingleEmail";
import EmailControler from "./controller/EmailControler";

const emailControler = new EmailControler();

const EmailAccounts: FC = () => {
  const { emails, addEmailItem, removeEmailItem } = emailControler;

  return (
    <Stack gap={2}>
      {emails.map((emailId, index) => (
        <SingleEmail
          key={emailId}
          fieldIndex={index}
          onDelete={() => removeEmailItem(emailId)}
        />
      ))}
      <Button
        startIcon={<AddIcon />}
        fullWidth
        variant="outlined"
        onClick={() => addEmailItem()}
      >
        Добавить email
      </Button>
    </Stack>
  );
};

export default observer(EmailAccounts);
