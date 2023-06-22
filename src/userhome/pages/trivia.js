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
  const Trivia = post?.map((triv) => {

    return (
      <>
      <Box>
    <Card>
    <div className='trivcard' key={triv.id}>
        <div className="triv">
          <div className="tri-img">
              <img src={triv.picture} alt="" />
          </div>
          <div className="destriv">
              <div className="tri-title"><h1>{triv.title}</h1></div>
              <div className="tri-content">{triv.content}</div>
          </div>
        </div>
    </div>
    </Card>
    </Box>
    </>
    );
  });

  if (!post) return null;


  return (
    <>
      <Homepage/>
      <div className="trvdaycon">
      <h1 className="trivhead">Trivia of the Day</h1>
    <div className="tcard">
          {Trivia}
      </div>
  </div>
  </>
  );
}