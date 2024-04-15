import { useState, useEffect } from "react";
import axios from "axios";

const fetchData = async () => {
  const response = await axios.get("https://dog.ceo/api/breeds/list/all");
  return response.data.message;
};

function App() {
  const [category, setCategory] = useState({});

  const displayData = async () => {
    const fetchedData = await fetchData();
    setCategory(fetchedData);
    console.log(fetchedData);
  };

  useEffect(() => {
    displayData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl">Dogs</h1>
      <div className="flex justify-around mt-10">
        <div className=" w-1/2">
          <h2 className="text-red-500">Catalog</h2>
          <div>
            {Object.keys(category).map((key) => (
              <p key={key} className="flex gap-2">
                <p>{key}:</p>
                <p className="flex flex-wrap gap-2">
                  {category[key].map((sub) => (
                    <p key={sub}>{sub}, </p>
                  ))}
                </p>
              </p>
            ))}
          </div>
        </div>
        <div>
          <h2>Image</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
