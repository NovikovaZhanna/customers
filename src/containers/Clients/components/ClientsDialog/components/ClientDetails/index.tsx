import { FC } from "react";
import TextField from "@mui/material/TextField";
import { Divider, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "@/lib/hooks/useStore";
import { validateError } from "@/lib/utils/form/validation";

const ClientDetails: FC = () => {
  const { clientsController } = useStore();
  const { isClientFormSubmitted, clientFormValues } = clientsController;

  return (
    <Stack gap={2}>
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues[`name`],
          inputType: "text",
          isSubmitted: isClientFormSubmitted,
        })}
        name="name"
        label="Имя"
        helperText="Введите имя"
      />
      <Divider />
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues[`email`],
          inputType: "email",
          isSubmitted: isClientFormSubmitted,
        })}
        type="email"
        name="email"
        label="Email"
        helperText="Введите Email"
      />
      <Divider />
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues[`deferral_days`],
          inputType: "number",
          isSubmitted: isClientFormSubmitted,
        })}
        type="number"
        name="deferral_days"
        label="Дней отсрочки"
        helperText="Значение должно быть числом"
      />
      <Divider />
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues[`credit_limit`],
          inputType: "number",
          isSubmitted: isClientFormSubmitted,
        })}
        type="number"
        name="credit_limit"
        label="Кредитный лимит"
        helperText="Значение должно быть числом"
      />
    </Stack>
  );
};

export default observer(ClientDetails);
