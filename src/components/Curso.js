import { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import "./Curso.css";
import "./Element.css";

import Checkbox from "react-simple-checkbox";

const Extras = ({ id, title, price }) => {
  const [isChecked, setisChecked] = useState(false);
  const [courseQuantity, setCourseQuantity] = useState(1);

  return (
    <>
      <div className="curso__cursoContainer">
        <div className="curso__curso">
          <div className="curso__info">
            <div className="curso__infoTitle">{title}</div>
            <div className="curso__infoPrecio">{price}€</div>
          </div>
          <div className="curso__checkboxContainer">
            <div className="curso__checkboxIncluir">Incluir</div>
            <div className="curso__checkbox">
              <Checkbox
                checked={isChecked}
                size={4}
                color="#499BB1"
                tickAnimationDuration="100"
                backAnimationDuration="100"
                onChange={() => {
                  setisChecked(!isChecked);
                  console.log(id);
                }}
              />
            </div>
          </div>
        </div>
        {isChecked && (
          <div className="curso__bottomIcons">
            <div className="element__icons">
              <div className="element__profileIcon">
                <PersonOutlineIcon style={{ fontSize: 30 }} />
              </div>
              <div className="element__decrement">
                <button
                  onClick={() => {
                    setCourseQuantity(courseQuantity - 1);
                  }}
                  disabled={courseQuantity == 1}
                >
                  <RemoveCircleOutlineIcon style={{ fontSize: 30 }} />
                </button>
              </div>
              <div className="element__counter">{courseQuantity}</div>
              <div className="element__increment">
                <button
                  onClick={() => {
                    setCourseQuantity(courseQuantity + 1);
                  }}
                >
                  <AddCircleOutlineIcon style={{ fontSize: 30 }} />
                </button>
              </div>
            </div>
            <div></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Extras;
