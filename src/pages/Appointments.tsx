import { useState, FormEvent } from "react";
import PageTitle from "../components/PageTitle";
import { supabase } from "@/integrations/supabase/client";

export default function Appointments() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
    preferred_date: "",
    preferred_time: "",
    honeypot: "", // Anti-spam honeypot field
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      console.log("Bot detected");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const { error } = await supabase.from("appointments").insert({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone || null,
        organization: formData.organization || null,
        subject: formData.subject,
        message: formData.message,
        preferred_date: formData.preferred_date || null,
        preferred_time: formData.preferred_time || null,
        status: "pending",
      });

      if (error) throw error;

      setStatus("success");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        organization: "",
        subject: "",
        message: "",
        preferred_date: "",
        preferred_time: "",
        honeypot: "",
      });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error("Error submitting appointment:", error);
      setStatus("error");
      setErrorMessage(error.message || "Failed to submit appointment request");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <>
      <PageTitle
        title="Book an Appointment"
        breadcrumbs={[{ label: "Appointments" }]}
        metaTitle="Book an Appointment | VP Office"
        metaDescription="Schedule a consultation with the Vice President's office"
      />

      <section className="contact-page-section">
        <div className="container">
          <div className="inner-container">
            <h2>
              Request an appointment with <br /> <span>the Vice President</span>
            </h2>
            <div className="row clearfix">
              {/* Info Column */}
              <div className="info-column col-lg-7 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="text">
                    <p>
                      The Office of the Vice President welcomes requests for meetings and consultations. Please
                      complete the form with your details and the purpose of your visit.
                    </p>
                    <p>
                      Our team will review your request and contact you within 2-3 business days to confirm
                      availability and finalize the appointment details.
                    </p>
                  </div>
                  <ul className="list-style-six">
                    <li>
                      <span className="icon fa fa-building"></span> Presidential Palace,
                      <br />
                      Onafhankelijkheidsplein Paramaribo, <br /> Suriname
                    </li>
                    <li>
                      <span className="icon fa fa-phone"></span> +597 472-000
                    </li>
                    <li>
                      <span className="icon fa fa-envelope-o"></span> office@president.gov.sr
                    </li>
                    <li>
                      <span className="icon fa fa-clock-o"></span> Monday - Friday: 8:00 AM - 4:00 PM
                    </li>
                  </ul>
                </div>
              </div>

              {/* Form Column */}
              <div className="form-column col-lg-5 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          name="full_name"
                          placeholder="Full Name *"
                          value={formData.full_name}
                          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                          required
                          maxLength={100}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          maxLength={255}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          maxLength={20}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="organization"
                          placeholder="Organization (Optional)"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          maxLength={100}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject of Meeting *"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          maxLength={200}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="date"
                          name="preferred_date"
                          placeholder="Preferred Date"
                          value={formData.preferred_date}
                          onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="time"
                          name="preferred_time"
                          placeholder="Preferred Time"
                          value={formData.preferred_time}
                          onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <textarea
                          name="message"
                          placeholder="Message / Purpose of Visit *"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          maxLength={1000}
                          rows={4}
                        ></textarea>
                      </div>

                      {/* Honeypot field - hidden from real users */}
                      <div style={{ position: "absolute", left: "-9999px" }}>
                        <input
                          type="text"
                          name="honeypot"
                          value={formData.honeypot}
                          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <div className="form-group">
                        <button
                          type="submit"
                          className="theme-btn btn-style-one"
                          disabled={status === "sending"}
                        >
                          {status === "sending" ? "Submitting..." : "Submit Request"}
                        </button>
                      </div>

                      {status === "success" && (
                        <div className="alert alert-success mt-3">
                          Appointment request submitted successfully! We'll contact you soon.
                        </div>
                      )}
                      {status === "error" && (
                        <div className="alert alert-danger mt-3">
                          {errorMessage || "Failed to submit request. Please try again."}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
