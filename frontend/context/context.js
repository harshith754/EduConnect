"use client";

import React, { createContext, useContext, useState } from "react";

const SideBarContext = createContext();

export const useSideBarContext = () => useContext(SideBarContext);

export const SideBarProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState("");

  const handleAccordionClick = (value) => {
    setSelectedTab(value);
  };

  const value = {
    selectedTab,
    handleAccordionClick,
  };

  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
};
