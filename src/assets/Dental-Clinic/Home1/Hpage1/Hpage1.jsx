// // import React from "react";
// // import "./Hpage1.css";
// // import himage1 from "../../../images/himage1.jpg";
// // import himage2 from "../../../images/himage2.jpg";

// // const ContactInfo = ({ iconSrc, title, value }) => (
// //   <div className="contact-info">
// //     {iconSrc && <img src={iconSrc} alt={title} />}
// //     <p className="contact-title">{title}</p>
// //     <p className="contact-value">{value}</p>
// //   </div>
// // );

// // const Hpage1 = () => {
// //   return (
// //     <div className="hero-section">
      
// //       {/* 1. Logo/Branding */}
// //       <div className="branding">
// //         <h3 className="logo">Denty</h3>
// //       </div>

// //       {/* 2. Main Hero Content & Image Container */}
// //       <div className="hero-content-wrapper">

// //         {/* 2a. Text Content Block */}
// //         <div className="text-content">
// //           <h1 className="main-title">
// //             Exceptional Dental Care,
// //             <br />
// //             Every Step Of The Way
// //           </h1>

// //           <p className="description">
// //             We provide a wide range of dental services to meet all your oral
// //             health needs. Our experienced team is dedicated to ensuring you receive
// //             the best care possible in a comfortable and welcoming environment.
// //           </p>

// //           <button className="cta-button">Make An Appointment</button>

// //           {/* Additional Info Block */}
// //           <div className="additional-info-bar">
            
// //             {/* 24/7 Service Card (Replaced with ContactInfo for better pattern) */}
// //             <ContactInfo 
// //               iconSrc={himage2} 
// //               title="24/7 Services" 
// //               value="Available" 
// //             />
            
// //             {/* Contact Phone Number */}
// //             <ContactInfo 
// //               title="Contact us" 
// //               value="+213 000000000" 
// //             />
// //           </div>
// //         </div>

// //         {/* 2b. Full Hero Image Container */}
// //         <div className="full-hero-image-container">
// //           <img src={himage1} alt="Modern Dental Clinic Interior" />
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Hpage1;

// import React from 'react';
// import './Hpage1.css';
// import himage3 from '../../../images/himage3.jpg';
// import { FaPhoneAlt } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";

// const HeroImage = himage3;

//   const scrollToSection = () => {
//     targetRef.current?.scrollIntoView({ 
//       behavior: 'smooth',
//       block: 'start'
//     });
//   };

// const Hpage1 = () => {
//     return (
//         <section className="hero-section">
//             <div className="branding">
//                 <h1 className="logo">Denty</h1>
//             </div>

//             <div className="hero-content-wrapper">
//                 {/* Text Section */}
//                 <div className="text-content">
//                     <h2 className="main-title">
//                         A Brighter Smile Starts Here. 
//                         Your Family Dentist.
//                     </h2>

//                     <p className="description">
//                         We provide personalized and gentle care, using the latest technology 
//                         to ensure your visit is comfortable, effective, and leaves you with a confident smile.
//                     </p>

//                     <button onClick={scrollToSection} className="cta-button">
//                         Book Appointment Today
//                     </button>

//                     {/* Contact Info */}
//                     <div className="additional-info-bar">
//                         <div className="contact-info">
//                             <div className="contact-info-icon">
//                                 <FaPhoneAlt />
//                             </div>
//                             <div className="contact-details">
//                                 <p className="contact-title">Need Help?</p>
//                                 <p className="contact-value">+213 0000000</p>
//                             </div>
//                         </div>

//                         <div className="contact-info">
//                             <div className="contact-info-icon">
//                                 <MdEmail />
//                             </div>
//                             <div className="contact-details">
//                                 <p className="contact-title">Email Us</p>
//                                 <p className="contact-value">hello@denty.com</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Image */}
//                 <div className="full-hero-image-container">
//                     <img 
//                         src={HeroImage} 
//                         alt="Friendly female dentist smiling in a modern clinic" 
//                     />
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Hpage1;


import React from 'react';
import './Hpage1.css';
import himage3 from '../../../images/himage3.jpg';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const HeroImage = himage3;

const Hpage1 = ({ onBookAppointment }) => {
  return (
    <section className="hero-section">
      <div className="branding">
        <h1 className="logo">Denty</h1>
      </div>

      <div className="hero-content-wrapper">
        {/* Text Section */}
        <div className="text-content">
          <h2 className="main-title">
            A Brighter Smile Starts Here. 
            Your Family Dentist.
          </h2>

          <p className="description">
            We provide personalized and gentle care, using the latest technology 
            to ensure your visit is comfortable, effective, and leaves you with a confident smile.
          </p>

          <button onClick={onBookAppointment} className="cta-button">
            Book Appointment Today
          </button>

          {/* Contact Info */}
          <div className="additional-info-bar">
            <div className="contact-info">
              <div className="contact-info-icon">
                <FaPhoneAlt />
              </div>
              <div className="contact-details">
                <p className="contact-title">Need Help?</p>
                <p className="contact-value">+213 0000000</p>
              </div>
            </div>

            <div className="contact-info">
              <div className="contact-info-icon">
                <MdEmail />
              </div>
              <div className="contact-details">
                <p className="contact-title">Email Us</p>
                <p className="contact-value">hello@denty.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="full-hero-image-container">
          <img 
            src={HeroImage} 
            alt="Friendly female dentist smiling in a modern clinic" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hpage1;