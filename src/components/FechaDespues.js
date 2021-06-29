import { useState } from "react";
import { useSelector } from "react-redux";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { stepperActions } from "../store/stepper-slice";
import { screenActions } from "../store/screens-slice";
import { toggleActions } from "../store/toggle-slice";

import { useDispatch } from "react-redux";

const FechaDespues = () => {
  const [toggleBottomDiv, settoggleBottomDiv] = useState(false);
  const [toggleSelectButton, setToggleSelectButton] = useState(true);

  const dispatch = useDispatch();

  const disableFechaDespues = useSelector(
    (state) => state.toggle.disableFechaDespues
  );
  const handleSelect = () => {
    setToggleSelectButton(!toggleSelectButton);

    dispatch(toggleActions.disableClass(true));
    dispatch(toggleActions.disableFechaDespues(false));
    dispatch(toggleActions.disableElements(true));

    settoggleBottomDiv(!toggleBottomDiv);
  };

  const handleRemove = () => {
    dispatch(toggleActions.disableClass(false));

    setToggleSelectButton(!toggleSelectButton);

    dispatch(toggleActions.disableElements(false));

    settoggleBottomDiv(!toggleBottomDiv);
  };

  const handleContinuar = () => {
    dispatch(toggleActions.setShowVolverButton(false));
    dispatch(stepperActions.setActiveStep(3));
    dispatch(screenActions.setMainScreen("extras"));
    dispatch(toggleActions.disableClass(false));
    dispatch(toggleActions.disableElements(false));
    dispatch(toggleActions.disableFechaDespues(false));
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
