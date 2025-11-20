// import "./Hpage2.css";
// import { FaHandsHelping, FaUserMd, FaTooth, FaCogs } from "react-icons/fa";


// const Hpage2 = () => {
//   return (
//     <section className="features-section">
//       <div className="features-container">

//         <div className="feature-card" tabIndex={0} aria-label="Free Consultation">
//           <div className="feature-icon">
//             <FaHandsHelping />
//           </div>
//           <h3>Free Consultation</h3>
//           <p>We provide free consultations to all patients disabilities.</p>
//         </div>

//         <div className="feature-card" tabIndex={0} aria-label="Expert Dentists">
//           <div className="feature-icon">
//             <FaUserMd />
//           </div>
//           <h3>Expert Dentists</h3>
//           <p>Our experienced dental team ensures professional and high-quality care.</p>
//         </div>

//         <div className="feature-card" tabIndex={0} aria-label="Clean Equipment">
//           <div className="feature-icon">
//             <FaTooth />
//           </div>
//           <h3>Clean Equipment</h3>
//           <p>We maintain sterilized, hygienic equipment for the safety of our patients.</p>
//         </div>

//         <div className="feature-card" tabIndex={0} aria-label="Advanced Technology">
//           <div className="feature-icon">
//             <FaCogs />
//           </div>
//           <h3>Advanced Technology</h3>
//           <p>We use modern dental technology for accurate and efficient treatments.</p>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Hpage2;


import "./Hpage2.css";
import { FaHandsHelping, FaUserMd, FaTooth, FaCogs } from "react-icons/fa";

const Hpage2 = () => {
  return (
    <section className="services-section">
      <div className="services-grid">
        
        {/* Left Side - Two Cards Stacked */}
        <div className="left-column">
          <div className="service-card large-card">
            <div className="card-header">
              <div className="card-icon">
                <FaHandsHelping />
              </div>
              <h2>Free Consultation</h2>
            </div>
            <p>We provide free consultations to all patients, including those with disabilities.</p>
          </div>

          <div className="service-card large-card">
            <div className="card-header">
              <div className="card-icon">
                <FaCogs />
              </div>
              <h2>Advanced Technology</h2>
            </div>
            <p>We use modern dental technology for accurate and efficient treatments.</p>
          </div>
        </div>

        {/* Right Side - Two Cards Stacked */}
        <div className="right-column">
          <div className="service-card">
            <div className="card-header">
              <div className="card-icon">
                <FaUserMd />
              </div>
              <h2>Expert Dentists</h2>
            </div>
            <p>Our experienced dental team ensures professional and high-quality care.</p>
          </div>

          <div className="service-card">
            <div className="card-header">
              <div className="card-icon">
                <FaTooth />
              </div>
              <h2>Clean Equipment</h2>
            </div>
            <p>We maintain sterilized, hygienic equipment for the safety of our patients.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hpage2;

