import { useLoaderData, useNavigation } from "react-router";
import { ModelCard } from "../../components/ModelCard";
import Banner from "../../components/Banner";
import LoadingSpinner from "../../components/LoadingSpinner";

const Home = () => {
    const data = useLoaderData();
    const { state } = useNavigation(); 
    const loading = state === "loading";

    const categories = [
        { name: "SUVs", icon: "SUV", description: "Spacious & versatile" },
        { name: "Electric", icon: "EV", description: "Eco-friendly rides" },
        { name: "Vans", icon: "Van", description: "Perfect for groups" },
        { name: "Sedans", icon: "Car", description: "Comfort & style" }
    ];

    if (loading) {
      return <LoadingSpinner />
    }
    return (
        <div>
            <Banner />

            <section className="max-w-[1344px] mx-auto mt-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Latest Vehicles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.map((vehicle) => (
                        <ModelCard key={vehicle._id} model={vehicle} />
                    ))}
                </div>
            </section>
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 mt-16 py-16">
                <div className="max-w-[1344px] mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
                        About TravelEase
                    </h2>
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                            TravelEase is your trusted platform for hassle-free vehicle rentals.
                            We connect travelers with reliable car owners, offering a wide range of vehicles to suit every journey.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                            Whether you're planning a road trip, need a car for business, or looking for an eco-friendly ride, we've got you covered with competitive prices and verified hosts.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
                                <div className="text-3xl mb-2">Lock</div>
                                <h3 className="font-semibold text-lg mb-2 dark:text-white">Secure Bookings</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Safe and encrypted transactions</p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
                                <div className="text-3xl mb-2">Check</div>
                                <h3 className="font-semibold text-lg mb-2 dark:text-white">Verified Hosts</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">All owners are carefully vetted</p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
                                <div className="text-3xl mb-2">Money</div>
                                <h3 className="font-semibold text-lg mb-2 dark:text-white">Best Prices</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Competitive rates for every budget</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-[1344px] mx-auto mt-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
                    Top Categories
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center cursor-pointer border border-gray-100 dark:border-gray-700"
                        >
                            <div className="text-5xl mb-3">{category.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">{category.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;