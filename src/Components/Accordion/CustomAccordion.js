import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function CustomAccordion({data,action,content,title}) {

  return (
    <div>
        <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel1-header"
        >
           {title}
        </AccordionSummary>
        <AccordionDetails>
           {content}
        </AccordionDetails>
        {action && <AccordionActions>
            {action}
        </AccordionActions>}
        </Accordion>
    </div>
  );
}
