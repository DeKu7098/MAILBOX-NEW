import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {getDetailOnClick} from "../Store/index";
import './DeleteButton.css';


const SentBoxData = ({ id,to ,from, sub, text, date, isRead, onDelete}) => {
  const history = useHistory();
  const dispatch = useDispatch();
    // console.log(props.data);
    // const id = props.id;
    console.log(id);  

   const showDetailsOnClick = () =>{
  dispatch( getDetailOnClick({
    from,
    sub,
    text,
    date,
    isRead,
    id,
  }))

        history.push("/mail")
   }

    // const deleteHandler = () => {
    //    const email1 = localStorage.getItem('email');
    //    console.log(email1);
    //   axios.delete(
    //     `https://mailbox-6a980-default-rtdb.firebaseio.com/${email1}/sent/${id}.json`
    //   );

    // }
    return ( <div>
       {/* <span>To</span> <li>{props.email}</li>
       
       <span>Subject</span> <li>{props.sub}</li>
       <li>{props.text}</li>
    <li>{props.seen}</li>
    <li>{props.date}</li>
    <button className="bn54" onClick={deleteHandler}>
    <span className="bn54span">Delete</span>
  </button> */}
    <> 
     <div onClick={showDetailsOnClick} className="inbox_msg">
        <h3>{to}</h3>
        <h5>{sub}</h5>
        <p>{text}</p>
        <p>{date}</p>
     
    </div>  
    <button className="bn54" onClick={()=>onDelete(id)}>
        <span className="bn54span">Delete</span>
      </button>
    </> 
    </div>
    
   
  )
};

export default SentBoxData;