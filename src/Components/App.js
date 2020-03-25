import React from "react";
import HouseInfo from "./HouseInfo";
import getRandomHouse from "./../NetworkRequest/fetch";

class App extends React.Component {
  state = {
    results: false,
    formValue: "",
    members: {},
    errors: false,
    loading: false
  };

  logoRef = React.createRef();

  render() {
    const { loading, members, results, formValue, errors } = this.state;

    const Loading = () => <h1>...Loading</h1>;
    const Errors = () => <h1>Whooops! Something went wrong....</h1>;

    return (
      <div>
        <div className="header">
          <div className="logo" ref={this.logoRef}>
            <h1>Game of Thrones House Picker</h1>
          </div>
        </div>
        <div className="nameForm">
          <form onSubmit={this.submitForm}>
            <label>
              <input
                type="text"
                value={this.state.formValue}
                placeholder="Thy Name"
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Onwards" />
          </form>
        </div>
        {loading && <Loading />}
        {errors && <Errors />}
        <div className="house">
          {!loading && (
            <HouseInfo members={members} results={results} form={formValue} />
          )}
        </div>
      </div>
    );
  }

  handleChange = event => {
    this.setState({ formValue: event.target.value });
  };

  submitForm = async event => {
    this.logoRef.current.classList.remove("logo");
    this.logoRef.current.classList.add("fade-in");
    this.setState({ loading: true });
    event.preventDefault();

    let { results, members } =
      (await getRandomHouse().catch(e =>
        this.setState({
          errors: true,
          loading: false
        })
      )) || {};

    if (!this.state.errors) {
      this.setState({
        results,
        members,
        loading: false
      });
    }
  };
}

export default App;
