import React, { useState, useEffect } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import "./Months.css";

import { useSelector, useDispatch } from "react-redux";

import { dataActions } from "../store/data-slice";

import { CURSOS } from "../data/data";
const list = [
  { id: 1, name: "Enero" },
  { id: 2, name: "Febrero" },
  { id: 3, name: "Marzo" },
  { id: 4, name: "Abril" },
  { id: 5, name: "Mayo" },
  { id: 6, name: "Junio" },
  { id: 7, name: "Julio" },
  { id: 8, name: "Agosto" },
  { id: 9, name: "Septiembre" },
  { id: 10, name: "Octubre" },
  { id: 11, name: "Noviembre" },
  { id: 12, name: "Diciembre" },
];

const MenuItem = ({ text, selected }) => {
  return <div className={`menu-item ${selected ? "active" : ""}`}>{text}</div>;
};

export const Menu = (list, selected) =>
  list.map((el) => {
    const { name } = el;

    return <MenuItem text={name} key={name} selected={selected} />;
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
      month = "Octubre";
      break;
    case 10:
      month = "Septiembre";
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
    if (key == 6) {
      months.push({
        month: {
          name: "junio",
          value,
        },
      });
    } else if (key == 7) {
      months.push({
        month: {
          name: "julio",
          value,
        },
      });
    }
  }
  return months;
};

const Months = () => {
  const [selected, setselected] = useState(getMonthByNumber());
  const [hideSingleArrow, sethideSingleArrow] = useState(true);

  const newList = list.filter((e) => e.id >= getCurrentMonth()); //show all months starting from current month

  const menu = Menu(newList, selected);

  const disableClass = useSelector((state) => state.toggle.disable);

  const dispatch = useDispatch();

  getData(CURSOS[0]).forEach((e) => {
    if (e.month.name == selected.toLowerCase()) {
      dispatch(dataActions.applyData(e.month));
    }
  });
  const onSelect = (key) => {
    setselected(key);
    getData(CURSOS[0]).forEach((e) => {
      if (e.month.name == key.toLowerCase()) {
        dispatch(dataActions.applyData(e.month));
      }
    });
  };

  return (
    <div className={disableClass ? "element__disable" : ""}>
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
