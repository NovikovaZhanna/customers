import { FC } from "react";
import { Stack, TextField, Divider } from "@mui/material";
import { useStore } from "@/lib/hooks/useStore";
import { observer } from "mobx-react-lite";
import { validateError } from "@/lib/utils/form/validation";

const OrganisationDetais: FC = () => {
  const { clientsController } = useStore();
  const { isClientFormSubmitted, clientFormValues } = clientsController;

  return (
    <Stack gap={2}>
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues["org_name"],
          inputType: "text",
          isSubmitted: isClientFormSubmitted,
        })}
        name="org_name"
        label="Название организации"
        helperText="Введите название организации "
      />
      <Divider />
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues[`org_inn`],
          inputType: "number",
          isSubmitted: isClientFormSubmitted,
        })}
        type="number"
        name="org_inn"
        label="ИНН организации"
        helperText="Введите ИНН организации"
      />
      <Divider />
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues[`org_kpp`],
          inputType: "number",
          isSubmitted: isClientFormSubmitted,
        })}
        type="number"
        name="org_kpp"
        label="КПП организации"
        helperText="Введите КПП организации"
      />
      <Divider />
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues[`org_ogrn`],
          inputType: "number",
          isSubmitted: isClientFormSubmitted,
        })}
        type="number"
        name="org_ogrn"
        label="ОГРН организации"
        helperText="Введите ОГРН организации"
      />
      <Divider />
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues[`org_address`],
          inputType: "text",
          isSubmitted: isClientFormSubmitted,
        })}
        name="org_address"
        label="Юридический адрес"
        helperText="Введите юридический адрес"
      />
    </Stack>
  );
};

export default observer(OrganisationDetais);
