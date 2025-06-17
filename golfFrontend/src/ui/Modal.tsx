import React, { useState } from "react";
import { useModal } from "./ModalContext";
import Login from "../components/Login/Login";      // prilagodi put ako treba
import Register from "../components/Register/Register"; // prilagodi put ako treba

const Modal = ({ children }: { children?: React.ReactNode }) => {
  const { isOpen, close } = useModal();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg p-[25px] w-full max-w-md mx-4">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>

        {/* Tabs */}
        <div className="flex mb-4 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === "login"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === "register"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Register
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Modal;
