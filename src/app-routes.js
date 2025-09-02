import {
  HomePage,
  TasksPage,
  ProfilePage,
  FormPage,
  AddTicketPage,
  CreateNewTicketPage,
  TicketDetailPage,
  SettingsPage,
  CustomerPage,
  AddCustomerPage,
  GeneratePrint
} from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/tasks",
    element: TasksPage,
  },
  {
    path: "/profile",
    element: ProfilePage,
  },
  {
    path: "/home",
    element: HomePage,
  },
  {
    path: "/addTicket",
    element: AddTicketPage,
  },
  {
    path: "/form",
    element: FormPage,
  },
  {
    path: "/createNewTicketPage",
    element: CreateNewTicketPage,
  },
  {
    path: "/ticketDetail",
    element: TicketDetailPage,
  },
  {
    path: "/customer",
    element: CustomerPage,
  },
  {
    path: "/add-customer",
    element: AddCustomerPage,
  },
  {
    path: "/settings",
    element: SettingsPage,
  },
  {
    path: "/generate-print",
    element: GeneratePrint, 
  }
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
