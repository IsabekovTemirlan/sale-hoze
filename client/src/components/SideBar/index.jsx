import React, { useState } from "react"
import SideBarContainer from "./SideBar";

export const SideBar = ({ state }) => {
  const [visible, setVisible] = useState(false);

  document.onclick = (e) => {
    if (visible) {
      e.target.classList[0] === "transition-all"
        ? setVisible(true)
        : setVisible(false);
    }
  };

  return <SideBarContainer
    state={state}
    visible={visible}
    setVisible={setVisible}
  />
};
