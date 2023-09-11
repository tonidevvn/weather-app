import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Hashids from "hashids";

function AddNewProduct() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", price: "", size: "", color: "#ffffff" },
  });

  const onSubmit = async (d) => {
    console.log("🚀 ~ file: AddNewProduct.js:27 ~ onSubmit ~ d:", d);

    toast.success(`🚀 A new product was added `, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    let productList = localStorage.getItem("productList");

    const hashids = new Hashids();
    const product = { ...d, id: hashids.encode(5, 5, 5) };
    if (productList) {
      let products = [...JSON.parse(productList)];
      localStorage.setItem("productList", JSON.stringify(products));
    } else {
      localStorage.setItem("productList", JSON.stringify([product]));
    }

    reset({ name: "", description: "", price: "", size: "", color: "#ffffff" });
  };

  const onInvalid = () => {
    if (!!errors) {
      toast.error("Missing required fields!!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="container text-start">
        <h2>Add a new product</h2>
        <div className="card">
          <div className="card-header"> Input product info</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
              <div className="mb-3">
                <label
                  className={!errors.name ? "mb-2" : "mb-2 text-danger"}
                  htmlFor="name"
                >
                  {errors.name ? "❗ " : "💡 "} Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  {...register("name", { required: true, maxLength: 50 })}
                  placeholder="Product name..."
                />
              </div>
              <div className="mb-3 mt-3">
                <label
                  className={!errors.description ? "mb-2" : "mb-2 text-danger"}
                  htmlFor="description"
                >
                  {errors.description ? "❗ " : "📃"} Description
                </label>
                <textarea
                  type="text"
                  rows="3"
                  className="form-control"
                  id="description"
                  {...register("description")}
                  placeholder="Product description..."
                />
              </div>
              <div className="mb-3 mt-3 row">
                <div className="col-sm-5">
                  <label
                    className={!errors.price ? "mb-2" : "mb-2 text-danger"}
                    htmlFor="price"
                  >
                    {errors.price ? "❗ " : "💲 "} Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    {...register("price", { required: true })}
                    placeholder="Product price..."
                  ></input>
                </div>
                <div className="col-sm-5">
                  <label
                    className={!errors.size ? "mb-2" : "mb-2 text-danger"}
                    htmlFor="size"
                  >
                    {errors.size ? "❗ " : "📐 "} Size
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="size"
                    {...register("size", { required: true })}
                    placeholder="Product size..."
                  />
                </div>
                <div className="col-sm-2">
                  <label className="mb-2 " htmlFor="color">
                    🟠 Color
                  </label>
                  <div className="mb-2">
                    <input
                      type="color"
                      className="form-control"
                      style={{
                        width: "60px",
                        height: "38px",
                        padding: "5px",
                        userSelect: "none",
                        cursor: "pointer",
                      }}
                      id="color"
                      {...register("color")}
                      placeholder="Product color..."
                    />
                  </div>
                </div>
              </div>

              <button
                className="btn btn-light mx-2"
                onClick={() => navigate("/products")}
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary mx-2">
                Add New
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewProduct;
