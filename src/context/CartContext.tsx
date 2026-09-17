"use client";

import React, { createContext, useContext, useState } from "react";
import { product, bundles } from "@/data/store";

interface CartContextType {
  cartQuantity: number;
  setCartQuantity: React.Dispatch<React.SetStateAction<number>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  variant: typeof product.variants[0];
  setVariant: React.Dispatch<React.SetStateAction<typeof product.variants[0]>>;
  bundle: typeof bundles[0];
  setBundle: React.Dispatch<React.SetStateAction<typeof bundles[0]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [variant, setVariant] = useState(product.variants[0]);
  const [bundle, setBundle] = useState(bundles[0]);

  // Sync scroll lock with cart and menu state
  React.useEffect(() => {
    document.body.style.overflow = cartOpen || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, menuOpen]);

  return (
    <CartContext.Provider
      value={{
        cartQuantity,
        setCartQuantity,
        cartOpen,
        setCartOpen,
        menuOpen,
        setMenuOpen,
        variant,
        setVariant,
        bundle,
        setBundle,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
