"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Modal } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";



const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [Subopen, setSubOpen] = useState(false);
  const handleSubOpen = () => setSubOpen(true);
  const handleSubClose =() => setSubOpen(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newSubCategory, setNewSubCategory] = useState("");
  const [product, setProduct] = useState({  
    name: "",
    price: "",
    stock_quantity: "",
    description: "",
  });

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data[0]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle adding a new top-level category
  const addCategory = async () => {
    try {
      await axios.post("/api/categories", {
        name: newCategory,
        parent_id: null, // Top level
        level: 1,
      });
      setNewCategory("");
      // Re-fetch categories after adding a new category
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle adding a subcategory to the selected category
  const addSubCategory = async () => {
    if (!selectedCategory) return;
    const { id, level } = selectedCategory;

    try {
      await axios.post("/api/categories", {
        name: newSubCategory,
        parent_id: id,
        level: level + 1,
      });
      setNewSubCategory("");
      // Re-fetch categories after adding a new subcategory
      fetchCategories();
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  // Handle product form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, stock_quantity, description } = product;

    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }

    try {
      await axios.post("/api/products", {
        category_id: selectedCategory.id,
        name,
        description,
        price,
        stock_quantity,
      });
      setSubOpen(true);
      // alert("Product added successfully");
      setProduct({
        name: "",
        price: "",
        stock_quantity: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
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

const refreshPage= ()=>{
    window.location.reload();
  }
const handleCategorySelect = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Add") {
        handleOpen();
    } else {
    const selected = categories.find((category) => category.id === parseInt(selectedValue));
    setSelectedCategory(selected);
    }
  };

const groupCategoriesByParentId = (categories) => {
    const groupedCategories = {};
    categories.forEach((category) => {
      const parentId = category.parent_id || "root"; // Handle root categories (parent_id null)
      if (!groupedCategories[parentId]) {
        groupedCategories[parentId] = [];
      }
      groupedCategories[parentId].push(category);
    });
    return groupedCategories;
  };

  const groupedCategories = groupCategoriesByParentId(categories);

  // Render options recursively with base case to stop recursion
const renderCategoryOptions = (categories, parent_id = null, prefix = "") => {
  return categories
    .filter((category) => category.parent_id === parent_id) // Get children of the parent
    .map((category) => (
      <React.Fragment key={category.id}>
        <option value={category.id}>
          {prefix}{category.name}
        </option>
        {/* Recursively render subcategories */}
        {renderCategoryOptions(categories, category.id, prefix + "→ ")}
      </React.Fragment>
    ));
};
  return (
    <div className="container auto flex flex-col justify-center items-center p-15 mt-9 mb-9">
      <h1 className="text-3xl md:text-xl lg:text-5xl font-bold">
        Product Form
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap justify-center flex-col gap-5 items-center mt-9 w-[95%] sm:w-[80%] sm:px-5"
      >
        <div className="flex items-center  gap-5 w-[100%]">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
              value={product.stock_quantity}
              onChange={(e) =>
                setProduct({ ...product, stock_quantity: e.target.value })
              }
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
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              name="price"
              placeholder="Enter each product price here"
              className=" Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[100%]"
            />
          </div>
        </div>
        <div className="flex items-center gap-5 w-[100%]">
        <div className="flex items-center gap-5 w-[100%]">
                    <label htmlFor="category">Category:</label>
                    <select
                    id="category"
                    className="Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[60%]"
                    value={selectedCategory?.id || ""}
                    onChange={handleCategorySelect}
                    >
            <option value="" disabled>
                Select a category
            </option>
            {/* {renderCategoryOptions(categories)} */}
            {renderCategoryOptions(categories)}
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
                    onClick={addCategory}
                  >
                    Add
                  </Button>
                </Box>
              </Modal>
            )}
          
        </div>

        {selectedCategory && (
            <div className="flex items-center gap-5 w-[100%]">
            <label htmlFor="subCategory">
              Add Sub-Category to {selectedCategory.name}:
            </label>
            <input
              type="text"
              id="subCategory"
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
               className="Input rounded-3xl text-sm md:text-base duration-200 bg-primarylight py-4 px-5 mt-2 mb-2 w-[60%]"
            />
            <Button     
              type="button"
              variant="contained"
              color="success"
              onClick={addSubCategory}
            className="text-lg mt-1 capitalize bg-green-600"
            >
              Add
            </Button>
          </div>
        )}
</div>
       
        <div className="flex w-[100%] items-center gap-3">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Description"
            name="description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6  min-h-[7rem] border-gray-300 p-2 mt-2 mb-2 w-[100%]"
          />
        </div>
        <div className="flex justify-end w-[100%]">
          <Button variant="contained" className="bg-green-600"  type="submit">
            Submit
          </Button>

        <Modal
        open={Subopen}
        onClose={handleSubClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TaskAltIcon className="text-7xl text-green-600"/>
         <h1 >Your product have been added successfully</h1>
        <Button onClick={refreshPage } className="text-lg mt-1 capitalize bg-green-600" variant="contained">Fill another form</Button>
        </Box>
      </Modal>
        </div>
      </form>
    </div>
  );
};
export default ProductForm;
