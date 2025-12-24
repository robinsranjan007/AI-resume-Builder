import React from "react";
import Title from "./Title";
import { BookUserIcon } from "lucide-react";

import SlidingCard from "./SlidingCard";

const Testimonial = () => {
  const txt =
    "Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us please leave us a review";
  return (
    <>
      <div
        id="testimonial"
        className="flex flex-col items-center my-10 scroll-mt-12"
      >
        <div className="flex items-center gap-2 text-sm text-blue-800 bg-blue-400/10 border border-indigo-200 rounded-full px-4 py-1">
          <BookUserIcon className="size-4.5 stroke-green-600" width={14} />
          <span>Testimonial</span>
        </div>
        <Title title="Don't just take our words" description={txt} />
      </div>

      <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }

            .marquee-inner {
                animation: marqueeScroll 25s linear infinite;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
        `}</style>

      <SlidingCard />
      <SlidingCard reverse={true} />
    </>
  );
};

export default Testimonial;
