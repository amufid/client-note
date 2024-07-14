import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types'

export default function Animated({ children, from }) {
   const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1
   })

   const variants = {
      hidden: { opacity: 0, x: from === 'left' ? -200 : 200 },
      visible: { opacity: 1, x: 0 }
   }
   return (
      <div className="overflow-hidden relative">
         <motion.div
            ref={ref}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ duration: 1.5 }}
         >
            {children}
         </motion.div>
      </div>
   )
}

Animated.propTypes = {
   children: PropTypes.node,
   from: PropTypes.string
}
