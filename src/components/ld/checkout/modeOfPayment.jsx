import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

class ModeOfPayment extends Component {
  constructor(props) {
    super(props);
  }
  handleCheckBox = e => {
    this.props.handleModeOfPayment(e.target.value);
  };

  // handleChange = e => {
  //   this.props.handleModeOfPayment(e);
  // };

  render() {
    const { options } = this.props;
    const initialValues = {
      modOfPayment: ""
    };

    return (
      <Formik initialValues={initialValues}>
        {formik => (
          <Form>
            <div className="form-control">
              <Field name="modOfPayment">
                {({ field }) => {
                  // console.log(field);
                  return options.map(option => {
                    // console.log(option);
                    return (
                      <React.Fragment key={option.id}>
                        <div className="row">
                          <div className="col-lg-3">
                            <div className="box">
                              <div className="radio">
                                <input
                                  type="radio"
                                  id={option.id}
                                  {...field}
                                  // {...rest}
                                  value={option.id}
                                  onChange={e => {
                                    this.handleCheckBox(e);
                                  }}
                                />
                                <label htmlFor={option.name}>
                                  {option.name}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  });
                }}
              </Field>
              {/* <ErrorMessage component={TextError} name={name} /> */}
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default ModeOfPayment;
