export interface SignUpFormData {
  email: string;
  password: string;
  name: string;
  category: string;
  phone: string;
  city: string;
  mapUrl: string;
  location: string;
}

export interface DeleteFormData {
  email: string;
  reason: string;
}
export interface BusinessDescriptionData {
  description: string;
}

export interface CloudinaryData {
  imgUrl: string;
}
export type DynamicObject = {
  [x: string]: any;
};
interface ISidebarData {
  link: string;
  name: string;
  imageUrl: string;
}

const sidebarData: ISidebarData[] = [
  {
    link: "/user/dashboard",
    name: "Dashboard",
    imageUrl: "/user-icons/dashboard.svg",
  },
  {
    link: "/user/scheduling",
    name: "Scheduling",
    imageUrl: "/user-icons/calendar.svg",
  },
  {
    link: "/user/revenue",
    name: "Revenue",
    imageUrl: "/user-icons/revenue.svg",
  },
  {
    link: "/user/clients",
    name: "Clients",
    imageUrl: "/user-icons/client.svg",
  },
  { link: "/user/staff", name: "Staff", imageUrl: "/user-icons/staff.svg" },
  {
    link: "/user/services",
    name: "Services",
    imageUrl: "/user-icons/services.svg",
  },
  {
    link: "/user/expenses",
    name: "Expenses",
    imageUrl: "/user-icons/expenses.svg",
  },
  {
    link: "/user/inventory",
    name: "Inventory",
    imageUrl: "/user-icons/inventory.svg",
  },
  {
    link: "/user/reviews",
    name: "Reviews",
    imageUrl: "/user-icons/settings.svg",
  },
];

export default sidebarData;
