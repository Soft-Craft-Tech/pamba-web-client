const authEndpoints: { [key: string]: string } = {
  login: "/businesses/login",
  signup: "/businesses/signup",
  verifyAccount: "/businesses/activate-account/",
  updateDescription: "/businesses/update-description",
  resetPassword: "/businesses/reset-password/",
  requestPasswordReset: "businesses/request-password-reset",
  deleteAccount: "/clients/delete-account",
};

export default authEndpoints;
