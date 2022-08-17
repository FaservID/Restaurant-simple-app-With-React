import React, { useState } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import Payment from "./Payment";
import CartModal from "./CartModal";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

const Hasil = ({ carts, getCartList }, props) => {
  const [show, setShow] = useState(false);
  const [desc, setDesc] = useState("");
  const [tempCost, setTempCost] = useState(0);
  const [qty, setQty] = useState(0);
  const [showCart, setShowCart] = useState(false);

  const handleShow = (cart) => {
    setShowCart(cart);
    setShow(true);
    setQty(cart.jumlah);
    setTempCost(cart.total_harga);
    setDesc(cart.keterangan);
    // console.log(show)
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setDesc(e.target.value);
  };

  const handlePlus = () => {
    setQty(qty + 1);
    setTempCost(showCart.product.harga * (qty + 1));
    // console.log(tempCost)
  };

  const handleMinus = () => {
    if (qty > 1) {
      setQty(qty - 1);
      setTempCost(showCart.product.harga * (qty - 1));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    const data = {
      jumlah: qty,
      total_harga: tempCost,
      product: showCart.product,
      keterangan: desc,
    };
    axios
      .put(`${API_URL}/keranjangs/${showCart.id}`, data)
      .then((res) => {
        // console.log("response = ", res.data);
        getCartList();
        const carts = res.data;
        swal({
          title: "Berhasil!",
          text: "Pesanan Kamu Berhasil Diupdate!",
          icon: "success",
          button: false,
          timer: 1500,
        });
        this.setState({ carts });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    handleClose();

    axios
      .delete(`${API_URL}/keranjangs/${id}`)
      .then((res) => {
        // console.log("response = ", res.data);
        getCartList();
        swal({
          title: "Berhasil!",
          text: "Pesanan Kamu Berhasil Dihapus!",
          icon: "success",
          button: false,
          timer: 1500,
        });
        this.setState({ carts });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Col md={3} mt="2" className="mt-3">
      <h4>
        <strong>Hasil</strong>
      </h4>
      <hr />
      <Card className="overflow-auto hasil">
        <ListGroup variant="flush">
          {carts && carts.length > 0
            ? carts.map((cart) => (
                <ListGroup.Item key={cart.id} onClick={() => handleShow(cart)}>
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill bg="success">
                          {cart.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{cart.product.nama}</h5>
                      <p>Rp. {numberWithCommas(cart.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong className="float-end">
                        Rp. {numberWithCommas(cart.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            : ""}
        </ListGroup>
      </Card>
      <Payment carts={carts} {...props} />

      {/* MODAL */}
      <CartModal
        show={show}
        showCart={showCart}
        handleClose={handleClose}
        {...props}
        qty={qty}
        desc={desc}
        setQty={setQty}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleMinus={handleMinus}
        handlePlus={handlePlus}
        tempCost={tempCost}
        handleDelete={handleDelete}
      />
    </Col>
  );
};

export default Hasil;
