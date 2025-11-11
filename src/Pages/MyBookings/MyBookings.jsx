import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/my-bookings?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBookings(data.bookings || []);
        } else {
          toast.error("Failed to load your bookings");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching bookings");
        setLoading(false);
      });
  }, [user]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel this booking?",
      text: "You can’t undo this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ec4899",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleting(true);
        fetch(`http://localhost:3000/bookings/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setBookings((prev) => prev.filter((b) => b._id !== id));
              toast.success("Booking cancelled successfully!");
            } else {
              toast.error("Failed to cancel booking");
            }
            setDeleting(false);
          })
          .catch((err) => {
            console.error(err);
            toast.error("Error cancelling booking");
            setDeleting(false);
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <p className="text-lg font-semibold text-base-content animate-pulse">
          Loading your bookings...
        </p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="text-center bg-base-100 p-10 rounded-3xl shadow-xl">
          <div className="text-6xl mb-4 animate-bounce">📝</div>
          <h2 className="text-2xl font-bold mb-2 text-base-content">
            No Bookings Yet
          </h2>
          <p className="text-base-content/60 mb-4">
            Start exploring vehicles and make your first booking!
          </p>
          <Link
            to="/all-vehicles"
            className="btn bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 hover:from-pink-600 hover:to-purple-700"
          >
            Browse Vehicles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 ">
          My Bookings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="card bg-base-100 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <figure className="relative">
                <img
                  src={booking.coverImage || "https://via.placeholder.com/400x250"}
                  alt={booking.vehicleName}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`badge text-white border-0 ${
                      booking.status === "pending"
                        ? "bg-yellow-500"
                        : booking.status === "approved"
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </div>
              </figure>
              <div className="card-body">
                <h2 className="card-title">{booking.vehicleName}</h2>
                <p className="text-sm text-base-content/70">
                  Location: {booking.location}
                </p>
                <p className="text-sm text-base-content/70">
                  Owner: {booking.owner}
                </p>
                <p className="font-semibold text-base-content">
                  ${booking.pricePerDay}/day
                </p>
                <div className="card-actions justify-between mt-4">
                  <Link
                    to={`/vehicles/${booking.vehicleId}`}
                    className="btn btn-sm bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 hover:from-blue-600 hover:to-cyan-700"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleCancel(booking._id)}
                    disabled={deleting}
                    className="btn btn-sm bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 hover:from-rose-600 hover:to-pink-700 disabled:opacity-50"
                  >
                    {deleting ? "Cancelling..." : "Cancel"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
