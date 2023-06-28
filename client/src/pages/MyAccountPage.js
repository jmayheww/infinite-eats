import React, { useContext } from "react";
import UserProfileSection from "../sections/UserProfileSection";
import UserContext from "../context/user";
import ModalContext from "../context/modal";
import Modal from "../components/Modal";
import PaymentMethodForm from "../components/PaymentMethodForm";

function MyAccountPage() {
  const { user, logoutUser, deleteUser } = useContext(UserContext);
  const { modalOpen, modalAction, setModalAction, openModal, closeModal } =
    useContext(ModalContext);

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
    <div className="pt-20 px-8 bg-primary min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-secondary">
        {user?.first_name ? `Welcome back, ${user.first_name}!` : "Welcome!"}
      </h1>
      <div className="flex flex-col justify-center items-center space-y-8">
        <UserProfileSection />
        <PaymentMethodForm />
        <div className="flex justify-between w-full max-w-md mt-4">
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-secondary text-white rounded-md hover:bg-accent hover:opacity-80 transition-all duration-300 w-full mr-2"
          >
            Log Out
          </button>
          <button
            onClick={handleDelete}
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 hover:opacity-80 transition-all duration-300 ease-in-out w-full"
          >
            Delete Account
          </button>
        </div>
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
        />
      </div>
    </div>
  );
}

export default MyAccountPage;
