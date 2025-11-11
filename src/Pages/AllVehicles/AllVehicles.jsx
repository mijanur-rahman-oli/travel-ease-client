import { useLoaderData } from "react-router";
import { useState, useMemo } from "react";
import { ModelCard } from "../../components/ModelCard";
import { Search, Car, Filter, X } from "lucide-react";

const AllVehicles = () => {
    const loaderData = useLoaderData();
    const originalVehicles = Array.isArray(loaderData) ? loaderData : loaderData?.vehicles || [];

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedLocation, setSelectedLocation] = useState("all");
    const [sortBy, setSortBy] = useState("name-asc");

    const categories = useMemo(() => {
        const cats = originalVehicles
            .map(v => v.category)
            .filter(Boolean);
        return ["all", ...new Set(cats)].sort();
    }, [originalVehicles]);

    const locations = useMemo(() => {
        const locs = originalVehicles
            .map(v => v.location)
            .filter(Boolean);
        return ["all", ...new Set(locs)].sort();
    }, [originalVehicles]);

    const filteredVehicles = useMemo(() => {
        let list = [...originalVehicles];

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            list = list.filter(v =>
                v.vehicleName?.toLowerCase().includes(term) ||
                v.category?.toLowerCase().includes(term) ||
                v.location?.toLowerCase().includes(term) ||
                v.owner?.toLowerCase().includes(term)
            );
        }

        if (selectedCategory !== "all") {
            list = list.filter(v => v.category === selectedCategory);
        }

        if (selectedLocation !== "all") {
            list = list.filter(v => v.location === selectedLocation);
        }

        return list.sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.pricePerDay - b.pricePerDay;
                case "price-high":
                    return b.pricePerDay - a.pricePerDay;
                case "name-asc":
                default:
                    return a.vehicleName.localeCompare(b.vehicleName);
            }
        });
    }, [originalVehicles, searchTerm, selectedCategory, selectedLocation, sortBy]);

    const handleReset = () => {
        setSearchTerm("");
        setSelectedCategory("all");
        setSelectedLocation("all");
        setSortBy("name-asc");
    };

    if (originalVehicles.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4">Loading vehicles...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100">

            <div className="hero py-6 bg-gradient-to-b from-base-200 to-base-100">
                <div className="hero-content text-center">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">
                            Explore Our <span className="text-primary">Vehicles</span>
                        </h1>
                        <p className="py-6 max-w-2xl mx-auto">
                            Premium cars, SUVs, and more — available across Dhaka, Sylhet and beyond.
                        </p>
                        <div className="badge badge-outline badge-lg">
                            {filteredVehicles.length} vehicles
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-4">
                <div className="mb-10 space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800" />
                            <input
                                type="text"
                                placeholder="Search by name, owner, location..."
                                className="input input-bordered w-full pl-12 rounded-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {(searchTerm || selectedCategory !== "all" || selectedLocation !== "all") && (
                            <button onClick={handleReset} className="btn btn-outline rounded-full">
                                <X className="w-4 h-4" /> Clear All
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5" />
                            <select
                                className="select select-bordered select-sm rounded-full"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat === "all" ? "All Categories" : cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <select
                            className="select select-bordered select-sm rounded-full"
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                        >
                            {locations.map(loc => (
                                <option key={loc} value={loc}>
                                    {loc === "all" ? "All Locations" : loc}
                                </option>
                            ))}
                        </select>

                        <select
                            className="select select-bordered select-sm rounded-full"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {filteredVehicles.length === 0 ? (
                    <div className="text-center py-20">
                        <Car className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">No vehicles found</h3>
                        <p className="text-gray-500 mb-6">Try changing your filters.</p>
                        <button onClick={handleReset} className="btn btn-primary rounded-full">
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredVehicles.map((vehicle) => (
                            <ModelCard key={vehicle._id} model={vehicle} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllVehicles;