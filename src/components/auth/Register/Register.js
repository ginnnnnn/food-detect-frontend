import React, { Component } from "react";

class Register extends Component {
  state = {
    signUpEmail: "",
    signUpPassword: "",
    username: "",
    error: ""
  };

  onSignUpChange = event => {
    if (event.target.type === "email") {
      this.setState({ signUpEmail: event.target.value });
    } else if (event.target.type === "password") {
      this.setState({ signUpPassword: event.target.value });
    } else {
      this.setState({ username: event.target.value });
    }
  };
  onAuthSignUp = e => {
    e.preventDefault();
    fetch("https://fathomless-oasis-25099.herokuapp.com/register", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.signUpEmail,
        password: this.state.signUpPassword,
        username: this.state.username
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.id) {
          //only success when server response has id property
          //res ==user
          this.props.loadUser(res);
          this.props.changeRoute("home");
        } else {
          //res == error message
          this.setState({ signUpEmail: "", signUpPassword: "", error: res });
        }
      })
      .catch(err => console.log(err)); //to console
  };
  render() {
    const { changeRoute } = this.props;
    return (
      <article className="tc br2 ba dark-gray b--black-10 mv4 w-90 w-60-m w-30-l  center shadow-5">
        <main className="pa4 black-80">
          {this.state.error !== "" ? <p>{this.state.error}</p> : null}
          <form className="measure center">
            <fieldset className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Email</label>
                <input
                  onChange={this.onSignUpChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6">Password</label>
                <input
                  onChange={this.onSignUpChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  autoComplete="false"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6">Username</label>
                <input
                  onChange={this.onSignUpChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                />
              </div>
            </fieldset>
            <div className="">
              <button
                onClick={this.onAuthSignUp}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              >
                Sign Up
              </button>
            </div>
            <div className="lh-copy mt3">
              <div
                onClick={() => changeRoute("signIn")}
                className="f6 link dim black db pointer"
              >
                Already a member?Sign In
              </div>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;
