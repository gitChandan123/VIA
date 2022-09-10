import React from 'react';
import Message from './Message';

const Messages = ({messages,name}) => {
    return (
      <>
        {messages.map((message, i) => (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        ))}
      </>
    );
}

export default Messages