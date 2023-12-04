import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const MYDO_Calendar = ({ appointments }) => {
    const localizer = momentLocalizer(moment);
  
    return (
      <div className="p-4">
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    );
  };
  
  export default MYDO_Calendar;