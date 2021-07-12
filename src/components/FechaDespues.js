import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { dataActions } from "../store/data-slice";
import { stepperActions } from "../store/stepper-slice";
import { screenActions } from "../store/screens-slice";
import { toggleActions } from "../store/toggle-slice";

import { useDispatch } from "react-redux";

const FechaDespues = ({ id, screen, periodo }) => {
  const [toggleBottomDiv, settoggleBottomDiv] = useState(false);
  const [toggleSelectButton, setToggleSelectButton] = useState(true);
  const [hideVolverButton, sethideVolverButton] = useState(true);

  const dispatch = useDispatch();

  const fechaDespuesValue = useSelector((state) => state.data.fechaDespues);

  const elementoSeleccionadoEnPracticas = useSelector(
    (state) => state.data.elementoSeleccionadoEnPracticas
  );

  const elementoSeleccionadoEnTeoria = useSelector(
    (state) => state.data.elementoSeleccionadoEnTeoria
  );

  const disableFechaDespues = useSelector(
    (state) => state.toggle.disableFechaDespues
  );

  useEffect(() => {
    if (screen === "practicas") {
      if (fechaDespuesValue == id) {
        if (
          elementoSeleccionadoEnPracticas == "sin_fecha" ||
          elementoSeleccionadoEnTeoria == "sin_fecha"
        ) {
          setToggleSelectButton(false);
          settoggleBottomDiv(true);
          dispatch(toggleActions.disableClass(true));
          dispatch(toggleActions.disableElements(true));
        }
      }
      sethideVolverButton(true);
    } else if (screen == "teoria") {
      if (
        fechaDespuesValue == id &&
        elementoSeleccionadoEnTeoria == "sin_fecha"
      ) {
        setToggleSelectButton(false);
        settoggleBottomDiv(true);
        dispatch(toggleActions.disableClass(true));
        dispatch(toggleActions.disableElements(true));
      }
      dispatch(dataActions.setFechaDespues(0));

      sethideVolverButton(false);
    }
  }, [fechaDespuesValue]);

  const handleSelect = () => {
    if (screen === "practicas") {
      dispatch(dataActions.elementoSeleccionadoEnPracticas("sin_fecha"));
    } else if (screen === "teoria") {
      dispatch(dataActions.elementoSeleccionadoEnTeoria("sin_fecha"));
    }

    setToggleSelectButton(!toggleSelectButton);

    dispatch(toggleActions.disableClass(true));
    dispatch(toggleActions.disableFechaDespues(false));
    dispatch(toggleActions.disableElements(true));

    settoggleBottomDiv(!toggleBottomDiv);
  };

  const handleRemove = () => {
    if (screen === "practicas") {
      dispatch(dataActions.elementoSeleccionadoEnPracticas(""));
    } else if (screen === "teoria") {
      dispatch(dataActions.elementoSeleccionadoEnTeoria(""));
    }

    dispatch(toggleActions.disableClass(false));

    setToggleSelectButton(!toggleSelectButton);

    dispatch(toggleActions.disableElements(false));

    settoggleBottomDiv(!toggleBottomDiv);
  };

  const handleContinuar = () => {
    if (screen === "practicas") {
      dispatch(dataActions.setFechaDespues(-1));
      dispatch(screenActions.setMainScreen("teoria"));
      dispatch(stepperActions.setActiveStep(1));
      dispatch(toggleActions.disableElements(false));
      dispatch(
        dataActions.applyPracticas({
          periodo,
          personas: 0,
          data: {
            message: "Fecha a determinar",
          },
        })
      );
    } else if (screen === "teoria") {
      dispatch(dataActions.setFechaDespues(0));
      dispatch(screenActions.setMainScreen("extras"));
      dispatch(stepperActions.setActiveStep(2));
      dispatch(toggleActions.disableElements(false));
      dispatch(
        dataActions.applyTeoria({
          personas: 0,
          data: {
            message: "Fecha a determinar",
          },
        })
      );
    }
  };

  const handleBackScreen = () => {
    dispatch(dataActions.elementoSeleccionadoEnTeoria(""));

    dispatch(dataActions.setFechaDespues(-1));
    dispatch(screenActions.setMainScreen("practicas"));
    dispatch(stepperActions.setActiveStep(1));
    dispatch(toggleActions.disableClass(false));
    dispatch(toggleActions.disableElements(false));
  };

  return (
    <div
      className={
        disableFechaDespues
          ? `element__element element__disable`
          : `element__element`
      }
    >
      <div className="element__top">
        <div className="element__info">
          <p className="element__date">Elegiré fecha después</p>
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
        <div className="element__bottom flex-end">
          <div className="element__buttonsContainer">
            {!hideVolverButton && (
              <div className="element__volverContainer">
                <button onClick={handleBackScreen}>Volver</button>
              </div>
            )}

            <div className="element__continueContainer">
              <button onClick={handleContinuar}>Continuar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FechaDespues;
