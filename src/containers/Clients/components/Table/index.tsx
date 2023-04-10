import styles from "./styles.module.scss";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Row from "@/components/Row";
import { IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "@/lib/hooks/useStore";
import { getFetch } from "@/lib/utils/api";
import { useEffect } from "react";
import { ENDPOINT } from "@/lib/server";
import { format } from "date-fns";

const tableColumns = [
  { label: "Имя", width: "auto" },
  { label: "ID", width: "auto" },
  { label: "Email", width: "auto" },
  { label: "Отсрочка оплаты", width: "auto" },
  { label: "Создан", width: "auto" },
  { label: "Изменен", width: "auto" },
];

const Table = () => {
  const { clientsController } = useStore();
  const { customers, setCustomers, setCopyNotificationOpen } =
    clientsController;

  useEffect(() => {
    getFetch(ENDPOINT.CUSTOMERS).then(setCustomers);
  }, []);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopyNotificationOpen(true);
  };

  return (
    <div className={styles.container}>
      <table>
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
          {customers?.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <Row>
                  <span className={styles.customerId}>{item.id}</span>
                  <IconButton onClick={() => onCopy(item.id)}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Row>
              </td>
              <td>{item.email}</td>
              <td>{item.deferral_days}</td>
              <td>{format(new Date(item.created_at), "dd.MM.yyyy")}</td>
              <td>{format(new Date(item.updated_at), "dd.MM.yyyy")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default observer(Table);
