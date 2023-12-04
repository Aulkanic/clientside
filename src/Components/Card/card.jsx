import React from 'react';
import { Card } from '@mui/material';

const CustomCard = ({ data, iconSrc, children }) => (
  <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4 flex flex-col flex-wrap rounded-5 border-8 m-2 h-auto">
    <div className="w-3/4 flex flex-col justify-center items-center mt-4 z-20">
      <h1 className="text-md mb-2 font-black">
        {data}
      </h1>

    </div>
  </Card>
);

export default CustomCard;