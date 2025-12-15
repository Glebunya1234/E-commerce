"use client";

import React, { createContext, useContext, useState } from "react";

export interface LastOrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface LastOrderData {
  orderId: number | null;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  items: LastOrderItem[];
  total: number;
}

interface LastOrderContextType {
  lastOrder: LastOrderData | null;
  setLastOrder: (data: LastOrderData) => void;
  clearLastOrder: () => void;
}

const LastOrderContext = createContext<LastOrderContextType | undefined>(
  undefined
);

export function LastOrderProvider({ children }: { children: React.ReactNode }) {
  const [lastOrder, setLastOrderState] = useState<LastOrderData | null>(null);

  const setLastOrder = (data: LastOrderData) => {
    setLastOrderState(data);
  };

  const clearLastOrder = () => {
    setLastOrderState(null);
  };

  return (
    <LastOrderContext.Provider
      value={{ lastOrder, setLastOrder, clearLastOrder }}
    >
      {children}
    </LastOrderContext.Provider>
  );
}

export function useLastOrder() {
  const context = useContext(LastOrderContext);
  if (!context) {
    throw new Error("useLastOrder must be used within LastOrderProvider");
  }
  return context;
}
