import React, { useState } from "react";
import { ListFilter, ChevronDown } from 'lucide-react';
import { FilterDropdown } from "@hoc/UI";

const SidebarFilter = ({ onFilterChange, productGroupOptions, reactorOptions }) => {
  const [selectedProductGroups, setSelectedProductGroups] = useState([]);
  const [selectedReactors, setSelectedReactors] = useState([]);

  const handleProductGroupChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedProductGroups(options);
    onFilterChange("productGroup", options);
  };

  const handleReactorChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedReactors(options);
    onFilterChange("reactor", options);
  };

  return (
    <aside className="w-1/5 bg-darkBlue text-white p-6 h-screen flex flex-col">
      <div className="space-y-4">
        <div className="flex justify-between border-b border-gray-500">
          <label className="block text-lg font-normal text-white mb-3">Filters</label>
          <ListFilter />
        </div>
        <div>
          <label className="block text-sm font-normal text-indigo-300 mb-3">Frequency</label>
          <div className="relative">
            <FilterDropdown options={
              <>
                <option value="">All</option>
                <option value="1">1</option>
              </>
            } />
          </div>
        </div>
        <div>
          <label className="block text-sm font-normal text-indigo-300 mb-3">Product Group</label>
          <div className="relative">
            <FilterDropdown
              options={
                <>
                  <option value="">All</option>
                  {productGroupOptions.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </>
              }
              multiple
              onChange={handleProductGroupChange}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-normal text-indigo-300 mb-3">Reactor</label>
          <div className="relative">
            <FilterDropdown
              options={
                <>
                  <option value="">All</option>
                  {reactorOptions.map((reactor) => (
                    <option key={reactor.id} value={reactor.id}>{reactor.name}</option>
                  ))}
                </>
              }
              multiple
              onChange={handleReactorChange}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-normal text-indigo-300 mb-3">Timeline</label>
          <div className="relative">
            <FilterDropdown options={<option value="">All</option>} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-normal text-indigo-300 mb-3">Week</label>
          <div className="relative">
            <FilterDropdown options={<option value="">All</option>} />
          </div>
        </div>
      </div>
      <div className="text-sm mt-10">
        <p className="text-gray-300">Version 1.0 | 10012025</p>
        <p className="flex items-center mt-10">
          <svg className="w-4 h-4 mr-1 text-indigo-400" fill="#758DFF" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM1 10a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
          support.xyz@datatheta.com
        </p>
      </div>
    </aside>
  );
};

export default SidebarFilter;