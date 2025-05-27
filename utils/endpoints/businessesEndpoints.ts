const businessesEndpoints: { [key: string]: string } = {
  profileCompletion: "/businesses/profile-completion-status",
  uploadImage: "/businesses/upload-profile-img",
  assignServices: "/businesses/assign-services",
  fetchCategories: "/businesses/fetch-business-categories",
  getSingleBusiness: "/businesses/",
  fetchServices: "/businesses/business-services",
  getAllBusinesses: "/businesses/all-businesses",
  getBusinessesAnalysis: "/businesses/analysis",
  businessOpeningClosing: "/businesses/business-hours",
  resendVerificationToken: "/businesses/resend-verification-token",
  checkTokenExpiry: "/businesses/check-token-expiry",
};

export default businessesEndpoints;
