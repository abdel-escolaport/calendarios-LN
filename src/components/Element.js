import { useState, useEffect } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import "../components/Element.css";

import { useSelector, useDispatch } from "react-redux";

import { dataActions } from "../store/data-slice";
import { toggleActions } from "../store/toggle-slice";
import { screenActions } from "../store/screens-slice";
import { stepperActions } from "../store/stepper-slice";

const Element = (props) => {
  const [toggleSelectButton, setToggleSelectButton] = useState(true);
  const [toggleBottomDiv, settoggleBottomDiv] = useState(false);
  const [personsNumber, setPersonsNumber] = useState(1);
  const { fecha, horario, plazas } = props.data.item;
  const id = props.data.idx;
  const { screen, tipo } = props;

  const disableElements = useSelector((state) => state.toggle.disableElements);

  const dispatch = useDispatch();

  dispatch(screenActions.setTipo(tipo));

  const handleSelect = () => {
    props.handleClass(id);
    setToggleSelectButton(!toggleSelectButton);

    dispatch(toggleActions.disableClass(true));

    dispatch(toggleActions.disableFechaDespues(true));

    settoggleBottomDiv(!toggleBottomDiv);
  };

  const handleRemove = () => {
    props.handleClass(-1);
    setToggleSelectButton(!toggleSelectButton);

    dispatch(toggleActions.disableClass(false));
    dispatch(toggleActions.disableFechaDespues(false));

    settoggleBottomDiv(!toggleBottomDiv);
  };

  let toggleButtons;

  if (screen == "practicas") {
    toggleButtons = true;
  } else if (screen === "teoria") {
    toggleButtons = false;
  }

  const handleNextScreen = () => {
    if (screen == "practicas") {
      dispatch(
        dataActions.applyPracticas({
          persons: personsNumber,
          practica: {
            fecha,
            horario,
            plazas,
          },
        })
      );
      dispatch(screenActions.setMainScreen("teoria"));
      dispatch(toggleActions.disableClass(false));
      dispatch(stepperActions.setActiveStep(1));
    } else if (screen === "teoria") {
      dispatch(stepperActions.setActiveStep(2));
      dispatch(screenActions.setMainScreen("extras"));
    }

    dispatch(toggleActions.disableClass(false));
    dispatch(toggleActions.disableElements(false));
    dispatch(toggleActions.disableFechaDespues(false));
  };

  const handleBackScreen = () => {
    dispatch(toggleActions.disableClass(false));
    dispatch(toggleActions.disableFechaDespues(false));
    dispatch(screenActions.setMainScreen("practicas"));
    dispatch(stepperActions.setActiveStep(0));
  };

  return (
    <div
      className={
        disableElements
          ? "element__element element__disable"
          : `element__element${props.classes}`
      }
    >
      <div className="element__top">
        <div className="element__info">
          <p className="element__plazasQuedan">Quedan {plazas} plazas</p>
          <p className="element__date">{fecha}</p>
          <p className="element__hours">{horario}</p>
        </div>
        <div className="element__selecionarEliminarContainer">
          <div className="element__selectionarEliminar">
            {toggleSelectButton ? (
              <>
                <p>Selecionar</p>
                <button onClick={handleSelect}>
                  <AddCircleIcon style={{ color: "#499BB1", fontSize: 60 }} />
                </button>
              </>
            ) : (
              <>
                <p>Eliminar</p>
                <button onClick={handleRemove}>
                  <HighlightOffIcon
                    style={{ color: "#499BB1", fontSize: 60 }}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {toggleBottomDiv && (
        <div className="element__bottom">
          {toggleButtons ? (
            <div className="element__icons">
              <div className="element__profileIcon">
                <PersonOutlineIcon style={{ fontSize: 30 }} />
              </div>
              <div className="element__decrement">
                <button
                  onClick={() => {
                    setPersonsNumber(personsNumber - 1);
                  }}
                  disabled={personsNumber == 1}
                >
                  <RemoveCircleOutlineIcon style={{ fontSize: 30 }} />
                </button>
              </div>
              <div className="element__counter">{personsNumber}</div>
              <div className="element__increment">
                <button
                  onClick={() => {
                    setPersonsNumber(personsNumber + 1);
                  }}
                  disabled={personsNumber == plazas}
                >
                  <AddCircleOutlineIcon style={{ fontSize: 30 }} />
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="element__buttonsContainer">
            {!toggleButtons && (
              <div className="element__volverContainer">
                <button onClick={handleBackScreen}>Volver</button>
              </div>
            )}
            <div className="element__continueContainer">
              <button onClick={handleNextScreen}>Continuar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Element;
