import React from "react";
import { Link } from "react-router-dom";

interface MentionTextProps {
  text: string;
}

const MentionText: React.FC<MentionTextProps> = ({ text }) => {
  if (!text) return null;

  const parts = text.split(/(@[a-zA-Z0-9_]+)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("@")) {
          const username = part.substring(1);

          return (
            <Link
              key={index}
              to={`/profiles/${username}`}
              className="text-blue-500 hover:underline relative z-10"
              onClick={(e) => e.stopPropagation()} 
            >
              {part}
            </Link>
          );
        }

        return part;
      })}
    </>
  );
};

export default MentionText;