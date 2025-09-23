import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchableDropdown from './components/dropdown/dropdown'

function App() {

  const [town, setTown] = useState("")
  const [lease, setLease] = useState("")
  const [flatType, setFlatType] = useState("")
  const [storeyRange, setStoreyRange] = useState("")
  const [flatModel, setFlatModel] = useState("")
  const [floorAreaSqm, setFloorAreaSqm] = useState("")
  const [prediction, setPrediction] = useState("")
  const [error, setError] = useState("")
  
  const types = ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'EXECUTIVE', '1 ROOM', 'MULTI-GENERATION']
  const storey_range = ['01 TO 03', '04 TO 06', '07 TO 09', '10 TO 12',  '13 TO 15', '16 TO 18', '19 TO 21', '22 TO 24', '25 TO 27', '28 TO 30', 
    '31 TO 33', '34 TO 36',  '37 TO 39', '40 TO 42', '49 TO 51' ,'40 TO 42',  '43 TO 45', '46 TO 48']
  const flat_models = ['Improved', 'New Generation', 'DBSS', 'Standard', 'Apartment', 'Simplified',
          'Model A', 'Premium Apartment', 'Adjoined flat', 'Model A-Maisonette',
          'Maisonette', 'Type S1', 'Type S2', 'Model A2', 'Terrace',
          'Improved-Maisonette', 'Premium Maisonette', 'Multi Generation',
          'Premium Apartment Loft', '2-room', '3Gen']
  const towns = [
    'ANG MO KIO', 'BEDOK', 'BISHAN', 'BUKIT BATOK', 'BUKIT MERAH',
    'BUKIT PANJANG', 'BUKIT TIMAH', 'CENTRAL AREA', 'CHOA CHU KANG',
    'CLEMENTI', 'GEYLANG', 'HOUGANG', 'JURONG EAST', 'JURONG WEST',
    'KALLANG/WHAMPOA', 'MARINE PARADE', 'PASIR RIS', 'PUNGGOL',
    'QUEENSTOWN', 'SEMBAWANG', 'SENGKANG', 'SERANGOON', 'TAMPINES',
    'TOA PAYOH', 'WOODLANDS', 'YISHUN'
  ]
  const handleSubmit = async() =>{
    if(town === "" || flatType === "" || storeyRange === "" || flatModel === "" || floorAreaSqm === "" || lease === ""){
      setError("Please provide the necessary fields to make a good estimation.")
      return
    }
    const payload = {
      town: town,
      flat_type: flatType,
      storey_range: storeyRange,
      flat_model: flatModel,
      floor_area_sqm: floorAreaSqm,
      remaining_lease_years: lease,
    };
    console.log(payload)
    try {
      const res = await fetch("http://localhost:8080/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();
      if(data.status === 200){
       setPrediction(data.predicted_resale_price);
       setError("")
      }else{
        setError("Sorry, we are unable to price it. Please try again later.")
      }
    } catch (error) {
      console.error("Error:", error);
        setError("Sorry, we are unable to price it. Please try again later.")
    }
  }

  return (
    <>
      <div>
        <h1>Find Your Resale Price!</h1>
        <div className="form">
          <label>Area: </label>
          <SearchableDropdown placeholder={"Bukit Batok"} options={towns} onSelect={setTown}/>

          <label>Flat Type: </label>
          <SearchableDropdown placeholder={"4 ROOM"}  options={types} onSelect={setFlatType}/>

          <label>Storey Range: </label>
          <SearchableDropdown placeholder={"04 TO 06"} options={storey_range} onSelect={setStoreyRange}/>

          <label>Flat Model: </label>
          <SearchableDropdown placeholder={"NEW GENERATION"} options={flat_models} onSelect={setFlatModel}/>

          <label>Floor Area Sqm: </label>
          <input onChange={(e)=>setFloorAreaSqm(e.target.value)}/>

          <label>Remaining Lease: </label>
          <input onChange={(e)=>setLease(e.target.value)}/>

          <button onClick={handleSubmit}>Price this!</button> 
          {error && (
            <p>{error}</p>
          )}
          {prediction && (
            <h1>Predicted Price: {prediction}</h1>
          )}
        </div>
      </div>
    </>
  )
}

export default App
