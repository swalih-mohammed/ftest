import React, { useState } from "react";
import { connect } from "react-redux";
import { authSignup } from "../../../actions/auth";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { authAxios } from "../../../authAxios";
import { candidateAddURL } from "../../../constants";
import { useFormik, Field } from "formik";

const Register = props => {
  const [saving, setSaving] = useState(false);
  const formik = useFormik({
    initialValues: {
      applicant: props.currentUser,
      name: "",
      phone_number: "",
      address: "",
      education: "",
      experience: ""
    },
    onSubmit: values => {
      console.log(values);
      const applicant = props.currentUser;
      const name = values["name"] === undefined ? null : values["name"];
      const phone_number =
        values["phone_number"] === undefined ? null : values["phone_number"];
      const education =
        values["education"] === undefined ? null : values["education"];
      const experience =
        values["experience"] === undefined ? null : values["experience"];
      const address =
        values["address"] === undefined ? null : values["address"];

      setSaving(true);
      authAxios
        .post(candidateAddURL, {
          applicant: applicant,
          name: name,
          phone_number: phone_number,
          education: education,
          experience: experience,
          address: address
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
              <h3>Work with us</h3>
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
                        id="phonenumber"
                        name="phone_number"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.phone_number}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6">
                      <label htmlFor="email">Experience</label>
                      <input
                        className="form-control"
                        id="experience"
                        name="experience"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.experience}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email">Education</label>
                      <input
                        className="form-control"
                        id="education"
                        name="education"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.education}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="review">Address</label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.address}
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
    currentUser: state.user.user.userID
  };
};

export default connect(mapStateToProps)(Register);
