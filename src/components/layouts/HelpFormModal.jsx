import React, { useState, useEffect } from "react";
import Modal from "@hoc/Modal";
import { InputText, Textarea } from "@hoc/UI";

const HelpFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    emailConfirmation: "",
    subject: "",
    emailAddress: "",
    description: "",
    companyName: "",
    contactNumber: "",
    attachment: null,
    attachmentName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      attachment: file,
      attachmentName: file ? file.name : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const data = new FormData();
    data.append("email_to", formData.emailConfirmation);
    data.append("subject", formData.subject);
    data.append("email_address", formData.emailAddress);
    data.append("description", formData.description);
    data.append("company_name", formData.companyName);
    data.append("contact_number", formData.contactNumber);
    if (formData.attachment) {
      data.append("attachment", formData.attachment);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/enquiry`, {
        method: "POST",
        body: data,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

     
      setSuccessMessage(result.message || "Enquiry submitted successfully");

     
      setTimeout(() => {
       
      }, 2000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="bg-indigo-100/90 p-6 w-full">
        <div className="bg-white p-10 m-10 max-w-[90vw]">
          <div className="flex justify-between items-center mb-4 mb-10">
            <div className="flex w-1/2 justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                Hi Jonathan, what can we help you with?
              </h2>
            </div>

            <button onClick={onClose} className="text-blue-600 text-2xl">
              <svg
                id="fi_2961937"
                height="28"
                viewBox="0 0 64 64"
                width="28"
                fill="blue"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m4.59 59.41a2 2 0 0 0 2.83 0l24.58-24.58 24.59 24.58a2 2 0 0 0 2.83-2.83l-24.59-24.58 24.58-24.59a2 2 0 0 0 -2.83-2.83l-24.58 24.59-24.59-24.58a2 2 0 0 0 -2.82 2.82l24.58 24.59-24.58 24.59a2 2 0 0 0 0 2.82z"></path>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 flex gap-10">
            <div className="w-1/2">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email confirmation to <span className="text-red-600">*</span>
                </label>
                <InputText
                  name="emailConfirmation"
                  value={formData.emailConfirmation}
                  onChange={handleInputChange}
                  type="email"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-600">*</span>
                </label>
                <InputText
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  type="text"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <InputText
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  type="email"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name <span className="text-red-600">*</span>
                </label>
                <InputText
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  type="text"
                  required
                />
              </div>

              <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number <span className="text-red-600">*</span>
                </label>
                <InputText
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  type="tel"
                  required
                />
              </div>
            </div>

            <div className="w-1/2">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-600">*</span>
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Attachment
                </label>
                <div className="w-full p-2 border border-dashed border-gray-300 rounded-none text-center text-gray-200 h-30 flex items-center justify-center">
                  <input
                    type="file"
                    name="attachment"
                    onChange={handleFileChange}
                    className="hidden"
                    id="attachment"
                  />
                  <label
                    htmlFor="attachment"
                    className="cursor-pointer w-full h-full flex flex-col gap-2 items-center justify-center text-gray-600"
                  >
                    {formData.attachmentName ? (
                      <span className="text-gray-800 bg-gray-100 px-3 py-1 rounded-md">
                        {formData.attachmentName}
                      </span>
                    ) : (
                      <>
                        Drag and drop files or{" "}
                        <span className="bg-gray-200 px-5 py-2 text-gray-600">
                          Browse
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-34">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 text-sm "
                  disabled={loading}
                >
                  Cancel
                </button>
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="bg-[#99AAFC] text-white px-4 py-2 text-sm w-20"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>                  
                  
                </div>
                
              </div>
              {successMessage && ( <p className="text-green-500 text-right">{successMessage}</p> )} 
              {error && <p className="text-red-500">Error: {error}</p>}

            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default HelpFormModal;