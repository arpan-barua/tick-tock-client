import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./AddProduct.css";
import Sidebar from "../Sidebar/Sidebar";

const AddProduct = () => {
  const { register, handleSubmit, reset, watch, errors } = useForm();
  const [imageURL, setIMageURL] = useState(null);

  const onSubmit = (data) => {
    const productData = {
      name: data.name,
      price: data.price,
      imageURL: imageURL,
    };
    const url = `https://lychee-pudding-73705.herokuapp.com/addProduct`;

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    }).then((res) => console.log("server side response", res));
    reset();
  };

  const handleImageUpload = (event) => {
    const imageData = new FormData();
    imageData.set("key", "359b0cdf54da570b178f63d52abbbc28");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setIMageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="form-container">
      <h4>Add Product</h4>
      <div className="product-add">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Product Name</label>
          <input
            name="name"
            placeholder="Enter Name"
            ref={register}
            className="form-control"
          />
          <br />
          <label htmlFor="price">Add Price</label>
          <input
            name="price"
            placeholder="Enter Price"
            ref={register}
            className="form-control"
          />
          <br />
          <label htmlFor="upload">Add Photo</label>
          <input name="upload" type="file" onChange={handleImageUpload} />
          <br />
          <br />
          <input
            type="submit"
            value="Save"
            className="btn btn-dark form-control"
          />
        </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
