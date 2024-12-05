"use client";
import React, { useState, useEffect } from "react";
import BASE_URL from "../../utils/constant";
import axios from "axios";

const PrivacyPolicy = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState([]);

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  const getPrivacyPolicy = async () => {
    const response = await axios.get(`${BASE_URL}/api/user-privacy-policy`);
    if (response.data.status_code === 200) {
      setPrivacyPolicy(response.data.data);
    }
  };

  const convertToList = (text) =>
    text.split("\n").reduce(
      (acc, line) => {
        const content = line.trim();
        if (!content) return acc;

        if (content.includes("●"))
          acc.bullet += content
            .split("●")
            .map((item, i) => item.trim() && `<li key=${i}>${item.trim()}</li>`)
            .join("");
        else if (/^\d+\.\s/.test(content))
          acc.numbered += content
            .split(/\d+\.\s+/)
            .map((item, i) => item.trim() && `<li key=${i}>${item.trim()}</li>`)
            .join("");
        else acc.numbered += `<p>${content}</p>`;

        return acc;
      },
      { bullet: "", numbered: "" }
    );

  const descriptionWithList = privacyPolicy?.description
    ? `<ul>${convertToList(privacyPolicy.description).bullet}</ul><ol>${
        convertToList(privacyPolicy.description).numbered
      }</ol>`
    : "";

  return (
    <>
      <div className="terms-privacy-wrap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 dangerouslySetInnerHTML={{ __html: privacyPolicy?.title }} />
            </div>
            <div className="col-lg-12 col-md-6">
              <div className="terms-privacy-in">
                <h2>NextPet</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: descriptionWithList,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
