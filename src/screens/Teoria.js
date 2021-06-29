import { useState } from "react";

import { useSelector } from "react-redux";

import Stepper from "../ui/Stepper";

import "../components/Element.css";

import Element from "../components/Element";

const Teoria = () => {
  const [indxNum, setIndxNum] = useState(0);

  const [classes, setClasses] = useState("");
  const tipo = useSelector((state) => state.screens.tipo);

  const data = useSelector((state) => state.data.data);

  let tipo_data;

  if (tipo === "entre_semana") {
    tipo_data = data.value.entresemana.teoria.fechas;
  } else {
    tipo_data = data.value.findesemana.teoria.fechas;
  }

  const handleClass = (value) => {
    setIndxNum(value);
    if (value >= 0) {
      setClasses(" element__disable");
    } else {
      setClasses("");
    }
  };

  return (
    <div>
      <Stepper />
      <div className="element__tab">
        {tipo_data.map((item, idx) => {
          if (idx == indxNum) {
            return (
              <Element
                key={idx}
                data={{ idx, item }}
                handleClass={handleClass}
                classes=""
                screen="teoria"
                tipo={tipo}
              />
            );
          } else {
            return (
              <Element
                key={idx}
                data={{ idx, item }}
                handleClass={handleClass}
                classes={classes}
                screen="teoria"
                tipo={tipo}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Teoria;
