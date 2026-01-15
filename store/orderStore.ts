import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useOrderStore = create(
  persist(
    (set) => ({
      // 1. THE STATE: Initialize with your exact structure
      order: {
        customer_id: null,
        salesorder_number: "",
        date: "",
        shipment_date: "",
        custom_fields: [],
        reference_number: "",
        location_id: "",
        line_items: [],
        contact_persons_associated: [],
        notes: "",
        terms: "",
        discount: "0%",
        is_discount_before_tax: true,
        discount_type: "entity_level",
        shipping_charge: 0,
        delivery_method: "",
        adjustment: 0,
        pricebook_id: null,
        billing_address_id: null,
        shipping_address_id: null,
      },

      // 2. ACTIONS:
      // Set the entire object (useful for initial fetch)
      setFullOrder: (newOrder) => set({ order: newOrder }),

      // Update specific top-level fields (e.g., 'notes', 'shipping_charge')
      updateOrderField: (field, value) =>
        set((state) => ({
          order: { ...state.order, [field]: value }
        })),

      // Update specific nested arrays
      setLineItems: (items) =>
        set((state) => ({
          order: { ...state.order, line_items: items }
        })),

      // Reset for new orders
      clearOrder: () => set({ order: {} }),
    }),
    {
      name: 'sales-order-storage', // Key in LocalStorage
    }
  )
);