/* eslint-disable react-refresh/only-export-components */
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser"; // so people can send me emails

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const serviceId = import.meta.env.VITE_APP_EMAIL_JS_SERVICE_ID;
const templateId = import.meta.env.VITE_APP_EMAIL_JS_TEMPLATE_ID;
const userId = import.meta.env.VITE_APP_EMAIL_JS_USER_ID;


const Contact = () => {
  // form ref
  const formRef = useRef();
  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  // loading when sending email
  const [loading, setLoading] = useState(false);

  // handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }
  // handle form submission 
  const handleSubmit = (e) => {
    // prevent the default form submission otherwise the page will refresh
    e.preventDefault();
    // set loading to true
    setLoading(true);
    // send email
    emailjs.send(
      serviceId,
      templateId,
      {
        from_name: form.name,
        to_name: "Reyna",
        from_email: form.email,
        to_email: "roma.reynamay@gmail.com",
        message: form.message,
      },
      userId)
      .then(() => {
        // clear form
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");

        // reset form
        setForm({
          name: "",
          email: "",
          message: "",
        })
      }, (error) => {
        setLoading(false);
        console.log(error);
        alert("Something went wrong. Please try again.")
      })
  }

  return (
    <div className="xl:mt-12 xl:flex-row
    flex-col-reverse flex gap-10 overflow-hidden ">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8
        rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white 
            font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6
              placeholder:text-secondary text-white
              rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white 
            font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your Email?"
              className="bg-tertiary py-4 px-6
              placeholder:text-secondary text-white
              rounded-lg outline-none border-none font-medium"
            />
          </label>          <label className="flex flex-col">
            <span className="text-white 
            font-medium mb-4">Your Message</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6
              placeholder:text-secondary text-white
              rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit
            text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact');