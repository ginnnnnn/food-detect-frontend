import React, { Component } from "react";

import Particles from "react-particles-js";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FoodRecognition from "./components/FoodRecognition/FoodRecoginition";
import SignIn from "./components/auth/SignIn/SignIn";
import Register from "./components/auth/Register/Register";

const initialState = {
  input: "",
  imageUrl: "",
  showModal: false,
  foodIngredients: [],
  route: "",
  isAuthed: false,
  user: {
    id: 0,
    username: "",
    email: "",
    entries: 0,
    join: ""
  }
};

const particlesConfig = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true
      }
    },
    size: {
      value: 10,
      random: true
    },
    move: {
      direction: "bottom",
      out_mode: "out"
    },
    line_linked: {
      enable: false
    }
  }
};

class App extends Component {
  state = {
    input: "",
    imageUrl: "",
    showModal: false,
    foodIngredients: [],
    route: "",
    isAuthed: false,
    user: {
      id: 0,
      username: "",
      email: "",
      entries: 0,
      join: ""
    }
  };

  componentDidMount() {
    fetch("https://fathomless-oasis-25099.herokuapp.com/").then(res =>
      console.log(res)
    );
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
      showModal: true
    });
    //also trigger render
    fetch("https://fathomless-oasis-25099.herokuapp.com/imageurl", {
      //send url to predict image first use post
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        url: this.state.input
      })
    })
      .then(res => res.json())
      .then(response => {
        //response ingredient array
        if (response.length <= 0) {
          return this.setState({
            input: "",
            foodIngredients: [response]
          });
        } else {
          this.setState({
            input: "",
            foodIngredients: response
          });
        }
        fetch(`https://fathomless-oasis-25099.herokuapp.com/image`, {
          method: "put",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            id: this.state.user.id,
            url: this.state.input
          })
        })
          .then(res => res.json())
          .then(count => {
            //increment entries
            this.setState({ user: { ...this.state.user, entries: count } });
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({ imageUrl: "" });
      });
  };

  onModalShow = () => {
    this.setState({ showModal: false, foodIngredients: [] });
  };

  onRouteChange = route => {
    if (route === "home") {
      this.setState({ isAuthed: true });
    } else {
      this.setState(initialState); // when logout reset state
    }
    this.setState({ route: route });
  };

  loadUser = user => {
    this.setState({ user: user });
  };

  render() {
    const {
      input,
      imageUrl,
      showModal,
      foodIngredients,
      route,
      isAuthed,
      user
    } = this.state;
    return (
      <div>
        <Particles className="particles" params={particlesConfig} />
        <Navigation changeRoute={this.onRouteChange} isAuthed={isAuthed} />
        {route === "home" ? (
          <React.Fragment>
            <Logo />
            <Rank user={user} />
            <ImageLinkForm
              urlInput={this.onInputChange}
              text={input}
              buttonClick={this.onButtonSubmit}
            />
            <FoodRecognition
              url={imageUrl}
              show={showModal}
              canceled={this.onModalShow}
              foodIngredients={foodIngredients}
            />
          </React.Fragment>
        ) : route === "signIn" ? (
          <SignIn
            loadUser={this.loadUser}
            user={user}
            changeRoute={this.onRouteChange}
          />
        ) : (
          <Register
            loadUser={this.loadUser}
            user={user}
            changeRoute={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
