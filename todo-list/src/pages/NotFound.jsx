import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="container" style={{ textAlign: "center" }}>
        <div style={{ padding: "40px" }}>
          <div className="judul">
            ERROR 404 <br /> NOT FOUND
          </div>
          <p style={{ fontSize: "25px", marginTop: "50px" }}>
            Maaf, page tidak ditemukan, silahkan ulangi kembali
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
