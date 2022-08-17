import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const CartModal = ({
  handleClose,
  show,
  showCart,
  qty,
  desc,
  handleChange,
  handleSubmit,
  handlePlus,
  handleMinus,
  tempCost,
  handleDelete
}) => {
  //   console.log(qty)

  if (showCart) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {showCart.product.nama} -{" "}
            <strong>Rp. {numberWithCommas(showCart.product.harga)}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga : </Form.Label>
              <p>
                <strong>Rp. {numberWithCommas(tempCost)}</strong>
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah : </Form.Label>
              <Row>
                <Col>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleMinus()}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                  <span className="border px-5 py-1 mx-2">{qty}</span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handlePlus()}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="keterangan"
                placeholder="contoh : Pedas, Cabe dipisah"
                value={desc}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDelete(showCart.id)}>
            <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Koson</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default CartModal;
