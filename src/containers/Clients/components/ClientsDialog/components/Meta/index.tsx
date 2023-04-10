import styles from "./styles.module.scss";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "@/lib/hooks/useStore";
import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone";
import { Stack, TextField, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { makeAutoObservable, observable } from "mobx";
import { nanoid } from "nanoid";

const tableColumns = [
  { label: "Ключ", width: "auto" },
  { label: "Значение", width: "auto" },
  { label: "", width: "4rem" },
];

class MetaControler {
  constructor() {
    makeAutoObservable(this);
  }
  tableData = observable.array<string>([]);

  addTableDataItem = () => {
    const id = nanoid();
    this.tableData.push(id);
  };

  removeTableDataItem = (id: string) => {
    this.tableData.remove(id);
  };
}

const metaControler = new MetaControler();

const Meta = () => {
  const { clientsController } = useStore();
  const { tableData, addTableDataItem, removeTableDataItem } = metaControler;

  return (
    <div className={styles.container}>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableColumns.map((column, i) => (
                <th key={i} style={{ width: column.width }}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((id, index) => (
              <tr key={index}>
                <td>
                  <TextField name={`meta_key_${index}`} />
                </td>
                <td>
                  <TextField name={`meta_value_${index}`} />
                </td>
                <td>
                  <IconButton
                    size="small"
                    onClick={() => removeTableDataItem(id)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!tableData.length && (
          <Stack alignItems="center" color="lightgrey" padding={2}>
            <InboxTwoToneIcon fontSize="large" />
            <Typography component="span">NO DATA</Typography>
          </Stack>
        )}
      </div>
      <Button
        startIcon={<AddIcon />}
        fullWidth
        variant="outlined"
        onClick={() => addTableDataItem()}
      >
        Добавить ключ-значение
      </Button>
    </div>
  );
};

export default observer(Meta);
