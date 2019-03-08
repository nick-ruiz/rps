import {
  ADD_INVOICE,
  GET_INVOICES,
  GET_INVOICE,
  DELETE_INVOICE,
  INVOICE_LOADING
} from "../actions/types";

const initialState = {
  invoices: [],
  invoice: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INVOICE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_INVOICES:
      return {
        ...state,
        invoices: action.payload,
        loading: false
      };
    case GET_INVOICE:
      return {
        ...state,
        invoice: action.payload,
        loading: false
      };
    case ADD_INVOICE:
      return {
        ...state,
        invoices: [action.payload, ...state.invoices]
      };
    case DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(
          invoice => invoice._id !== action.payload
        )
      };
    default:
      return state;
  }
}
