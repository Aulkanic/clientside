import React from 'react'
import LHeader from '../components/header'
import LNav from '../components/navbar'
import '../css/scholarship.css'
import {Link} from 'react-router-dom'
import { motion } from "framer-motion";
function scholarship() {
  const textVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0 }
  };
  return (
    <>
    <LHeader/>
    <LNav/>
    <motion.div className='ascholarship'
               initial="hidden"
               animate="visible"
               variants={textVariants}
               transition={{ duration: 1 }}>
        <div className="aschohead">
          <h1>REQUIREMENTS</h1>
          <h2>The following are the Eligibility and Documentary Requirements<br/>
              For Applying this Scholarship Program</h2>
        </div>
        <div className="requireascho">
          <div className="ascho-card">
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
          </div>
          <div className="ascho-card">
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
          </div>
        </div>
        <div className="aruqua">
          <h1>Are you Qualified to be a Scholar of Marilao?</h1>
          <Link to='/ScholarshipProgram' className='alinkapp'>Click APPLY NOW</Link>
      </div>
    </motion.div>

    </>
  )
}

export default scholarship