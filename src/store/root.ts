import ClientsController from "@/containers/Clients/controller/ClientsController";

export default class RootStore {
  clientsController = new ClientsController();
}
