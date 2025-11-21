import React, { useState, useEffect } from 'react';
import './Appoint.css';

const Appoint = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    userlastname: '',
    phone: ''
  });
  const [bookedAppointments, setBookedAppointments] = useState({});
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    const savedAppointments = localStorage.getItem('dentalBookedAppointments');
    if (savedAppointments) {
      try {
        const parsedAppointments = JSON.parse(savedAppointments);
        setBookedAppointments(parsedAppointments);
      } catch {
        setBookedAppointments({});
      }
    } else setBookedAppointments({});
  }, []);

  useEffect(() => {
    if (Object.keys(bookedAppointments).length > 0) {
      try {
        localStorage.setItem('dentalBookedAppointments', JSON.stringify(bookedAppointments));
      } catch {}
    }
  }, [bookedAppointments]);

  const generateTimeSlots = () => {
    const slots = [];
    let t = new Date();
    t.setHours(9, 30, 0, 0);
    const end = new Date();
    end.setHours(15, 30, 0, 0);

    while (t <= end) {
      const h = t.getHours();
      const m = t.getMinutes().toString().padStart(2, '0');

      slots.push({
        time: `${h.toString().padStart(2, '0')}:${m}`,
        display: `${h > 12 ? h - 12 : h}:${m} ${h >= 12 ? "PM" : "AM"}`,
        available: true
      });

      t.setMinutes(t.getMinutes() + 20);
    }

    return slots;
  };

  useEffect(() => {
    if (selectedDate) {
      const dateKey = selectedDate.toDateString();
      const baseSlots = generateTimeSlots();

      const updated = baseSlots.map(slot => {
        const slotKey = `${dateKey}-${slot.time}`;
        return { ...slot, available: !bookedAppointments[slotKey] };
      });

      setAvailableTimeSlots(updated);
    }
  }, [selectedDate, bookedAppointments]);

  const generateCalendarDays = () => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();

    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);

    const days = [];
    const empty = first.getDay();

    for (let i = 0; i < empty; i++) days.push(null);

    for (let d = 1; d <= last.getDate(); d++) {
      const dateObj = new Date(y, m, d);
      const isFriday = dateObj.getDay() === 5;
      const isPast = dateObj < new Date().setHours(0, 0, 0, 0);

      const dateKey = dateObj.toDateString();
      const allBooked = generateTimeSlots().every(slot =>
        bookedAppointments[`${dateKey}-${slot.time}`]
      );

      days.push({
        date: dateObj,
        day: d,
        available: !isFriday && !isPast && !allBooked,
        isFriday,
        fullyBooked: allBooked
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleDateSelect = d => {
    if (d?.available) {
      setSelectedDate(d.date);
      setSelectedTime(null);
      setShowForm(false);
      setShowSuccess(false);
    }
  };

  const handleTimeSelect = t => {
    if (t.available) {
      setSelectedTime(t);
      setShowForm(false);
      setShowSuccess(false);
    }
  };

  const handleFormChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.userlastname || !formData.phone) {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    const phoneValid = /^[0-9+\-\s()]{10,}$/;
    if (!phoneValid.test(formData.phone)) {
      alert("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    const dateKey = selectedDate.toDateString();
    const key = `${dateKey}-${selectedTime.time}`;

    if (bookedAppointments[key]) {
      alert("This time slot has just been booked by another user");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:10000/api/patients"
        // "https://denty-smile.onrender.com/api/patients"
        , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          userlastname: formData.userlastname,
          phone: formData.phone,
          appointmentDate: dateKey,
          appointmentTime: selectedTime.display,
          appointmentTimestamp: selectedTime.time
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const savedPatient = await response.json();

      // Save appointment locally
      const appointmentData = {
        ...formData,
        date: dateKey,
        time: selectedTime.display,
        timestamp: selectedTime.time,
        bookedAt: new Date().toISOString(),
      };

      const updated = { ...bookedAppointments, [key]: appointmentData };
      setBookedAppointments(updated);

      // ✅ CLEAN: No IDs, clean date format
      const cleanDate = selectedDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

      setSuccessData({
        name: `${formData.username} ${formData.userlastname}`,
        phone: formData.phone,
        date: cleanDate,
        time: selectedTime.display,
      });

      setShowSuccess(true);
      setFormData({ username: '', userlastname: '', phone: '' });
      setSelectedDate(null);
      setSelectedTime(null);
      setShowForm(false);

    } catch (err) {
      console.log("Backend error:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAppointment = () => {
    if (selectedDate && selectedTime) setShowForm(true);
  };

  const handleBookAnother = () => {
    setShowSuccess(false);
    setSuccessData(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const navigateMonth = dir => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + dir);
    setCurrentMonth(newMonth);
  };

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  // ✅ CLEAN: Simple date formatting
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="appointment-container">
      <div className="appointment-header">
        <h1>Book Your Appointment</h1>
        <p>Select a date and time for your dental consultation</p>
      </div>

      {/* SUCCESS MESSAGE - CLEANED */}
      {showSuccess && successData && (
        <div className="success-section">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Appointment Booked Successfully!</h2>
            <p>Your appointment has been confirmed.</p>

            <div className="appointment-details success-details">
              <h4>Appointment Details</h4>
              <p><strong>Name:</strong> {successData.name}</p>
              <p><strong>Phone:</strong> {successData.phone}</p>
              <p><strong>Date:</strong> {successData.date}</p>
              <p><strong>Time:</strong> {successData.time}</p>
            </div>

            <div className="success-buttons">
              <button onClick={handleBookAnother} className="book-another-button">
                Book Another Appointment
              </button>
              <button onClick={() => setShowSuccess(false)} className="close-button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN UI */}
      {!showSuccess && (
        <div className="appointment-content">

          {/* CALENDAR */}
          <div className="calendar-section">
            <div className="calendar-header">
              <button className="nav-button" onClick={() => navigateMonth(-1)}>‹</button>
              <h2>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
              <button className="nav-button" onClick={() => navigateMonth(1)}>›</button>
            </div>

            <div className="calendar-grid">
              {dayNames.map(d => <div key={d} className="day-header">{d}</div>)}

              {calendarDays.map((day, i) => (
                <button
                  key={i}
                  disabled={!day || !day.available}
                  className={`calendar-day ${!day ? "empty" : ""} 
                              ${day && !day.available ? "unavailable" : ""}
                              ${day && selectedDate && day.date.toDateString() === selectedDate?.toDateString() ? "selected" : ""}
                              ${day && day.isFriday ? "friday" : ""}
                              ${day && day.fullyBooked ? "fully-booked" : ""}`}
                  onClick={() => handleDateSelect(day)}
                >
                  {day ? day.day : ""}
                  {day && day.isFriday && <span className="friday-label">Closed</span>}
                  {day && day.fullyBooked && <span className="booked-label">Full</span>}
                </button>
              ))}
            </div>
          </div>

          {/* TIME SLOTS */}
          <div className="time-section">
            {selectedDate ? (
              <>
                <h3>Available Times for {formatDate(selectedDate)}</h3>
                <div className="time-slots">
                  {availableTimeSlots.map((slot, i) => (
                    <button
                      key={i}
                      disabled={!slot.available}
                      className={`time-slot ${slot.available ? "available" : "unavailable"}
                                  ${selectedTime?.time === slot.time ? "selected" : ""}`}
                      onClick={() => handleTimeSelect(slot)}
                    >
                      {slot.display}
                      {!slot.available && <span className="booked-badge">Booked</span>}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="time-placeholder">
                <div className="placeholder-icon">📅</div>
                <h3>Select a Date</h3>
                <p>Choose a date from the calendar to see available time slots</p>
              </div>
            )}
          </div>

          {/* SUMMARY */}
          {selectedDate && selectedTime && !showForm && (
            <div className="confirmation-section">
              <div className="appointment-summary">
                <h3>Appointment Summary</h3>
                <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
                <p><strong>Time:</strong> {selectedTime.display}</p>
                <button className="confirm-button" onClick={handleConfirmAppointment}>
                  Confirm Appointment
                </button>
              </div>
            </div>
          )}

          {/* FORM */}
          {showForm && (
            <div className="form-section">
              <div className="appointment-form">
                <h3>Complete Your Appointment</h3>
                
                <div className="appointment-details">
                  <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
                  <p><strong>Time:</strong> {selectedTime.display}</p>
                </div>

                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">First Name *</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your first name"
                      value={formData.username}
                      onChange={handleFormChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="userlastname">Last Name *</label>
                    <input
                      type="text"
                      id="userlastname"
                      name="userlastname"
                      placeholder="Enter your last name"
                      value={formData.userlastname}
                      onChange={handleFormChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-buttons">
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={() => setShowForm(false)}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="submit-button"
                      disabled={loading}
                    >
                      {loading ? 'Booking...' : 'Book Appointment'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default Appoint;