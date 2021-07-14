import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { dataActions } from "../store/data-slice";

import ScrollMenu from "react-horizontal-scrolling-menu";
import "./Months.css";

const MenuItem = ({ text, selected }) => {
  return <div className={`menu-item ${selected ? "active" : ""}`}>{text}</div>;
};

export const Menu = (list, selected) =>
  list.map((item) => {
    return (
      <MenuItem
        text={item.month.name}
        key={item.month.name}
        selected={selected}
      />
    );
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

const getCurrentMonth = () => {
  var date = new Date();
  return date.getMonth() + 1;
};

// function to select month by default
const getMonthByNumber = () => {
  const currentMonthNumber = getCurrentMonth();
  let month = "";
  switch (currentMonthNumber) {
    case 1:
      month = "Enero";
      break;

    case 2:
      month = "Febrero";
      break;

    case 3:
      month = "Marzo";
      break;

    case 4:
      month = "Abril";
      break;

    case 5:
      month = "Mayo";
      break;

    case 6:
      month = "Junio";
      break;

    case 7:
      month = "Julio";
      break;
    case 8:
      month = "Agosto";
      break;
    case 9:
      month = "Septiembre";
      break;
    case 10:
      month = "Octubre";
      break;
    case 11:
      month = "Noviembre";
      break;

    case 12:
      month = "Deciembre";
      break;
  }

  return month;
};

const getData = (cursos) => {
  let months = [];
  for (const [key, value] of Object.entries(cursos)) {
    let month_num = parseInt(key.substring(0, 2));
    if (month_num == 1) {
      months.push({
        month: {
          name: "Enero",
          value,
        },
      });
    } else if (month_num == 2) {
      months.push({
        month: {
          name: "Febrero",
          value,
        },
      });
    } else if (month_num == 3) {
      months.push({
        month: {
          name: "Marzo",
          value,
        },
      });
    } else if (month_num == 4) {
      months.push({
        month: {
          name: "Abril",
          value,
        },
      });
    } else if (month_num == 5) {
      months.push({
        month: {
          name: "Mayo",
          value,
        },
      });
    } else if (month_num == 6) {
      months.push({
        month: {
          name: "Junio",
          value,
        },
      });
    } else if (month_num == 7) {
      months.push({
        month: {
          name: "Julio",
          value,
        },
      });
    } else if (month_num == 8) {
      months.push({
        month: {
          name: "Agosto",
          value,
        },
      });
    } else if (month_num == 9) {
      months.push({
        month: {
          name: "Septiembre",
          value,
        },
      });
    } else if (month_num == 10) {
      months.push({
        month: {
          name: "Octubre",
          value,
        },
      });
    } else if (month_num == 11) {
      months.push({
        month: {
          name: "Noviembre",
          value,
        },
      });
    } else if (month_num == 12) {
      months.push({
        month: {
          name: "Deciembre",
          value,
        },
      });
    }
  }
  return months;
};

const Months = () => {
  const [selected, setselected] = useState(getMonthByNumber());
  const [menu, setmenu] = useState([]);
  const [calendarios, setCalendarios] = useState([]);
  const disableClass = useSelector((state) => state.toggle.disable);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dataPracticas = await fetch(
      "https://apicalendarios.escolaportbarcelona.com/recreo/v3/get_practicas_ln"
    );

    //SANDOBX

    // const dataTeoria = await fetch(
    //   "https://apicalendarios.escolaportbarcelona.com/recreo/v3/get_teorias_ln_sandbox"
    // );

    const dataTeoria = await fetch(
      "https://apicalendarios.escolaportbarcelona.com/recreo/v3/get_teorias_pr_ln_sandbox"
    );

    //-------------------------------------------------------------------------------------

    // const dataTeoria = await fetch(
    //   "https://apicalendarios.escolaportbarcelona.com/recreo/v3/get_teorias_ln"
    // );

    // const dataTeoria = await fetch(
    //   "https://apicalendarios.escolaportbarcelona.com/recreo/v3/get_teorias_pr_ln"
    // );

    const result_practicas = await dataPracticas.json();
    const result_teoria = await dataTeoria.json();

    const calendarios_data_practicas = getData(result_practicas);

    setmenu(Menu(calendarios_data_practicas, selected));

    setCalendarios(calendarios_data_practicas);

    calendarios_data_practicas.forEach((e) => {
      if (e.month.name == selected) {
        dispatch(dataActions.applyDataPracticas(e.month));
      }
    });

    dispatch(dataActions.applyDataTeoria(result_teoria));
  };

  const onSelect = (key) => {
    setselected(key);
    calendarios.forEach((e) => {
      if (e.month.name == key) {
        dispatch(dataActions.applyDataPracticas(e.month));
      }
    });
  };

  return (
    <div
      className={
        disableClass
          ? "months__container element__disable"
          : "months__container"
      }
    >
      <ScrollMenu
        data={menu}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        selected={selected}
        onSelect={onSelect}
        translate={1}
      />
    </div>
  );
};

export default Months;
