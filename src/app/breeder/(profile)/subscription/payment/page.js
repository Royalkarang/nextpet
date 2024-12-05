"use client";
// import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import BreederProfileLeft from "../../../../../components/BreederProfileLeft";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe asynchronously
const stripePromise = loadStripe(
  "pk_test_51HcPzF2eQmS8xoDS0gNjEJ9dlw73DKu0XYtjzdYuehbhXZGFV27czWJe3cAXRfFvWl7XmRi9x2GvB2aSfj7e1mJm00pp0rwacO"
);

const Payment = () => {
  const searchParams = useSearchParams();
  const stripe = useStripe();
  // const elements = useElements();
  // const [processing, setProcessing] = useState(false);
  // const [paymentStatus, setPaymentStatus] = useState("");

  const searchParamsObj = Object.fromEntries(searchParams.entries());

  const user_iddd = localStorage.getItem("breeder_user_id");

  // console.log("checkingpayment", paymentStatus);
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     return; // Make sure Stripe.js has loaded
  //   }

  //   setProcessing(true);
  //   setPaymentStatus(""); // Reset payment status

  //   // Create PaymentIntent on your backend
  //   const res = await fetch("/api/create-payment-intent", {
  //     method: "POST",
  //   });
  //   const { clientSecret } = await res.json();

  //   // Confirm the payment with the client secret
  //   const { error, paymentIntent } = await stripe.confirmCardPayment(
  //     clientSecret,
  //     {
  //       payment_method: {
  //         card: elements.getElement(CardElement), // Attach CardElement
  //       },
  //     }
  //   );

  //   setProcessing(false); // Stop processing indicator

  //   if (error) {
  //     setPaymentStatus(`Payment failed: ${error.message}`); // Show error message
  //   } else if (paymentIntent.status === "succeeded") {
  //     setPaymentStatus("Payment succeeded!"); // Show success message
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      user_id: user_iddd, // pass the id of above condition i have get from localstorage user_iddd
      sub_id: parseInt(searchParamsObj?.sub_id),
      price: parseInt(searchParamsObj?.price),
      sub_plan: searchParamsObj?.sub_plan,
      name: searchParamsObj?.name,
    };

    try {
      // Make the POST request with payload using axios
      const response = await axios.post(
        "https://frontend.nextpetapp.com/api/payment",
        payload
      );

      // Check if the response has a URL to redirect to
      const { message, url } = response.data;
      // const { message, code, msg_type, url } = response.data;

      // If a URL is returned, redirect to that URL
      if (url) {
        // Optionally log the message
        console.log(message);

        // Redirect the user
        window.location.href = url;
      } else {
        // Handle the case where no URL is provided (e.g., show an error message)
        console.log("No URL in the response for redirection");
      }
    } catch (error) {
      // Handle any errors during the request or response
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const breederData = {
    page: "subscription",
  };

  return (
    <div className="breedeerdasboard-profile-wrap">
      <div className="container">
        <div className="col-lg-12">
          <div className="breedeerdasboard-profile-inner">
            <BreederProfileLeft data={breederData} />
            <div className="breedeerdasboard-subscription-right">
              <h1>Payment Details</h1>
              <form onSubmit={handleSubmit}>
                <div class="subscription-payment-box">
                  <div class="header-subscription">
                    <h3>Card Details</h3>
                  </div>
                  <div class="inner-subscription mt-4">
                    <p>Amount: {searchParamsObj?.price}</p>
                    <p>Plans: {searchParamsObj?.name}</p>
                  </div>

                  {/* <div class="inner-subscription mt-4">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#32325d",
                            "::placeholder": {
                              color: "#6b6b85",
                              top: "10px",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                    />
                  </div> */}
                </div>

                <div class="subscription-btn-wrap">
                  {/* <button type="submit" disabled={!stripe || processing}>
                    {processing ? "Processing..." : "Pay Now"}
                  </button> */}
                  <button type="submit" disabled={!stripe}>
                    {/* {processing ? "Processing..." : "Pay Now"} */}
                    Pay Now
                  </button>
                </div>
                {/* {paymentStatus && <p>{paymentStatus}</p>} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper for the page component to ensure Elements context is provided
const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default PaymentPage;
