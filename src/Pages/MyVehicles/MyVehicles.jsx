import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router";

const MyVehicles = () => {
    const { user } = useContext(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingVehicle, setDeletingVehicle] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/my-vehicles?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })

            .then(res => res.json())
            .then(data => {
                setVehicles(data.vehicles || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to load vehicles");
                setLoading(false);
            });
    }, [user]);

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/vehicles/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success("Vehicle deleted successfully!");
                    setVehicles(vehicles.filter(v => v._id !== id));
                } else {
                    toast.error("Failed to delete vehicle");
                }
            })
            .catch(() => toast.error("Error deleting vehicle"));
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center mt-6">My Vehicles</h1>

            {vehicles.length === 0 ? (
                <p className="text-center text-gray-500">You haven’t added any vehicles yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map(vehicle => (
                        <div key={vehicle._id} className="card bg-base-100 shadow-xl">
                            <figure className="h-48">
                                <img
                                    src={vehicle.coverImage}
                                    alt={vehicle.vehicleName}
                                    className="w-full h-full object-cover rounded-t-xl"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{vehicle.vehicleName}</h2>
                                <p className="text-sm text-gray-500">{vehicle.category}</p>
                                <p className="font-semibold">${vehicle.pricePerDay}/day</p>
                                <div className="flex justify-between mt-4">
                                    <Link
                                        to={`/vehicle-details/${vehicle._id}`}
                                        className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                                    >
                                        View Details
                                    </Link>

                                    <Link
                                      to={`/update-vehicle/${vehicle._id}`}
                                        className="btn btn-sm bg-yellow-500 text-white hover:bg-yellow-600"
                                    >
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => setDeletingVehicle(vehicle)}
                                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {deletingVehicle && (
                <dialog open className="modal">
                    <div className="modal-box text-center">
                        <h3 className="font-bold text-lg mb-3">
                            Delete {deletingVehicle.vehicleName}?
                        </h3>
                        <p className="mb-5">This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    handleDelete(deletingVehicle._id);
                                    setDeletingVehicle(null);
                                }}
                                className="btn bg-red-500 text-white"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setDeletingVehicle(null)}
                                className="btn bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyVehicles;