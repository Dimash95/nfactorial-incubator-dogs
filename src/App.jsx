import { useState, useEffect } from "react";
import axios from "axios";

const fetchCategory = async () => {
  const response = await axios.get("https://dog.ceo/api/breeds/list/all");
  return response.data.message;
};

const fetchImage = async (key = "hound", sub = "") => {
  try {
    const response = await axios.get(`https://dog.ceo/api/breed/${key}${sub}/images`);
    return response.data.message;
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    }
  }
};

function App() {
  const [category, setCategory] = useState({});
  const [image, setImage] = useState([]);
  const [ind, setInd] = useState(0);
  const [searchValue, setSearchValue] = useState("hound");
  const errorMessage = "Breed not found (master breed does not exist)";

  const displayData = async () => {
    const fetchedCategory = await fetchCategory();
    setCategory(fetchedCategory);
  };

  const displayImage = async (key, sub) => {
    const fetchedImage = await fetchImage(key, sub);
    setImage(fetchedImage);
  };

  useEffect(() => {
    displayData();
    displayImage();
  }, []);

  const onCountDown = () => {
    if (ind > 0) {
      setInd(ind - 1);
    }
  };

  const onCountUp = () => {
    if (ind < image.length - 1) {
      setInd(ind + 1);
    }
  };

  const onSearch = async () => {
    setSearchValue(searchValue);
    displayImage(searchValue);
  };

  const onClear = () => {
    setSearchValue("");
    displayImage();
  };

  return (
    <div className="flex flex-col items-center my-6">
      <h1 className="text-4xl">Dogs</h1>
      <div className="flex justify-around mt-10">
        <div className=" w-1/2">
          <h2 className="text-gray-400 mb-5 text-2xl">Catalog</h2>
          <div>
            {Object.keys(category).map((key) => (
              <div key={key} className="flex gap-2">
                <p className="hover:underline cursor-pointer" onClick={() => displayImage(key)}>
                  {key}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {category[key].map((sub) => (
                    <p
                      key={sub}
                      className="hover:underline cursor-pointer"
                      onClick={() => displayImage(key, "/" + sub)}
                    >
                      {sub},
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl text-gray-400">Image</h2>
          <div className="flex gap-3">
            <input
              className="p-2 rounded-xl text-black w-full"
              type="text"
              placeholder="Search for a breed"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="p-2 bg-blue-500 rounded-xl active:opacity-50" onClick={onSearch}>
              Submit
            </button>
            <button className="p-2 bg-red-500 rounded-xl active:opacity-50" onClick={onClear}>
              Clear
            </button>
          </div>

          {image === errorMessage ? (
            <p>No image found</p>
          ) : (
            <div className="flex items-center gap-4">
              <button
                className="bg-white text-black rounded-full h-10 w-10 text-2xl text-center active:opacity-50"
                onClick={onCountDown}
              >
                {"<"}
              </button>
              <img className="max-w-96" src={image[ind]} alt="dog" />
              <button
                className="bg-white text-black rounded-full h-10 w-10 text-2xl text-center active:opacity-50"
                onClick={onCountUp}
              >
                {">"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
