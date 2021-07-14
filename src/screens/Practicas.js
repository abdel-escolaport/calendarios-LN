import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { StylesProvider } from "@material-ui/core/styles";

import Element from "../components/Element";
import Stepper from "../ui/Stepper";
import FechaDespues from "../components/FechaDespues";

import "../components/Element.css";
import "../components/Screen.css";

import ClipLoader from "react-spinners/ClipLoader";

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

  const data = useSelector((state) => state.data.dataPracticas);
  const periodo = useSelector((state) => state.data.practicas.periodo);
  const disableClass = useSelector((state) => state.toggle.disable);
  const scrolldiv = useSelector((state) => state.screens.scrollDivPracticas);

  const practicas_entresemana = data.value.entresemana;
  const practicas_findesemana = data.value.findesemana;

  useEffect(() => {
    scrollTo();
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    if (practicas_entresemana.length > 0) {
      if (periodo == "" || periodo === "entre_semana") {
        document.getElementById("nav-tab-0").click();
      } else {
        document.getElementById("nav-tab-1").click();
      }
    }
  }, [periodo]);

  const scrollTo = () => {
    if (scrolldiv) {
      const section = document.querySelector(scrolldiv);
      if (scrolldiv === "#element_fechadespues") {
        window.scrollTo(0, 0);
      } else {
        section.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClass = (value, periodo, element) => {
    setIndxNum(value);
    if (value > 0) {
      setClasses(" element__disable");
    } else {
      setClasses("");
    }
  };

  return (
    <>
      {practicas_entresemana.length == 0 ? (
        <div className="screen__container">
          <ClipLoader color="#499bb1" loading={true} size={100} />
        </div>
      ) : (
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
          </div>
          <Stepper />
          <TabPanel value={value} index={0}>
            <div className="element__tab">
              <FechaDespues
                id={-1}
                screen="practicas"
                handleClass={handleClass}
                periodo="entre_semana"
              />
              <>
                {practicas_entresemana.map((item, idx) => {
                  if (item.id == indxNum) {
                    return (
                      <Element
                        key={idx}
                        info={data}
                        data={{ item }}
                        handleClass={handleClass}
                        classes=""
                        screen="practicas"
                        tipo="entre_semana"
                        scrollTo={scrollTo}
                      />
                    );
                  } else {
                    return (
                      <Element
                        key={idx}
                        info={data}
                        data={{ item }}
                        handleClass={handleClass}
                        classes={classes}
                        screen="practicas"
                        tipo="entre_semana"
                        scrollTo={scrollTo}
                      />
                    );
                  }
                })}
              </>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FechaDespues
              id={-1}
              screen="practicas"
              handleClass={handleClass}
              periodo="fin_desemana"
            />
            {practicas_findesemana.map((item, idx) => {
              if (item.id == indxNum) {
                return (
                  <Element
                    key={idx}
                    info={data}
                    data={{ item }}
                    handleClass={handleClass}
                    classes=""
                    screen="practicas"
                    tipo="fin_semana"
                    scrollTo={scrollTo}
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
                    scrollTo={scrollTo}
                  />
                );
              }
            })}
          </TabPanel>
        </StylesProvider>
      )}
    </>
  );
}
