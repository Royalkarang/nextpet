"use client";
import { useState } from "react";
import Image from "next/image";
import BreederProfileLeft from "../../../../components/BreederProfileLeft";
import Link from "next/link";
import BreederProtectedRoute from "@/src/app/context/BreederProtectedRoute";

const Subscription = () => {
  const [activePlan, setActivePlan] = useState("free");

  const handleCardClick = (plan) => {
    setActivePlan(plan);
  };

  const breederData = {
    page: "subscription",
  };

  const plans = [
    {
      name: "free",
      price: "$0",
      description: "First 6 posts are free",
      description_1:
        "It was popularised in the 1960s with the release of Letraset sheets.",
      description_2: "Lorem Ipsum passages, and more recently with desktop.",
      sub_id: 1,
      sub_plan: 1,
    },
    {
      name: "silver",
      price: "20",
      description: "Pay $20 per post",
      description_1:
        "It was popularised in the 1960s with the release of Letraset sheets.",
      description_2: "Lorem Ipsum passages, and more recently with desktop.",
      sub_id: 2,
      sub_plan: 2,
    },
    {
      name: "gold",
      price: "150",
      description: "$150/year for 12 posts, One-time annual fee",
      description_1:
        "It was popularised in the 1960s with the release of Letraset sheets.",
      description_2: "Lorem Ipsum passages, and more recently with desktop.",
      sub_id: 3,
      sub_plan: 3,
    },
    {
      name: "platinum",
      price: "480",
      description: "Unlimited posting $40/month, Minimum 1-year",
      description_1:
        "It was popularised in the 1960s with the release of Letraset sheets.",
      description_2: "Lorem Ipsum passages, and more recently with desktop.",
      sub_id: 4,
      sub_plan: 4,
    },
  ];

  // Get the selected plan object based on the `activePlan`
  const selectedPlan = plans.find((plan) => plan.name === activePlan);
  console.log(selectedPlan, "selected plan of this ß");

  return (
    <>
    <BreederProtectedRoute>
      <div className="breedeerdasboard-profile-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="breedeerdasboard-profile-inner">
              <BreederProfileLeft data={breederData} />
              <div className="breedeerdasboard-subscription-right">
                <h1>Available Subscription Plans</h1>
                <form action="#">
                  <div className="subscription-payment-wrap">
                    {plans.map((plan, index) => (
                      <div
                        key={index}
                        className={`subscription-payment-box ${
                          activePlan === plan.name ? "active" : ""
                        }`}
                        onClick={() => handleCardClick(plan.name)}
                      >
                        <div className="header-subscription">
                          <span>
                            {plan.name.charAt(0).toUpperCase() +
                              plan.name.slice(1)}
                          </span>
                          <h2>{plan.price}</h2>
                          <span>Month</span>
                          {plan.name === "free" && (
                            <div className="active-band">
                              <Image
                                src="/images/Nextpet-imgs/dashboard-imgs/active.png"
                                alt="Active Plan"
                                width={75}
                                height={75}
                              />
                            </div>
                          )}
                        </div>
                        <div className="content-subscription">
                          <div className="inner-subscription">
                            <Image
                              src="/images/Nextpet-imgs/dashboard-imgs/check.png"
                              alt="Check"
                              width={15}
                              height={15}
                            />
                            <p>{plan.description}</p>
                          </div>
                          <div className="inner-subscription">
                            <Image
                              src="/images/Nextpet-imgs/dashboard-imgs/check.png"
                              alt="Check"
                              width={15}
                              height={15}
                            />
                            <p>{plan.description_1}</p>
                          </div>
                          <div className="inner-subscription">
                            <Image
                              src="/images/Nextpet-imgs/dashboard-imgs/check.png"
                              alt="Check"
                              width={15}
                              height={15}
                            />
                            <p>{plan.description_2}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="subscription-btn-wrap">
                    {selectedPlan && (
                      <Link
                        href={{
                          pathname: `/breeder/subscription/payment`,
                          query: {
                            price: selectedPlan.price,
                            name: selectedPlan.name,
                            sub_id: selectedPlan.sub_id,
                            sub_plan: selectedPlan.sub_plan,
                          },
                        }}
                      >
                        <button type="button">Upgrade Plan</button>
                      </Link>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </BreederProtectedRoute>
    </>
  );
};

export default Subscription;
