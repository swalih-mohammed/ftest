import React, { useState } from "react";
import { connect } from "react-redux";
import { authSignup } from "../../../actions/auth";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { authAxios } from "../../../authAxios";
import { registerComplaintURL } from "../../../constants";
import { useFormik, Field } from "formik";

const AddProduct = props => {
  const [saving, setSaving] = useState(false);
  const formik = useFormik({
    initialValues: {
      applicant: props.currentUser,
      name: "",
      phone_number: "",
      order_number: "",
      detail: ""
    },
    onSubmit: values => {
      console.log(values);
      const title = values["title"] === undefined ? null : values["title"];
      const applicant = props.currentUser;
      const price = values["price"] === undefined ? null : values["price"];
      const quantity =
        values["quantity"] === undefined ? null : values["quantity"];
      const category =
        values["category"] === undefined ? null : values["category"];
      const discount_price =
        values["discount_price"] === undefined
          ? null
          : values["discount_price"];

      const description =
        values["description"] === undefined ? null : values["description"];
      const image = values["image"] === undefined ? null : values["image"];
      const is_available =
        values["is_available"] === undefined ? null : values["is_available"];

      const is_featured =
        values["is_featured"] === undefined ? null : values["is_featured"];
      const is_on_sale =
        values["is_on_sale"] === undefined ? null : values["is_on_sale"];

      setSaving(true);
      authAxios
        .post(registerComplaintURL, {
          title: title,
          quantity: quantity,
          applicant: applicant,
          price: price,
          discount_price: discount_price,
          category: category,
          description: description,
          image: image,
          is_available: is_available,
          is_on_sale: is_on_sale
        })
        .then(res => {
          setSaving(false);
        })
        .catch(err => {
          // this.setState({ loading: false, error: err });
        });
    }
  });

  // console.log(props.currentUser);

  return (
    <div>
      <section className="register-page section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3>Add a product</h3>
              <div className="theme-card">
                <form className="theme-form" onSubmit={formik.handleSubmit}>
                  <div className="form-row">
                    <div className="col-md-6">
                      <label htmlFor="email">Prodcut Name</label>
                      <input
                        className="form-control"
                        id="title"
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email">Quantity [KG]</label>
                      <input
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.quantity}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6">
                      <label htmlFor="email">Price</label>
                      <input
                        className="form-control"
                        id="title"
                        name="price"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email">Discount Price</label>
                      <input
                        className="form-control"
                        id="title"
                        name="discount_price"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.discount_price}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6">
                      <label htmlFor="email">Category</label>
                      <select
                        className="form-control"
                        id="discount_price"
                        name="category"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="review">Image</label>
                      <image
                        className="form-control"
                        id="image"
                        name="image"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.image}
                      />
                    </div>

                    <input
                      type="submit"
                      className="btn btn-solid"
                      id="submit"
                      placeholder="Submit"
                      required=""
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.user.userID
  };
};

export default connect(mapStateToProps)(AddProduct);
