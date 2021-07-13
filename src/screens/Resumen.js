import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { dataActions } from "../store/data-slice";
import { stepperActions } from "../store/stepper-slice";
import { toggleActions } from "../store/toggle-slice";
import { screenActions } from "../store/screens-slice";

import Stepper from "../ui/Stepper";

import Reserva from "../components/Reserva";

import "../components/Resumen.css";
import "../components/Reserva.css";
import "../components/Element.css";

import { extras_cursos } from "../data/ExtrasCursos";

import PopPop from "react-poppop";

const Resumen = () => {
  const practicas = useSelector((state) => state.data.practicas);
  const teoria = useSelector((state) => state.data.teoria);
  const extras = useSelector((state) => state.data.extras);

  const [redirectLink, setRedirectLink] = useState("");
  const [show, setshow] = useState(false);

  const toggleShow = (show) => {
    setshow(show);
  };

  const dispatch = useDispatch();

  const handleNextScreen = () => {
    const ofertes = "https://ofertesnautiques.com/es/?add-to-cart=157";

    let fecha_hora_practicas;
    let fecha_hora_teoria;

    if (teoria.data.message) {
      fecha_hora_teoria = `&fecha_teoria=No hay teoría`;
    } else {
      fecha_hora_teoria = `&fecha_teoria=${teoria.data.fecha} ${teoria.data.horario[0]} - ${teoria.data.horario[1]}`;
    }

    if (practicas.data.message) {
      fecha_hora_practicas = `&fecha_practicas=${practicas.data.message}`;
    } else {
      fecha_hora_practicas = `&fecha_practicas=${practicas.data.fecha} ${practicas.data.horario[0]} - ${practicas.data.horario[1]}`;
    }

    const variation_id = "&variation_id=75036";

    let modalidad =
      practicas.periodo === "entre_semana" ? "Entre semana" : "Fin de semana";

    const attribute_modalidad = `&attribute_modalidad-practicas-ln=${modalidad}`;

    const quantity = `&quantity=${practicas.personas}`;

    let certificado_medico = "";
    let expedicion_express = "";

    if (extras.length > 0) {
      extras.forEach((element) => {
        if (element.id === "EE") {
          expedicion_express = `&tasa_expedicion_express=true&quantity_tasa_expedicion_express=${element.courseQuantity}`;
        } else if (element.id === "CM") {
          certificado_medico = `&add_cert=true&quantity_add_cert=${element.courseQuantity}`;
        }
      });
    }
    let link =
      ofertes +
      fecha_hora_teoria +
      fecha_hora_practicas +
      variation_id +
      attribute_modalidad +
      quantity +
      certificado_medico +
      expedicion_express;

    toggleShow(true);

    setRedirectLink(link);
  };

  const handleBackScreen = () => {
    dispatch(toggleActions.disableClass(false));
    dispatch(screenActions.setMainScreen("extras"));
  };

  const handleBorrar = () => {
    dispatch(
      dataActions.applyPracticas({
        personas: 1,
        periodo: "entre_semana",
        data: {},
      })
    );
    dispatch(
      dataActions.applyTeoria({
        personas: 1,
        data: {},
      })
    );
    dispatch(dataActions.applyExtras([]));
    dispatch(dataActions.elementoSeleccionadoEnPracticas(""));
    dispatch(dataActions.elementoSeleccionadoEnTeoria(""));
    dispatch(toggleActions.disableClass(false));
    dispatch(stepperActions.setActiveStep(0));
    dispatch(screenActions.setMainScreen("practicas"));
  };

  const Popup = () => {
    return (
      <div>
        <PopPop
          position="centerCenter"
          open={show}
          closeBtn={true}
          closeOnEsc={true}
          onClose={() => toggleShow(false)}
          closeOnOverlay={true}
          contentStyle={{
            backgroundColor: "#E1E1E1",
            overflow: "hidden",
            padding: 20,
          }}
        >
          <div>
            <div className="resumen__logoContainer">
              <img
                src="https://escolaportbarcelona.com/wp-content/uploads/2018/06/Simbolo-Escola-Port.png"
                logo="logo_escolaport"
              />
            </div>
            <p className="resumen__popupParag">
              Al continuar serás redirigido a nuestra tienda para completar tus
              datos de matriculación y realizar el pago.
            </p>
            <a
              class="resumen__popupButton"
              href={redirectLink}
              target="_blank"
              onClick={() => {
                toggleShow(false);
              }}
            >
              Continuar
            </a>
          </div>
        </PopPop>
      </div>
    );
  };

  return (
    <div>
      <Stepper />
      <div className="resumen__container">
        <h3>Resumen de tu reserva:</h3>
        <h2>Licencia de navegación</h2>

        <Reserva
          data={practicas.data}
          personas={practicas.personas}
          title="Prácticas de navegación 4h"
        />

        <Reserva
          data={teoria.data}
          personas={teoria.personas}
          tipo="teoria"
          title="Teoría online 2h"
        />

        <>
          {extras.length == 1
            ? extras.map((item, idx) => {
                return extras_cursos.map((item2, idx2) => {
                  if (item.id === item2.id) {
                    return (
                      <Reserva
                        title={item.title}
                        personas={item.courseQuantity}
                      />
                    );
                  } else {
                    return <Reserva title={item2.title} personas={0} />;
                  }
                });
              })
            : extras.length == 2
            ? extras.map((item, idx) => {
                return (
                  <Reserva title={item.title} personas={item.courseQuantity} />
                );
              })
            : extras_cursos.map((item2, idx2) => {
                return <Reserva title={item2.title} personas={0} />;
              })}
        </>

        <Popup />

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
