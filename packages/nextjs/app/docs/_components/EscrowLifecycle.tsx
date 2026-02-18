import React from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  HandThumbUpIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

export const EscrowLifecycle = () => {
  const steps = [
    {
      title: "1. Job Created",
      icon: <ClockIcon className="w-6 h-6" />,
      desc: "Client deposits Bounty + Fees. Escrow is deployed in 'Open' state.",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary",
    },
    {
      title: "2. Application",
      icon: <HandThumbUpIcon className="w-6 h-6" />,
      desc: "Freelancers apply. Client selects one. Escrow moves to 'Locked' state.",
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary",
    },
    {
      title: "3. Submission",
      icon: <CheckCircleIcon className="w-6 h-6" />,
      desc: "Freelancer submits work (PR URL). Review window starts ticking.",
      color: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent",
    },
    {
      title: "4. Settlement",
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      desc: "Client approves OR auto-release timer hits 0. Funds released.",
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success",
    },
  ];

  return (
    <div className="my-12">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <ClockIcon className="w-6 h-6 text-secondary" />
        Escrow Lifecycle
      </h3>

      <div className="relative">
        {/* Vertical Line for Mobile */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-base-300 md:hidden"></div>
        {/* Horizontal Line for Desktop */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-base-300 hidden md:block"></div>

        <div className="grid md:grid-cols-4 gap-6 relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="flex md:flex-col gap-4">
              {/* Node Circle */}
              <div
                className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center bg-base-100 border-2 ${step.border} z-10`}
              >
                <div className={step.color}>{step.icon}</div>
              </div>

              {/* Content */}
              <div className="pb-8 md:pb-0 md:pt-2">
                <h4 className={`font-bold text-sm mb-1 ${step.color}`}>{step.title}</h4>
                <p className="text-xs opacity-70 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-error/10 border border-error/20 rounded-xl flex gap-4 items-start">
        <ShieldExclamationIcon className="w-6 h-6 text-error flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-sm text-error">Dispute Mechanism</h4>
          <p className="text-xs opacity-70 mt-1">
            At any point during the {`"Locked"`} state, either party can raise a dispute. This freezes the funds and
            summons the Arbiter. The Arbiter then decides the split (e.g. 50/50 refund, or 100% to freelancer) based on
            evidence.
          </p>
        </div>
      </div>
    </div>
  );
};
