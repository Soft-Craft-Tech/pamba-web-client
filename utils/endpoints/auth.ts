const authEndpoints: { [key: string]: string } = {
  login: "/businesses/login",
  signup: "/businesses/signup",
  verifyAccount: "/businesses/activate-account/",
  changePassword: "/businesses/change-password",
  updateDescription: "/businesses/update-description",
  resetPassword: "/businesses/reset-password/",
  requestPasswordReset: "businesses/request-password-reset",
  deleteAccount: "/businesses/clients/delete-account",
  updateProfile: "/businesses/update",
};

export default authEndpoints;
