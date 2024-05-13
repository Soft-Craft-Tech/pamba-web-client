export interface SignUpFormData {}

export interface DeleteFormData {
  email: string;
  reason: string;
}
export interface BusinessDescriptionData {
  description: string;
}

export interface CloudinaryData {
  imageURL: string;
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
  {
    link: "/user/staff-management",
    name: "Staff",
    imageUrl: "/user-icons/staff.svg",
  },
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

const sliderData = [
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
];

const sliderDataTwo = [
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
  { imageUrl: "/closeShops.svg", shopName: "Beauty spot salon" },
];

export { sidebarData, sliderData, sliderDataTwo };
