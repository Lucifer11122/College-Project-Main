import React from 'react';
// import arsh from "../assets/arsh.jpg"
// import qasim from "../assets/qasim.jpg"


const Alumni = () => {
  const alumniMembers = [
    {
      name: 'Arsh Ali Khan',
      role: 'Software/CyberSecurity Engineear',
      // imgSrc: arsh,
      batch: 'Batch: 2022'
    },
    {
      name: 'Qasim Sayed',
      role: 'C++ Developer',
      // imgSrc: qasim,
      batch: 'Batch: 2022'
    },
    {
      name: 'Anuj Mukherjee',
      role: 'AI Developer',
      imgSrc: 'https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar5.jpg',
      batch: 'Batch: 2022'
    },
    {
      name: 'zaid ',
      role: 'Development Engineer',
      imgSrc: 'https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar24.jpg',
      batch: 'Batch: 2021'
    },
    {
      name: 'Ankon',
      role: 'Creative Director',
      imgSrc: 'https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar23.jpg',
      batch: 'Batch: 2022'
    },
  ];

  return (
    <div className="flex flex-wrap justify-center mb-5">
      <div className="w-full max-w-5xl px-3 mb-6 mx-auto">
        <div className="relative flex flex-col break-words min-w-0 bg-clip-border rounded-xl border border-dashed border-stone-200 bg-white p-6">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-dark mb-4 animate_animated animatefadeIn animate_delay-1s">
              Our Alumni Team
            </h1>
            <span className="text-lg font-medium text-muted animate_animated animatefadeIn animate_delay-2s">
              Meet our alumni, a group of remarkable individuals whose contributions continue to inspire us.
            </span>
          </div>

          {/* Alumni List */}
          <div className="flex flex-wrap justify-center">
            {alumniMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center mx-4 mb-8 animate_animated animatefadeInUp animate_delay-1s group"
              >
                {/* Profile Image */}
                <div className="inline-block mb-4 relative shrink-0 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out">
                  <img
                    className="inline-block shrink-0 rounded-xl w-[150px] h-[150px]"
                    src={member.imgSrc}
                    alt="Alumni Avatar"
                  />
                </div>
                {/* Name and Role */}
                <div className="text-center">
                  <a
                    href="javascript:void(0)"
                    className="text-dark font-semibold hover:text-primary text-xl transition-colors duration-200 ease-in-out"
                  >
                    {member.name}
                  </a>
                  <span className="block font-medium text-muted">{member.role}</span>
                </div>
                {/* Batch Information */}
                <p className="text-sm text-gray-500 mt-2 group-hover:text-primary transition-colors duration-200">
                  {member.batch}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alumni;