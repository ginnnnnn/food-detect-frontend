import React from "react";

import Modal from "../UI/Modal/Modal";

const FoodRecoginition = ({ url, show, canceled, foodIngredients }) => {
  const highrateArray = foodIngredients.slice(0, 5);
  const SmellsIngredients = highrateArray.map(ing => {
    return <li key={ing.name}>{ing.name}</li>;
  });
  return (
    <Modal show={show} canceled={canceled}>
      <div className="center w-90 pa1 bg-white shadow-3 tc">
        <img className="mw-100 " src={url} alt="food" />
      </div>
      <h4>Hmm I can smell some..</h4>
      {foodIngredients.length >= 5 ? (
        <ul>{SmellsIngredients}</ul>
      ) : foodIngredients.length ? (
        <h4>something wrong</h4>
      ) : (
        <h4>Loading</h4>
      )}
    </Modal>
  );
};

export default FoodRecoginition;
