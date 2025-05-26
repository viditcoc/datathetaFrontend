import React from "react";
import useFetchUsers from "@hooks/useFetchUsers";
import DataTable from "react-data-table-component";

const TeamMembers = ({
  onClose
}) => {
  const { users, loading, error } = useFetchUsers();

  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "80px",
    },
    {
      name: "Type of Access",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <span className="text-blue-800 font-medium">{row.name}</span>,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
    },
    {
      name: "Email id",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.locations,
      sortable: true,
    },
    {
      name: "Equipment",
      selector: (row) => row.equipment,
      sortable: false,
      wrap: true,
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#EEF2FF",
        color: "#374151",
        fontSize: "0.875rem",
        fontWeight: "normal",
      },
    },
    headCells: {
      style: {
        padding: "8px 16px",
         
      },
    },
    rows: {
      style: {
        fontSize: "0.875rem",
      
        "&:hover": {
          backgroundColor: "#F9FAFB",
        },
      },
    },
    cells: {
      style: {
        padding: "8px 16px",
 
        whiteSpace: "pre-line",
      },
    },
  };

  return (
    <div className="bg-white w-full">
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
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={users}
            customStyles={customStyles}
            noHeader
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15]}
            noDataComponent={<p className="text-gray-500 py-4">No team members found.</p>}
          />
        </div>
      )}
    </div>
  );
};

export default TeamMembers;