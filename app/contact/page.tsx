"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // spinner icon

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) throw new Error("Failed to send email");

      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section
      data-header-theme="light"
      className="bg-gradient-to-r from-[#EFEFEF] via-[#F9F9F9] to-[#E5E5E5] animate-gradient-shimmer py-48 px-4"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl text-yellow-400">
            Contact Us
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Have questions or need assistance? Reach out to us and our team
            will respond as soon as possible.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">support@inovec.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600">+974 1234 5678</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Address</h3>
              <p className="text-gray-600">Doha, Qatar</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-2xl p-8 rounded-2xl shadow-lg flex flex-col space-y-4"
        >
          {sent && (
            <p className="text-green-600 font-semibold">
              Message sent successfully!
            </p>
          )}

          {error && (
            <p className="text-red-600 font-semibold">{error}</p>
          )}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="border border-gray-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="border border-gray-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-6 py-3 font-semibold rounded-lg text-gray-800 border border-gray-700 hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              "Send Message"
            )}
          </button>
        </motion.form>
      </div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-20 w-full h-96 rounded-2xl shadow-lg overflow-hidden"
      >
        <iframe
          title="location"
          className="w-full h-full"
          src="https://maps.google.com/maps?q=Doha,%20Qatar&t=&z=13&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
        ></iframe>
      </motion.div>
    </section>
  );
};

export default ContactUsPage;
