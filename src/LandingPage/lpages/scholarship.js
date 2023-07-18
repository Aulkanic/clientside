import React from 'react'
import LHeader from '../components/header'
import LNav from '../components/navbar'
import '../css/scholarship.css'
import {Link} from 'react-router-dom'
import { motion } from "framer-motion";
import { Card, Typography } from '@mui/material'
import { useContext } from "react";
import { color } from "../../App";
import { useState } from 'react'
import { useEffect } from 'react'
import { Rulelist } from '../../Api/request'

function Scholarship() {
  const [rule,setRule] = useState([])
  const { colorlist,imgList } = useContext(color);
  const textVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0 }
  };
  useEffect(() =>{
    async function Fetch(){
      const res = await Rulelist.FETCH_RULE()
      setRule(res.data.result[0])
    }
    Fetch()
  },[])
  console.log(rule)
  return (
    <>
    <LHeader/>
    <LNav/>
    <motion.div className='ascholarship'
               initial="hidden"
               animate="visible"
               variants={textVariants}
               transition={{ duration: 1 }}>
        <Card 
        elevation={0}
        sx={{padding:'10px',width:'90%',height:'150px',margin:'15px',overflow:'visible',backgroundColor:'transparent'}}>
          <Typography sx={{fontSize:'20px',fontWeight:'700'}}>SCHOLARSHIP COVERAGE</Typography>
          <Typography>This grant will only be available to poor but deserving Elementary, Highschool and College Students residing permanently
            in the Municipality of Marilao,whose application and subsequent grant shall be governed by policies and guidelines to be set by the Scholarship Board.
          </Typography>
        </Card>
        <Card 
        elevation={0}
        sx={{padding:'10px',width:'90%',height:'100px',margin:'15px',overflow:'visible',backgroundColor:'transparent'}}>
          <Typography sx={{fontSize:'20px',fontWeight:'700'}}>SCHOLARSHIP PRIVILEGE</Typography>
          <Typography>
            <ul>
              <li><Typography>Elementary - {rule.priv1}</Typography></li>
              <li><Typography>Highschool - {rule.priv2}</Typography></li>
              <li><Typography>College - {rule.priv3}</Typography></li>
            </ul>
          </Typography>
        </Card>
        <Card 
        elevation={0}
        sx={{padding:'10px',width:'90%',height:'100%',margin:'15px',overflow:'visible',backgroundColor:'transparent'}}>
          <Typography sx={{fontSize:'20px',fontWeight:'700'}}>SCHOLARSHIP CATEGORY</Typography>
          <Typography>I. ACADEMIC SCHOLARSHIP
            <ul>
              <li>Must be a completer with an academic honor, overall Rank 1 to 10</li>
              <li>Must maintain a General Weighted Average of atleast 1.5 or equivalent for Academic Overall Rank 1 & 2
                and atleast 1.75 or its equivalent for Academic Overall Rank 3 to 10
              </li>
            </ul>
          </Typography>
          <Typography>II. ECONOMIC SCHOLARSHIP
            <ul>
              <li>No Failing or Delinquent Grades</li>
              <li>Must Apply with/maintain a General Weighted Average of atleast 2.5 or its equivalent
              </li>
              <li>Must belong to any of the Following groups: indigent families,displaced/relocated families and vulnerable and marginalized sectors (PWD's Kasambahay
                , ALS graduates, solo parents, children in conflict with law, families of tricycle drivers and operators)
              </li>
            </ul>
          </Typography>
          <Typography>III. ATHLETIC AND ARTS SCHOLARSHIP
            <ul>
              <li>Must be a recipient of a top individual award/recognition for sports and cultural arts in the most recent
                school year / school term / playing season given by recognized institutions.
              </li>
              <li>Must maintain a General Weighted Average of atleast 2.5 or equivalent
              </li>
            </ul>
          </Typography>
          <Typography>IV. YOUTH LEADERS SCHOLARSHIP
            <ul>
              <li>Must be a recipient of leadership award given by the city or serve as Sangguniang Kabataam/Supreme Student Council
                member or a president/vice president of (or equivalent) of Marilao registered youth organizations
              </li>
              <li>Must maintain a General Weighted Average of atleast 2.5 or equivalent 
              </li>
            </ul>
          </Typography>
        </Card>
        <div className="aschohead">
          <h1>REQUIREMENTS</h1>
          <h2>The following are the Eligibility and Documentary Requirements<br/>
              For Applying this Scholarship Program</h2>
        </div>
        <div className="requireascho">
          <motion.Card
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01]
                          }}
          className="ascho-card">
            <div className="hascho">
                <h1>Eligibility Requirements</h1>
            </div>
            <div className="ascholi">
                <p>
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
                </p>
            </div>
          </motion.Card>
          <motion.Card
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
          className="ascho-card">
            <div className="hascho">
                <h1>Documentary Requirements</h1>
            </div>
            <div className="ascholi">
                <p>
                  1. Letter of request for scholarship grant addressed to the Chairman of Scholarship Fund Board<br/>
                  2. Proof of Enrollment or School Registration/Acceptance for the current school year or semester<br/>
                  3. Filled up Application Form<br/>
                  4. Proof of residence as certified by the Punong Barangay;<br/>
                  5. Certified true copy of Report Card or Transcript of Record/Diploma;<br/>
                  6. Certificate of Good Moral Character from school where applicant is currently enrolled<br/>
                  7. Copy of latest Income Tax Returns of all working immediate family members:any documents to prove Income
                  or Affidavit of Non-Filling of Income Tax return<br/>
                  8. Recommendation letter from respective Punong Barangay;
                  9. Recommendation Letter from an authorized school offical where the applicant is curently enrolled<br/>
                  10. Latest 2x2 Picture<br/>
                  11. Parents' consent form for applicants below 18 year' old
                </p>
            </div>
          </motion.Card>
        </div>
        <div className="aruqua">
          <h1>Are you Qualified to be a Scholar of Marilao?</h1>
          <Link to='/ScholarshipProgram' className='alinkapp'>Click APPLY NOW</Link>
        </div>
    </motion.div>

    </>
  )
}

export default Scholarship