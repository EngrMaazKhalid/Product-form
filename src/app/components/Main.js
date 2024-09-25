"use client";
import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
function Main() {
  const [open, setOpen] = useState(false);
  const [openSubModal, setOpenSubModal] = useState(false); // State to toggle modal
  const handleSubClose = () => setOpenSubModal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categories, setCategories] = useState({
    computer: ["Computer devices"],
    Accessories: [
      "Input devices",
      "Output devices",
      "Networking devices",
      "Storage devices",
    ],
  });
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState("");
  const [newsubSubCategory, setNewSubSubCategory] = useState("");
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(""); // State to hold new category input
  const [newsubCategory, setNewsubCategory] = useState(""); // State to hold new category input
  const [isAddingNew, setIsAddingNew] = useState(false); // State to toggle input field
  const handleSubOpen = () => {
    setNewsubCategory(""); // Clear the input for new subcategory
    setOpenSubModal(true); // Open the modal
  };

  ////////////////////////////////////////////-------------------FOR MAIN CATEGORY-------------------////////////////////////////////////////////

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

  ////////////////////////////////////////////-------------------FOR SUB CATEGORY-------------------////////////////////////////////////////////
  const handleSaveNewSubCategory = () => {
    if (newsubCategory.trim() !== "") {
      setSubCategories((prevCategories) => [...prevCategories, newsubCategory]);
    }
    setNewsubCategory(""); // Clear input after adding
    setIsAddingNew(false); // Reset the flag
    handleSubClose(); // Close modal
  };

  const handleSubcategoryChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "AddSub") {
      handleSubOpen();
      setIsAddingNew(true); // Set the flag for adding new
      // Open the modal
    } else {
      setSubCategory(selectedValue); // Set selected category for other options
    }
  };

  ////////////////////////////////////////////-------------------FOR SUB SUB CATEGORY-------------------////////////////////////////////////////////
  const [openSubSubModal, setOpenSubSubModal] = useState(false); // Sub-subcategory modal
  const handleSubsubClose= () => setOpenSubSubModal(false);
  const handleSaveNewSubSubCategory = () => {
    if (newsubSubCategory.trim() !== "") {
      setSubSubCategories((prevCategories) => [
        ...prevCategories,
        newsubSubCategory,
      ]);
    }
    setNewSubSubCategory(""); // Clear input after adding
    setIsAddingNew(false); // Reset the flag
    handleSubsubClose(); // Close modal
  };

  const handleSubsubcategoryChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "AddVal") {
  
      setIsAddingNew(true); // Set the flag for adding new
      setOpenSubSubModal(true);// Open the modal
    } else {
      setSubSubCategory(selectedValue); // Set selected category for other options
    }
  };

  ////////////////////////////////////////////-------------------FOR THIRDSUB CATEGORY-------------------////////////////////////////////////////////
  
  const [openThirdSubModal, setOpenThirdSubModal] = useState(false); // Sub-subcategory modal
  const handleThirdsubClose= () => setOpenThirdSubModal(false);
  const [newThirdSubCategory, setNewThirdSubCategory] = useState("");
  const [thirdSubCategories, setThirdSubCategories] = useState([]);
  const [thirdSubCategory, setThirdSubCategory] = useState("");



  const handleSaveNewThirdSubCategory = () => {
    if (newThirdSubCategory.trim() !== "") {
      setThirdSubCategories((prevCategories) => [
        ...prevCategories,
        newThirdSubCategory,
      ]);
    }
    setNewThirdSubCategory(""); // Clear input after adding
    setIsAddingNew(false); // Reset the flag
    handleThirdsubClose(); // Close modal
  };

  const handleThirdsubcategoryChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "AddThird") {
  
      setIsAddingNew(true); // Set the flag for adding new
      setOpenThirdSubModal(true);// Open the modal
    } else {
      setThirdSubCategory(selectedValue); // Set selected category for other options
    }
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
              onChange={handleMainCategoryChange}
              className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[60%]"
              name="mainCategory"
            >
              <option value="">Select a category</option>
              {Object.keys(categories).map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
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
                    className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[100%]"
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
          <div className="flex items-center justify-between   w-[100%]">
            <label htmlFor="subcategories">Add sub-category:</label>
            <select
              id="subcategories"
              className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[60%]"
              name="subcategories"
              disabled={!mainCategory}
              onChange={handleSubcategoryChange}
            >
              <option value="">Select a subcategory</option>
              {subCategories.map((sub, index) => (
                <option key={index} value={sub}>
                  {" "}
                  {sub}{" "}
                </option>
              ))}
              <option className="bg-green-600" value="AddSub">
                + Add New Category
              </option>
            </select>
            {openSubModal && (
              <Modal
                open={openSubModal}
                onClose={handleSubClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h1>Add new Sub-category</h1>
                  <input
                    type="text"
                    id="subcategory"
                    name="subcategory"
                    value={newsubCategory}
                    onChange={(e) => setNewsubCategory(e.target.value)}
                    placeholder="Enter new sub-category"
                    className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[100%]"
                  />
                  <Button
                    className="text-lg mt-1 capitalize bg-green-600"
                    variant="contained"
                    onClick={handleSaveNewSubCategory}
                  >
                    Add
                  </Button>
                </Box>
              </Modal>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-5 w-[100%]">
          <div className="flex items-center justify-between   w-[100%]">
            <label htmlFor="categories">Add sub category:</label>
            <select
              id="categories"
              className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[60%]"
              name="categories"
              disabled={!subCategory}
              onChange={handleSubsubcategoryChange}
            >
              <option value="">Select sub-category</option>
              {subSubCategories.map((sub, index) => (
                <option key={index} value={sub}>
                  {" "}
                  {sub}
                </option>
              ))}
              <option className="bg-green-600" value="AddVal">
                + Add New Category
              </option>
            </select>

            {openSubSubModal && (
              <Modal
                open={openSubSubModal}
                onClose={handleSubsubClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h1>Add new Sub-category</h1>
                  <input
                    type="text"
                    id="subcategory"
                    name="subcategory"
                    value={newsubSubCategory}
                    onChange={(e) => setNewSubSubCategory(e.target.value)}
                    placeholder="Enter new sub-category"
                    className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[100%]"
                  />
                  <Button
                    className="text-lg mt-1 capitalize bg-green-600"
                    variant="contained"
                    onClick={handleSaveNewSubSubCategory}
                  >
                    Add
                  </Button>
                </Box>
              </Modal>
            )}
          </div>
          <div className="flex items-center justify-between  w-[100%]">
            <label htmlFor="categories">Add sub-category:</label>
            <select
              id="categories"
              className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[60%]"
              name="categories"
              disabled={!subSubCategory}
              onChange={handleThirdsubcategoryChange}
            >

              <option value="">Set Sub category</option>
              {thirdSubCategories.map((sub, index) => (
                <option key={index} value={sub}>
                  {" "}
                  {sub}
                </option>
              ))}
              <option className="bg-green-600" value="AddThird">
                + Add New Category
              </option>
            </select>

            {openThirdSubModal && (
              <Modal
                open={openThirdSubModal}
                onClose={handleThirdsubClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h1>Add new Sub-category</h1>
                  <input
                    type="text"
                    id="subcategory"
                    name="subcategory"
                    value={newThirdSubCategory}
              
                  
                    onChange={(e) => setNewThirdSubCategory(e.target.value)}
                    placeholder="Enter new sub-category"
                    className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[100%]"
                  />
                  <Button
                    className="text-lg mt-1 capitalize bg-green-600"
                    variant="contained"
                    onClick={handleSaveNewThirdSubCategory}
                  >
                    Add
                  </Button>
                </Box>
              </Modal>)
            }
          </div>
        </div>
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
      </form>
    </div>
  );
}

export default Main;
