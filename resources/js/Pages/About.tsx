import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React from 'react';

import {
  FaBullseye,
  FaHandshake,
  FaLightbulb,
} from 'react-icons/fa';
import {
  Autoplay,
  Navigation,
  Pagination,
} from 'swiper/modules';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Core Values Data
const coreValues = [
  {
    icon: <FaBullseye className="text-4xl" />,
    title: "Our Mission",
    description:
      "To provide the best e-commerce experience with high-quality products and seamless transactions.",
  },
  {
    icon: <FaLightbulb className="text-4xl" />,
    title: "Our Vision",
    description:
      "To become a leading marketplace where buyers and sellers connect effortlessly.",
  },
  {
    icon: <FaHandshake className="text-4xl" />,
    title: "Our Commitment",
    description:
      "Customer satisfaction is our top priority. We strive to provide top-notch services and support.",
  },
];

// Team Members Data (Using Public Folder Images)
const teamMembers = [
  {
    name: "Sumit Chaudhary",
    role: "Founder & CEO",
    image: "/img/founder.jpg", // Using same image for both roles
    description: "Sumit is the visionary behind Buyzon, leading with innovation and passion.",
  },
  {
    name: "Jane Smith",
    role: "Chief Operating Officer",
    image: "/img/chief.jpg",
    description: "Jane ensures smooth operations and customer satisfaction at Buyzon.",
  },
  {
    name: "Michael Brown",
    role: "Marketing Head",
    image: "/img/marketing.jpg",
    description: "Michael drives marketing strategies to connect our products with customers.",
  },
  {
    name: "Aakansha Gupta",
    role: "Lead Developer",
    image: "/img/lead.jpg",
    description: "Aakansha leads our tech team to deliver a seamless user experience.",
  },
];

const About = () => {
  return (
    <AuthenticatedLayout>
      <div>
        {/* About Us Header Section */}
        <div className="md:w-96 mx-auto text-center my-24">
          <div className="text-2xl font-bold">About Us</div>
          <div className="text-xl">
            Welcome to <strong>Buyzon</strong> – Your trusted online marketplace. We are committed to delivering quality products with excellent service.
          </div>
        </div>

        {/* Core Values Section */}
        <div className="container mx-auto my-12">
          <div className="flex gap-5 justify-center flex-wrap lg:flex-nowrap">
            {coreValues.map((item, index) => (
              <div key={index} className="card w-full shadow-xl">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{item.icon}</h2>
                  <p className="text-lg font-bold my-3">{item.title}</p>
                  <p className="text-lg font-semibold">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meet Our Team Section with Carousel */}
        <div className="container mx-auto my-12 text-center">
          <h3 className="text-2xl font-bold mb-5">Meet Our Team</h3>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="w-full lg:w-3/4 mx-auto"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index} className="p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={member.image} // Using public folder image
                    alt={member.name}
                    className="w-48 h-48 rounded-full object-cover shadow-lg"
                  />
                  <h4 className="text-xl font-bold mt-4">{member.name}</h4>
                  <p className="text-lg text-gray-600">{member.role}</p>
                  <p className="mt-2 text-gray-700 text-center w-3/4">{member.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default About;
