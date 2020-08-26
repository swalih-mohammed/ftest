import React, { useState } from "react";
import { connect } from "react-redux";
import { authSignup } from "../../../actions/auth";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { authAxios } from "../../../authAxios";
import { registerComplaintURL } from "../../../constants";
import { useFormik, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = props => {
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
      const applicant = props.currentUser;
      const name = values["name"] === undefined ? null : values["name"];
      const phone_number =
        values["phone_number"] === undefined ? null : values["phone_number"];
      const order_number =
        values["order_number"] === undefined ? null : values["order_number"];
      const detail = values["detail"] === undefined ? null : values["detail"];

      authAxios
        .post(registerComplaintURL, {
          applicant: applicant,
          name: name,
          phone_number: phone_number,
          order_number: order_number,
          detail: detail,
          status: "pending"
        })
        .then(res => {
          toast.success(
            "Thank you for contacting us! You may receive a call from us soon :)"
          );
          setSaving(true);
        })
        .catch(err => {
          toast.error("Oops there was an error");
          // this.setState({ loading: false, error: err });
        });
    }
  });
  if (saving) {
    return <Redirect to="/" />;
  }
  if (!props.token) {
    return <Redirect to="/login" />;
  }
  // console.log(props.currentUser);

  return (
    <div>
      <ToastContainer />
      <Breadcrumb title={"My Orders"} />
      <section className="register-page section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3>Contact Us</h3>
              <div className="theme-card">
                <form className="theme-form" onSubmit={formik.handleSubmit}>
                  <div className="form-row">
                    <div className="col-md-6">
                      <label htmlFor="email">Your Name</label>
                      <input
                        className="form-control"
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="review">Phone Number</label>
                      <input
                        className="form-control"
                        id="phone_number"
                        name="phone_number"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.phone_number}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6">
                      <label htmlFor="email">Do you have an order ID?</label>
                      <input
                        className="form-control"
                        id="order_number"
                        name="order_number"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.order_number}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="review">What is your concern?</label>
                      <textarea
                        className="form-control"
                        id="details"
                        name="details"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.details}
                      />
                      <br></br>
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
    currentUser: state.user.user.userID,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Register);
