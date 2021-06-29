import { useDispatch } from "react-redux";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import Stepper from "../ui/Stepper";

import Reserva from "../components/Reserva";
import "../components/Reserva.css";
import "../components/Element.css";

import { stepperActions } from "../store/stepper-slice";
import { toggleActions } from "../store/toggle-slice";
import { screenActions } from "../store/screens-slice";

const Resumen = () => {
  const dispatch = useDispatch();

  const handleNextScreen = () => {};

  const handleBackScreen = () => {
    dispatch(toggleActions.disableClass(false));
    dispatch(screenActions.setMainScreen("extras"));
  };

  const handleBorrar = () => {
    dispatch(stepperActions.setActiveStep(0));
    dispatch(screenActions.setMainScreen("practicas"));
  };

  return (
    <div>
      <Stepper />
      <div className="resumen__container">
        <h3>Resumen de tu reserva:</h3>
        <h2>Licencia de navegación</h2>
        <div className="reserva__container">
          <div>Prácticas de navegación</div>
          <div className="reserva__quantity">
            <div className="reserva__iconContainer">
              <PersonOutlineIcon style={{ fontSize: 25 }} />
            </div>
            <div className="reserva__number">3</div>
          </div>
        </div>

        <div className="element__bottom curso__bottom">
          <div className="element__buttonsContainer">
            <div className="element__volverContainer">
              <button onClick={handleBackScreen}>Modificar</button>
            </div>

            <div className="element__continueContainer">
              <button onClick={handleNextScreen}>Continuar</button>
            </div>
          </div>
        </div>

        <div className="element__borrarContainer">
          <button onClick={handleBorrar}>Borrar y comenzar de nuevo</button>
        </div>
      </div>
    </div>
  );
};

export default Resumen;
