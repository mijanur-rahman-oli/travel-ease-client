import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AddVehicles = () => {
  const { user } = use(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const vehicleData = {
      vehicleName: form.vehicleName.value,
      owner: form.owner.value,
      category: form.category.value,
      categories: form.category.value,
      pricePerDay: Number(form.pricePerDay.value),
      location: form.location.value,
      availability: form.availability.value,
      description: form.description.value,
      coverImage: form.coverImage.value,
      userEmail: user?.email || "unknown@email.com",
      createdAt: new Date().toISOString(),
    };

    fetch("http://localhost:3000/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.success) {
          toast.success("Vehicle added successfully! 🚗");
          form.reset();
        } else {
          toast.error(data.message || "Failed to add vehicle");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="card border border-gray-200 bg-base-200 w-full max-w-2xl mx-auto shadow-2xl rounded-2xl my-6">
      <div className="card-body p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Add New Vehicle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="label font-medium text-gray-500">Vehicle Name</label>
            <input
              type="text"
              name="vehicleName"
              required
              className="input w-full rounded-full focus:border-pink-500"
              placeholder="e.g., Toyota Corolla 2024"
            />
          </div>

          <div>
            <label className="label text-gray-500 font-medium">Owner</label>
            <input
              type="text"
              name="owner"
              required
              className="input w-full rounded-full focus:border-pink-500"
              placeholder="e.g., John Doe"
            />
          </div>

          <div>
            <label className="label text-gray-500 font-medium">Category</label>
            <select
              name="category"
              required
              defaultValue=""
              className="select w-full rounded-full focus:border-pink-500"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
              <option value="Truck">Truck</option>
              <option value="Van">Van</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Electric">Electric</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <div>
            <label className="label text-gray-500 font-medium">Price Per Day ($)</label>
            <input
              type="number"
              name="pricePerDay"
              required
              min="1"
              className="input w-full rounded-full focus:border-pink-500"
              placeholder="e.g., 70"
            />
          </div>

          <div>
            <label className="label text-gray-500 font-medium">Location</label>
            <input
              type="text"
              name="location"
              required
              className="input w-full rounded-full focus:border-pink-500"
              placeholder="e.g., Dhaka, Bangladesh"
            />
          </div>

          <div>
            <label className="label text-gray-500 font-medium">Availability</label>
            <select
              name="availability"
              required
              defaultValue="Available"
              className="select w-full rounded-full focus:border-pink-500"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="label text-gray-500 font-medium">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              required
              className="input w-full rounded-full focus:border-pink-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="label text-gray-500 font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="4"
              className="textarea w-full rounded-2xl focus:border-pink-500 h-[200px]"
              placeholder="Describe your vehicle..."
            ></textarea>
          </div>

          <div>
            <label className="label text-gray-500 font-medium">Your Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="input w-full rounded-full bg-base-200 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-0"
          >
            Add Vehicle 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicles;
