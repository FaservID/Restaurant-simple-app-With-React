import axios from "axios";
import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";

export default class Success extends Component {
  componentDidMount() {
    axios
      .get(`${API_URL}/keranjangs`)
      .then((res) => {
        const carts = res.data;
        carts.map(async function (cart) {
          try {
            const res = await axios
              .delete(`${API_URL}/keranjangs/${cart.id}`);
            return console.log(res);
          } catch (error) {
            return console.log(error);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/order_confirmed.png" width="500" />
        <h2>Berhasil Dipesan!</h2>
        <p>Terima Kasih Sudah Memesan!</p>
        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
