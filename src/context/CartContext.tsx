"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

export interface CartItem {
  id: string; // unique identifier (e.g., slug + variant)
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  variant?: string;
  bundleLabel?: string;
}

export interface Order {
  id: string;
  date: string;
  status: "IN TRANSIT" | "DELIVERED";
  total: number;
  items: CartItem[];
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  cartQuantity: number;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  placeOrder: () => void;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartQuantity = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }
      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, qty) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const placeOrder = () => {
    if (items.length === 0) return;
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: `WX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date()),
      status: "IN TRANSIT",
      total,
      items: [...items],
    };
    setOrders((prev) => [newOrder, ...prev]);
    setItems([]);
  };

  const toggleWishlist = (slug: string) => {
    setWishlist(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

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
        items,
        orders,
        cartQuantity,
        cartOpen,
        setCartOpen,
        menuOpen,
        setMenuOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        placeOrder,
        wishlist,
        toggleWishlist,
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
