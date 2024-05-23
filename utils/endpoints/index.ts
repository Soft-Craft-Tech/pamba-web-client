import authEndpoints from "./auth";
import accountEndpoints from "./accountsEndpoints";
import appointmentsEndpoints from "./appointmentsEndpoints";
import businessesEndpoints from "./businessesEndpoints";
import expensesEndpoints from "./expensesEndpoints";
import servicesEndpoints from "./servicesEndpoints";
import staffEndpoints from "./staffEndpoints";
import galleryEndpoints from "./galleryEndpoints";
import reviewsEndpoints from "./reviewsEndpoints";

const endpoints: { [key: string]: string } = {
  ...authEndpoints,
  ...accountEndpoints,
  ...appointmentsEndpoints,
  ...businessesEndpoints,
  ...expensesEndpoints,
  ...servicesEndpoints,
  ...staffEndpoints,
  ...galleryEndpoints,
  ...reviewsEndpoints,
};

export default endpoints;
