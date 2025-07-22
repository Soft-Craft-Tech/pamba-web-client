const CLIENT_FORM_STORAGE_KEY = "pamba_client_form_data";

export interface ClientFormData {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export const saveClientFormData = (data: ClientFormData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CLIENT_FORM_STORAGE_KEY, JSON.stringify(data));
  }
};

export const loadClientFormData = (): ClientFormData | null => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem(CLIENT_FORM_STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Error loading client form data:", error);
        localStorage.removeItem(CLIENT_FORM_STORAGE_KEY);
      }
    }
  }
  return null;
};

export const clearClientFormData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CLIENT_FORM_STORAGE_KEY);
  }
};

export const clearAllBookingData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CLIENT_FORM_STORAGE_KEY);
    localStorage.removeItem("pamba_booking_cart");
  }
}; 