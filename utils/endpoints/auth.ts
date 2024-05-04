const authEndpoints: { [key: string]: string } = {
  login: "/businesses/login",
  signup: "/businesses/signup",
  verifyAccount: "/businesses/activate-account/",
  updateDescription: "/businesses/update-description",
  resetPassword: "/businesses/reset-password/",
  requestPasswordReset: "businesses/request-password-reset",
  deleteAccount: "/businesses/clients/delete-account",
  updateProfile: "/businesses/update",
  profileCompletion: "/businesses/profile-completion-status",
  uploadImage: "/businesses/upload-profile-img",
  assignServices: "/businesses/assign-services",
  fetchAllServices: "/services/fetch_all",
  fetchCategories: "/businesses/fetch-business-categories",
  getSingleBusiness: "/businesses",
};

export default authEndpoints;
