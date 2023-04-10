import Row from "@/components/Row";
import { useStore } from "@/lib/hooks/useStore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";
import { observer } from "mobx-react-lite";
import CloseIcon from "@mui/icons-material/Close";
import {
  CLIENT_FORM_SECIONS,
  CLIENT_FORM_SECIONS_TITLES,
} from "../../controller/ClientsController";
import BankAccounts from "./components/BankAccounts";
import ClientDetails from "./components/ClientDetails";
import EmailAccounts from "./components/EmailAccounts";
import OrganisationDetais from "./components/OrganisationDetais";
import Meta from "./components/Meta";
import { getFormValues } from "@/lib/utils/form/form";

import styles from "./styles.module.scss";

const ClientsDialog = () => {
  const { clientsController } = useStore();
  const {
    isClientDialogOpen,
    setClientFormValue,
    setClientFormValues,
    setIsClientDialogOpen,
    setClientFormSubmitted,
    onClientFormSubmit,
  } = clientsController;

  return (
    <Dialog
      open={isClientDialogOpen}
      onClose={() => setIsClientDialogOpen(false)}
    >
      <Stack gap={2} padding={2}>
        <Row>
          <Typography component="span">Создание цены</Typography>
          <IconButton
            sx={{ ml: "auto" }}
            onClick={() => setIsClientDialogOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Row>
        <form
          name="clientForm"
          ref={(ref) => {
            const values = getFormValues(ref);
            setClientFormValues(values);
          }}
          className={styles.form}
          onChange={({ target }) => {
            const { name, value } = target as any as {
              name: string;
              value: string;
            };
            setClientFormValue(name, value);
          }}
          onSubmit={(e) => {
            e.preventDefault();
            onClientFormSubmit();
          }}
        >
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={CLIENT_FORM_SECIONS.CLIENT_DETAILS}
            >
              <Typography component="span">
                {CLIENT_FORM_SECIONS_TITLES[CLIENT_FORM_SECIONS.CLIENT_DETAILS]}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ClientDetails />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={CLIENT_FORM_SECIONS.ORGANISATION_DETAILS}
            >
              <Typography component="span">
                {
                  CLIENT_FORM_SECIONS_TITLES[
                    CLIENT_FORM_SECIONS.ORGANISATION_DETAILS
                  ]
                }
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="span">
                <OrganisationDetais />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={CLIENT_FORM_SECIONS.BANK_ACCOUNTS}
            >
              <Typography component="span">
                {CLIENT_FORM_SECIONS_TITLES[CLIENT_FORM_SECIONS.BANK_ACCOUNTS]}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <BankAccounts />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={CLIENT_FORM_SECIONS.EMAIL_ACCOUNTS}
            >
              <Typography component="span">
                {CLIENT_FORM_SECIONS_TITLES[CLIENT_FORM_SECIONS.EMAIL_ACCOUNTS]}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <EmailAccounts />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={CLIENT_FORM_SECIONS.META}
            >
              <Typography component="span">
                {CLIENT_FORM_SECIONS_TITLES[CLIENT_FORM_SECIONS.META]}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="span">
                <Meta />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            onClick={() => setClientFormSubmitted(true)}
          >
            Создать
          </Button>
        </form>
      </Stack>
    </Dialog>
  );
};

export default observer(ClientsDialog);
