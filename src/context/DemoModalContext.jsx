'use client';

import React, { createContext, useContext, useState } from 'react';

const DemoModalContext = createContext();

export function DemoModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultProduct, setDefaultProduct] = useState('General Enquiry');

  const openDemoModal = (productName = 'General Enquiry') => {
    setDefaultProduct(productName);
    setIsOpen(true);
  };

  const closeDemoModal = () => {
    setIsOpen(false);
  };

  return (
    <DemoModalContext.Provider value={{ isOpen, openDemoModal, closeDemoModal, defaultProduct }}>
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (!context) {
    throw new Error('useDemoModal must be used within a DemoModalProvider');
  }
  return context;
}
