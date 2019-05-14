import React, { Component } from "react";

class SignIn extends Component {
  state = {
    signInEmail: "",
    signInPassword: "",
    error: ""
  };

  onSignInChange = event => {
    if (event.target.type === "email") {
      this.setState({ signInEmail: event.target.value });
    } else if (event.target.type === "password") {
      this.setState({ signInPassword: event.target.value });
    }
  };
  onAuthSignIn = e => {
    e.preventDefault();
    fetch("https://fathomless-oasis-25099.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.id) {
          this.props.loadUser(res);
          this.props.changeRoute("home");
        } else {
          this.setState({ signInEmail: "", signInPassword: "", error: res });
        }
      });
  }; //post to /signin api by json data

  render() {
    const { changeRoute } = this.props;
    const { signInEmail, signInPassword, error } = this.state;

    return (
      <article className="tc br2 ba dark-gray b--black-10 mv4 w-90 w-60-m w-30-l center shadow-5">
        <main className="pa4 black-80">
          {error !== "" ? <p>{error}</p> : null}
          <form className="measure center">
            <fieldset className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Email</label>
                <input
                  onChange={this.onSignInChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  value={signInEmail}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6">Password</label>
                <input
                  onChange={this.onSignInChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  autoComplete="false"
                  value={signInPassword}
                />
              </div>
            </fieldset>
            <div className="">
              <button
                onClick={this.onAuthSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              >
                Sign in
              </button>
            </div>
            <div className="lh-copy mt3">
              <div
                onClick={() => changeRoute("")}
                className="f6 link dim black db pointer grey"
              >
                Not a member?Sign Up
              </div>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default SignIn;
