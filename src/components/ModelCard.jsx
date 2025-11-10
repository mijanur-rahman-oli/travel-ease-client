import { Link } from "react-router";
import React from "react";
import { MapPin, User, DollarSign, Calendar } from "lucide-react";

export const ModelCard = React.memo(({ model }) => {
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

  const isAvailable = availability?.toLowerCase() === "available";

  return (
    <div className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden border border-base-200">

      <figure className="relative h-56 overflow-hidden">
        <img
          src={coverImage}
          alt={vehicleName}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3">
          <span className="badge badge-primary gap-1 font-semibold shadow-lg backdrop-blur-sm bg-primary/90">
            {category}
          </span>
        </div>


        <div className="absolute top-3 right-3">
          <span className={`badge gap-1 font-semibold shadow-lg backdrop-blur-sm ${isAvailable
              ? 'badge-success bg-green-500/90 text-white'
              : 'badge-error bg-red-500/90 text-white'
            }`}>
            {availability}
          </span>
        </div>
      </figure>


      <div className="card-body p-5">

        <h2 className="card-title text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {vehicleName}
        </h2>


        <p className="text-sm text-base-content/70 line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>


        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-base-content/80 truncate">{location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-base-content/80 truncate">Hosted by {owner}</span>
          </div>
        </div>


        <div className="flex items-center justify-between pt-4 border-t border-base-200">
          <div className="flex items-baseline gap-1">
            <DollarSign className="w-5 h-5 text-success" />
            <span className="text-2xl font-bold text-success">{pricePerDay}</span>
            <span className="text-sm text-base-content/60">/day</span>
          </div>

          <Link
            to={`/vehicle-details/${_id}`}
            className="btn btn-primary btn-sm rounded-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
});