import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";

const Payment = ({ carts }, props) => {
  const navigate = useNavigate();
  const submitCost = (cost) => {
    // const { history } = this.props;
    const orders = {
      total_bayar: cost,
      menus: carts,
    };

    axios.post(`${API_URL}/pesanans`, orders).then((res) => {
      navigate("/success");
    });
  };

  // console.log(this.props);
  const cost =
    carts.length > 0
      ? carts.reduce(function (result, item) {
          return result + item.total_harga;
        }, 0)
      : "";
  return (
    <>
      {/* // web */}
      <div className="fixed-bottom d-none d-md-block">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga :
              <strong className="float-end mr-2">
                Rp. {numberWithCommas(cost)}
              </strong>
            </h4>
            <div className="d-grid mb-3 mt-3">
              <Button variant="primary" onClick={() => submitCost(cost)}>
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      {/* // mobile */}
      <div className="d-sm-block d-md-none">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga :
              <strong className="float-end mr-2">
                Rp. {numberWithCommas(cost)}
              </strong>
            </h4>
            <div className="d-grid mb-3 mt-3">
              <Button variant="primary" onClick={() => submitCost(cost)}>
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Payment;
