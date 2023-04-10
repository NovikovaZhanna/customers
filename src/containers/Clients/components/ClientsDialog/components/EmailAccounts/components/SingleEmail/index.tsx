import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FC } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "@/lib/hooks/useStore";
import { validateError } from "@/lib/utils/form/validation";

type TOuterProps = {
  onDelete: () => void;
  fieldIndex: number;
};

const SingleEmail: FC<TOuterProps> = ({ onDelete, fieldIndex }) => {
  const { clientsController } = useStore();
  const { isClientFormSubmitted, clientFormValues } = clientsController;

  return (
    <TextField
      InputProps={{
        endAdornment:
          fieldIndex > 0 ? (
            <InputAdornment position="start">
              <IconButton onClick={onDelete}>
                <DeleteOutlineIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      required
      focused
      error={validateError({
        inputValue: clientFormValues[`invoice_emails_${fieldIndex}`],
        inputType: "email",
        isSubmitted: isClientFormSubmitted,
      })}
      type="email"
      name={`invoice_emails_${fieldIndex}`}
      label="Email"
      helperText="Введите Email"
    />
  );
};

export default observer(SingleEmail);
