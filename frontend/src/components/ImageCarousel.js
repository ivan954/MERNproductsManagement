import React from "react";
import { Carousel } from "react-bootstrap";

//with filter checking if the product has image, only picyures are showing

const ImageCarousel = ({ products }) => {
  return (
    <Carousel variant="dark">
      {products
        ?.filter((prduct) => {
          if (prduct.image !== "") {
            return prduct;
          }
        })
        .map((product) => (
          <Carousel.Item key={product._id}>
            <img
              style={{ maxHeight: 700 }}
              className="d-block w-100"
              src={product.image}
              alt="First slide"
            />

            <Carousel.Caption>
              <h5 className="p-3 mb-2 bg-light text-dark opacity-75 rounded">
                {product.description}
              </h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ImageCarousel;
