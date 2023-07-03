import React, { useContext, useEffect } from "react";
import UserProfileSection from "../sections/UserProfileSection";
import UserContext from "../context/user";
import ModalContext from "../context/modal";
import FridgeSection from "../sections/FridgeSection";
import Modal from "../components/Modal";
import PaymentMethodForm from "../components/PaymentMethodForm";

function MyAccountPage() {
  const { user, logoutUser, deleteUser, resetErrors, setEditMode } =
    useContext(UserContext);
  const { modalOpen, modalAction, setModalAction, openModal, closeModal } =
    useContext(ModalContext);

  useEffect(() => {
    resetErrors();
    setEditMode(false);
    closeModal();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    setModalAction("logout");
    openModal();
  };

  const handleDelete = () => {
    setModalAction("delete");
    openModal();
  };

  const handleConfirm = () => {
    if (modalAction === "logout") {
      logoutUser();
    } else if (modalAction === "delete") {
      deleteUser();
    }
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className="bg-primary min-h-screen pt-20 px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl mx-auto p-8 space-y-10">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {user?.first_name ? `Welcome back, ${user.first_name}!` : "Welcome!"}
        </h1>
        <UserProfileSection />
        <FridgeSection />
        <PaymentMethodForm />
        <div className="flex justify-between w-full mt-10">
          <button
            onClick={handleLogout}
            className="w-full mr-2 py-2 px-4 bg-accent text-white rounded-md hover:bg-secondary transition-all duration-300"
          >
            Log Out
          </button>
          <button
            onClick={handleDelete}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 transition-all duration-300"
          >
            Delete Account
          </button>
        </div>
      </div>
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          title={
            modalAction === "logout"
              ? "Confirm Log Out"
              : "Confirm Account Deletion"
          }
          message={
            modalAction === "logout"
              ? "Are you sure you want to log out?"
              : "Are you sure you want to delete your account? This action cannot be undone."
          }
          onConfirm={handleConfirm}
          onClose={handleClose}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
}

export default MyAccountPage;
