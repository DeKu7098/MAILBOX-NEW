import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function MailDetail() {
     const history = useHistory();
    const selectedEmail = useSelector((state) => state.send.openMessage);
    if (selectedEmail === null) return null;

  return (
    <div>
      <p onClick={()=>history.goBack()}>Back</p>
      <h1>{selectedEmail.from}</h1>
      <h3>{selectedEmail.sub} </h3><span>{selectedEmail.date}</span>
      <p>{selectedEmail.text}</p>
    </div>
  )
}

export default MailDetail