import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/utils";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((resp) => {
      setProducts(resp.products);
    });
  }, []);

  return (
    <div className="container">
      <h2>Latest Products</h2>
      <div className="row">
        {!!products ? (
          products.map((product, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4">
              <div
                className="card m-md-3 m-sm-0 mb-2 pb-3"
                style={{ width: "100%" }}
              >
                <img
                  className="card-img-top"
                  style={{
                    height: "185px",
                    maxHeight: "200px",
                    overflow: "hidden",
                  }}
                  src={product.thumbnail}
                />
                <div style={{ maxHeight: "250px", overflow: "hidden" }}>
                  <h4 className="card-title">{product.title}</h4>
                  <p
                    className="card-text"
                    style={{
                      height: "68px",
                      overflow: "hidden",
                    }}
                  >
                    {product.description}
                  </p>
                  <Link to="#" className="btn btn-primary">
                    See Product
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>Loading</>
        )}
      </div>
    </div>
  );
}

export default Products;
