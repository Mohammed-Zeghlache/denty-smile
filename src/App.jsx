// import React from "react";
// import Hpage1 from "./assets/Dental-Clinic/Home1/Hpage1/Hpage1";
// import Hpage2 from "./assets/Dental-Clinic/Home1/Hpage2/Hpage2";
// import Hpage3 from "./assets/Dental-Clinic/Home1/Hpage3/Hpage3";
// import Appoint from "./assets/Dental-Clinic/Home1/Appoint/Appoint";

// const App = () => {
//   return (
//     <div>
//       <Hpage1 />
//       <Hpage2/>
//       <Hpage3/>
//       <Appoint/>
//     </div>
//   );
// };

// export default App;


import React, { useRef } from "react";
import Hpage1 from "./assets/Dental-Clinic/Home1/Hpage1/Hpage1";
import Hpage2 from "./assets/Dental-Clinic/Home1/Hpage2/Hpage2";
import Hpage3 from "./assets/Dental-Clinic/Home1/Hpage3/Hpage3";
import Appoint from "./assets/Dental-Clinic/Home1/Appoint/Appoint";

const App = () => {
  const appointmentRef = useRef(null);

  const scrollToAppointment = () => {
    appointmentRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div>
      <Hpage1 onBookAppointment={scrollToAppointment} />
      <Hpage2/>
      <Hpage3/>
      <div ref={appointmentRef}>
        <Appoint/>
      </div>
    </div>
  );
};

export default App;