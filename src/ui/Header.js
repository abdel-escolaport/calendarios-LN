import { useState } from "react";
import "./Header.css";
import Modal from "../components/Modal";
import HelpOutline from "@material-ui/icons/HelpOutline";
import IconButton from "@material-ui/core/IconButton";

import { useSelector, useDispatch } from "react-redux";

import { toggleActions } from "../store/toggle-slice";

import PopPop from "react-poppop";

const Header = () => {
  const dispatch = useDispatch();

  const showModal = useSelector((state) => state.toggle.showModal);
  const [show, setshow] = useState(false);

  const toggleShow = (show) => {
    setshow(show);
  };

  return (
    <>
      <div className="header__top">
        <div className="header__title">
          <h3>
            <span>LN</span> - Licencia de navegación
          </h3>
        </div>

        <PopPop
          position="centerCenter"
          open={show}
          closeBtn={true}
          closeOnEsc={true}
          onClose={() => toggleShow(false)}
          closeOnOverlay={true}
          contentStyle={{
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <div className="modal__smallContainer">
            <h3>
              <span>1 </span>Prácticas
            </h3>
            <p>
              Selecciona una fecha en la que quieras hacer tus prácticas de
              navegación de 4 horas de duración. Puede ser entre semana o en fin
              de semana.
            </p>
            <h3>
              <span>2 </span>Teoría
            </h3>
            <p>
              Elige cuándo quieres hacer la formación teórica online. Puede ser
              antes o después de las prácticas.
            </p>
            <h3>
              <span>3 </span>Extras
            </h3>
            <p>
              Para expedir el título se requiere un certificado médico, lo
              puedes contratar con EscolaPort y sacártelo en Barcelona de lunes
              a viernes por 39€
              <br />
              <br />
              Si quieres tu título en 72 horas, incluye la expedición express y
              lo tendrás un par de días después de acabar el curso.
            </p>
          </div>
        </PopPop>

        <div className="header__iconContainer">
          <IconButton
            onClick={() => {
              toggleShow(true);
            }}
          >
            <HelpOutline />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Header;
