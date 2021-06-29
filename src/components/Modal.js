import React from "react";
import "./Modal.css";

import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import IconButton from "@material-ui/core/IconButton";

import { useSelector, useDispatch } from "react-redux";

import { toggleActions } from "../store/toggle-slice";

function Modal() {
  const dispatch = useDispatch();

  return (
    <div className="modal__bigContainer">
      <div className="modal__smallContainer">
        <div className="modal__closeIcon">
          <IconButton
            onClick={() => {
              dispatch(toggleActions.toggleModal());
            }}
          >
            <HighlightOffTwoToneIcon style={{ fontSize: "3rem" }} />
          </IconButton>
        </div>
        <h3>
          <span>1 </span>Prácticas
        </h3>
        <p>
          Seleciona una fecha en la que quieras hacer tus prácticas de
          navegación de 4 hoeas de duración. Puede ser entre semana o en finde
          semana.
        </p>
        <h3>
          <span>2 </span>Teoria
        </h3>
        <p>
          Elige cuándo quieres hacer la formación teórica online. Puede ser
          antes o después de las prácticas.
        </p>
        <h3>
          <span>3 </span>Extras
        </h3>
        <p>
          Para expedir el título se requiere un certificado médico, lo puedes
          contratar con EscolaPort y sacártelo en Barcelona de lunes a viernes
          por 39€
          <br />
          <br />
          Si quieres tu titulo en 72 horas, incluye la expedición express y lo
          tendras un par de dias desupes de acabar el curso.
        </p>
      </div>
    </div>
  );
}

export default Modal;
