import React, { useEffect, useState } from "react";
import { SVG } from "./SVG";
import { BASE_URL } from "../../utils/Constants";
import axios from "axios";

const Premium = () => {
  const [isUserPreminum, setIsUserPremium] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true); // 🔹 Add loading state

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      console.log(res);

      if (res.data.isPreminum) {
        setIsUserPremium(true);
        setSubscription(res.data.membershipType); // 🎟️ subscription details from backend
      }
    } catch (error) {
      console.error("Error verifying premium user", error);
    } finally {
      setLoading(false); // 🔹 Done loading
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

  if (loading) {
    // 🔹 Show spinner or placeholder while fetching
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
    );
  }

  
  // 🎉 Premium Celebration + Subscription Card
  if (isUserPreminum) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 text-white text-center px-6">
        {/* Sparkles Animation */}
        <div className="animate-bounce mb-6 text-6xl">✨</div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500">
            Premium
          </span>{" "}
          🎉
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg font-medium max-w-xl">
          You’re now enjoying <span className="font-bold">exclusive perks</span>
          , unlimited connections, boosts, chat features, and priority support.
          Thanks for being an <span className="underline">Elite Member</span> 💎
        </p>

        {/* Subscription Details Card */}
        {subscription && (
          <div className="mt-10 w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
            <div className="p-8 relative overflow-hidden">
              {/* Animated Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 opacity-20 animate-gradient-x mix-blend-overlay rounded-3xl"></div>

              <h2 className="text-3xl font-extrabold text-yellow-200 mb-6 flex items-center justify-center">
                📜 Subscription Details
              </h2>

              <div className="text-left space-y-3 text-white">
                <p className="text-lg">
                  <span className="font-semibold">Plan Type:</span>{" "}
                  {subscription}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Perks:</span> Unlimited
                  connections, boosts, chat, verified badge, priority support
                </p>
              </div>

              {/* Decorative Sparkles */}
              <div className="absolute top-2 left-2 text-yellow-300 text-2xl animate-pulse">
                ✨
              </div>
              <div className="absolute bottom-2 right-2 text-pink-300 text-2xl animate-pulse">
                ✨
              </div>
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
