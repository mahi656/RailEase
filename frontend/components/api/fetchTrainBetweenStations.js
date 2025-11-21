async function fetchTrainBetweenStations(fromStationCode, toStationCode, dateOfJourney) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/train-between-stations?fromStationCode=${fromStationCode}&toStationCode=${toStationCode}&dateOfJourney=${dateOfJourney}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("RESULT:", data);

    return data;
  }
  catch (error) {
    console.error("Error fetching data:", error);
  }
}
export default fetchTrainBetweenStations;
