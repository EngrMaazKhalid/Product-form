"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import categoriesData from "./categories.json";
// import handler from "../api/categories";
function Main() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categories, setCategories] = useState({
    computer: [{name: "Computer devices", subcategories: []}],
    Accessories: [
      { name: "Input devices", subcategories: [{ name: "Keyboard", subcategories: [] }] },
    ],
  });

  const [selectedOption, setSelectedOption] = useState("Select Option"); // State to track selected option
  // const [categories, setCategories] = useState([]);

  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState("");
  const [newCategory, setNewCategory] = useState(""); // State to hold new category input
  const [isAddingNew, setIsAddingNew] = useState(false); // State to toggle input field
  const [selectedCategoryPath, setSelectedCategoryPath] = useState([]);
  ////////////////////////////////////////////-------------------FOR MAIN CATEGORY-------------------////////////////////////////////////////////

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories"); // Adjusted the path to be absolute for Next.js
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setCategories(data.categories);
          console.log(data.categories);
        } else {
          console.error("Expected JSON, got", contentType);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    fetchCategories();
  }, []);

  //////////////////////////////////////////////////////----------------------------------------------//////////////////////////////

  const renderCategoryOptions = (categoryList, path = []) => {
    return categoryList.map((category, index) => {
      const currentPath = [...path, category.name]; // Create current path

      return (
        <React.Fragment key={category.name + index}>
          <option value={currentPath.join(" -> ")}>
            {"->".repeat(path.length)} {category.name}
          </option>
          {category.subcategories &&
            category.subcategories.length > 0 &&
            renderCategoryOptions(category.subcategories, currentPath)}
        </React.Fragment>
      );
    });
  };


  // const renderCategoryOptions = (categoriesList = [], depth = 0) => {
  //   // If categoriesList is not an array, return an empty fragment to prevent errors
  //   if (!Array.isArray(categoriesList)) return null;
  
  //   return categoriesList.map((category, index) => (
  //     <React.Fragment key={index}>
  //       <option value={category.name}>
  //         {/* Add arrows for depth levels */}
  //         {"->".repeat(depth)} {category.name}
  //       </option>
  //       {/* Recursively render subcategories, if available */}
  //       {Array.isArray(category.subcategories) && category.subcategories.length > 0 && (
  //         renderCategoryOptions(category.subcategories, depth + 1)
  //       )}
  //     </React.Fragment>
  //   ));
  // };
  const updateCategories = (categoriesList, path, newSubCategory) => {
    // Ensure categoriesList is an array, if it's undefined, initialize it as an empty array
    if (!Array.isArray(categoriesList)) {
      categoriesList = [];
    }
  
    // Base case: if the path is empty, add the new subcategory at this level
    if (path.length === 0) {
      return [...categoriesList, { name: newSubCategory, subcategories: [] }];
    }
  
    // Recursive case: traverse deeper into the category tree
    return categoriesList.map((category) => {
      if (category.name === path[0]) {
        return {
          ...category,
          subcategories: updateCategories(category.subcategories, path.slice(1), newSubCategory),
        };
      }
      return category;
    });
  };
  // Handle adding a new subcategory
  const handleAddSubCategory = () => {
    if (newSubCategory.trim() !== "" && selectedCategoryPath.length > 0) {
      const updatedCategories = {
        ...categories,
        [selectedCategoryPath[0]]: updateCategories(
          categories[selectedCategoryPath[0]],
          selectedCategoryPath.slice(1),
          newSubCategory
        ),
      };
      setCategories(updatedCategories);
      setNewSubCategory(""); // Reset subcategory input field
    }
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "Add") {
      setIsAddingNew(true); // Set the flag for adding new
      handleOpen(); // Open the modal
    } else {
      const path = selectedValue.split("->").map((item) => item.trim());
      setSelectedCategoryPath(path); // Track the category/subcategory path
      setMainCategory(selectedValue);
    }
  };

  ////////////////////////////////////-------------------------------------------------//////////////////////////////////
  // Handle main category change
  const handleMainCategoryChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Add") {
      setIsAddingNew(true); // Set the flag for adding new
      handleOpen(); // Open the modal
    } else {
      setMainCategory(selectedValue); // Set selected category for other options
      if (selectedValue) {
        setSubCategories(categories[selectedValue]);
      } else {
        setSubCategories([]);
      }
    }
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState("");

  useEffect(() => {
    const fetchSubcategories = () => {
      if (selectedCategory) {
        const subcategories = categoriesData.filter(
          (category) => category.parent_id === selectedCategory.id
        );
        setSubcategories(subcategories);
      } else {
        setSubcategories([]);
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  // Handle saving the new category
  const handleSaveNewCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories((prevCategories) => ({
        ...prevCategories,
        [newCategory]: [],
      }));
    }
    setNewCategory("");
    setIsAddingNew(false);
    handleClose();
  };

  const style = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    borderRadius: "10px",
    bgcolor: "#181A20",
    border: "2px solid #16a34a ",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="container auto flex flex-col justify-center items-center p-15 mt-9 mb-9">
      <h1 className="text-3xl md:text-xl lg:text-5xl font-bold">
        Product Form
      </h1>
      {/* {console.log(categories)} */}
      <form className="flex flex-wrap justify-center flex-col gap-5 items-center mt-9 w-[95%] sm:w-[80%] sm:px-5">
        <div className="flex items-center  gap-5 w-[100%]">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name here"
            className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[100%]"
          />
        </div>

        <div className="flex items-center gap-5 w-[100%]">
          <div className="flex items-center gap-3  w-[100%]">
            <label htmlFor="Quantity">Quantity</label>
            <input
              type="number"
              id="Quantity"
              name="Quantity"
              placeholder="Enter product quantity here"
              className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[100%]"
            />
          </div>
          <div className="flex items-center gap-3  w-[100%]">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Enter each product price here"
              className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[100%]"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 w-[100%]">
          <div className="flex items-center justify-between   w-[100%]">
            <label htmlFor="mainCategory">Choose a category:</label>
            <select
              id="mainCategory"
              value={mainCategory}
              onChange={handleCategoryChange}
              // onChange={handleMainCategoryChange}
              className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[60%]"
              name="mainCategory"
            >
              <option value="">Select a category</option>
              {Object.keys(categories).map((category) => (
                <React.Fragment key={category}>
                  <option value={category}>{category}</option>
                  {/* Render subcategories recursively */}
                  {/* {renderCategoryOptions(categories)}  */}
                  {renderCategoryOptions(categories[category])}
                </React.Fragment>
              ))}
              <option className="bg-green-600" value="Add">
                + Add New Category
              </option>
            </select>
            {open && (
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h1>Add new category</h1>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    className="Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[50%]"
                  />
                  <Button
                    className="text-lg mt-1 capitalize bg-green-600"
                    variant="contained"
                    onClick={handleSaveNewCategory}
                  >
                    Add
                  </Button>
                </Box>
              </Modal>
            )}
          </div>

          <div className="flex items-center gap-5 w-[100%]">
            <label htmlFor="subcategories">Add sub-category:</label>
            <input
              type="text"
              id="subCategory"
              name="subCategory"
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
              placeholder="Enter sub-category"
              
            />
            <Button
              className="text-lg mt-1 capitalize bg-green-600"
              variant="contained"
              onClick={handleAddSubCategory}
            >
              Add
            </Button>
          </div>
        </div>
        <div></div>
        <div className="flex w-[100%] items-center gap-3">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Description"
            name="description"
            className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6  min-h-[7rem] border-gray-300 p-2 mt-2 mb-2 w-[100%]"
          />
        </div>
        <div className="flex justify-end w-[100%]">
          <Button variant="contained" className="bg-green-600" type="submit">
            Submit
          </Button>
        </div>
        {/* Render current category structure */}
      </form>
    </div>
  );
}

export default Main;
