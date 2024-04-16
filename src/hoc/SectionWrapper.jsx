import { motion } from 'framer-motion';

import { styles } from '../styles';
import { staggerContainer } from '../utils/motion';
import { Component } from 'react';

// this is a Higher Order Component
// this is a function returning a function
// the function returned is a component
const SectionWrapper = (component, idName) =>
  function HOC() {
    return (
      <motion.section>
        <Component />
      </motion.section>
    )
  }

export default SectionWrapper