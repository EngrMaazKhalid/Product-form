"use client";
import React, { useState } from "react";

function Practice() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Select Option"); // State to track selected option

  // Dynamic categories data
  const [categories] = useState({
    computer: ["Computer devices"],
    Accessories: [
      {
        name: "helll devices",
        subcategories: [
          {
            name: "Keyboard",
            subcategories: [{ name: "Mechanical Keyboard", subcategories: [] }],
          },
        ],
      },
      {
        name: "Output devices",
        subcategories: [
          { name: "Monitor", subcategories: [] },
          { name: "Printer", subcategories: [] },
        ],
      },
    ],
  });

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update the selected option
    setIsDropdownOpen(false); // Close dropdown after selecting
    setIsSubmenuOpen(null); // Ensure submenu closes as well
  };

  const toggleSubmenu = (category) => {
    setIsSubmenuOpen(isSubmenuOpen === category ? null : category); // Toggle specific submenu
  };

  // Recursive function to render categories and subcategories
  const renderCategory = (category, subcategories) => {
    return (
      <div key={category.name || category} className="relative group">
        <div
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          onClick={() =>
            subcategories.length
              ? toggleSubmenu(category.name || category)
              : handleOptionClick(category.name || category)
          }
        >
          {category.name || category}
        </div>

        {/* Render Subcategories */}
        {isSubmenuOpen === (category.name || category) &&
          subcategories.length > 0 && (
            <div className="absolute left-full top-0 mt-0 ml-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              {subcategories.map((subItem, subIndex) =>
                subItem.subcategories && subItem.subcategories.length > 0 ? (
                  renderCategory(subItem, subItem.subcategories) // Recursive call for nested subcategories
                ) : (
                  <div
                    key={subIndex}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick(subItem.name)}
                  >
                    {subItem.name}
                  </div>
                )
              )}
            </div>
          )}
      </div>
    );
  };

  return (
    <div className="relative inline-block text-left w-64">
      {/* Display Selected Option */}
      <div
        className="block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedOption}
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="origin-top-right absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu">
            {Object.keys(categories).map((category, index) =>
              typeof categories[category] === "string" ? (
                <div
                  key={index}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick(categories[category])}
                >
                  {categories[category]}
                </div>
              ) : (
                renderCategory({ name: category }, categories[category])
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Practice;
