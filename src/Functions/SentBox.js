import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './InboxButton.css';
import axios from "axios";
import SentBoxData from "./SentBoxData";





const SentBox = () => {
 const email = useSelector(state => state.auth.email);
 console.log(email);
 const [sentBoxData, setSentBoxData] = useState([]);
useEffect(() => {
    fetch(
      `https://mailbox-6a980-default-rtdb.firebaseio.com/${email}/sent.json`
    ).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          const data = res;
          console.log(data);
          const loadedData = [];
          for (const key in data) {
            loadedData.push({
              id: key,
              key: key,
              sub: data[key].sub,
              text: data[key].text,
              email: data[key].email,
              date: data[key].date,
              seen: data[key].seen,
              to: data[key].to,
            });
          }
          setSentBoxData(loadedData);

          // console.log(inboxData);
          // console.log(response);
          //console.log(loadedData);
        });
      }
    });},[email]); 
 
 const deleteHandler = (id)=>{
  const email1 = localStorage.getItem("email");

     console.log(email1);
     try {
       const res = axios.delete(
         `https://mailbox-6a980-default-rtdb.firebaseio.com/${email1}/sent/${id}.json`
       )
     
      const result = sentBoxData.filter((item) => item.id !== id);
     setSentBoxData(result);
      console.log("Sucessfully deleted");
      console.log(res);
     } catch (err) {
       console.log(err);
     }
 }
    
    const display = sentBoxData.map((sent) => (
            
           <SentBoxData to={sent.to}
                     email={sent.email}
                     sub={sent.sub}
                     date={sent.date}
                     seen={sent.seen}
                     text={sent.text}
                     key ={sent.id}
                     id={sent.id}
                     onDelete={deleteHandler}
                     />
                     
                    
      
       
    ))
      console.log(sentBoxData);

 return (
    <div>
        
      {display}
        
    </div>
    
 )
};

export default SentBox;