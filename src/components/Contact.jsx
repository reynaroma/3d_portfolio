import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser"; // so people can send me emails

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  // form ref
  const formRef = useRef();
  // form state
  const [form, setform] = useState({
    name: "",
    email: "",
    message: "",
  });
  // loading when sending email
  const [loading, setloading] = useState(false);

  // handle form input change
  const handleChange = (e) => {

  }
  // handle form submission 
  const handleSubmit = (e) => {

  }

  return (
    <div className="xl:mt-12 xl:flex-row
    flex-col-reverse flex gap-10 overflow-hidden ">
      Contact
    </div>
  )
}

export default SectionWrapper(Contact, 'contact');