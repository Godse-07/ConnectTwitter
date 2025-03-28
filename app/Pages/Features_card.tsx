// import React from "react";

// export const Features_card = () => {
//   const features = [
//     {
//       title: "Blockchain Verification",
//       description: "Ensure the authenticity of your tweets with blockchain verification.",
//       icon: "🔗",
//     },
//     {
//       title: "Immutable Records",
//       description: "Once verified, your tweets are immutable and tamper-proof.",
//       icon: "🛡️",
//     },
//     {
//       title: "User-Friendly Interface",
//       description: "Easily verify your tweets with a simple and intuitive interface.",
//       icon: "🖥️",
//     },
//     {
//       title: "Secure and Private",
//       description: "Your data is secure and private, ensuring your tweets remain yours.",
//       icon: "🔒",
//     },
//     {
//       title: "Community Driven",
//       description: "Join a community of like-minded individuals who value authenticity.",
//       icon: "🤝",
//     },
//     {
//       title: "Cross-Platform Support",
//       description: "Access your verified tweets from any device, anywhere.",
//       icon: "🌐",
//     },
//   ];

//   return (
//     <div className="flex flex-wrap justify-center items-center gap-4">
//       {features.map((feature, index) => (
//         <div
//           key={index}
//           className="border border-gray-700 bg-gray-900 text-white rounded-xl p-4 shadow-md hover:scale-105 transition-transform"
//         >
//           <div className="text-lg mb-2">{feature.icon}</div>
//           <h3 className="text-md font-semibold">{feature.title}</h3>
//           <p className="text-sm text-gray-400">{feature.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

"use client";

import React from "react";
import { motion } from "framer-motion";

export const Features_card = () => {
  const features = [
    { title: "Blockchain Verification", description: "Ensure the authenticity of your tweets with blockchain verification.", icon: "🔗", direction: "right" },
    { title: "Immutable Records", description: "Once verified, your tweets are immutable and tamper-proof.", icon: "🛡️", direction: "right" },
    { title: "User-Friendly Interface", description: "Easily verify your tweets with a simple and intuitive interface.", icon: "🖥️", direction: "right" },
    { title: "Secure and Private", description: "Your data is secure and private, ensuring your tweets remain yours.", icon: "🔒", direction: "left" },
    { title: "Community Driven", description: "Join a community of like-minded individuals who value authenticity.", icon: "🤝", direction: "left" },
    { title: "Cross-Platform Support", description: "Access your verified tweets from any device, anywhere.", icon: "🌐", direction: "left" },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ x: feature.direction === "right" ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border border-gray-700 bg-gray-900 text-white rounded-xl p-4 shadow-md hover:scale-105 transition-transform"
        >
          <div className="text-lg mb-2">{feature.icon}</div>
          <h3 className="text-md font-semibold">{feature.title}</h3>
          <p className="text-sm text-gray-400">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
