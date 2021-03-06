import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Stepper from "../ui/Stepper";

import "../components/Element.css";

import Element from "../components/Element";
import FechaDespues from "../components/FechaDespues";

import { dataActions } from "../store/data-slice";
import { toggleActions } from "../store/toggle-slice";
import { screenActions } from "../store/screens-slice";
import { stepperActions } from "../store/stepper-slice";

import { decode } from "html-entities";

const Teoria = () => {
  const [classes, setClasses] = useState("");
  const [indxNum, setIndxNum] = useState(0);
  const scrolldiv = useSelector((state) => state.screens.scrollDivTeoria);

  const dispatch = useDispatch();

  const data = useSelector((state) => state.data.dataTeoria);

  useEffect(() => {
    scrollTo();
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  const scrollTo = () => {
    if (scrolldiv) {
      const section = document.querySelector(scrolldiv);
      if (scrolldiv === "#element_fechadespues") {
        window.scrollTo(0, 0);
      } else {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  const handleClass = (value, periodo) => {
    setIndxNum(value);
    if (value > 0) {
      setClasses(" element__disable");
    } else {
      setClasses("");
    }
  };

  const handleNextScreen = () => {
    dispatch(
      dataActions.applyTeoria({
        personas: 0,
        data: {
          message: data,
        },
      })
    );
    dispatch(screenActions.setMainScreen("extras"));
    dispatch(stepperActions.setActiveStep(2));
  };

  const handleBackScreen = () => {
    dispatch(toggleActions.disableClass(false));
    dispatch(toggleActions.disableFechaDespues(false));
    dispatch(screenActions.setMainScreen("practicas"));
    dispatch(screenActions.setScrollDivTeoria(""));
    dispatch(stepperActions.setActiveStep(0));
    dispatch(dataActions.setFechaDespues(-1));
    dispatch(dataActions.setFechaDespues(-1));
    dispatch(
      dataActions.applyTeoria({
        personas: 1,
        data: {},
      })
    );
  };

  return (
    <div>
      <Stepper />
      <div className="element__tab">
        {typeof data === "string" ? (
          <>
            <div className="screen__messageContainer">
              <p>
                {data == ""
                  ? "Estamos programando nuevas fechas, continua con el proceso y te enviaremos por correo las pr??ximas fechas de clases te??ricas de Licencia de navegaci??n."
                  : decode(data)}
              </p>
            </div>
            <div className="screen__buttonsContainer">
              <div className="element__buttonsContainer">
                <div className="element__volverContainer">
                  <button onClick={handleBackScreen}>Volver</button>
                </div>
                <div className="element__continueContainer">
                  <button onClick={handleNextScreen}>Continuar</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <FechaDespues id={0} screen="teoria" />
            {data.map((item, idx) => {
              if (item.id == indxNum) {
                return (
                  <Element
                    key={idx}
                    data={{ item }}
                    handleClass={handleClass}
                    classes=""
                    screen="teoria"
                  />
                );
              } else {
                return (
                  <Element
                    key={idx}
                    data={{ item }}
                    handleClass={handleClass}
                    classes={classes}
                    screen="teoria"
                  />
                );
              }
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Teoria;
