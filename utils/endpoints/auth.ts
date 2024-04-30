const authEndpoints: { [key: string]: string } = {
  login: "/businesses/login",
  signup: "/businesses/signup",
  verifyAccount: "/businesses/activate-account/",
  updateDescription: "/businesses/update-description",
  resetPassword: "/businesses/reset-password/",
  requestPasswordReset: "businesses/request-password-reset",
  deleteAccount: "/clients/delete-account",
  profileCompletion: "/businesses/profile-completion-status",
  uploadImage: "/businesses/upload-profile-img",
  assignServices: "/businesses/assign-services",
  fetchAllServices: "/services/fetch_all",
};

export default authEndpoints;
