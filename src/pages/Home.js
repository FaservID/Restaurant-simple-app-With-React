import "../App.css";
import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components/index";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      selectedCategory: "Makanan",
      carts: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/products?category.nama=${this.state.selectedCategory}`)
      .then((res) => {
        // console.log("response = ", res.data);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });



    this.getCartList();
  }

  changeCategory = (value) => {
    this.setState({
      selectedCategory: value,
      menus: [],
    });

    axios
      .get(`${API_URL}/products?category.nama=${value}`)
      .then((res) => {
        // console.log("response = ", res.data);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // componentDidUpdate(prevState) {
  //   if(this.state.carts !== prevState.carts) {
  //     axios
  //     .get(`${API_URL}/keranjangs`)
  //     .then((res) => {
  //       // console.log("response = ", res.data);
  //       const carts = res.data;
  //       this.setState({ carts });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   }
  // }

  getCartList = () => {
    axios
      .get(`${API_URL}/keranjangs`)
      .then((res) => {
        // console.log("response = ", res.data);
        const carts = res.data;
        this.setState({ carts });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  inCart = (value) => {
    axios
      .get(`${API_URL}/keranjangs?product.id=` + value.id)
      .then((res) => {
        // console.log("response = ", res.data);
        if (res.data.length === 0) {
          // console.log(value);
          const cart = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(`${API_URL}/keranjangs`, cart)
            .then((res) => {
              this.getCartList();
              // console.log("response = ", res.data);
              const carts = res.data;
              swal({
                title: "Berhasil!",
                text: "Menu Ini Sudah Masukke dalam Keranjang Kamu!",
                icon: "success",
                button: false,
                timer: 1500,
              });
              this.setState({ carts });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // console.log(value);
          const cart = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          axios
            .put(`${API_URL}/keranjangs/${res.data[0].id}`, cart)
            .then((res) => {
              // console.log("response = ", res.data);
              const carts = res.data;
              swal({
                title: "Berhasil!",
                text: "Menu Ini Sudah Masukke dalam Keranjang Kamu!",
                icon: "success",
                button: false,
                timer: 1500,
              });
              this.setState({ carts });
            })
            .catch((error) => {
              console.log(error);
            });
        }
        // const menus = res.data;
        // this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, selectedCategory, carts } = this.state;
    return (
      <div className="app">
        <div className="mt-4">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                selectedCategory={selectedCategory}
              />
              <Col className="mt-3">
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row className="overflow-auto menu">
                  {menus &&
                    menus.map((menu) => (
                      <Menus inCart={this.inCart} menu={menu} key={menu.id} />
                    ))}
                </Row>
              </Col>
              <Hasil carts={carts} {...this.props} getCartList={this.getCartList}/>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
