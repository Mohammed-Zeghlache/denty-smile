import React from "react";
import "./Hpage3.css";
import { FaSmile, FaTooth, FaTools, FaCogs, FaStethoscope, FaHandSparkles } from "react-icons/fa";

const Hpage3 = () => {
  const services = [
    { title: "Teeth Whitening", description: "Brighten your smile safely and effectively.", icon: <FaSmile /> },
    { title: "Implant", description: "Durable implants to replace missing teeth.", icon: <FaTooth /> },
    { title: "Fillings", description: "Restore cavities comfortably and long-lasting.", icon: <FaTools /> },
    { title: "Oral Surgery", description: "Professional oral surgery treatments.", icon: <FaStethoscope /> },
    { title: "Crown & Bridges", description: "Protect and restore teeth with crowns & bridges.", icon: <FaCogs /> },
    { title: "Periodontal Care", description: "Maintain healthy gums with expert care.", icon: <FaHandSparkles /> },
  ];

  return (
    <section className="features-section">
      <h2 className="section-title">Our Services</h2>
      <div className="features-container">
        {services.map((service, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hpage3;
