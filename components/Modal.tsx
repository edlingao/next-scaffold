"use client";

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, onClose, children }: Props) {
  const handleClose = () => {
    onClose?.();
  }
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white p-4 rounded-lg w-1/2 h-96 overflow-auto">
            {children}
            <button
              className="absolute top-2 right-2"
              onClick={handleClose}
            >✖️</button>
          </div>
        </div>
      )}
    </>
  );
}

