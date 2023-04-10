import styles from "./styles.module.scss";
import {
  TextField,
  InputAdornment,
  FormControl,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import { useStore } from "@/lib/hooks/useStore";

const Actions = () => {
  const { clientsController } = useStore();
  const { setIsClientDialogOpen } = clientsController;

  return (
    <Stack flexDirection="row" alignItems="center" padding="0 1rem">
      <Typography component="span">Клиенты</Typography>
      <Stack sx={{ ml: "auto" }} flexDirection="row" gap="1rem">
        <FormControl>
          <TextField
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => setIsClientDialogOpen(true)}
        >
          Добавить клиента
        </Button>
      </Stack>
    </Stack>
  );
};

export default observer(Actions);
