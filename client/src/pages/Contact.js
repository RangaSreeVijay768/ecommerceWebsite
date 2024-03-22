import React from "react";
import Layout from "./../components/Layout/Layout";
import {BiMailSend, BiMessage, BiPhoneCall, BiSupport} from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us - Ecommerce app"}>
      <div className="row mt-100px contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about product feel free to call anytime we 24X7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> : ranga.sreevijay768@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 9908351768
          </p>
          <p className="mt-3">
            <BiMessage /> : 9908351768 (whatsapp)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
