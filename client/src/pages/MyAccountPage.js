import React, { useContext } from "react";
import UserProfileSection from "../sections/UserProfileSection";
import UserContext from "../context/auth";
import ModalContext from "../context/modal";
import Modal from "../components/Modal";

function MyAccountPage() {
  const { logoutUser } = useContext(UserContext);
  const { modalOpen, openModal, closeModal } = useContext(ModalContext);

  const handleLogout = () => {
    openModal();
  };

  const handleConfirm = () => {
    logoutUser();
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">My Account</h1>

      <UserProfileSection />

      <button
        onClick={handleLogout}
        className="mt-4 py-2 px-4 bg-red-500 text-white rounded"
      >
        Log Out
      </button>

      <Modal
        isOpen={modalOpen}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </div>
  );
}

export default MyAccountPage;
