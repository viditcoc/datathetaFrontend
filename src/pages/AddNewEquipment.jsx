import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { InputText2, FilterDropdown2 } from "@hoc/UI";
import { useLocationStore } from '@store/locationStore';
import { useEquipmentStore } from '@store/equipmentStore';

const AddEquipmentAndItem = () => {
  const navigate = useNavigate();
  const { equipments, fetchEquipments } = useEquipmentStore();
  const { locations } = useLocationStore();
 
  const [activeTab, setActiveTab] = useState("equipment");
  const [equipmentFormData, setEquipmentFormData] = useState({ id: "", name: "" });
  const [equipmentError, setEquipmentError] = useState(null);
  const [equipmentSuccess, setEquipmentSuccess] = useState(null);
  const [equipmentLoading, setEquipmentLoading] = useState(false);
  const [itemFormData, setItemFormData] = useState({
    item_id: "",
    item_name: "",
    equipment_id: "",
    loc_id: ""
  });
  const [itemError, setItemError] = useState(null);
  const [itemSuccess, setItemSuccess] = useState(null);
  const [itemLoading, setItemLoading] = useState(false);

  const handleEquipmentInputChange = (e) => {
    const { name, value } = e.target;
    setEquipmentFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    if (name) {
      setItemFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleItemDropdownChange = (name) => (e) => {
    const { value } = e.target;
    setItemFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleEquipmentSubmit = async (e) => {
    e.preventDefault();
    setEquipmentLoading(true);
    setEquipmentError(null);
    setEquipmentSuccess(null);
    try {
      const formBody = new URLSearchParams();
      formBody.append('id', equipmentFormData.id);
      formBody.append('name', equipmentFormData.name);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/equipment/register`, {
        method: "POST",
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (!response.ok) throw new Error('Failed to register equipment');
      const result = await response.json();
      setEquipmentSuccess(result.message || 'Equipment registered successfully');
      setEquipmentFormData({ id: "", name: "" });
      await fetchEquipments(true);
    } catch (err) {
      setEquipmentError(err.message);
      console.error("Error registering equipment:", err);
    } finally {
      setEquipmentLoading(false);
    }
  };

  useEffect(()=>{
    console.log("itemFormData",itemFormData)
  },[itemFormData])

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    setItemLoading(true);
    setItemError(null);
    setItemSuccess(null);
    try {
      const formBody = new URLSearchParams();
      formBody.append('item_id', itemFormData.item_id);
      formBody.append('item_name', itemFormData.item_name);
      formBody.append('equipment_id', itemFormData.equipment_id);
      formBody.append('loc_id', itemFormData.loc_id);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/items/register`, {
        method: "POST",
        body: formBody,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (!response.ok) throw new Error('Failed to register item');
      const result = await response.json();
      setItemSuccess(result.message || 'Item registered successfully');
      setItemFormData({
        item_id: "",
        item_name: "",
        equipment_id: "",
        loc_id: ""
      });
    } catch (err) {
      setItemError(err.message);
      console.error("Error registering item:", err);
    } finally {
      setItemLoading(false);
    }
  };

  const equipmentOptions = (
    <>
      <option value="0">Select Equipment</option>
      {equipments.map((eq, index) => {        
       return  <option key={index} value={eq.equipment_id}>{eq.equipment_name}</option>
      })}
    </>
  );

  const locationOptions = (
    <>
      <option value="0">Select Location</option>
      {locations.map((loc, index) => (
        <option key={index} value={loc.id}>{loc.id}</option>
      ))}
    </>
  );

  return (
    <div className="bg-indigo-100 p-6 w-full">
      <div className="h-[80vh] flex flex-col justify-between">
        <div className="p-10 m-10 max-w-4xl w-full rounded-lg">
          <div className="flex border-b border-gray-300 mb-8">
            <button
              className={`px-4 py-2 font-semibold ${activeTab === "equipment" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("equipment")}
            >
              Add Equipment
            </button>
            <button
              className={`px-4 py-2 font-semibold ${activeTab === "item" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("item")}
            >
              Add Item
            </button>
          </div>

          {activeTab === "equipment" && (
            <>
              {equipmentError && <div className="text-red-500 mb-4">{equipmentError}</div>}
              {equipmentSuccess && <div className="text-green-500 mb-4">{equipmentSuccess}</div>}
              <div className="space-y-6 w-3/4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <InputText2
                      placeholder="Equipment ID"
                      name="id"
                      value={equipmentFormData.id}
                      onChange={handleEquipmentInputChange}
                      disabled={equipmentLoading}
                    />
                  </div>
                  <div>
                    <InputText2
                      placeholder="Name"
                      name="name"
                      value={equipmentFormData.name}
                      onChange={handleEquipmentInputChange}
                      disabled={equipmentLoading}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
               
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 text-white px-6 py-1.5 font-light text-sm"
                    disabled={equipmentLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEquipmentSubmit}
                    className="bg-blue-600 text-white px-6 py-1.5 font-light text-sm"
                    disabled={equipmentLoading}
                  >
                    {equipmentLoading ? 'Adding...' : 'Add Equipment'}
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "item" && (
            <>
              {itemError && <div className="text-red-500 mb-4">{itemError}</div>}
              {itemSuccess && <div className="text-green-500 mb-4">{itemSuccess}</div>}
              <div className="space-y-6 w-3/4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <InputText2
                      placeholder="Item ID"
                      name="item_id"
                      value={itemFormData.item_id}
                      onChange={handleItemInputChange}
                      disabled={itemLoading}
                    />
                  </div>
                  <div>
                    <InputText2
                      placeholder="Item Name"
                      name="item_name"
                      value={itemFormData.item_name}
                      onChange={handleItemInputChange}
                      disabled={itemLoading}
                    />
                  </div>
                  <div>
                    <FilterDropdown2
                      options={equipmentOptions}
                      name="equipment_id"
                      value={itemFormData.equipment_id}
                      onChange={handleItemDropdownChange('equipment_id')}
                      disabled={itemLoading}
                    />
                  </div>
                  <div>
                    <FilterDropdown2
                      options={locationOptions}
                      name="loc_id"
                      value={itemFormData.loc_id}
                      onChange={handleItemDropdownChange('loc_id')}
                      disabled={itemLoading}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                 
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 text-white px-6 py-1.5 font-light text-sm"
                    disabled={itemLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleItemSubmit}
                    className="bg-blue-600 text-white px-6 py-1.5 font-light text-sm"
                    disabled={itemLoading}
                  >
                    {itemLoading ? 'Adding...' : 'Add Item'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEquipmentAndItem;