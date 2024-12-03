import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import cimage1 from "../assets/cimage1.jpeg";
import cimage2 from "../assets/cimage2.jpeg";
import cimage3 from "../assets/cimage3.jpeg";

const Undergrade = () => {
  const cards = [
    { id: 1, img: cimage1, title: "B.A. Hons. in Bengali", description: "(3 years)", fees: "₹4050 Total", criteria: "Minimum 50% in 12th with Bengali as a subject" },
    { id: 2, img: cimage2, title: "B.A. Hons. in Sanskrit", description: "(3 years)", fees: "₹4670 Total", criteria: "Minimum 50% in 12th with Sanskrit as a subject" },
    { id: 3, img: cimage3, title: "B.A. Hons. in English", description: "(3 years)", fees: "₹4950 Total", criteria: "Minimum 50% in 12th with English" },
    { id: 4, img: cimage1, title: "B.A. Hons. in Hindi", description: "(3 years)", fees: "₹4670 Total", criteria: "Minimum 50% in 12th with Hindi as a subject" },
    { id: 5, img: cimage2, title: "B.A. Hons. in Urdu", description: "(3 years)", fees: "₹4280 Total", criteria: "Minimum 50% in 12th with Urdu as a subject" },
    { id: 6, img: cimage3, title: "B.A. Hons. in History", description: "(3 years)", fees: "₹4380 Total", criteria: "Minimum 50% in 12th with History" },
    { id: 7, img: cimage1, title: "B.A. Hons. in Philosophy", description: "(3 years)", fees: "₹4380 Total", criteria: "Minimum 50% in 12th with Philosophy" },
    { id: 8, img: cimage2, title: "B.A. Hons. in Political Science", description: "(3 years)", fees: "₹4380 Total", criteria: "Minimum 50% in 12th with Political Science" },
    { id: 9, img: cimage3, title: "B.Sc. Hons. in Geography", description: "(3 years)", fees: "₹4380 Total", criteria: "Minimum 50% in 12th with Science subjects" },
    { id: 10, img: cimage1, title: "B.A. Hons. in Education", description: "(3 years)", fees: "₹4380 Total", criteria: "Minimum 50% in 12th" },
    { id: 11, img: cimage2, title: "B.Sc. Hons. in Physics", description: "(3 years)", fees: "₹ 5330 Total", criteria: "Minimum 50% in 12th with Physics" },
    { id: 12, img: cimage3, title: "B.Sc. Hons. in Chemistry", description: "(3 years)", fees: "₹ 5330 Total", criteria: "Minimum 50% in 12th with Chemistry" },
    { id: 13, img: cimage1, title: "B.Sc. Hons. in Mathematics", description: "(3 years)", fees: "₹5630 Total", criteria: "Minimum 50% in 12th with Mathematics" },
    { id: 14, img: cimage2, title: "B.Sc. Hons. in Zoology", description: "(3 years)", fees: "₹5630 Total", criteria: "Minimum 50% in 12th with Science" },
    { id: 15, img: cimage3, title: "B.Sc. Hons. in Botany", description: "(3 years)", fees: "₹5630 Total", criteria: "Minimum 50% in 12th with Biology" },
    { id: 16, img: cimage1, title: "B.Sc. Hons. in Economics", description: "(3 years)", fees: "₹4830 Total", criteria: "Minimum 50% in 12th with Economics" },
    { id: 17, img: cimage2, title: "B.Sc. Hons. in Microbiology", description: "(3 years)", fees: "₹10630 Total", criteria: "Minimum 50% in 12th with Science" },
    { id: 18, img: cimage3, title: "B.Sc. Hons. in Computer Science", description: "(3 years)", fees: "₹50,000 per year", criteria: "Minimum 50% in 12th with Computer Science" },
    { id: 19, img: cimage1, title: "Bachelor of Business Administration", description: "(3 years)", fees: "₹20,180 per Semester", criteria: "Minimum 50% in 12th with any stream" },
    { id: 21, img: cimage3, title: "Bachelor of Computer Application", description: "(3 years)", fees: "₹22,780 per Semester", criteria: "Minimum 50% in 12th with Computer Science and Maths" },
    { id: 22, img: cimage1, title: "B.A. Program", description: "(3 years)", fees: "₹30,000 per year", criteria: "Minimum 45% in 12th" },
    { id: 23, img: cimage2, title: "B.Sc. Program", description: "(3 years)", fees: "₹40,000 per year", criteria: "Minimum 50% in 12th with Science" },
    { id: 24, img: cimage3, title: "B.Com. Program", description: "(3 years)", fees: "₹35,000 per year", criteria: "Minimum 50% in 12th with Commerce" },
  ];

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <Typography
        variant="h3"
        color="blue-gray"
        className="text-center mb-8 font-semibold"
      >
        Undergraduate Courses
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="w-full">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={card.img}
                alt={`card-image-${card.id}`}
                className="object-cover w-full h-full"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {card.title}
              </Typography>
              <Typography variant="paragraph" color="gray" className="text-sm">
                {card.description}
              </Typography>

              {/* Add Fees and Criteria */}
              <Typography variant="body2" color="blue-gray" className="mt-2 font-semibold">
                Fees:
              </Typography>
              <Typography variant="body2" color="blue-gray" className="mb-2">
                {card.fees}
              </Typography>

              <Typography variant="body2" color="blue-gray" className="mt-2 font-semibold">
                Criteria:
              </Typography>
              <Typography variant="body2" color="blue-gray" className="mb-2">
                {card.criteria}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Undergrade;