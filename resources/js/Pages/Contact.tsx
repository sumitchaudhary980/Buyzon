import React from 'react';

import {
  BsFillTelephoneFill,
  BsGlobeAmericas,
} from 'react-icons/bs';
import {
  FaMapSigns,
  FaPaperPlane,
} from 'react-icons/fa';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Contact = () => {
  const formFields = [
    { label: "What is your name?", placeholder: "Enter your name" },
    { label: "Your email address", placeholder: "Enter your email" },
    { label: "Subject", placeholder: "Enter subject" },
    { label: "Your message", placeholder: "Enter your message" },
  ];

  const contactDetails = [
    {
      icon: <FaMapSigns className="text-4xl" />,
      title: "Address",
      description: "198 West 21th Street, Suite 721, New York, NY 10016",
    },
    {
      icon: <BsFillTelephoneFill className="text-4xl" />,
      title: "Contact Number",
      description: "+1 123 456 7890",
    },
    {
      icon: <FaPaperPlane className="text-4xl" />,
      title: "Email Address",
      description: "support@buyzon.com",
    },
    {
      icon: <BsGlobeAmericas className="text-4xl" />,
      title: "Website",
      description: "www.buyzon.com",
    },
  ];

  return (
    <>
      <AuthenticatedLayout>
        <div>
          {/* Header Section */}
          <div className="md:w-96 mx-auto text-center my-24">
            <div className="text-2xl font-bold">Get in Touch</div>
            <div className="text-xl">
              Have any questions or need assistance? We’re here to help! Reach out to us, and we’ll get back to you as soon as possible.
            </div>
          </div>

          {/* Contact Information Cards */}
          <div className="container mx-auto my-12">
            <div className="flex gap-5 justify-center flex-wrap lg:flex-nowrap">
              {contactDetails.map((item, index) => (
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

          {/* Contact Form Section */}
          <div className="container mx-auto flex flex-wrap shadow-2xl my-20 rounded-md p-5">
            <div className="lg:w-1/2 w-full p-4">
              <form className="shadow-md rounded-lg px-2 pt-6 pb-8 mb-4">
                <div className="flex flex-col">
                  {formFields.map((field, index) => (
                    <div key={index} className="mx-auto form-control w-full">
                      <label className="label">
                        <span className="label-text">{field.label}</span>
                      </label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        className="input input-bordered w-full"
                      />
                    </div>
                  ))}
                  <div className="w-full my-4 flex justify-end">
                    <button className="btn rounded-full w-full">Send Message</button>
                  </div>
                </div>
              </form>
            </div>

            {/* Google Map */}
            <div className="lg:w-1/2 w-full p-4">
              <div className="relative aspect-w-16 h-[50vw] lg:h-full aspect-h-9">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(Buyzon)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
};

export default Contact;
