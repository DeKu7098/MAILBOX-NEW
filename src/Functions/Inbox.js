import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './InboxButton.css';
import axios from "axios";
import InboxData from "./InboxData";




const Inbox = () => {
 const email = useSelector(state => state.auth.email);
 console.log(email);
 const [inboxData, setInboxData] = useState([]);
 
useEffect(() => {
    fetch(
      `https://mailbox-6a980-default-rtdb.firebaseio.com/${email}/inbox.json`
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
              from: data[key].from,
            });
          }
          setInboxData(loadedData);

          // console.log(inboxData);
          // console.log(response);
          //console.log(loadedData);
        });
      }
    });},[email]); 
 
 const deleteHandler = (id) => {
   const email1 = localStorage.getItem("email");

     console.log(email1);
     try {
       const res = axios.delete(
         `https://mailbox-6a980-default-rtdb.firebaseio.com/${email1}/inbox/${id}.json`
       )
       console.log(id);
     
      const result = inboxData.filter((item) => item.id !== id);
      setInboxData(result);
      console.log("Sucessfully deleted");
      console.log(res);
     } catch (err) {
       console.log(err);
     }
 }; 
    const display = inboxData.map((inbox) => (
      <InboxData
        from={inbox.from}
        sub={inbox.sub}
        date={inbox.date}
        text={inbox.text}
        key={inbox.id}
        id={inbox.id}
        isRead={inbox.seen}
        onDelete={deleteHandler}
      />
    ));
      console.log(inboxData);

 return (
    <div>
        
       {display}
        
    </div>
    
 )
};

export default Inbox;