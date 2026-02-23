import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

export default function Contact() {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6dlipno",
        "template_dj9pa9r",
        formRef.current,
        "GjDtAo_wWF8OT0Du2"
      )
      .then(
        () => {
          alert("✅ Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          alert("❌ Failed to send message");
          console.error(error);
        }
      );
  };

  return (
    <section className="contact-section" id='contact'>
      <motion.div
        className="contact-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* LEFT */}
        <div className="contact-info">
          <h2>Let’s Work Together</h2>
          <p>Tell me about your project and I’ll get back to you.</p>
        </div>

        {/* FORM */}
        <motion.form
          ref={formRef}
          className="contact-form"
          onSubmit={sendEmail}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            placeholder="Tell me about your project"
            rows="4"
            required
          />

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Send Message
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}
