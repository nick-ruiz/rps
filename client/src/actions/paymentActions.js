//import axios from "axios";
import { PAY } from "./types";

// Pay
export const payStripe = token => dispatch => {
  // let response =
  console.log("paystripe");
  fetch("/api/payment/charge", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: token.id
  }).then(res => {
    dispatch({ type: PAY, payload: res });
  });

  // console.log(token);
  // axios
  //   .post("/api/payment/charge", token.id)
  //   .then(res => {
  //     console.log(res.data);
  //     //return res.data;
  //     dispatch({ type: PAY, payload: res.data });
  //   })
  //   .catch(err => console.log(err));
};
