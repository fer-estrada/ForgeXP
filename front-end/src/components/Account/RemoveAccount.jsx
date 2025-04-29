import { address } from "../../../address"; //update address here
console.log('address =>', address);

export default function RemoveAccount({ user, navigate }) {
  async function deleteself() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return; // If user cancels, don't proceed

    try {
      const response = await fetch(
        `${address}/user/delete/${user.id}`, //update address here
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const result = await response.json();

      if (result.error) {
        console.error(result.error);
      } else {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (err) {
      console.error("Failed to delete account:", err);
    }
  }

  return (
    <div
      onClick={deleteself}
      className="cursor-pointer select-none bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold  py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-8 mb-6 text-center drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]"
    >
      Delete My Account
    </div>
  );
}
