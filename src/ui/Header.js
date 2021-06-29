import "./Header.css";
import Modal from "../components/Modal";
import HelpOutline from "@material-ui/icons/HelpOutline";
import IconButton from "@material-ui/core/IconButton";

import { useSelector, useDispatch } from "react-redux";

import { toggleActions } from "../store/toggle-slice";

const Header = () => {
  const dispatch = useDispatch();

  const showModal = useSelector((state) => state.toggle.showModal);

  return (
    <>
      <div className="header__top">
        <div className="header__title">
          <h3>
            <span>LN</span> - Licencia de navegación
          </h3>
        </div>
        {showModal && <Modal />}

        <div className="header__iconContainer">
          <IconButton
            onClick={() => {
              dispatch(toggleActions.toggleModal());
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
