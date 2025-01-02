import { useEffect } from "react";
import milk from "./data/milkProducts.json";
import ghee from "./data/gheeProducts.json";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "./milkProducts.css";

import { Navigation, Pagination } from "swiper/modules";

export function MilkProducts({
  cart,
  handleAddToCart,
  handleIncreaseNoOfItems,
  handleDecreaseNoOfItems,
}) {
  const milkQuotations = [
    "Milk: The essence of wholesome goodness.",
    "Great days start with a glass of milk.",
    "Where nutrition meets pure delight.",
    "Pour a smile with every glass of milk!",
    "From farm to fridge, freshness guaranteed.",
    "Milk: The original superfood.",
    "Savor the creamy richness of nature.",
    "Raise a glass to health and happiness!",
    "Because strong bones never go out of style.",
    "Milk: The classic choice for every meal.",
  ];

  const gheeQuotations = [
    "Ghee: The golden touch for your meals.",
    "Rich flavor, pure nourishment – that's ghee.",
    "From tradition to taste, ghee does it best.",
    "Where heritage meets health – our ghee.",
    "Ghee: The secret to timeless recipes.",
    "Add a dollop of goodness with every spoonful of ghee.",
    "Savor the richness, embrace the tradition.",
    "Ghee: Fueling flavor, fortifying health.",
    "Pure ghee, pure happiness.",
    "Turn everyday dishes into delicacies with ghee.",
  ];

  useEffect(() => {
    console.log(cart); // This will log the updated cart after each state change
    console.log("milk");
    console.log(milk);
  }, [cart]);

  return (
    <div className="container-fluid d-flex mt-1 flex-wrap justify-content-center">
      <Swiper
        className="d-flex flex-column"
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1} // Default for mobile
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 15 }, // 1 slide on small screens
          768: { slidesPerView: 2, spaceBetween: 20 }, // 2 slides on medium screens
          1024: { slidesPerView: 3, spaceBetween: 30 }, // 3 slides on larger screens
        }}
        style={{ position: "relative" }}
      >
        {milk.map((milk, index) => (
          <SwiperSlide key={index}>
            <div
              className="card p-1 d-flex justify-content-center"
              style={{
                backgroundColor: "#EFF3EA",
                maxWidth: "90%", // Restrict width for mobile
                marginLeft: "5%",
              }}
            >
              <h3
                className="card-title d-flex flex-column fw-bold pb-1 pt-1 text-center"
                style={{
                  fontFamily: "Serif",
                  fontSize: "2rem", // Smaller font for mobile
                }}
              >
                <div>{milk.name}</div>
                <div className="ponnala-regular">{milk.telName}</div>
              </h3>
              <div className="card-img-top">
                <img
                  src={`${process.env.PUBLIC_URL}${milk.image}`}
                  alt={milk.name}
                  style={{
                    width: "100%",
                    height: "200px", // Adjust height for mobile
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="card-body">
                <dl>
                  <div className="d-flex justify-content-between">
                    <dt>Quantity</dt>
                    <dd>{milk.quantity}</dd>
                  </div>
                  <div className="d-flex justify-content-between">
                    <dt>Expiry</dt>
                    <dd>{milk.expiry}</dd>
                  </div>
                  <div className="d-flex justify-content-between">
                    <dt>Price</dt>
                    <div className="d-flex flex-column align-items-end">
                      <dd className="text-danger text-decoration-line-through">
                        ₹{milk.oldprice}
                      </dd>
                      <dd className="text-success fs-5 fw-bold">
                        ₹{milk.price}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center justify-content-around w-100">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleDecreaseNoOfItems(milk.name)}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>
                    {cart[milk.name]?.noOfItems || 0}
                  </span>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleIncreaseNoOfItems(milk.name)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-primary btn-sm w-100"
                  onClick={() => handleAddToCart(milk)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div
              className="text-center bg-dark text-white fw-bold p-1 mt-2 rounded"
              style={{
                fontStyle: "italic",
                fontSize: "0.8rem", // Smaller font for mobile
                marginBottom: "1.7rem",
              }}
            >
              {milkQuotations[index % milkQuotations.length]}
            </div>
          </SwiperSlide>
        ))}
        <div
          className="swiper-button-prev"
          style={{
            position: "absolute",
            top: "50%",
            marginLeft: "15px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transform: "translateY(-50%)",
          }}
        ></div>{" "}
        <div
          className="swiper-button-next"
          style={{
            position: "absolute",
            top: "50%",
            marginRight: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transform: "translateY(-50%)",
          }}
        ></div>
      </Swiper>

      <img
        src={`${process.env.PUBLIC_URL}${`/images/Am-logo1.png`}`}
        alt="AV pickles logo"
        style={{ width: "100%", marginTop: "1rem" }}
      />

      {/* Ghee Products  */}
      <h2 className="text-center">Ghee Products</h2>
      <Swiper
        className="d-flex flex-column"
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1} // Default for mobile
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 15 }, // 1 slide on small screens
          768: { slidesPerView: 2, spaceBetween: 20 }, // 2 slides on medium screens
          1024: { slidesPerView: 3, spaceBetween: 30 }, // 3 slides on larger screens
        }}
        style={{ position: "relative" }}
      >
        {ghee.map((ghee, index) => (
          <SwiperSlide key={index}>
            <div
              className="card p-1 d-flex justify-content-center"
              style={{
                backgroundColor: "#EFF3EA",
                maxWidth: "90%", // Restrict width for mobile
                marginLeft: "5%",
              }}
            >
              <h3
                className="card-title d-flex flex-column fw-bold pb-1 pt-1 text-center"
                style={{
                  fontFamily: "Serif",
                  fontSize: "2rem", // Smaller font for mobile
                }}
              >
                <div>{ghee.name}</div>
                <div className="ponnala-regular">{ghee.telName}</div>
              </h3>
              <div className="card-img-top">
                <img
                  src={`${process.env.PUBLIC_URL}${ghee.image}`}
                  alt={ghee.name}
                  style={{
                    width: "100%",
                    height: "250px", // Adjust height for mobile
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="card-body">
                <dl>
                  <div className="d-flex justify-content-between">
                    <dt>Quantity</dt>
                    <dd>{ghee.quantity}</dd>
                  </div>
                  <div className="d-flex justify-content-between">
                    <dt>Expiry</dt>
                    <dd>{ghee.expiry}</dd>
                  </div>
                  <div className="d-flex justify-content-between">
                    <dt>Price</dt>
                    <div className="d-flex flex-column align-items-end">
                      <dd className="text-danger text-decoration-line-through">
                        ₹{ghee.oldprice}
                      </dd>
                      <dd className="text-success fs-5 fw-bold">
                        ₹{ghee.price}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center justify-content-around w-100">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleDecreaseNoOfItems(ghee.name)}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>
                    {cart[ghee.name]?.noOfItems || 0}
                  </span>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleIncreaseNoOfItems(ghee.name)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-primary btn-sm w-100"
                  onClick={() => handleAddToCart(ghee)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div
              className="text-center bg-dark text-white fw-bold p-1 mt-2 rounded"
              style={{
                fontStyle: "italic",
                fontSize: "0.8rem", // Smaller font for mobile
                marginBottom: "1.7rem",
              }}
            >
              {gheeQuotations[index % gheeQuotations.length]}
            </div>
          </SwiperSlide>
        ))}
        <div
          className="swiper-button-prev"
          style={{
            position: "absolute",
            top: "50%",
            marginLeft: "15px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transform: "translateY(-50%)",
          }}
        ></div>{" "}
        <div
          className="swiper-button-next"
          style={{
            position: "absolute",
            top: "50%",
            marginRight: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transform: "translateY(-50%)",
          }}
        ></div>
      </Swiper>
    </div>
  );
}
