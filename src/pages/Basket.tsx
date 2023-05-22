// import React, { useEffect, useState } from 'react';
import jwtDecode from "jwt-decode";
import { fetchOneBasket } from "../http/deviceApi";

// function Basket() {
//   const [basket, setBasket] = useState<any>();
//   const token = localStorage.getItem("token");
//   let user: { role?: string; id?: number } = {};
//   if (token) user = jwtDecode(token);

//   useEffect(() => {
//     user && user.id && fetchOneBasket(user.id).then((data: any) => console.log(data));
//   }, []);

//   return (
//     <div>
//       Basket
//     </div>
//   );
// }

// export default Basket;
import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useHistory } from "react-router-dom";
import { CHECKOUT_ROUTE, DEVICE_ROUTE, SHOP_ROUTE } from "../utils/constants";
import { Button } from "react-bootstrap";

export default function Basket() {
  const [basket, setBasket] = useState<any>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const token = localStorage.getItem("token");
  let user: { role?: string; id?: number } = {};
  if (token) user = jwtDecode(token);
  const history = useHistory();

  useEffect(() => {
    user &&
      user.id &&
      fetchOneBasket(user.id).then((data: any) => {
        setBasket(data);
        let total: number = 0;
        data.map((datum: any) => {
          total += datum.quantity * datum.device.price;
        });
        setSubtotal(total);
      });
  }, []);

  const handleCount = (type: string) => {
    switch (type) {
      case "minus":
        count > 1 && setCount(count - 1);
        break;
      case "plus":
        setCount(count + 1);
        break;
      default:
        break;
    }
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">
                      <a href={SHOP_ROUTE} className="text-body">
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
                        shopping
                      </a>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">
                          You have {basket?.length} items in your cart
                        </p>
                      </div>
                      {/* <div>
                        <p>
                          <span className="text-muted">Sort by:</span>
                          <a href="#!" className="text-body">
                            price
                            <MDBIcon fas icon="angle-down mt-1" />
                          </a>
                        </p>
                      </div> */}
                    </div>
                    {basket?.map((item: any) => (
                      <MDBCard className="mb-3" key={item.id}>
                        <MDBCardBody>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ cursor: "pointer" }}>
                                <MDBCardImage
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                  fluid
                                  className="rounded-3"
                                  style={{ width: "65px" }}
                                  alt="Shopping item"
                                  onClick={() =>
                                    history.push(
                                      DEVICE_ROUTE + "/" + item?.device?.id
                                    )
                                  }
                                />
                              </div>
                              <div className="ms-3">
                                <MDBTypography tag="h5">
                                  {item?.device?.name}
                                </MDBTypography>
                                {/* <p className="small mb-0">256GB, Navy Blue</p> */}
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "50px" }}>
                                <MDBTypography
                                  tag="h5"
                                  className="fw-normal mb-0"
                                >
                                  {item?.quantity}
                                </MDBTypography>
                              </div>
                              <div style={{ width: "80px" }}>
                                <MDBTypography tag="h5" className="mb-0">
                                  {+item?.device?.price * +item?.quantity}AMD
                                </MDBTypography>
                              </div>
                              <a href="#!" style={{ color: "#cecece" }}>
                                <MDBIcon fas icon="trash-alt" />
                              </a>
                            </div>
                          </div>
                        </MDBCardBody>
                        {/* <div className="d-flex  align-items-center justify-content-center column gap-2">
                        <Button
                          variant="outline-dark"
                          onClick={() => handleCount("minus")}
                        >
                          -
                        </Button>
                        <h5>{item?.quantity}</h5>
                        <Button
                          variant="outline-dark"
                          onClick={() => handleCount("plus")}
                        >
                          +
                        </Button>
                      </div> */}
                      </MDBCard>
                    ))}
                  </MDBCol>
                  <MDBCol lg="5">
                    <MDBCard className="bg-primary text-white rounded-3">
                      <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5" className="mb-0">
                            Card details
                          </MDBTypography>
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            fluid
                            className="rounded-3"
                            style={{ width: "45px" }}
                            alt="Avatar"
                          />
                        </div>
                        {/* 
                        <p className="small">Card type</p>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-visa fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-amex fa-2x me-2" />
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                        </a>

                        <form className="mt-4">
                          <MDBInput
                            className="mb-4"
                            label="Cardholder's Name"
                            type="text"
                            size="lg"
                            placeholder="Cardholder's Name"
                            contrast
                          />

                          <MDBInput
                            className="mb-4"
                            label="Card Number"
                            type="text"
                            size="lg"
                            placeholder="1234 5678 9012 3457"
                            contrast
                          />

                          <MDBRow className="mb-4">
                            <MDBCol md="6">
                              <MDBInput
                                className="mb-4"
                                label="Expiration"
                                type="text"
                                size="lg"
                                placeholder="MM/YYYY"
                                contrast
                              />
                            </MDBCol>
                            <MDBCol md="6">
                              <MDBInput
                                className="mb-4"
                                label="Cvv"
                                type="text"
                                size="lg"
                                placeholder="&#9679;&#9679;&#9679;"
                                contrast
                              />
                            </MDBCol>
                          </MDBRow>
                        </form> */}

                        <hr />

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">{subtotal}AMD</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">{subtotal ? 2000 : 0}AMD</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">
                            {subtotal ? subtotal + 2000 : 0}AMD
                          </p>
                        </div>
                        <Button
                          variant="outline-light"
                          onClick={() => history.push(CHECKOUT_ROUTE)}
                          disabled={!subtotal}
                        >
                          Checkout
                          <i className="fas fa-long-arrow-alt-right ms-2"></i>
                        </Button>
                        {/* <MDBBtn color="info" block size="lg" onClick={() => history.push("")}>
                          <div className="d-flex justify-content-between">
                            <span>{subtotal+2000}AMD</span>
                            <span>
                              Checkout{" "}
                              <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </MDBBtn> */}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
