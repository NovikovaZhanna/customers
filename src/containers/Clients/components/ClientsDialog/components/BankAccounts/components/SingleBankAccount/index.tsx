import { FC } from "react";
import { Stack, TextField, Divider, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useStore } from "@/lib/hooks/useStore";
import { validateError } from "@/lib/utils/form/validation";

type TOuterProps = {
  fieldIndex: number;
  defaultChecked: boolean;
  onDelete: () => void;
  onSwich: (isChecked: boolean) => void;
};

const SingleBankAccount: FC<TOuterProps> = ({
  fieldIndex,
  defaultChecked,
  onDelete,
  onSwich,
}) => {
  const { clientsController } = useStore();
  const { clientFormValues, isClientFormSubmitted } = clientsController;

  return (
    <Stack gap={2}>
      {fieldIndex > 0 && (
        <Button
          color="error"
          variant="outlined"
          startIcon={<DeleteOutlineIcon />}
          sx={{ ml: "auto" }}
          onClick={onDelete}
        >
          Удалить счет
        </Button>
      )}
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues[`bank_name_${fieldIndex}`],
          inputType: "text",
          isSubmitted: isClientFormSubmitted,
        })}
        name={`bank_name_${fieldIndex}`}
        label="Название счета"
        helperText="Введите название счета"
      />
      <Divider />
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues[`bank_number_${fieldIndex}`],
          inputType: "number",
          isSubmitted: isClientFormSubmitted,
        })}
        type="number"
        name={`bank_number_${fieldIndex}`}
        label="Номер счета"
        helperText="Введите номер счета"
      />
      <Divider />
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues[`bank_bik_${fieldIndex}`],
          inputType: "number",
          isSubmitted: isClientFormSubmitted,
        })}
        type="number"
        name={`bank_bik_${fieldIndex}`}
        label="БИК счета"
        helperText="Введите БИК счета"
      />
      <Divider />
      <TextField
        required
        focused
        error={validateError({
          inputValue: clientFormValues[`bank_cor_number_${fieldIndex}`],
          inputType: "number",
          isSubmitted: isClientFormSubmitted,
        })}
        type="number"
        name={`bank_cor_number_${fieldIndex}`}
        label="Корр. номер счета"
        helperText="Введите корр. номер счета"
      />
      <Typography component="span">Дефолтный счет</Typography>
      <Switch
        name={`is_default_${fieldIndex}`}
        onChange={(_, isChecked) => onSwich && onSwich(isChecked)}
        checked={defaultChecked}
      />
      <Divider />
    </Stack>
  );
};

export default observer(SingleBankAccount);
