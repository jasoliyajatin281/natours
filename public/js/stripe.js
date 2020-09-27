/*eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

const stripe = Stripe(
  "pk_test_51HVyVhHR40Udn7r1D1mFGQ2ugMDHa608v6iSw0zJfrRjJeJbsfbOzliL8n6xNfgfqw5cVVabselx7Spk9EnkG39600bKS7dHAD"
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API

    // Use this url on development
    // `http://127.0.0.1:3000/api/v1/booking/checkout-session/${tourId}`
    const session = await axios(`/api/v1/booking/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form  + change credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    // console.log(err);
    showAlert("error", err);
  }
};
