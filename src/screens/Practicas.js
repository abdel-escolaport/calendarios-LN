import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { StylesProvider } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import "../components/Element.css";

import { useSelector } from "react-redux";
import Element from "../components/Element";
import Stepper from "../ui/Stepper";
import FechaDespues from "../components/FechaDespues";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function Practicas(props) {
  const [value, setValue] = useState(0);
  const [classes, setClasses] = useState("");
  const [indxNum, setIndxNum] = useState(0);

  const data = useSelector((state) => state.data.data);
  const disableClass = useSelector((state) => state.toggle.disable);

  const practicas_entresemana = data.value.entresemana.practicas.fechas;
  const practicas_findesemana = data.value.findesemana.practicas.fechas;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClass = (value) => {
    setIndxNum(value);
    if (value >= 0) {
      setClasses(" element__disable");
    } else {
      setClasses("");
    }
  };

  return (
    <StylesProvider injectFirst>
      <div className={disableClass ? "element__disable" : ""}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Entre semana" {...a11yProps(0)} />
            <LinkTab label="Fin de semana" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <Stepper />
      </div>
      <TabPanel value={value} index={0}>
        <div className="element__tab">
          <FechaDespues />
          {practicas_entresemana.map((item, idx) => {
            if (idx == indxNum) {
              return (
                <Element
                  key={idx}
                  info={data}
                  data={{ idx, item }}
                  handleClass={handleClass}
                  classes=""
                  screen="practicas"
                  tipo="entre_semana"
                />
              );
            } else {
              return (
                <Element
                  key={idx}
                  info={data}
                  data={{ idx, item }}
                  handleClass={handleClass}
                  classes={classes}
                  screen="practicas"
                  tipo="entre_semana"
                />
              );
            }
          })}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FechaDespues />
        {practicas_findesemana.map((item, idx) => {
          if (idx == indxNum) {
            return (
              <Element
                key={idx}
                info={data}
                data={{ idx, item }}
                handleClass={handleClass}
                classes=""
                screen="practicas"
                tipo="fin_semana"
              />
            );
          } else {
            return (
              <Element
                key={idx}
                info={data}
                data={{ idx, item }}
                handleClass={handleClass}
                classes={classes}
                screen="practicas"
                tipo="fin_semana"
              />
            );
          }
        })}
      </TabPanel>
    </StylesProvider>
  );
}
