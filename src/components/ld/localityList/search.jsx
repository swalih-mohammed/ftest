import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Suggestions from "./searchSuggestions";
import style from "./searchStyle.css";
import { placeListURL } from "../../../constants";

class Search extends Component {
  state = {
    error: false,
    query: "all",
    results: [],
    offset: 0,
    limit: 20,
    display: false
  };

  getInfo = () => {
    const { offset, limit, query } = this.state;
    axios
      .get(placeListURL + `?limit=${limit}&offset=${offset}&q=${query}`)
      .then(res => {
        this.setState({ results: res.data.places, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          // this.showDropdown()
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        } else if (!this.state.query) {
          // this.hideDropdown()
        }
      }
    );
  };

  render() {
    const { results, display } = this.state;
    // console.log(results);

    return (
      <section className="authentication-page section-b-space">
        <div className="container">
          <section className="search-block">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <form className="form-header">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Amount (to the nearest dollar)"
                        placeholder="Search Localities......"
                        name="query"
                        ref={input => (this.search = input)}
                        onChange={this.handleInputChange}
                        autoComplete="off"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-solid">
                          {/* <i className="fa fa-search"></i>Search */}
                          <i>
                            <FontAwesomeIcon icon={faSearch} />
                          </i>
                        </button>
                      </div>
                    </div>
                    {/* {display ? ( */}
                    <div>
                      {results.map((value, i) => {
                        return (
                          <div className="option" key={i} tabIndex="0">
                            <Link
                              to={`${process.env.PUBLIC_URL}/places/${value.id}`}
                            >
                              <span>{value.name}</span>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                    {/* ) : (
                      ""
                    )} */}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default Search;
