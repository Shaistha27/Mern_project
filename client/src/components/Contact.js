import React from "react";
import "./Contact.css";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "fd4088a3-9b9a-437d-b906-354c6c9ef816");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div id="contact">
      <h2>Get in touch</h2>
      <div className="contact">
        <div className="contact-col">
          <h3>We're here to help you!</h3>
          <p>
            Our team is dedicated to providing exceptional service and support.
            Whether you have inquiries about our programs, need assistance with
            enrollment, or have any other questions, don't hesitate to reach
            out. We're here to help you every step of the way!
          </p>
          <div className="adminInfo">
            <ul>
              <li>
                <i
                  className="fa-solid fa-envelope fa-lg"
                  style={{ marginRight: "4px" }}
                ></i>
                contact@PMahaboobSana.com
              </li>
              <li>
                <i
                  className="fa-solid fa-phone fa-lg"
                  style={{ marginRight: "4px" }}
                ></i>
                +12345665
              </li>
              <li>
                {" "}
                <i
                  className="fa-solid fa-location-dot fa-lg"
                  style={{ marginRight: "4px" }}
                ></i>
                banjara hills <br /> jublee hills
              </li>
            </ul>
          </div>
        </div>
        <div className="contact-col">
          <form onSubmit={onSubmit}>
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              required
            />
            <label>Phone No.</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter Your mobile no"
              required
            />
            <label>Write your message here</label>
            <textarea
              name="message"
              id=""
              cols="30"
              rows="6"
              placeholder="enter your message"
              required
            ></textarea>

            <button type="submit" className="btn" color="#212EA0">
              Submit now
              {/* <img src={program_1} alt="white_arow" /> */}
            </button>
          </form>
          <span>{result}</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
