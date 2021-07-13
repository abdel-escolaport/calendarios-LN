export const useDate = (fecha) => {
  let fechas = fecha.split("/");

  let day = parseInt(fechas[0]);
  let month = parseInt(fechas[1]);
  let year = parseInt(fechas[2]);

  let date = `${year}/${month}/${day}`;

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const dias_semana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  let d = new Date(date);

  return (
    dias_semana[d.getDay()] + ", " + d.getDate() + " de " + meses[d.getMonth()]
  );
};
