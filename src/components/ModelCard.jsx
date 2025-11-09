import { Link } from "react-router";

export const ModelCard = ({ model }) => {
  const {
    vehicleName,
    coverImage,
    category,
    description,
    owner,
    _id,
    pricePerDay,
    location,
    availability,
  } = model;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img
          src={coverImage}
          alt={vehicleName}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{vehicleName}</h2>

        <div className="flex justify-between items-center text-xs text-secondary mb-2">
          <span className="badge badge-secondary badge-sm rounded-full">
            {category}
          </span>
          <span>{availability}</span>
        </div>

        <p className="line-clamp-2 text-sm text-base-content/80">{description}</p>

        <div className="mt-3 text-xs text-base-content/60">
          <p>Owner: {owner}</p>
          <p>Location: {location}</p>
          <p>Price per day: ${pricePerDay}</p>
        </div>

        <div className="card-actions justify-end items-center mt-4">
          <Link
            to={`/model-details/${_id}`}
            className="btn rounded-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-500 text-white w-full btn-sm"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
