import React, { useState } from "react";
import { connect } from "react-redux";
import { authSignup } from "../../../actions/auth";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { authAxios } from "../../../authAxios";
import { shopAddURL } from "../../../constants";
import { useFormik, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddShops = props => {
  const [saving, setSaving] = useState(false);
  const formik = useFormik({
    initialValues: {
      owner: props.currentUser,
      shopName: "",
      ownerName: "",
      phoneNumber: "",
      address: ""
    },
    onSubmit: values => {
      console.log(values);
      const owner = props.currentUser;
      const name = values["shopName"] === undefined ? null : values["shopName"];
      const owner_name =
        values["ownerName"] === undefined ? null : values["ownerName"];
      const address =
        values["address"] === undefined ? null : values["address"];
      const phone_number =
        values["phoneNumber"] === undefined ? null : values["phoneNumber"];

      // setSaving(true);
      authAxios
        .post(shopAddURL, {
          // params: {
          name: name,
          owner: owner,
          owner_name: owner_name,
          address: address,
          phone_number: phone_number
          // }
        })
        .then(res => {
          toast.success(
            "Thank you for adding your shop! You may receive a call from us soon :)"
          );
          setSaving(true);
        })
        .catch(err => {
          // this.setState({ loading: false, error: err });
        });
    }
  });

  if (saving) {
    return <Redirect to="/" />;
  }

  // console.log(props.currentUser);

  return (
    <div>
      <ToastContainer />
      <section className="register-page section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3>Add your shop</h3>
              <div className="theme-card">
                <form className="theme-form" onSubmit={formik.handleSubmit}>
                  <div className="form-row">
                    <div className="col-md-6">
                      <label htmlFor="email">Shop Name</label>
                      <input
                        className="form-control"
                        id="shopname"
                        name="shopName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.state}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="review">Owner Name</label>
                      <input
                        className="form-control"
                        id="ownername"
                        name="ownerName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.state}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6">
                      <label htmlFor="email">Phone Number</label>
                      <input
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.state}
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
                        value={formik.values.state}
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

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchUserType: () => dispatch(fetchUser())
//   };
// };

export default connect(mapStateToProps)(AddShops);

// export default AddShops;
