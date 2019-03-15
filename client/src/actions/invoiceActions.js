import axios from "axios";

import {
  ADD_INVOICE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_INVOICES,
  GET_INVOICE,
  INVOICE_LOADING,
  DELETE_INVOICE
} from "./types";

// Add invoice
export const addInvoice = invoiceData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/invoice", invoiceData)
    .then(res =>
      dispatch({
        type: ADD_INVOICE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add invoice by user id
export const addInvoiceById = (id, invoiceData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/invoice/${id}`, invoiceData)
    .then(res =>
      dispatch({
        type: ADD_INVOICE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get invoices
export const getInvoices = () => dispatch => {
  dispatch(setInvoiceLoading());
  axios
    .get("/api/invoice")
    .then(res =>
      dispatch({
        type: GET_INVOICES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_INVOICES,
        payload: null
      })
    );
};

// Get invoice by id
export const getInvoiceById = id => dispatch => {
  dispatch(setInvoiceLoading());
  axios
    .get(`/api/invoice/i/${id}`)
    .then(res =>
      dispatch({
        type: GET_INVOICE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_INVOICE,
        payload: null
      })
    );
};

// Get invoice by user id
export const getInvoice = id => dispatch => {
  dispatch(setInvoiceLoading());
  axios
    .get(`/api/invoice/${id}`)
    .then(res =>
      dispatch({
        type: GET_INVOICES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_INVOICES,
        payload: []
      })
    );
};

// Delete invoice
export const deleteInvoice = (id, inv_id) => dispatch => {
  axios
    .delete(`/api/invoice/${id}/${inv_id}`)
    .then(res =>
      dispatch({
        type: DELETE_INVOICE,
        payload: inv_id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add service to invoice
export const addService = (id, inv_id, data) => dispatch => {
  axios
    .post(`/api/invoice/add/${id}/${inv_id}`, data)
    .then(res => dispatch({ type: GET_INVOICE, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit invoice
export const editInvoice = (id, inv_id, data) => dispatch => {
  dispatch(setInvoiceLoading());
  axios
    .post(`/api/invoice/add/${id}/${inv_id}`, data)
    .then(res => dispatch({ type: GET_INVOICES, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete service from invoice
export const deleteService = (id, inv_id, serv_id) => dispatch => {
  axios
    .delete(`/api/invoice/${id}/${inv_id}/${serv_id}`)
    .then(res =>
      dispatch({
        type: GET_INVOICE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// // Remove Like
// export const removeLike = id => dispatch => {
//   axios
//     .post(`/api/posts/unlike/${id}`)
//     .then(res => dispatch(getPosts()))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Add comment
// export const addComment = (postId, commentData) => dispatch => {
//   dispatch(clearErrors());
//   axios
//     .post(`/api/posts/comment/${postId}`, commentData)
//     .then(res =>
//       dispatch({
//         type: GET_POST,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Delete comment
// export const deleteComment = (postId, commentId) => dispatch => {
//   axios
//     .delete(`/api/posts/comment/${postId}/${commentId}`)
//     .then(res =>
//       dispatch({
//         type: GET_POST,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// Set loading state
export const setInvoiceLoading = () => {
  return {
    type: INVOICE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
