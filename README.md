# flightpath-service

### Installation
`npm install`

### Starting the Server
`npm start`

The server will start on port 8080.

### Endpoint

- **POST /calculate**: Accepts a request with a JSON body containing a list of flights. Returns the start and end airports of the person's journey.

Example request body:
```json
{
  "flights": [    ["SFO", "EWR"],
    ["ATL", "EWR"],
    ["SFO", "ATL"],
    ["GSO", "IND"],
    ["ATL", "GSO"]
  ]
}

Call with curl:
curl -X POST http://localhost:8080/calculate -H "Content-Type: application/json" -d '{"flights": [["IND", "EWR"], ["SFO", "ATL"], ["GSO", "IND"], ["ATL", "GSO"]]}'