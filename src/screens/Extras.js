import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Stepper from "../ui/Stepper";

import "../components/Element.css";
import "../components/Extras.css";

import Curso from "../components/Curso";
import InfoExtras from "../components/InfoExtras";

import { dataActions } from "../store/data-slice";
import { screenActions } from "../store/screens-slice";
import { stepperActions } from "../store/stepper-slice";

import { extras_cursos } from "../data/ExtrasCursos";

const Extras = () => {
  const [extrasCursosData, setExtrasCursosData] = useState([]);
  const dispatch = useDispatch();

  const selectedCourses = useSelector((state) => state.data.extras);

  useEffect(() => {
    setExtrasCursosData(selectedCourses);
  }, []);

  const handleNextScreen = () => {
    dispatch(dataActions.applyExtras(extrasCursosData));
    dispatch(screenActions.setMainScreen("resumen"));
  };

  const handleBackScreen = () => {
    dispatch(dataActions.applyExtras([]));
    dispatch(screenActions.setMainScreen("teoria"));
    dispatch(stepperActions.handleBackStep());
  };

  const handleIncluir = (checked, curso) => {
    let cursos;
    if (checked) {
      cursos = [...extrasCursosData, curso];
    } else {
      cursos = extrasCursosData.filter((element) => element.id !== curso.id);
    }
    setExtrasCursosData(cursos);
  };

  const updateCourseQuantity = (curso) => {
    const cursos = extrasCursosData.map((p) =>
      p.id == curso.id ? { ...p, courseQuantity: curso.courseQuantity } : p
    );
    setExtrasCursosData(cursos);
  };

  return (
    <>
      <Stepper />
      <div className="extras__container">
        {extras_cursos.map((item, idx) => {
          if (selectedCourses.length == 2) {
            return selectedCourses.map((item2, ix) => {
              if (item.id === item2.id) {
                return (
                  <Curso
                    key={idx}
                    id={item2.id}
                    title={item2.title}
                    quantity={item2.courseQuantity}
                    price={item2.price}
                    checked={true}
                    handleIncluir={handleIncluir}
                    updateCourseQuantity={updateCourseQuantity}
                  />
                );
              }
            });
          } else if (selectedCourses.length == 1) {
            return selectedCourses.map((item2, ix) => {
              if (item.id === item2.id) {
                return (
                  <Curso
                    key={idx}
                    id={item2.id}
                    title={item2.title}
                    quantity={item2.courseQuantity}
                    price={item2.price}
                    checked={true}
                    handleIncluir={handleIncluir}
                    updateCourseQuantity={updateCourseQuantity}
                  />
                );
              } else {
                return (
                  <Curso
                    key={idx}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    checked={false}
                    quantity={1}
                    handleIncluir={handleIncluir}
                    updateCourseQuantity={updateCourseQuantity}
                  />
                );
              }
            });
          } else {
            return (
              <Curso
                key={idx}
                id={item.id}
                title={item.title}
                price={item.price}
                checked={false}
                quantity={1}
                handleIncluir={handleIncluir}
                updateCourseQuantity={updateCourseQuantity}
              />
            );
          }
        })}

        <div className="element__bottom curso__bottom">
          <div className="element__buttonsContainer">
            <div className="element__volverContainer">
              <button onClick={handleBackScreen}>Volver</button>
            </div>

            <div className="element__continueContainer">
              <button onClick={handleNextScreen}>Continuar</button>
            </div>
          </div>
        </div>

        <InfoExtras />
      </div>
    </>
  );
};

export default Extras;
