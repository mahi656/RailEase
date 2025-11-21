import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/train-between-stations", async (req, res) => {
  const { from, to, date } = req.query;

  const url = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${from}&toStationCode=${to}&dateOfJourney=${date}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '726c205845msha93f16d7a420244p1d456ejsn35efb1406342',
      'x-rapidapi-host': 'irctc1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();  
   console.log(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
