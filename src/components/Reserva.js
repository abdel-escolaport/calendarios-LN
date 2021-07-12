import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import "./Reserva.css";
import "./Element.css";

const formatDate = (fecha) => {
  let fechas = fecha.split("/");

  let day = parseInt(fechas[0]);
  let month = parseInt(fechas[1]);
  let year = parseInt(fechas[2]);

  let date = `${year}-${month}-${day}`;

  let d = new Date(date);

  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  return d.toLocaleDateString("es-ES", options);
};

const Reserva = ({ data, title, personas, tipo = null }) => {
  return (
    <div className="reserva__container">
      <div className="reserva__info">
        <p>{title}</p>
        {data && (
          <>
            {data.message ? (
              <>
                <p>
                  {data.message === "No hay teor&iacute;as"
                    ? "No hay teorias"
                    : data.message}
                </p>
              </>
            ) : (
              <div>
                {Object.keys(data).map((item, idx) => {
                  return (
                    <div key={idx}>
                      <p>{item === "fecha" && formatDate(data[item])}</p>
                      <p>
                        {item === "horario" &&
                          data[item][0] + " a " + data[item][1]}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
      <div className="reserva__quantity">
        <div className="reserva__iconContainer">
          <PersonOutlineIcon style={{ fontSize: 25 }} />
        </div>
        <div className="reserva__number">{personas}</div>
      </div>
    </div>
  );
};

export default Reserva;
