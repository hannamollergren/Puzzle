import React from "react";

interface MessageProps {
  successText: string;
}

const Message = ({ successText }: MessageProps) => {
  return (
    <div className="puzzle__message">{successText}</div>
  );
};

export default Message;
