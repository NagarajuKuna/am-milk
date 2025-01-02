export function NavbarTop() {
  return (
    <div
      className="container-fluid d-100 text-center text-white fw-bold justify-content-center sticky-top pb-1"
      style={{ backgroundColor: "black" }}
    >
      <div className="fs-1 mb-0 pb-0">
        <span className="d-flex mb-0 pb-0 align-items-center justify-content-center">
          <img
            src={`${process.env.PUBLIC_URL}${`/images/Am-logo1.png`}`}
            alt="AV pickles logo"
            style={{ width: "30%" }}
          ></img>
          <span style={{ fontSize: "2.5rem" }}> PURE MILK</span>
        </span>
      </div>
    </div>
  );
}
