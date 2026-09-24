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
  paymentMethod?: string;
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
  placeOrder: (paymentMethod?: string, discount?: number) => void;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  clearWishlist: () => void;
  clearOrders: () => void;
  loyaltyPoints: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(1250);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize from localStorage
  React.useEffect(() => {
    try {
      const storedItems = localStorage.getItem("woxly_cart");
      if (storedItems) setItems(JSON.parse(storedItems));
      
      const storedOrders = localStorage.getItem("woxly_orders");
      if (storedOrders) {
        let parsedOrders = JSON.parse(storedOrders);
        // Sanitize legacy non-lamp items from previous templates
        parsedOrders = parsedOrders.map((order: any) => {
          if (order.items) {
            order.items = order.items.map((item: any) => {
              const isLamp = item.name && (item.name.toLowerCase().includes("lamp") || item.name.toLowerCase().includes("dial") || item.name.toLowerCase().includes("companion") || item.name.toLowerCase().includes("glow"));
              if (!isLamp) {
                return {
                  ...item,
                  name: "Sol Focus Lamp",
                  image: "/images/sol-ambient.jpg",
                  slug: "sol-focus-lamp",
                  category: "Lighting"
                };
              }
              return item;
            });
          }
          return order;
        });
        setOrders(parsedOrders);
      }
      
      const storedWishlist = localStorage.getItem("woxly_wishlist");
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
      
      const storedPoints = localStorage.getItem("woxly_points");
      if (storedPoints) setLoyaltyPoints(JSON.parse(storedPoints));
    } catch (error) {
      console.error("Failed to load from localStorage", error);
    }
    setIsMounted(true);
  }, []);

  // Save to localStorage when state changes
  React.useEffect(() => {
    if (isMounted) localStorage.setItem("woxly_cart", JSON.stringify(items));
  }, [items, isMounted]);

  React.useEffect(() => {
    if (isMounted) localStorage.setItem("woxly_orders", JSON.stringify(orders));
  }, [orders, isMounted]);

  React.useEffect(() => {
    if (isMounted) localStorage.setItem("woxly_wishlist", JSON.stringify(wishlist));
  }, [wishlist, isMounted]);

  React.useEffect(() => {
    if (isMounted) localStorage.setItem("woxly_points", JSON.stringify(loyaltyPoints));
  }, [loyaltyPoints, isMounted]);

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

  const placeOrder = (paymentMethod: string = "UPI", discount: number = 0) => {
    if (items.length === 0) return;
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0) - discount;
    const newOrder: Order = {
      id: `WX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date()),
      status: "IN TRANSIT",
      total: Math.max(0, total),
      items: [...items],
      paymentMethod,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setItems([]);
    setLoyaltyPoints((prev) => Math.max(0, prev - discount + Math.floor(Math.max(0, total) * 0.05)));
  };

  const toggleWishlist = (slug: string) => {
    setWishlist(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const clearOrders = () => {
    setOrders([]);
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
        clearWishlist,
        clearOrders,
        loyaltyPoints,
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
