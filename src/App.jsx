import { useState } from 'react'
import './App.css'
import SearchableDropdown from './components/dropdown/dropdown'
import { Routes, Route, Link } from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import About from './pages/about/about'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/resaleprices-frontend-sg" element={<Homepage />} />   
          <Route path="/resaleprices-frontend-sg/about" element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App
