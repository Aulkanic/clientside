import { FetchingTrivia } from "../../Api/request";
import React from "react";
import './trivia.css'
import Homepage from '../components/Homepage'
import { Box, Modal} from "@mui/material";
import Card from '@mui/material/Card';

export default function Trivia() {
  const [post, setPost] = React.useState([]);

  React.useEffect(() => {
    FetchingTrivia.FETCH_TRIVIA().then((response) => {
      const trivia = response.data.Trivias;
      setPost(trivia.reverse());
    });
  }, []);
  const Trivia = post?.map((triv,index) => {

    return (
      <Box key={index}>
    <Card>
    <div className='w-full' key={triv.id}>
        <div className="flex flex-col md:flex-row p-4">
          <div className="w-full md:w-1/2">
              <img src={triv.picture} alt="" />
          </div>
          <div className="w-full md:w-1/2">
              <div className="tri-title"><h1>{triv.title}</h1></div>
              <div className="tri-content">{triv.content}</div>
          </div>
        </div>
    </div>
    </Card>
      </Box>
    );
  });

  if (!post) return null;


  return (
    <>
      <div className="w-full grid place-items-center">
      <h1 className="tracking-wider font-bold text-center text-xl">Trivia of the Day</h1>
    <div className="w-full p-2">
          {Trivia}
      </div>
  </div>
  </>
  );
}