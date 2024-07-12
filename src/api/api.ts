


const BASE_URL = 'https://gist.githubusercontent.com/samuel929/bc801f8f49ef0830450f8f4bec464da5/raw/'; // Replace with your API base URL

async function fetchData(endpoint: string) {

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default fetchData;
