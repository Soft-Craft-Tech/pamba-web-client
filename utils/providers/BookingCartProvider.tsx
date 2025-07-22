"use client";

import { CartItem } from "@/components/types";
import { createContext, useContext, useState, useEffect } from "react";

type CartInfo = {
  provider_id?: number | null;
  provider_name?: string;
  business_id?: number;
  business_name?: string;
  business_slug?: string;
  weekdayClosing?: string;
  weekdayOpening?: string;
  weekendClosing?: string;
  weekendOpening?: string;
  date?: string;
  time?: string;
};

type BookingCartContextType = {
  cartInfo: CartInfo;
  cartServices: CartItem[];
  addService: (service: CartItem) => void;
  removeService: (serviceId: number) => void;
  updateCartItem: (serviceId: number, updates: CartItem) => void;
  updateCartDateTime: (date: string, time: string) => void;
  updateCartProvider: (
    providerId: number | null,
    providerName?: string
  ) => void;
  updateCartBusiness: (
    businessId: number,
    businessName: string,
    businessSlug: string,
    weekdayClosing?: string,
    weekdayOpening?: string,
    weekendClosing?: string,
    weekendOpening?: string
  ) => void;
  clearCart: () => void;
  total: number;
};

const BookingCartContext = createContext<BookingCartContextType | undefined>(
  undefined
);

export const useBookingCart = () => {
  const context = useContext(BookingCartContext);
  if (!context)
    throw new Error("useBookingCart must be used within BookingCartProvider");
  return context;
};

const CART_STORAGE_KEY = "pamba_booking_cart";

export default function BookingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartInfo, setCartInfo] = useState<CartInfo>({});
  const [cartServices, setCartServices] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (parsedCart.cartInfo) {
            setCartInfo(parsedCart.cartInfo);
          }
          if (parsedCart.cartServices) {
            setCartServices(parsedCart.cartServices);
          }
        } catch (error) {
          console.error("Error loading cart from localStorage:", error);
          // localStorage.removeItem(CART_STORAGE_KEY);
        }
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartData = { cartInfo, cartServices };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    }
  }, [cartInfo, cartServices]);

  const addService = (service: CartItem) => {
    setCartServices((prev) =>
      prev.find((s) => s.id === service.id) ? prev : [...prev, service]
    );
  };

  const removeService = (serviceId: number) => {
    setCartServices((prev) => prev.filter((s) => s.id !== serviceId));
  };

  const updateCartItem = (serviceId: number, updates: CartItem) => {
    setCartServices((prev) =>
      prev.map((item) =>
        item.id === serviceId ? { ...item, ...updates } : item
      )
    );
  };

  const updateCartDateTime = (date: string, time: string) => {
    setCartInfo({
      ...cartInfo,
      date,
      time,
    });
  };

  const updateCartProvider = (
    providerId: number | null,
    providerName?: string
  ) => {
    setCartInfo({
      ...cartInfo,
      provider_id: providerId,
      provider_name: providerName || "",
    });
  };

  const updateCartBusiness = (
    businessId: number,
    businessName: string,
    businessSlug: string,
    weekdayClosing?: string,
    weekdayOpening?: string,
    weekendClosing?: string,
    weekendOpening?: string
  ) => {
    setCartInfo({
      business_id: businessId,
      business_name: businessName,
      business_slug: businessSlug,
      weekdayClosing: weekdayClosing,
      weekdayOpening: weekdayOpening,
      weekendClosing: weekendClosing,
      weekendOpening: weekendOpening,
    });
  };

  const clearCart = () => {
    setCartInfo({});
    setCartServices([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  };

  const total = cartServices.reduce((sum, s) => sum + (s.price || 0), 0);

  return (
    <BookingCartContext.Provider
      value={{
        cartInfo,
        cartServices,
        addService,
        removeService,
        updateCartItem,
        updateCartDateTime,
        updateCartProvider,
        updateCartBusiness,
        clearCart,
        total,
      }}
    >
      {children}
    </BookingCartContext.Provider>
  );
}
