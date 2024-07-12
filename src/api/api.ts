import { Bike } from "../components/bikeTable/BikeTable";



const BASE_URL = 'http://localhost:5174/'; // Replace with your API base URL

async function fetchData(endpoint: Bike) {

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        console.log(response)

        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default fetchData;
