import { useState, useEffect } from "react";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import "./Curso.css";
import "./Element.css";

import Checkbox from "react-simple-checkbox";

const Curso = ({
  id,
  title,
  price,
  checked,
  quantity,
  handleIncluir,
  updateCourseQuantity,
}) => {
  const [isChecked, setisChecked] = useState(false);
  const [courseQuantity, setCourseQuantity] = useState(null);

  useEffect(() => {
    if (checked) {
      setisChecked(true);
    } else {
      setisChecked(false);
    }

    if (quantity) {
      setCourseQuantity(quantity);
    } else {
      setCourseQuantity(1);
    }
  }, [checked, quantity]);

  const handleOnChange = (e) => {
    setisChecked(!isChecked);

    handleIncluir(e, {
      id,
      title,
      price,
      courseQuantity: 1,
    });
  };

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
                onChange={(e) => {
                  handleOnChange(e);
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
                    updateCourseQuantity({
                      id,
                      title,
                      price,
                      courseQuantity: courseQuantity - 1,
                    });
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
                    updateCourseQuantity({
                      id,
                      title,
                      price,
                      courseQuantity: courseQuantity + 1,
                    });
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

export default Curso;
