import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InputText2, FilterDropdown2, Button2 } from "@hoc/UI";
import { CircleChevronLeft, RotateCw } from "lucide-react";
import DataTable from "react-data-table-component";
import EquipmentModal from "@components/modal/EquipmentModal";
import LocationModal from "@components/modal/LocationModal";
import { useDesignationStore } from "@store/designationStore";

import { useRolesStore } from "@store/rolesStore";

const AddNewUser = ({ onClose }) => {
  const { designations } = useDesignationStore();
  const { roles } = useRolesStore();

  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(false);
  const [userSuccess, setUserSuccess] = useState(false);
 
  const [openEquipmentModal, setOpenEquipmentModal] = useState(false);
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const editingUser = location.state?.user;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username:"",
    designation: "",
    password: "",
    confirmPassword: "",
    location: "",
    equipment: "",
    role: ""
  });


  useEffect(() => {
    if (editingUser) {

      setFormData({
        firstName: editingUser.name?.split(" ")[0] || "",
        lastName: editingUser.name?.split(" ")[1] || "",
        email: editingUser.email || "",
        username: editingUser.username || "",
        designation: editingUser.designation_id?.toString() || "",
        password: "", // Leave blank for security
        confirmPassword: "",
        location: typeof editingUser.locations === 'string' 
        ? editingUser.locations.split("|").filter(id => id) 
        : Array.isArray(editingUser.locations) 
          ? editingUser.locations 
          : [],
      equipment: typeof editingUser.items === 'string' 
        ? editingUser.items.split("|").filter(id => id) 
        : Array.isArray(editingUser.items) 
          ? editingUser.items 
          : [],
        role: editingUser.role_id?.toString() || ""
      });
    }
  }, [editingUser]);

  const handleInputChange = (e) => {
 
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name) => (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      role: value,
    }));
  };

 

  const handleEquipmentSelect = (equipment) => {
    setFormData((prevData) => ({
      ...prevData,
      equipment: equipment,
    }));
    setOpenLocationModal(false);
  };

  const handleLocationSelect = (location) => {
    setFormData((prevData) => ({
      ...prevData,
      location: location,
    }));
    setOpenLocationModal(false);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setUserLoading(true);
    setUserError(null);
    setUserSuccess(null);
  
    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'username', 'password',
      'confirmPassword', 'designation', 'role'
    ];
    const isValid = requiredFields.every(field => formData[field]) &&
      formData.location?.length > 0 &&
      formData.equipment?.length > 0 &&
      formData.password === formData.confirmPassword;
  
    if (!isValid) {
      setUserError('Please fill all required fields and ensure passwords match');
      setUserLoading(false);
      return;
    }
  
    try {
      const formBody = new URLSearchParams();
      formBody.append('firstname', formData.firstName);
      formBody.append('lastname', formData.lastName);
      formBody.append('email', formData.email);
      formBody.append('username', formData.username);
      formBody.append('password', formData.password);
      formBody.append('confirm_password', formData.confirmPassword);
      formBody.append('designation_id', formData.designation);
      formBody.append('role_id', formData.role);
      formData.location.forEach(id => formBody.append('location_ids', id));
      formData.equipment.forEach(id => formBody.append('item_ids', id));
  




      const url = editingUser
        ? `${import.meta.env.VITE_API_BASE_URL}/update_user/${encodeURIComponent(editingUser.user_id)}`
        : `${import.meta.env.VITE_API_BASE_URL}/register`;
      const method = editingUser ? "PATCH" : "POST";

      const response = await fetch(url, {
        method: "POST",
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (!response.ok) throw new Error(`Failed to ${editingUser ? 'update' : 'register'} user`);
      const result = await response.json();
      setUserSuccess(result.message || `User ${editingUser ? 'updated' : 'registered'} successfully`);
      setFormData({
        firstName: "", lastName: "", email: "", username: "",
        password: "", confirmPassword: "", designation: "",
        role: "", location: [], equipment: []
      });
      navigate(-1);

    } catch (err) {
      setUserError(err.message);
      console.error(`Error ${editingUser ? 'updating' : 'registering'} user:`, err);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    // debugger;
    console.log("formData", formData); 
    
  }, [formData]);
  
  const roleOptions = (
    <>
    <option value="0">Select Role</option>
    {roles.map((x,index) => {
      return <option value={x.id}>{x.role}</option>
    })}
  </>
  );
 

  const designation = (
    <>
      <option value="0">Select Designation</option>
      {designations.map((x,index) => {
        return <option value={x.id}>{x.designation}</option>
      })}
    </>
  );

 
 

  const columns = [
    {
      name: "Module Permission",
      selector: (row) => row.role,
      cell: (row) => <span className="capitalize">{row.role}</span>,
      minWidth: "150px",
      maxWidth: "250px",
    },
    {
      name: "Read",
      cell: (row) => (
        <input
          type="checkbox"
          checked={row.can_read === "Y"}
          disabled
        />
      ),
      width: "100px",
    },
    {
      name: "Write",
      cell: (row) => (
        <input
          type="checkbox"
          checked={row.can_write === "Y"}
          disabled
        />
      ),
      width: "100px",
    },
    {
      name: "Delete",
      cell: (row) => (
        <input
          type="checkbox"
          checked={row.can_delete === "Y"}
          disabled
        />
      ),
      width: "100px",
    },
    
  ];
 

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "transparent",
        borderBottom: "1px solid rgba(0,0,0,.12)",
      },
    },
    headCells: {
      style: {
        backgroundColor: "transparent",
        fontWeight: "normal",
      },
    },
    rows: {
      style: {
        backgroundColor: "transparent",
        borderBottom: "1px solid #e5e7eb",
        padding: "10px 0",
      },
    },
    cells: {
      style: {
        backgroundColor: "transparent",
      },
    },
    table: {
      style: {
        backgroundColor: "transparent",
        width: "100%",
        minWidth: "0",
      },
    },
    tableWrapper: {
      style: {
        backgroundColor: "transparent",
      },
    },
  };

  return (
    <>
      <div className="bg-indigo-100 p-6 w-full min-h-[80vh]">
        <div className="flex flex-col justify-between">
          <div className="m-10 max-w-6xl w-full rounded-lg">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center space-x-4">
                <button
                  className="text-gray-400"
                  onClick={() => navigate(-1)}
                >
                  <CircleChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl">Add New User</h1>
              </div>
            </div>
            <div className="flex">
              {/* Left Side: Form */}
              <div className="w-1/2 space-y-3">
                <h3 className="text-sm font-normal text-gray-700 mb-3">
                  User Details
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <InputText2
                    placeholder="First Name*"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <InputText2
                    placeholder="Last Name*"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <InputText2
                    placeholder="Email ID*"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                   <InputText2
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />

                  <FilterDropdown2
                    options={designation}
                    name="designation"
                    value={formData.designation}
                    onChange={handleDropdownChange("designation")}
                  />
                </div>
                <h3 className="text-sm font-normal text-gray-700 mb-3 mt-10">
                  Set Password
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <InputText2
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <InputText2
                    type="password"
                    placeholder="••••••••"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <h3 className="text-sm font-normal text-gray-700 mb-3 mt-10">
                  Set Location and Equipment
                </h3>
                <div className="flex grid-cols-2 gap-6">
                  <div className="">
                    <div className="flex gap-4">
                      <Button2
                        type="button"
                        addtionalClass="w-auto"
                        value="Select Location"
                        onClick={() => setOpenLocationModal(true)}
                      />
                      <button
                        className="text-gray-600 text-sm flex items-center gap-2"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, location: "" }))
                        }
                      >
                        Reset <RotateCw size={15} />
                      </button>
                    </div>

                    <ul className="mt-4">
                      {formData.location ? (
                        formData.location.map((x) => (
                          <li className="text-sm text-blue-800">{x}</li>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">
                          No Location Selected
                        </span>
                      )}
                    </ul>
                  </div>
                  <div className="">
                    <div className="flex gap-4">
                      <Button2
                        type="button"
                        addtionalClass="w-auto"
                        name="equipmentOptions"
                        value="Select Equipment"
                        onClick={() => setOpenEquipmentModal(true)}
                      />
                      <button className="text-gray-600 text-sm flex items-center gap-2"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, equipment: "" }))
                      }
                      >
                        Reset <RotateCw size={15} />
                      </button>
                    </div>
                    <ul className="mt-4">
                      {formData.equipment ? (
                        formData.equipment.map((x) => <li className="text-sm text-blue-800">{x}</li>)
                      ) : (
                        <span className="text-sm text-gray-500">
                          No Equipment Selected
                        </span>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Side: Role Selection and Permissions */}
              <div className="w-1/2 pl-10">
                <h3 className="text-sm font-normal text-gray-700 mb-3">
                  &nbsp;
                </h3>
                <div className="flex gap-4 items-center">
                  <h3 className="text-sm font-normal text-gray-700 mb-0">
                    Select Role Type
                  </h3>
                  <FilterDropdown2
                    options={roleOptions}
                    name="role"
                    value={formData.role}
                    onChange={handleRoleChange}
                  />
                </div>
                <h3 className="text-sm font-normal text-gray-700 mb-3 mt-6">
                  Module Permission
                </h3>
                <div className="mt-4">
                  <DataTable
                    columns={columns}
                    data={
                      formData.role
                        ? roles.filter((row) => String(row.id) === String(formData.role))
                        : []
                    }
                    customStyles={customStyles}
                    noTableHead={false}
                    noDataComponent={
                      <p className="text-gray-500 py-4">Please select a role</p>
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-8 items-center">
            {userError && <span className="text-sm text-red-700">{userError}</span>}
            {userSuccess && <span className="text-sm text-green-600">{userSuccess}</span>}

            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-6 py-1.5 font-light text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleUserSubmit}
              className="bg-blue-600 text-white px-6 py-1.5 font-light text-sm"
              disabled={userLoading}
            >
              {userLoading ? "Registering User..." : "Add User"}
              
            </button>
          </div>
        </div>
      </div>

      {openEquipmentModal && (
        <EquipmentModal
          onClose={() => setOpenEquipmentModal(false)}
          onSelect={handleEquipmentSelect}
          selectedEquipments={formData.equipment}
          selectedLocations={formData.location}
        />
      )}
      {openLocationModal && (
        <LocationModal
          onClose={() => setOpenLocationModal(false)}
          onSelect={handleLocationSelect}
          selectedLocations={formData.location}
        />
      )}
    </>
  );
};

export default AddNewUser;
