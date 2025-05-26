import React, { useState } from "react";
import Modal from "@hoc/Modal";
import { useNavigate } from 'react-router-dom';
import { InputText2, FilterDropdown2, Textarea2 } from "@hoc/UI";
import { X } from "lucide-react";

const AddNewEquipment = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  const conditionOptions = (
    <>
      <option value="">Condition</option>
      <option value="New">New</option>
      <option value="Used">Used</option>
      <option value="Refurbished">Refurbished</option>
    </>
  );

  const vendorOptions = (
    <>
      <option value="">Vendor</option>
      <option value="Vendor A">Vendor A</option>
      <option value="Vendor B">Vendor B</option>
      <option value="Vendor C">Vendor C</option>
    </>
  );

  const serviceYearsOptions = (
    <>
      <option value="">Service years remaining</option>
      <option value="1">1 Year</option>
      <option value="2">2 Years</option>
      <option value="3">3 Years</option>
      <option value="4">4 Years</option>
      <option value="5">5+ Years</option>
    </>
  );

  return (
 
      <div className="bg-indigo-100 p-6 w-full">
        <div className="h-[80vh] flex flex-col justify-between">
          <div className="p-10 m-10 max-w-4xl w-fullrounded-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-blue-600">
                Add New Equipment
              </h2>
            </div>

            <div className="space-y-6 w-3/4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <InputText2
                    placeholder="Item No."
                    name="itemNo"
                    value={formData.id}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <InputText2
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Textarea2
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <InputText2
                    placeholder="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <InputText2
                    placeholder="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="relative">
                  <FilterDropdown2
                    options={conditionOptions}
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <FilterDropdown2
                    options={vendorOptions}
                    name="vendor"
                    value={formData.vendor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <FilterDropdown2
                    options={serviceYearsOptions}
                    name="serviceYears"
                    value={formData.serviceYears}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Textarea2
                  placeholder="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div></div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button onClick={()=> navigate(-1)}
               
              className="bg-gray-500 text-white px-6 py-1.5 font-light text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-1.5 font-light text-sm"
            >
              Add Equipment
            </button>
          </div>
        </div>
      </div>
 
  );
};

export default AddNewEquipment;
