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
    <div className="pt-20 px-8">
      {" "}
      {/* Adjusted padding-top to pt-20 from pt-12 */}
      <h1 className="text-3xl font-bold mb-6 text-center">My Account</h1>
      <div className="flex justify-center">
        <UserProfileSection />
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 text-white rounded"
        >
          Log Out
        </button>
      </div>
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
