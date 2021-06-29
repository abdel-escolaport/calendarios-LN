import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Stepper from "../ui/Stepper";

import "../components/Element.css";
import Curso from "../components/Curso";

import { screenActions } from "../store/screens-slice";
import { stepperActions } from "../store/stepper-slice";

const extras_cursos = [
  {
    id: "CM",
    nombre: "Certificado médico",
    precio: 39,
  },
  {
    id: "EE",
    nombre: "Expedición express",
    precio: 24,
  },
];

const Extras = () => {
  const dispatch = useDispatch();

  const showVolverButton = useSelector(
    (state) => state.toggle.showVolverButton
  );

  const handleNextScreen = () => {
    dispatch(screenActions.setMainScreen("resumen"));
  };

  const handleBackScreen = () => {
    dispatch(screenActions.setMainScreen("teoria"));
    dispatch(stepperActions.handleBackStep());
  };

  return (
    <>
      <Stepper />
      {extras_cursos.map((item, idx) => (
        <Curso key={idx} id={item.id} title={item.nombre} price={item.precio} />
      ))}

      <div className="element__bottom curso__bottom">
        <div className="element__buttonsContainer">
          {showVolverButton && (
            <div className="element__volverContainer">
              <button onClick={handleBackScreen}>Volver</button>
            </div>
          )}

          <div className="element__continueContainer">
            <button onClick={handleNextScreen}>Continuar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Extras;
