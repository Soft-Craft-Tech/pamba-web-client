const businessesEndpoints: { [key: string]: string } = {
  login: "/businesses/login",
  signup: "/businesses/signup",
  verifyAccount: "/businesses/activate-account/",
  changePassword: "/businesses/change-password",
  updateDescription: "/businesses/update-description",
  resetPassword: "/businesses/reset-password/",
  requestPasswordReset: "businesses/request-password-reset",
  deleteAccount: "/businesses/clients/delete-account",
  updateProfile: "/businesses/update",
  profileCompletion: "/businesses/profile-completion-status",
  uploadImage: "/businesses/upload-profile-img",
  assignServices: "/businesses/assign-services",
  fetchCategories: "/businesses/fetch-business-categories",
  getSingleBusiness: "/businesses",
  getAllBusinesses: "/businesses/all-businesses",
  fetchServices: "/businesses/business-services",
};

export default businessesEndpoints;
