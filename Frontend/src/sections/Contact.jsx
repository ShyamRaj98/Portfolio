import { useState } from "react";
import { motion } from "framer-motion";
import ScrollRevealText from "../components/ScrollRevealText";
import MaskedScrollText from "../components/MaskedScrollText";
import axios from "axios";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!Object.values(form).every(Boolean)) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/contact", form);

      toast.success(res.data.message);

      // clear form
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="py-16 px-6 bg-gray-50">
      {/* Heading */}
      <ScrollRevealText className={"w-full"}>
        <h3 className="font-display font-bold text-center text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.01em] mb-2 ">
          Let’s start the conversation
        </h3>
      </ScrollRevealText>
      <MaskedScrollText direction="up" start="150%" duration={0.2}>
        <h1 className="w-full font-display text-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-9xl text-nowrap font-bold mb-4 uppercase">
          Great Design
        </h1>
      </MaskedScrollText>
      <ScrollRevealText className={"w-full"}>
        <p className="font-display text-center text-lg md:text-2xl font-semibold tracking-[1em] mb-4 md:mb-8 uppercase ">
          Starts with
        </p>
      </ScrollRevealText>
      <MaskedScrollText direction="up" start="160%" duration={0.2}>
        <h1 className="w-full font-display text-center text-3xl sm:text-2xl md:text-5xl lg:text-8xl xl:text-9xl text-nowrap font-bold mb-12 uppercase">
          Great Collaboration
        </h1>
      </MaskedScrollText>
      <div className="max-w-3xl mx-auto">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <input
            className="font-body text-lg font-light w-full border-b border-gray-900 text-gray-900 placeholder-black 
                       bg-transparent py-2 focus:outline-none focus:border-pink-500 uppercase mb-14"
            placeholder="Your Name*"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            className="font-body text-lg font-light w-full border-b border-gray-900 text-gray-900 placeholder-black 
                       bg-transparent py-2 focus:outline-none focus:border-pink-500 uppercase mb-14"
            placeholder="Phone*"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            className="font-body text-lg font-light w-full border-b border-gray-900 text-gray-900 placeholder-black 
                       bg-transparent py-2 focus:outline-none focus:border-pink-500 uppercase mb-14"
            placeholder="Your Email*"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            className="font-body text-lg font-light w-full border-b border-gray-900 text-gray-900 placeholder-[#101010] 
                       bg-transparent py-2 focus:outline-none focus:border-pink-500 h-28 resize-none uppercase mb-14"
            placeholder="How can I help you"
            name="message"
            value={form.message}
            onChange={handleChange}
          />

          {/* Submit Button as Link */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="text-gray-900 underline underline-offset-8 font-body text-3xl uppercase tracking-tighter"
            >
              {loading ? "Sending..." : "Discuss the Project "}&rarr;
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
