import React, { useState, useEffect } from "react";
import { AddressPicker } from "./addressPicker";

export function Cart({ cart, setCartItems }) {
  const phoneNumber = "9133942256"; // Replace with your number
  const [showModal, setShowModal] = useState(false);
  const [custName, setCustName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  useEffect(() => {
    console.log(cart);
  }, [cart]);
  const calculateTotalAmount = () => {
    return Object.values(cart).reduce((total, item) => {
      if (item && item.price && item.noOfItems) {
        return total + item.price * item.noOfItems;
      }
      return total;
    }, 0);
  };

  const handleOrder = () => {
    if (!custName || !mobileNumber) {
      alert("Please provide Name and Mobile Number.");
      return; // Prevent the order from being placed
    }
    // Generate the cart details message
    const cartDetails = Object.values(cart)
      .map(
        (item) =>
          `- ${item.name} ${
            parseInt(item.quantity.replace(/\D/g, ""), 10) * item.noOfItems
          }ml = ₹${item.noOfItems * item.price}`
      )
      .join("\n\n");

    const totalAmount = Object.values(cart).reduce(
      (total, item) => total + item.noOfItems * item.price,
      0
    );

    const locationLink = coordinates
      ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
      : "";

    const locationInfo = coordinates
      ? `Coordinates: (${coordinates.lat}, ${coordinates.lng})\n\nLocation:\n${locationLink}`
      : "";

    const message = encodeURIComponent(
      `Hi AM Pure Milk, I'm ${custName}, I've found your Milk Products from your Website.\n\n*Order Details*:\n${cartDetails}\n\n*Total Amount*: ₹${totalAmount} \n\n*Address Details*:\nName: ${custName}\nMobile No: ${mobileNumber}\nAddress: ${selectedAddress}\n${locationInfo}`
    );

    // Redirect to WhatsApp with the generated message
    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
    handleCloseModal();
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCustName("");
    setSelectedAddress("");
    setCoordinates(null);
  };

  const handleRemoveItem = (pickleName) => {
    setCartItems((prevCart) => {
      const { [pickleName]: _, ...remainingCart } = prevCart;
      return remainingCart;
    });
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center my-4">Your Cart</h2>
      {Object.keys(cart).length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Your cart is empty.
        </div>
      ) : (
        <div className="row">
          {Object.values(cart).map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="card">
                <img
                  src={`${process.env.PUBLIC_URL}${item.image}`}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Price: ₹{item.price}</p>
                  <p className="card-text">Quantity: {item.noOfItems}</p>
                  <p className="cart-text">
                    Total : ₹{item.noOfItems * item.price}
                  </p>
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => handleRemoveItem(item.name)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h4>Total Amount: ₹{calculateTotalAmount()}</h4>
        <button
          className="btn btn-success"
          disabled={Object.keys(cart).length === 0}
          onClick={() => handleOpenModal()}
        >
          Order
        </button>
      </div>
      {showModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "500px",
            }}
          >
            <h4>Enter Your Address</h4>
            <div>
              <label className="fw-bold">Name</label>
              <input
                type="text"
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              {/* <label className="fw-bold">D.No</label>
              <input
                type="text"
                value={doorNumber}
                onChange={(e) => setDoorNumber(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <label className="fw-bold">Street</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <label className="fw-bold">Village/City</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <label className="fw-bold">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <label className="fw-bold">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              /> */}
              <label className="fw-bold">Mobile No</label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>

            <h4>Enter Your Address</h4>

            <AddressPicker
              setAddress={setSelectedAddress}
              setCoordinates={setCoordinates}
            />
            <div>
              <label>Selected Address:</label>
              <textarea
                value={selectedAddress}
                readOnly
                style={{
                  width: "100%", // Full width of the modal
                  height: "100px", // Increase height to fit more lines
                  marginTop: "10px", // Add some spacing
                  padding: "10px", // Add padding for better readability
                  resize: "none", // Optional: prevent resizing by the user
                }}
              />
            </div>
            <button
              onClick={handleOrder}
              style={{
                padding: "10px 20px",
                backgroundColor: "#25D366",
                color: "#fff",
                borderRadius: "5px",
                marginBottom: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Order
            </button>
            <button
              onClick={handleCloseModal}
              style={{
                padding: "10px 20px",
                backgroundColor: "red",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
