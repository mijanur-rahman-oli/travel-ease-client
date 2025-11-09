import { useLoaderData } from "react-router";
import { ModelCard } from "../../components/ModelCard";

const Home = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <div>
  
      <div className="text-center text-xl font-bold mt-10">Latest Vehicles</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {data?.map((vehicle) => (
          <ModelCard key={vehicle._id} model={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Home;
