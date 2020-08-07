import React, { Component } from "react";
import { authAxios } from "../../../authAxios";
import { Form, Button, Card } from "react-bootstrap";
import Select from "react-select";
import { fetchUser } from "../../../actions/user";
import { connect } from "react-redux";

import {
  orderFilterURL,
  orderStatusListURL,
  areaFilterURL
} from "../../../constants";
import Result from "./result";

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      areas: [],
      area: "",
      orderStatus: [],
      order_status: "",
      form: {
        phone_number: "",
        name: ""
      }
    };
  }

  componentDidMount() {
    this.fetchAreas();
    this.fetchOrders();
    this.fetchOrderStatus();
    this.props.fetchUserType();
  }

  //   const order_status =
  //     values["order_status"] === undefined ? null : values["order_status"];
  //   const area =
  //     values["SelectedArea"] === undefined ? null : values["SelectedArea"];
  //   const name = values["name"] === undefined ? null : values["name"];
  //   const phone_number =
  //     values["phone_number"] === undefined ? null : values["phon_number"];

  fetchOrders = e => {
    // e.preventDefault();

    const { area, order_status, phone_number, name } = this.state;
    console.log(order_status);
    const { userType } = this.props;
    authAxios
      .get(orderFilterURL, {
        params: {
          userType,
          area,
          order_status,
          phone_number,
          name
        }
      })
      .then(res => {
        // setOrders(res.data);
        this.setState({ orders: res.data });
      })
      .catch(err => {
        this.setState({ loading: false, error: err });
      });
  };

  fetchOrderStatus = () => {
    authAxios
      .get(orderStatusListURL)
      .then(res => {
        // SetOrderStatus(res.data);
        this.setState({ orderStatus: res.data });
      })
      .catch(err => {
        // this.setState({
        //   error: err.message,
        //   loading: false
        // });
      });
    // });
  };

  fetchAreas = () => {
    authAxios
      .get(areaFilterURL)
      .then(res => {
        // setAreas(res.data);
        this.setState({ areas: res.data });
      })
      .catch(err => {
        // this.setState({
        //   error: err.message,
        //   loading: false
        // });
      });
    // });
  };

  handleChangeArea = selectedArea => {
    this.setState({
      area: selectedArea.name
    });
  };
  handleChangeStatus = status => {
    this.setState({
      order_status: status.name
    });
  };

  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({ form: { ...this.state.form, [fieldName]: fleldVal } });
    // console.log(this.state.form.customer_name);
  }

  render() {
    // console.log(this.state.order_status);
    const {
      order_status,
      orderStatus,
      areas,
      area,
      name,
      orders,
      phone_number
    } = this.state;
    console.log(orders);

    return (
      <div>
        <Card ClassName="h-100 shadow-sm bg-white rounded">
          <Card.Body ClassName="d-flex felx-column">
            <div ClassName="a-flex mb-2 justify-content-between">
              <Select
                className="mb-3"
                onChange={this.handleChangeStatus}
                getOptionLabel={option => `${option.name}`}
                getOptionValue={option => `${option}`}
                options={orderStatus}
                isSearchable={true}
                //   filterOption={this.customFilter}
                onInputChange={this.handleInputChange}
                noOptionsMessage={() => null}
                placeholder={"Select order status"}
                autoFocus={true}
                menuIsOpen={this.state.menuOpen}
              />

              <Select
                className="mb-3"
                onChange={this.handleChangeArea}
                getOptionLabel={option => `${option.name}`}
                getOptionValue={option => `${option}`}
                options={areas}
                isSearchable={true}
                //   filterOption={this.customFilter}
                onInputChange={this.handleInputChange}
                noOptionsMessage={() => null}
                placeholder={"Select area"}
                autoFocus={true}
                menuIsOpen={this.state.menuOpen}
              />
              <Form>
                <Form.Group controlId="formGridcustomer_name">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Customer Name"
                    ClassName="mb-3"
                    defaultValue={this.state.form.name}
                    onChange={this.handleChange.bind(this)}
                  />
                </Form.Group>
                <Form.Group controlId="formGridphone_number">
                  <Form.Control
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    ClassName="mb-3"
                    defaultValue={this.state.form.phone_number}
                    onChange={this.handleChange.bind(this)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  //   type="submit"
                  onClick={this.fetchOrders}
                >
                  Submit
                </Button>
              </Form>
            </div>
          </Card.Body>
        </Card>
        {orders ? (
          <div>
            <Result orders={orders} />
          </div>
        ) : (
          <p>No order to show</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.user.user.UserType,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserType: () => dispatch(fetchUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Manage);
