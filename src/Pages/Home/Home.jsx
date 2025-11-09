import { useLoaderData } from "react-router";
import { ModelCard } from "../../components/ModelCard";
import Banner from "../../components/Banner";

const Home = () => {
    const data = useLoaderData();
    console.log(data);

    return (
        <div>
            <Banner />
            <div className="text-center text-xl font-bold mt-10">Latest Vehicles</div>

            <div className="max-w-[1344px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {data?.map((vehicle) => (
                    <ModelCard key={vehicle._id} model={vehicle} />
                ))}
            </div>
        </div>
    );
};

export default Home;
