import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { dataActions } from "../store/data-slice";
import { toggleActions } from "../store/toggle-slice";
import { screenActions } from "../store/screens-slice";
import { stepperActions } from "../store/stepper-slice";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { useDate } from "../hooks/useDate";

import "../components/Element.css";

const Element = ({
  data,
  screen,
  tipo = null,
  handleClass,
  classes,
  scrollTo,
}) => {
  const [toggleSelectButton, setToggleSelectButton] = useState(true);
  const [toggleBottomDiv, settoggleBottomDiv] = useState(false);
  const [personsNumber, setPersonsNumber] = useState(1);
  const { id, fecha, horario, plazas } = data.item;

  const disableElements = useSelector((state) => state.toggle.disableElements);

  const practicas_data = useSelector((state) => state.data.practicas);
  const teoria_data = useSelector((state) => state.data.teoria);

  const elementoSeleccionadoEnPracticas = useSelector(
    (state) => state.data.elementoSeleccionadoEnPracticas
  );

  const fechaDespuesValue = useSelector((state) => state.data.fechaDespues);

  const myref = useRef();

  const dispatch = useDispatch();

  dispatch(screenActions.setTipo(tipo));

  const recoverSelectedValues = () => {
    let num_personas;
    let selectedeElement;
    if (screen === "practicas") {
      num_personas = practicas_data.personas;
      selectedeElement = Object.values(practicas_data.data);
    } else if (screen === "teoria") {
      num_personas = teoria_data.personas;
      selectedeElement = Object.values(teoria_data.data);
    }
    if (selectedeElement.length > 0) {
      if (selectedeElement[0] == id) {
        handleClass(selectedeElement[0]);
        applyChanges(true, true);
        setPersonsNumber(num_personas);
      }
    }
  };

  useEffect(() => {
    recoverSelectedValues();
  }, [practicas_data, teoria_data]);

  const handleSelect = () => {
    if (screen === "practicas") {
      dispatch(screenActions.setScrollDivPracticas(`#element_${id}`));
    } else if (screen === "teoria") {
      dispatch(screenActions.setScrollDivTeoria(`#element_${id}`));
    }
    handleClass(id, tipo);
    applyChanges(true, true);

    if (screen === "practicas") {
      dispatch(dataActions.elementoSeleccionadoEnPracticas("con_fecha"));
    } else if (screen === "teoria") {
      dispatch(dataActions.elementoSeleccionadoEnTeoria("con_fecha"));
    }
  };

  const handleRemove = () => {
    handleClass(-1);
    applyChanges(false, false);
    if (screen === "practicas") {
      dispatch(dataActions.elementoSeleccionadoEnPracticas(""));
      dispatch(
        dataActions.applyPracticas({
          personas: 1,
          periodo: tipo,
          data: {},
        })
      );
    } else if (screen === "teoria") {
      dispatch(dataActions.elementoSeleccionadoEnTeoria(""));
      dispatch(
        dataActions.applyTeoria({
          personas: 1,
          data: {},
        })
      );
    }
  };

  const applyChanges = (disableClassValue, disableFechaDespuesValue) => {
    setToggleSelectButton(!toggleSelectButton);

    dispatch(toggleActions.disableClass(disableClassValue));
    dispatch(toggleActions.disableFechaDespues(disableFechaDespuesValue));

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
      dispatch(dataActions.setFechaDespues(null));
      dispatch(
        dataActions.applyPracticas({
          personas: personsNumber,
          periodo: tipo,
          data: {
            id,
            fecha,
            horario,
            plazas,
          },
        })
      );
      dispatch(screenActions.setMainScreen("teoria"));
      dispatch(stepperActions.setActiveStep(1));
    } else if (screen === "teoria") {
      dispatch(
        dataActions.applyTeoria({
          personas: personsNumber,
          data: {
            id,
            fecha,
            horario,
            plazas,
          },
        })
      );
      dispatch(screenActions.setMainScreen("extras"));
      dispatch(stepperActions.setActiveStep(2));
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
    dispatch(screenActions.setScrollDivTeoria(""));
    dispatch(dataActions.setFechaDespues(-1));

    if (screen === "teoria") {
      dispatch(dataActions.elementoSeleccionadoEnTeoria(""));
    }

    if (
      fechaDespuesValue == 0 &&
      elementoSeleccionadoEnPracticas == "sin_fecha"
    ) {
      dispatch(toggleActions.disableClass(true));
      dispatch(toggleActions.disableElements(true));
    }

    if (screen === "teoria") {
      dispatch(
        dataActions.applyTeoria({
          personas: 1,
          data: {},
        })
      );
    }
  };

  return (
    <div
      className={
        disableElements
          ? "element__element element__disable"
          : `element__element${classes}`
      }
      id={`element_${id}`}
    >
      <div className="element__top">
        <div className="element__info">
          <p
            className="element__plazasQuedan"
            style={plazas > 3 ? { color: "green" } : {}}
          >
            Quedan {plazas} {plazas === 1 ? " plaza" : " plazas"}
          </p>
          <p className="element__date">{useDate(fecha)}</p>
          <p className="element__hours">{`${horario[0]} a ${horario[1]}`}</p>
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
