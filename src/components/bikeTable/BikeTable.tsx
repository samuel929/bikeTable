import { useState, useEffect } from "react";
// import fetchData from "../../api/api";
import bikjson from "../../bike.json";

export type Bike = {
  BikeID: number;
  Description: string;
  Displacement: number;
  Make: string;
  Model: string;
  Price: number;
  Terrain: string;
  Year: number;
};

const BikeTable = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        // const result = await fetchData(bikjson);
        setBikes(bikjson);
        setFilteredBikes(bikjson);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchDataFromAPI();
  }, []);

  useEffect(() => {
    setFilteredBikes(
      bikes.filter(
        (bike) =>
          bike.Make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bike.Model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bike.Terrain.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, bikes]);

  return (
    <div className='container mx-auto p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg shadow-xl'>
      <div className='mb-6'>
        <div className='flex gap-4'>
          <input
            type='text'
            className='flex-grow p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300'
            placeholder='Search bikes...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className='
  px-5 py-2
  bg-gradient-to-b from-white to-gray-200
  border border-gray-300
  rounded-md
  shadow-sm
  text-gray-700 text-sm font-bold uppercase
  hover:from-gray-100 hover:to-gray-300
  active:from-gray-300 active:to-gray-200
  active:shadow-inner
  transition duration-150 ease-in-out
'
          >
            CHECKOUT
          </button>
        </div>
      </div>
      <div className='overflow-x-auto bg-white rounded-lg shadow-md'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gradient-to-r from-purple-600 to-indigo-600 text-white'>
              <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider'>
                Make
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider'>
                Model
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider'>
                Year
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider'>
                Displacement
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider'>
                Terrain
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider'>
                Price
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider'>
                Description
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredBikes.map((bike) => (
              <tr
                key={bike.BikeID}
                className='hover:bg-purple-50 transition duration-300'
              >
                <td className='px-6 py-4 whitespace-nowrap'>{bike.Make}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{bike.Model}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{bike.Year}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {bike.Displacement} cc
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{bike.Terrain}</td>
                <td className='px-6 py-4 whitespace-nowrap font-semibold text-indigo-600'>
                  ${bike.Price}
                </td>
                <td className='px-6 py-4'>{bike.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BikeTable;
