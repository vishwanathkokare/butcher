import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface CartItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
}

interface CartState {
  items: CartItem[];
}

interface CartAction {
  type: 'ADD_TO_CART' | 'INCREMENT_QUANTITY' | 'DECREMENT_QUANTITY' |  'REMOVE_ITEM' |'CLEAR_CART';
  payload: CartItem;
}

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.name === action.payload.name ? { ...item, quantity: item.quantity + action.payload.quantity } : item
          ),
        };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.name === action.payload.name ? { ...item, quantity: item.quantity + 0.5 } : item
        ),
      };
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.name === action.payload.name && item.quantity > 0.5
            ? { ...item, quantity: item.quantity - 0.5 }
            : item
        ),
      };
      case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.name !== action.payload.name),
      };
    case 'CLEAR_CART':
      return {
              ...state,
              items:[]
              }
    default:
      return state;
  }
};

const loadState = (): CartState => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return { items: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [] };
  }
};

const saveState = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};