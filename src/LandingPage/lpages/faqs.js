import React from 'react'
import LHeader from '../components/header'
import LNav from '../components/navbar'
import '../css/faqs.css'
import FAQSImg from '../../userhome/assets/faqs.png'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Announceimg from '../../userhome/assets/announce.png'
import { motion } from "framer-motion";
const Faqs = () => {
  const textVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0 }
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
    <LHeader/>
    <LNav/>
    <motion.div className="faqs-container"
           initial="hidden"
           animate="visible"
           variants={textVariants}
           transition={{ duration: 1 }}>
      <div className="faqs-card">
      <div className="faqs-header">
       <img src={FAQSImg} alt="" />
      </div>
      <div className="faqs-accordion">
        <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
         className='FaqsQuestions'
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ background:'darkgreen'}}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, color:'white' }}>
          Who Is Eligible To Apply For A Scholarship?
          </Typography>
        </AccordionSummary>
        
        <AccordionDetails className='FaqsAnswer'>
          <Typography>
          1. Permanent resident of Marilao, Bulacan <br/>
                  2. Not more than 21 year's old at the time of Application<br/>
                  3. Must be enrolled and registered on any public or private schools and accredited instuitions<br/>
                  4. Of good moral character as certified by the School Principal/School Head or Guidance Counselor<br/>
                  5. General Weighted Average
                      <li>Elementary - 90% or more</li>
                      <li>High School - 90% or more</li>
                      <li>College - General Weighted Average (GWA) of at least 85% with no final grade
                        lower than 80% in any subject or graduated valedictorian or salutatorian for incoming
                         freshmen applicants; with GWA of at least 2.5 with no delinquent final grade nor a grade
                         of 3.0 in any subject for applicants from other year levels;
                      </li>
                  6. No derogatory record.<br/>
                  7. Must comply with the documentary requirements and submit them on or before the deadline set by the
                  Scholarship Board thru the implementating office;The Batang Marilenyo Coordinating Center
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
         className='FaqsQuestions'
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ background:'darkgreen'}}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, color:'white' }}>
          Who Is Eligible To Apply For A Scholarship?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='FaqsAnswer'>
          <Typography>
          1. Permanent resident of Marilao, Bulacan <br/>
                  2. Not more than 21 year's old at the time of Application<br/>
                  3. Must be enrolled and registered on any public or private schools and accredited instuitions<br/>
                  4. Of good moral character as certified by the School Principal/School Head or Guidance Counselor<br/>
                  5. General Weighted Average
                      <li>Elementary - 90% or more</li>
                      <li>High School - 90% or more</li>
                      <li>College - General Weighted Average (GWA) of at least 85% with no final grade
                        lower than 80% in any subject or graduated valedictorian or salutatorian for incoming
                         freshmen applicants; with GWA of at least 2.5 with no delinquent final grade nor a grade
                         of 3.0 in any subject for applicants from other year levels;
                      </li>
                  6. No derogatory record.<br/>
                  7. Must comply with the documentary requirements and submit them on or before the deadline set by the
                  Scholarship Board thru the implementating office;The Batang Marilenyo Coordinating Center
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
      
      </div>
      </div>
    </motion.div>
    </>
  )
}

export default Faqs