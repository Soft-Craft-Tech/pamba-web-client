import authEndpoints from "./auth";
import accountEndpoints from "./accountsEndpoints";
import appointmentsEndpoints from "./appointmentsEndpoints";
import businessesEndpoints from "./businessesEndpoints";
import expensesEndpoints from "./expensesEndpoints";
import servicesEndpoints from "./servicesEndpoints";
import staffEndpoints from "./staffEndpoints";
import galleryEndpoints from "./galleryEndpoints";
import reviewsEndpoints from "./reviewsEndpoints";
import inventoryEndpoints from "./inventoryEndpoints";
import clientsEndpoints from "./clientsEndpoints";
import revenueEndpoints from "./revenueEndpoints";

const endpoints: { [key: string]: string } = {
  ...authEndpoints,
  ...accountEndpoints,
  ...appointmentsEndpoints,
  ...businessesEndpoints,
  ...clientsEndpoints,
  ...expensesEndpoints,
  ...servicesEndpoints,
  ...staffEndpoints,
  ...galleryEndpoints,
  ...reviewsEndpoints,
  ...inventoryEndpoints,
  ...revenueEndpoints,
};

export default endpoints;
