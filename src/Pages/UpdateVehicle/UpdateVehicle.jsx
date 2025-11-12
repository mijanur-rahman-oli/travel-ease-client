import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const UpdateVehicle = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !user?.accessToken) return;

    fetch(`http://localhost:3000/vehicles/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Convert pricePerDay to number if it's object
          const price =
            typeof data.result.pricePerDay === "object"
              ? parseInt(data.result.pricePerDay.$numberInt)
              : data.result.pricePerDay;

          setVehicle({ ...data.result, pricePerDay: price });
        } else {
          toast.error("Failed to load vehicle");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching vehicle data");
        setLoading(false);
      });
  }, [id, user]);

const handleSubmit = (e) => {
  e.preventDefault();

  const updatedVehicle = {
    vehicleName: e.target.vehicleName.value,
    category: e.target.category.value,
    description: e.target.description.value,
    coverImage: e.target.coverImage.value,
    pricePerDay: parseInt(e.target.pricePerDay.value),
    location: e.target.location.value,
    availability: e.target.availability.value,
  };

  fetch(`http://localhost:3000/vehicles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${user.accessToken}`, // Important
    },
    body: JSON.stringify(updatedVehicle),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Update response:", data);
      if (data.success && data.result.modifiedCount > 0) {
        toast.success("Vehicle updated successfully!");
        navigate("/my-vehicles");
      } else {
        toast.error("Failed to update vehicle");
      }
    })
    .catch((err) => {
      console.error(err);
      toast.error("Error updating vehicle");
    });
};

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!vehicle) return <div className="text-center py-10">Vehicle not found</div>;

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Update Vehicle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label font-medium">Vehicle Name</label>
            <input
              type="text"
              name="vehicleName"
              defaultValue={vehicle.vehicleName}
              required
              className="input w-full rounded-full"
            />
          </div>

          <div>
            <label className="label font-medium">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={vehicle.category}
              required
              className="input w-full rounded-full"
            />
          </div>

          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              defaultValue={vehicle.description}
              required
              rows="4"
              className="textarea w-full rounded-2xl"
            ></textarea>
          </div>

          <div>
            <label className="label font-medium">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              defaultValue={vehicle.coverImage}
              required
              className="input w-full rounded-full"
            />
          </div>

          <div>
            <label className="label font-medium">Price Per Day ($)</label>
            <input
              type="number"
              name="pricePerDay"
              defaultValue={vehicle.pricePerDay}
              required
              className="input w-full rounded-full"
            />
          </div>

          <div>
            <label className="label font-medium">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={vehicle.location}
              required
              className="input w-full rounded-full"
            />
          </div>

          <div>
            <label className="label font-medium">Availability</label>
            <select
              name="availability"
              defaultValue={vehicle.availability}
              required
              className="select w-full rounded-full"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
          >
            Update Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateVehicle;
