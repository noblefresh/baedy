import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: {},
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const id = newItem.id;
            const quantityToAdd = newItem.qty || 1;
            if (state.items[id]) {
                state.items[id].qty += quantityToAdd;
            } else {
                state.items[id] = {
                    ...newItem,
                    qty: quantityToAdd,
                };
            }
        },

        deductQty: (state, action) => {
            const id = action.payload?.id;
            const item = state.items[id];
            if (item) {
                if (item.qty > 1) {
                    item.qty -= 1;
                }
            }
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            delete state.items[id];
        },

        clearCart: (state) => {
            state.items = {};
        },
    },
});

export const { addToCart, removeFromCart, clearCart,deductQty } = cartSlice.actions;
export default cartSlice.reducer;

