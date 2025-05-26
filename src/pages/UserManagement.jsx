import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  CircleChevronLeft,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ToggleSwitch } from "@hoc/UI";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useFetchUsers from "@hooks/useFetchUsers";
import formatDate from "@utils/dateUtils";
import { useLocationStore } from "@store/locationStore";
import { useEquipmentStore } from "@store/equipmentStore";

const UserManagement = () => {
  const { users, loading, error, fetchusers } = useFetchUsers();
  const [togglingUserId, setTogglingUserId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const location = useLocation();
  const isUserManagement = location.pathname === "/landingpage/userManagement";
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [localUsers, setLocalUsers] = useState(users);

  const {
    locations,
    loading: locationsLoading,
    error: locationsError,
  } = useLocationStore();

  const {
    equipments,
    loading: equipmentsLoading,
    error: equipmentsError,
  } = useEquipmentStore();
 



  const getLocationDetails = (locationId) => {
    // console.log("locations",locations)
    const location = locations.find((loc) => loc.id === locationId);
    return location
      ? {
          name: location.name,
          address: location.address,
          country: location.country,
        }
      : { name: "Unknown", address: "N/A", country: "N/A" };
  };

  const getEquipmentDetails = (itemId) => {
    for (const equipment of equipments) {
      const item = equipment.items.find((item) => item.item_id === itemId);
      if (item) {
        return {
          equipment_id: equipment.equipment_id,
          equipment_name: equipment.equipment_name,
          item_name: item.item_name,
        };
      }
    }
    return { equipment_id: "Unknown", equipment_name: "N/A", item_name: "N/A" };
  };

  useEffect(() => {
    setLocalUsers(users);     
  }, [users]);

  const filteredUsers = localUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email.toLowerCase().includes(filterText.toLowerCase())
  );

  const toggleAccess = async (row) => {
    setTogglingUserId(row.user_id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/${encodeURIComponent(
          row.user_id
        )}/status`,
        {
          method: "PATCH",
          headers: { accept: "application/json" },
        }
      );
      if (!response.ok)
        throw new Error(`Failed to update status: ${response.status}`);
      // const usx = localUsers.map(user =>
      //   user.user_id === row.user_id ? { ...user, status: user.status === "Enabled" ? "Disabled" : "Enabled" } : user
      // )
      // setLocalUsers(usx);

      setLocalUsers((prev) =>
        prev.map((user) =>
          user.user_id === row.user_id
            ? {
                ...user,
                status: user.status === "Enabled" ? "Disabled" : "Enabled",
              }
            : user
        )
      );
    } catch (err) {
      console.error("Error updating user status:", err);
      alert("Failed to update user status");
    } finally {
      setTogglingUserId(null);
    }
  };

  const formatList = (value) => {
    if (Array.isArray(value)) return value.join(" | ");
    return value || "";
  };

  const handleDeleteUser = async (userId) => {
    let text = "Are you sure delete this user?";
    if (confirm(text) != true) {
      return;
    } 
    alert("procedding delete")
    setDeletingUserId(userId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/${encodeURIComponent(userId)}`,
        {
          method: "DELETE",
          headers: {
            'accept': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      if (!response.ok) throw new Error('Failed to delete user');
      await fetchusers(); // Refresh user list
    } catch (err) {
      console.error("Error deleting user:", err);
      // alert("Failed to delete user");
    } finally {
      setDeletingUserId(null);
    }
  };


  const columns = [
    {
      name: "NAME",
      selector: (row) => row.name,
      cell: (row) => (
        <div>
          <div className="text-md font-medium text-blue-700">{row.name}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      ),
      minWidth: "150px",
      maxWidth: "300px",
    },
    {
      name: "ROLE",
      selector: (row) => row.role,
      cell: (row) => (
        <span
          className={`inline-block px-4 py-2 text-white ${
            row.role === "Super Admin" ? "bg-blue-900" : "bg-blue-600"
          }`}
        >
          {row.role}
        </span>
      ),
      width: "150px",
    },
    {
      name: "CREATE DATE",
      selector: (row) => formatDate(row.createdate, "long"),
      width: "120px",
    },
    {
      name: "LOCATIONS",
      selector: (row) => {
        const location = getLocationDetails(row.locations);
        return `${location.name}, ${location.address}, ${location.country}`;
      },
      cell: (row) => {
        const location = getLocationDetails(row.locations);
        return (
          <div>
            <div className="text-md font-medium">{row.locations}</div>
            {/* <div className="text-sm text-gray-500">{location.name} {location.address} {location.country}</div> */}
          </div>
        );
      },
      wrap: true,
      minWidth: "200px",
      maxWidth: "400px",
    },
    {
      name: "EQUIPMENT",
      selector: (row) => {
        const equipment = getEquipmentDetails(row.items);
        return `${equipment.equipment_id}: ${row.items}`;
      },
      cell: (row) => {
        const equipment = getEquipmentDetails(row.items);
        return (
          <div>
            <div className="text-md font-medium">{row.items}</div>
            {/* <div className="text-sm text-gray-500">{equipment.item_name}</div> */}
          </div>
        );
      },
      wrap: true,
      minWidth: "200px",
      maxWidth: "400px",
    },
    {
      name: "ACTION",
      cell: (row) => (
        <div className="flex space-x-2">
         <button
          className="bg-blue-100 p-2"
          onClick={() => navigate("./userController", { state: { user: row } })}
        >
          <Pencil className="w-5 h-5 text-blue-500" />
        </button>
          <button
            className="bg-red-100 p-2"
            onClick={() => handleDeleteUser(row.user_id)}
            disabled={deletingUserId === row.user_id}
          >
            <Trash2 className={`w-5 h-5 ${deletingUserId === row.user_id ? 'text-gray-400' : 'text-red-500'}`} />
          </button>
        </div>
      ),
      width: "100px",
    },
    {
      name: "ACCESS",
      cell: (row) => (
        <>
          <span className="ml-2 mr-2 text-sm text-blue-700 font-medium">
            Enable
          </span>
            
          <ToggleSwitch
            checked={row.status === "Enabled"}
            onChange={() => toggleAccess(row)}
            label={row.status}
            loading={togglingUserId === row.user_id}
          />
          <span className="ml-2 text-sm text-gray-700">Disable</span>
        </>
      ),
      width: "200px",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#f1f5f9",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        borderBottom: "1px solid #e5e7eb",
        padding: "20px 0",
      },
    },
    table: {
      style: {
        width: "100%",
        minWidth: "0",
      },
    },
  };

  return (
    <>
      {isUserManagement ? (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <button
                className="text-gray-400"
                onClick={() => navigate("/landingpage")}
              >
                <CircleChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl">User Management</h1>
              <button
                className="bg-blue-600 text-white px-4 py-2 flex items-center space-x-2"
                onClick={() => navigate("./userController")}
              >
                <UserPlus className="w-5 h-5" />
                <span>Add User</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search User"
                className="border px-3 py-2 pl-10"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="mb-10"></div>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500">Loading...</p>
              </div>
            </div>
          ) : error ? (
            <p className="text-red-500 py-4">Error: {error}</p>
          ) : (
            <DataTable
              columns={columns}
              data={filteredUsers}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10]}
              customStyles={customStyles}
              paginationIconPrevious={<ChevronLeft className="w-5 h-5" />}
              paginationIconNext={<ChevronRight className="w-5 h-5" />}
              noDataComponent={
                <p className="text-gray-500 py-4">No users found.</p>
              }
            />
          )}
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default UserManagement;
