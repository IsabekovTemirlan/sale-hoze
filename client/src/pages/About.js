import React from "react";
import {Link} from "react-router-dom";

export const AboutPage = () => {
  return (
    <div>
      <Link to="/admin" className="m-2 text-blue-600 underline"> Для правообладателей</Link>
    </div>
  )
};
