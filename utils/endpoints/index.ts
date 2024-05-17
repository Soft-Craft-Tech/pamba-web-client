import authEndpoints from "./auth";
import accountEndpoints from "./accountsEndpoints";
import appointmentsEndpoints from "./appointmentsEndpoints";
import businessesEndpoints from "./businessesEndpoints";
import expensesEndpoints from "./expensesEndpoints";
import servicesEndpoints from "./servicesEndpoints";
import staffEndpoints from "./staffEndpoints";

const endpoints: { [key: string]: string } = {
  ...authEndpoints,
  ...accountEndpoints,
  ...appointmentsEndpoints,
  ...businessesEndpoints,
  ...expensesEndpoints,
  ...servicesEndpoints,
  ...staffEndpoints,
};

export default endpoints;
