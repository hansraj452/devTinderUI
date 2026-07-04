/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { CONSTANT } from "../utils/constant";
import { useEffect, useState } from "react";

const Premium = () => {
  const plans = [
    {
      name: 'Silver Plan',
      price: '$19',
      period: '/month',
      badge: 'Popular',
      badgeColor: 'badge-neutral',
      // Silver gradient styling with dark text
      bgStyle: 'bg-gradient-to-br from-slate-100 to-slate-300 text-slate-800',
      btnColor: 'btn-neutral',
      features: [
        'Send 100 connections per day',
        'Send requests to ignored files & others',
        'Basic profile analytics',
        '24/7 Support'
      ]
    },
    {
      name: 'Gold Plan',
      price: '$49',
      period: '/month',
      badge: 'Best Value',
      badgeColor: 'badge-warning',
      // Gold gradient styling with dark amber text
      bgStyle: 'bg-gradient-to-br from-amber-100 via-yellow-200 to-amber-300 text-amber-950',
      btnColor: 'btn-warning text-amber-950 font-bold',
      features: [
        'Unlimited connections per day',
        'Message them directly without showing interest',
        'Send requests to ignored files & others',
        'Priority premium support'
      ]
    }
  ];
  const [isUserPremium , setIsUserPremium] = useState();
  
  const verifyPremiumUser = async() =>{
    try{
   const res = await axios.get(CONSTANT.BASE_URL + "/premium/verify", {
    withCredentials : true
   } )
   if(res.data.isPremium){
   setIsUserPremium(res.data.isPremium);   }
  }
  catch(error){
    console.warn(error)
  }
}
  useEffect(() =>{
    verifyPremiumUser();
  }, [])
  
  
  const handlePaymentType = async(paymentType) =>{
    try{
        const res = await axios.post(CONSTANT.BASE_URL + '/payment/create' ,
        { 
           memberShipType: paymentType
        },
        {
          withCredentials: true,
        })
        console.log(res)
        const {amount , keyId , currency , notes , orderId} = res.data
        const options = {
          key: keyId,
          amount,
          currency,
          name:"Dev Tinder",
          description : "Connect to other Developer! ",
          order_id : orderId,
          prefill :{
            name : notes.firstName + " "+notes.lastName,
            email : notes.emailId,
            contact: "8299622731"
          },
          theme: {
          color: '#F37254'
        },
        handler : verifyPremiumUser,
        }
      const rzp = new window.Razorpay(options);
      rzp.open();

    }
    catch(error){
        console.warn(error.message)
    }
  }
  return isUserPremium ? (
    "You're are already a premium user"
  ): (
    <div className="bg-base-200 px-4 flex flex-col items-center justify-center">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4 tracking-tight">
          Supercharge Your Workflow. <span className="text-primary">Go Premium</span>
        </h1>
        <p className="text-base-content/70 max-w-md mx-auto">
          Choose the plan that fits your growth and unlock powerful networking features.
        </p>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`card shadow-xl border border-base-300/20 transition-all duration-200 ${plan.bgStyle}`}
          >
            <div className="card-body p-8">
              {/* Badge & Name */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title text-2xl font-bold">{plan.name}</h2>
                <span className={`badge ${plan.badgeColor} badge-md`}>{plan.badge}</span>
              </div>

              {/* Pricing */}
              <div className="my-4">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="opacity-70 text-sm">{plan.period}</span>
              </div>

              <div className="divider opacity-20 my-2"></div>

              {/* Features List */}
              <ul className="space-y-4 my-6 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base">
                    {/* Hardcoded deep blue checkmarks for high contrast */}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-blue-600 shrink-0 stroke-[3]" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <div className="card-actions mt-6">
                <button onClick= { () => handlePaymentType(plan.name.split(' ')[0])} className={`btn btn-block ${plan.btnColor}`}>
                  Choose {plan.name.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;