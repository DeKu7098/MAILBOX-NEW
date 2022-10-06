import { useDispatch } from "react-redux";
import { Authactions } from "../Store";
import './LogoutButton.css';

const Header = () => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(Authactions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };
  return (
    <div>
      
        {/* <button onClick={logOutHandler}>Log Out</button> */}
        <a href="/" className="bn11" onClick={logOutHandler}>Log Out</a>
      
    </div>
  );
};
export default Header;