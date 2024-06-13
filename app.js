const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
  const flights = req.body.flights;
  try {
    const flightPath = findJourneyEndpoints(flights);
    res.json(flightPath);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function findJourneyEndpoints(trips) {
    const unmatched = new Map();
  
    for (const [src, dest] of trips) {
      unmatched.set(src, (unmatched.get(src) || 0) + 1);
      unmatched.set(dest, (unmatched.get(dest) || 0) - 1);
    }
    console.log(unmatched)
  
    let start = null;
    let end = null;
  
    for (const [node, unmatchedCount] of unmatched.entries()) {
      if (unmatchedCount === 1) {
        if (start !== null) {
          throw new Error("Invalid flight list: multiple starting airports found.");
        }
        start = node;
      } else if (unmatchedCount === -1) {
        if (end !== null) {
          throw new Error("Invalid flight list: multiple ending airports found.");
        }
        end = node;
      } else if (unmatchedCount !== 0) {
        throw new Error("Invalid flight list: nodes with invalid degrees found.");
      }
    }
  
    if (start === null || end === null) {
      throw new Error("Invalid flight list: no valid starting or ending airport found.");
    }
  
    return [start, end];
  }
  