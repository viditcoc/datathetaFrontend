import React, { useState, useContext, useEffect } from "react";
import Header from "@superComponents/Header";
import SidebarFilter from "@superComponents/SidebarFilter";
import ReactorCard from "@superComponents/ReactorCard";
import { AuthContext } from "@store/context/AuthContext";
import { Button2 } from "@hoc/UI";
import { useEquipmentStore } from "@store/equipmentStore";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const { equipments } = useEquipmentStore();
  const [reactorData, setReactorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductGroups, setSelectedProductGroups] = useState([]);
  const [selectedReactors, setSelectedReactors] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [productGroupOptions, setProductGroupOptions] = useState([]);
  const [reactorOptions, setReactorOptions] = useState([]);

  // Extract equipmentId from URL
  const urlParams = new URLSearchParams(window.location.search);
  const equipmentId = urlParams.get("equipmentId");

  // Handle filter changes from SidebarFilter
  const handleFilterChange = (filterType, values) => {
    if (filterType === "productGroup") {
      setSelectedProductGroups(values);
    } else if (filterType === "reactor") {
      setSelectedReactors(values);
    }
  };

  // Process data with filters applied
  const processData = (data, productGroups, reactors) => {
    const fetchedData = [];
    for (const itemData of data) {
      let filteredData = itemData.data;

      // Apply product group filter
      if (productGroups.length > 0 && !productGroups.includes("")) {
        filteredData = filteredData.filter((entry) =>
          productGroups.includes(entry.productgroup)
        );
      }

      // Apply reactor filter
      if (reactors.length > 0 && !reactors.includes("")) {
        filteredData = filteredData.filter((entry) =>
          reactors.includes(entry.item_id)
        );
      }

      // Skip if no data remains after filtering
      if (filteredData.length === 0) continue;

      const activehoursSum = filteredData.reduce((sum, entry) => sum + entry.activehours, 0);
      const averagePerformance = filteredData.length > 0 ? activehoursSum / filteredData.length : 0;
      const weeklyData = filteredData.map((entry) => ({
        week: entry.week,
        value: entry.oee * 100,
      }));

      fetchedData.push({
        item_id: itemData.item_id,
        item_name: itemData.item_name,
        averagePerformance,
        status: averagePerformance > 30 ? "High" : "Low",
        week: filteredData[0]?.week || "N/A",
        isHighlighted: true,
        weeklyData,
      });
    }
    return fetchedData;
  };

  // Fetch data for each item sequentially
  useEffect(() => {
    const fetchReactorData = async () => {
      setLoading(true);
      const equipment = equipments.find((eq) => eq.equipment_id === equipmentId);
      if (!equipment || equipment.items.length === 0) {
        setRawData([]);
        setProductGroupOptions([]);
        setReactorOptions([]);
        setReactorData([]);
        setLoading(false);
        return;
      }

      const items = equipment.items;
      // Extract unique reactor names and their IDs
      const reactors = items.map((item) => ({
        id: item.item_id,
        name: item.item_name,
      }));
      setReactorOptions(reactors);

      const fetchedData = [];

      for (const item of items) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/item_data/${item.item_id}`, {
            method: "GET",
            headers: {
              accept: "application/json",
              "User-Agent": "PostmanRuntime/7.42.0",
              "ngrok-skip-browser-warning": "true",
            },
            mode: "cors",
            credentials: "omit",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const responseData = await response.json();
          fetchedData.push({
            item_id: item.item_id,
            item_name: item.item_name,
            data: responseData.data,
          });
        } catch (error) {
          console.error(`Error fetching data for ${item.item_id}:`, error);
        }
      }

      // Extract unique product groups from fetched data
      const productGroups = [...new Set(
        fetchedData.flatMap(item => item.data.map(entry => entry.productgroup))
      )].sort();

      setProductGroupOptions(productGroups);
      setRawData(fetchedData);
      setLoading(false);
    };

    if (equipmentId) {
      fetchReactorData();
    } else {
      setRawData([]);
      setProductGroupOptions([]);
      setReactorOptions([]);
      setReactorData([]);
      setLoading(false);
    }
  }, [equipmentId, equipments]);

  // Reprocess data whenever filters or raw data change
  useEffect(() => {
    if (!loading) {
      const processedData = processData(rawData, selectedProductGroups, selectedReactors);
      setReactorData(processedData);
    }
  }, [rawData, selectedProductGroups, selectedReactors, loading]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col h-screen">
      <Header handleLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden">
        <SidebarFilter
          onFilterChange={handleFilterChange}
          productGroupOptions={productGroupOptions}
          reactorOptions={reactorOptions}
        />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="mb-8 flex justify-between border-b border-blue-700 pb-3">
            <h1 className="text-3xl font-semibold flex items-center gap-5 text-blue-900">
              Oven Overview
              <p className="text-sm font-normal text-gray-600 mt-2">
                # of Ovens: {reactorData.length}
              </p>
            </h1>
            <div>
              <Button2 value="Change Equipment" />
            </div>
          </div>
          <div className="flex space-x-4 mb-4 hidden">
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded">Quick View</button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded">Top Performing Reactor</button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded">Low Performing Reactor</button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded">Non Performing Reactor</button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded">Crucial Reactor</button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded">Last Week</button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded">Last Month</button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : reactorData.length === 0 ? (
            <p>No ovens found for this equipment.</p>
          ) : (
            <div className="overflow-x-auto" style={{"width": `${window.innerWidth}px`}}>
              {/* <div className={`flex gap-5 w-screen`}> */}
              <div className={`flex gap-5`} style={{"width": `${reactorData.length*400}px`}}>
              {/* <div className={`flex gap-5 w-[${reactorData.length*400}px]`}> */}
                {reactorData.map((reactor) => (
                  <ReactorCard
                    key={reactor.item_id}
                    name={reactor.item_name}
                    averagePerformance={reactor.averagePerformance}
                    status={reactor.status}
                    week={reactor.week}
                    isHighlighted={reactor.isHighlighted}
                    weeklyData={reactor.weeklyData}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;