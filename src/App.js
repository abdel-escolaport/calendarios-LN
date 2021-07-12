import "./App.css";
import Header from "./ui/Header";
import Months from "./ui/Months";
import Practicas from "./screens/Practicas";
import Teoria from "./screens/Teoria";
import Extras from "./screens/Extras";
import Resumen from "./screens/Resumen";
import Pago from "./screens/Pago";

import { useSelector } from "react-redux";

const App = () => {
  const screen = useSelector((state) => state.screens.mainScreen);
  //  const practicas_data = useSelector((state) => state.data.data);
  // const teoria_data = useSelector((state) => state.data.teoria);
  // const extras_data = useSelector((state) => state.data.extras);

  let renderScreen;

  if (screen == "practicas") {
    renderScreen = <Practicas />;
  } else if (screen == "teoria") {
    renderScreen = <Teoria />;
  } else if (screen == "extras") {
    renderScreen = <Extras />;
  } else if (screen == "resumen") {
    renderScreen = <Resumen />;
  } else {
    renderScreen = <Pago />;
  }

  return (
    <div className="container">
      <Header />

      {screen == "practicas" && <Months />}
      {renderScreen}
    </div>
  );
};

export default App;
