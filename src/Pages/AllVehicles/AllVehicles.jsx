import { useLoaderData } from "react-router";
import { ModelCard } from "../../components/ModelCard";
import { useState } from "react";
import axios from "axios";
import { Search, Car } from "lucide-react";

const AllVehicles = () => {
    const data = useLoaderData();
    const [vehicles, setVehicles] = useState(data || []);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-base-content/60">Loading vehicles...</p>
                </div>
            </div>
        );
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const search_text = searchTerm.trim();
        if (!search_text) {
            setVehicles(data);
            setIsSearchActive(false);
            return;
        }

        setLoading(true);
        setIsSearchActive(true);
        try {
            const response = await axios.get(
                `http://localhost:3000/search?search=${search_text}`
            );
            setVehicles(response.data);
        } catch (error) {
            console.error("Search error:", error);
            alert("Search failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSearchTerm("");
        setVehicles(data);
        setIsSearchActive(false);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (!value.trim()) {
            setVehicles(data);
            setIsSearchActive(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-100">
            <div className="relative py-16 px-6 mb-10 bg-gradient-to-b from-base-200 to-base-100">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-base-content mb-4 tracking-tight">
                        Explore Our <span className="text-primary">Vehicles</span>
                    </h1>

                    <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
                        Discover your perfect travel companion from our curated collection of premium and affordable vehicles.
                    </p>

                    <div className="flex items-center justify-center gap-3 mt-6 text-sm text-base-content/70">
                        <span className="badge badge-outline badge-lg">
                            {vehicles.length} {isSearchActive ? "vehicles found" : "vehicles available"}
                        </span>
                    </div>
                </div>

                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('/grid.svg')] bg-center bg-cover"></div>
            </div>


            <div className="max-w-7xl mx-auto px-4 pb-12">
                <form
                    onSubmit={handleSearch}
                    className="mb-8 flex flex-col sm:flex-row gap-3 justify-center items-center"
                >
                    <div className="relative w-full sm:w-96">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-base-content/40" />
                        </div>
                        <input
                            name="search"
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Search by name, location, category..."
                            className="input input-bordered w-full pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary rounded-full px-6 min-w-32"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search className="w-4 h-4" />
                                    Search
                                </>
                            )}
                        </button>

                        {isSearchActive && (
                            <button
                                type="button"
                                onClick={handleReset}
                                className="btn btn-outline rounded-full px-6"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </form>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <p className="mt-4 text-base-content/60">Loading vehicles...</p>
                    </div>
                ) : vehicles.length > 0 ? (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-base-content/80">
                                {isSearchActive
                                    ? `Search Results for "${searchTerm}" (${vehicles.length})`
                                    : `All Vehicles (${vehicles.length})`
                                }
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {vehicles.map((vehicle) => (
                                <ModelCard key={vehicle._id} model={vehicle} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Car className="w-20 h-20 text-base-content/20 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
                        <p className="text-base-content/60 mb-4">
                            {isSearchActive
                                ? `No results for "${searchTerm}". Try a different search term.`
                                : "No vehicles available at the moment."
                            }
                        </p>
                        {isSearchActive && (
                            <button
                                onClick={handleReset}
                                className="btn btn-primary rounded-full"
                            >
                                View All Vehicles
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllVehicles;