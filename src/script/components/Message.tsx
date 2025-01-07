import React from "react";

type MessageProps = {
  successText: string;
}

const Message = ({ successText }: MessageProps) => {
  return (
    <div className="puzzle__message">{successText}</div>
  );
};

export default Message;
