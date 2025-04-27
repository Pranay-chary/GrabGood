import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  venues: [],
  selectedVenue: null,
  filters: {
    type: '',
    status: '',
    search: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  loading: false,
  error: null,
};

const AppContext = createContext(null);

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_VENUES':
      return { ...state, venues: action.payload };
    case 'SET_SELECTED_VENUE':
      return { ...state, selectedVenue: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_PAGINATION':
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_VENUE':
      return {
        ...state,
        venues: state.venues.map((venue) =>
          venue.id === action.payload.id ? action.payload : venue
        ),
        selectedVenue:
          state.selectedVenue?.id === action.payload.id
            ? action.payload
            : state.selectedVenue,
      };
    case 'DELETE_VENUE':
      return {
        ...state,
        venues: state.venues.filter((venue) => venue.id !== action.payload),
        selectedVenue:
          state.selectedVenue?.id === action.payload ? null : state.selectedVenue,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 