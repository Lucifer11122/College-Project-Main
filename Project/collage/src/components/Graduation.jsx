import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  
} from "@material-tailwind/react";

import cimage1 from "../assets/cimage1.jpeg"
import cimage2 from "../assets/cimage2.jpeg"
import cimage3 from "../assets/cimage3.jpeg"


const Graduation = () => {
  return (
    <div className="container mx-auto p-4 bg-grey-100">
      
      <Typography variant="h3" color="blue-gray" className="text-center mb-8 font-semibold">
        Graduation Courses
      </Typography>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <Card className="w-full">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src={cimage1}
              alt="card-image"
              className="object-cover w-full h-full"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Masters In Sciences(Msc)
            </Typography>
            <Typography>
            Master of Science which is a postgraduate degree program in the field of Science. The MSc course duration is 2 years
            through which students get an in-depth knowledge of a specific field of study in the Science and Technology domains
            MSc degrees are available in more than 300 specializations and are classified into 3 types, i.e., MSc course, MSc Tech. c
            ourse, and Integrated MSc course. 
            Some of the most popular MSc courses include MSc Biotechnology, MSc IT, MSc Mathematics, MSc AI, MSc Computer Science, and MSc Nursing.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
          </CardFooter>
        </Card>

        {/* Card 2 */}
        <Card className="w-full">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src={cimage2}
              alt="card-image"
              className="object-cover w-full h-full"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Masters In Arts(Ma)
            </Typography>
            <Typography>
            Master of Arts, a postgraduate degree course pursued after graduation. The usual MA courses duration is two years. 
            The MA degree is offered in various specializations in different colleges and universities in India and abroad, wherein the most popular specializations include MA in English, MA in Political Science, MA in Economics, MA in Psychology, etc. 
            Master of Arts courses can be opted for as integrated programs in social sciences and the humanities. 
            Aspirants can pursue MA degree as a full-time, part-time, correspondence, or distance course.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            
          </CardFooter>
        </Card>

        {/* Card 3 */}
        <Card className="w-full">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src={cimage3}
              alt="card-image"
              className="object-cover w-full h-full"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Masters In Commerces(M.com)
            </Typography>
            <Typography>
            The MCom course is a PG degree that provides advanced knowledge in Commerce, Accounting, Finance, Economics, and Business Management. 
            The MCom course duration is 2 years and is designed for students who wish to deepen their expertise in financial and business subjects. 
            The MCom course also equips students with analytical and management skills to, further, pursue professional courses like CA, CS, and CMA.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Graduation;
  

  