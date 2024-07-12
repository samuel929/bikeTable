import { useState, useEffect } from "react";
import fetchData from "../../api/api";

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

type SortConfig = {
  key: keyof Bike;
  direction: "ascending" | "descending";
};

const BikeTable = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const result = await fetchData(
          "124b459f323c2c1961685e812f22ceef4be58b72/gistfile1.txt"
        );

        setBikes(result.bikes);
        setFilteredBikes(result.bikes);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchDataFromAPI();
  }, []);

  useEffect(() => {
    const sortedBikes = bikes.filter(
      (bike) =>
        bike.Make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.Model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.Terrain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig !== null) {
      sortedBikes.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredBikes(sortedBikes);
  }, [searchTerm, bikes, sortConfig]);

  const requestSort = (key: keyof Bike) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortDirection = (key: keyof Bike) => {
    if (!sortConfig || sortConfig.key !== key) {
      return "";
    }
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

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
    px-8 py-2
    bg-gradient-to-b from-[#f3f3f3] to-[#d7d7d7]
    border border-[#a0a0a0]
    rounded-md
    shadow-sm
    text-[#636363] text-base font-bold uppercase
    hover:from-[#e8e8e8] hover:to-[#cccccc]
    active:from-[#d0d0d0] active:to-[#b8b8b8]
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
              <th
                className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer'
                onClick={() => requestSort("Make")}
              >
                Make {getSortDirection("Make")}
              </th>
              <th
                className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer'
                onClick={() => requestSort("Model")}
              >
                Model {getSortDirection("Model")}
              </th>
              <th
                className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer'
                onClick={() => requestSort("Year")}
              >
                Year {getSortDirection("Year")}
              </th>
              <th
                className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer'
                onClick={() => requestSort("Displacement")}
              >
                Displacement {getSortDirection("Displacement")}
              </th>
              <th
                className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer'
                onClick={() => requestSort("Terrain")}
              >
                Terrain {getSortDirection("Terrain")}
              </th>
              <th
                className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer'
                onClick={() => requestSort("Price")}
              >
                Price {getSortDirection("Price")}
              </th>
              <th
                className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer'
                onClick={() => requestSort("Description")}
              >
                Description {getSortDirection("Description")}
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
