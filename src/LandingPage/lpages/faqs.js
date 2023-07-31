import React, { useEffect, useState } from 'react'
import LNav from '../components/navbar'
import '../css/faqs.css'
import FAQSImg from '../../userhome/assets/faqs.png'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from "framer-motion";
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading'
import { FetchFaqs } from '../../Api/request'
import Typography from '@mui/material/Typography';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .5)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(-90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


const Faqs = () => {
  const [faqs,setFaqs] = useState([]);

  useEffect(() =>{
      async function Fetch(){
        const res = await FetchFaqs.FETCH_FAQS()
        setFaqs(res.data.result)
      }
      Fetch()
  },[faqs])
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
    <motion.div className="faqs-container"
           initial="hidden"
           animate="visible"
           variants={textVariants}
           transition={{ duration: 1 }}>
      <div className="faqs-card">
      <div className="faqs-header">
       <img style={{width:'100%'}} src={FAQSImg} alt="" />
      </div>
      <div className="faqs-accordion">
        <div>
          {faqs?.map((data,index) =>{
            return(
              <>
              <div style={{margin:'5px'}} key={index}>
              <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                
              >
                <Typography sx={{ width: '33%', flexShrink: 0, color:'black' }}>
                {data.faqsQuestions}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                {data.faqsAnswers}
                </Typography>
              </AccordionDetails>
              </Accordion>
              </div>
              </>
            )
          })}

      </div>
      
      </div>
      </div>
    </motion.div>
    </>
  )
}

export default Faqs