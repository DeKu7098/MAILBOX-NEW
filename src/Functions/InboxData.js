import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDetailOnClick } from "../Store/index";
import "./DeleteButton.css";

const InboxData = ({ id,from, sub, text, date, isRead, onDelete}) => {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const showDetailsOnClick = async() => {
    dispatch( getDetailOnClick({
        from,
        sub,
        text,
        date,
        isRead,
        id,
      })
    );
     const data = {
      seen: true,
    };
    try {
        const email1 = localStorage.getItem("email");
        console.log(email1);
      const response = await axios
        .patch(
          `https://mailbox-6a980-default-rtdb.firebaseio.com/${email1}/inbox/${id}.json`,
          data
        )
        .then((resp) => {
          console.log(resp);
        });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    history.push("/mail");
  };

  // const deleteHandler = (id) => {
  //   alert(id)
  //   const email1 = localStorage.getItem("email");

  //   console.log(email1);
  //   try {
  //     const res = axios.delete(
  //       `https://mailbox-6a980-default-rtdb.firebaseio.com/${email1}/inbox/${id}.json`
  //     );
  //     console.log("Sucessfully deleted");
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }  
   
    
  // };
  return (
    <> 
     <div onClick={showDetailsOnClick} className="inbox_msg">
        {!isRead && <h1 className={isRead ? "read" : "unread"}>•</h1>}
        <h3>{from}</h3>
        <h5>{sub}</h5>
        <p>{text}</p>
        <p>{date}</p>
     
    </div>  
    <button className="bn54" onClick={()=>onDelete(id)}>
        <span className="bn54span">Delete</span>
      </button>
    </>    
  );
};

export default InboxData;
