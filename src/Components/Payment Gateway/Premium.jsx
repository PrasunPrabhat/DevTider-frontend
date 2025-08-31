import React, { useEffect, useState } from "react";
import { SVG } from "./SVG";
import { BASE_URL } from "../../utils/Constants";
import axios from "axios";

const Premium = () => {
  const [isUserPreminum, setIsUserPremium] = useState(false);
  const [subscription, setSubscription] = useState(null);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPreminum) {
        setIsUserPremium(true);
        setSubscription(res.data.membershipType); // 🎟️ subscription details from backend
      }
    } catch (error) {
      console.error("Error verifying premium user", error);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { orderId, amount, keyId, currency, notes } = order.data;

    // It should open the Razorpay Dialog Box
    // Open Razorpay Checkout
    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: "Dev Tinder",
      description: "Connect to the Other Developers!!",
      order_id: orderId, // This is the order_id created in the backend
      // callback_url: "http://localhost:3000/payment-success", // Your success URL
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    // ! This will Open the Razorpay Dialog Box
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // 🎉 If user is premium → Show premium celebration + subscription details
  if (isUserPreminum) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 text-white text-center px-6">
        <div className="animate-bounce mb-6">
          <span className="text-6xl">✨</span>
        </div>

        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500">
            Premium
          </span>{" "}
          🎉
        </h1>

        <p className="mt-4 text-lg font-medium max-w-xl">
          You’re now enjoying <span className="font-bold">exclusive perks</span>
          , unlimited connections, boosts, chat features, and priority support.
          Thanks for being an <span className="underline">Elite Member</span> 💎
        </p>

        {/* Subscription Details Card */}
        {subscription && (
          <div className="mt-10 card w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="card-body text-left">
              <h2 className="text-2xl font-bold text-yellow-200 mb-4">
                📜 Subscription Details
              </h2>
              <p>
                <span className="font-semibold">Plan Type:</span>{" "}
                {subscription.type}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ₹
                {subscription.price}/mo
              </p>
              <p>
                <span className="font-semibold">Start Date:</span>{" "}
                {new Date(subscription.startDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Expiry Date:</span>{" "}
                {new Date(subscription.endDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Renewal:</span>{" "}
                {subscription.autoRenew ? "Auto-renew enabled 🔄" : "Manual"}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-12 text-center">
        Choose Your <span className="text-primary">Membership</span>
      </h1>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Free Plan */}
        <div className="card w-80 bg-base-100 shadow-xl border border-gray-200">
          <div className="card-body">
            <h2 className="text-2xl font-bold">Free</h2>
            <span className="text-lg text-gray-500">Always Free</span>
            <ul className="mt-6 flex flex-col gap-2 text-sm">
              <li>
                <SVG /> Create Profile
              </li>
              <li>
                <SVG /> Swipe & Match up to 10 users
              </li>
              <li>
                <SVG /> Send/Receive Connection Requests
              </li>
              <li className="opacity-40 line-through">
                <SVG /> No Silver Features
              </li>
              <li className="opacity-40 line-through">
                <SVG /> No Gold Features
              </li>
            </ul>
            <div className="mt-6">
              <button className="btn btn-outline btn-block" disabled>
                Current Plan
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider lg:divider-horizontal">OR</div>

        {/* Silver Membership */}
        <div className="card w-80 bg-base-100 shadow-xl border border-gray-200">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Silver</h2>
              <span className="text-lg font-semibold">₹900/mo</span>
            </div>
            <span className="badge badge-info w-fit">Popular</span>
            <ul className="mt-6 flex flex-col gap-2 text-sm">
              <li>
                <SVG /> All Free Features
              </li>
              <li>
                <SVG /> Swipe & Match up to 100 users
              </li>
              <li>
                <SVG /> Priority Requests
              </li>
              <li>
                <SVG /> Profile Boost (1/month)
              </li>
              <li className="opacity-40 line-through">
                <SVG /> No Gold Features
              </li>
              <li className="opacity-40 line-through">
                <SVG /> No Chat Features
              </li>
            </ul>
            <div className="mt-6">
              <button
                className="btn btn-info btn-block
                bg-gradient-to-r from-indigo-400 to-pink-500
                hover:from-pink-500 hover:to-indigo-400
                text-white font-bold
                transition-all duration-300 ease-in-out
                transform hover:scale-105
                hover:shadow-lg"
                onClick={() => handleBuyClick("silver")}
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider lg:divider-horizontal">OR</div>

        {/* Gold Membership */}
        <div className="card w-80 bg-base-100 shadow-xl border border-gray-200">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gold</h2>
              <span className="text-lg font-semibold">₹1900/mo</span>
            </div>
            <span className="badge badge-warning w-fit">Most Premium</span>
            <ul className="mt-6 flex flex-col gap-2 text-sm">
              <li>
                <SVG /> All Silver Features
              </li>
              <li>
                <SVG /> Unlimited Profile Boosts
              </li>
              <li>
                <SVG /> Unlimited Swipes & Matches
              </li>
              <li>
                <SVG /> In-app Chat Features
              </li>
              <li>
                <SVG /> Verified Badge
              </li>
              <li>
                <SVG /> Priority 24/7 Support
              </li>
            </ul>
            <div className="mt-6">
              <button
                className="btn btn-warning btn-block
                bg-gradient-to-r from-yellow-400 to-orange-500
                hover:from-orange-500 hover:to-yellow-400
                text-white font-bold
                transition-all duration-300 ease-in-out
                transform hover:scale-105
                hover:shadow-lg"
                onClick={() => handleBuyClick("gold")}
              >
                Go Gold
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
