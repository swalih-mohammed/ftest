import React, { Component } from "react";
import { Link } from "react-router-dom";

class ModeOfPayment extends Component {
  state = {
    isChecked: false
  };

  handleChange = e => {
    this.props.handleModeOfPayment(e);
    this.toggleChange();
  };
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  render() {
    const { mode } = this.props;
    return (
      <div key={mode.id} className="row">
        <div className="col-lg-3">
          <div className="dashboard-left">
            <div className="collection-mobile-back">
              <span className="filter-back">
                <i className="fa fa-angle-left" aria-hidden="true"></i> back
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="dashboard-right">
            <div className="dashboard">
              <div className="box-account box-info">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="box">
                      <div className="radio">
                        <form>
                          <label>
                            <input
                              value={mode.id}
                              type="radio"
                              checked={this.state.isChecked}
                              name="optradio"
                              onChange={this.handleChange}
                              //   onChange={this.props.handleModeOfPayment}
                            />
                            {"  "}
                            {mode.name}
                          </label>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModeOfPayment;
