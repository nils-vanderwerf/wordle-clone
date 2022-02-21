import React, {useRef, useEffect} from 'react'
import GuessGrid from './components/GuessGrid';
import Keyboard from './components/Keyboard';
import './App.css';

import {dictionary} from './data/dictionary'
import {targetWords} from './data/targetWords'
const WORD_LENGTH = 5


function App() {
  const gridRef = useRef(null)

  useEffect(() => {
    document.addEventListener("click", handleMouseClick)
    document.addEventListener("keydown", handleKeyPress)
  }, [])

  function stopInteraction() {
    document.removeEventListener("click", handleMouseClick)
    document.removeEventListener("keydown", handleKeyPress)
}
  

  function getActiveTiles() {
    return gridRef.querySelectorAll('[data-state="active"]')
  }

  function pressKey(key) {
    const nextTile = gridRef.current.querySelector(":not([data-letter])")
    console.log("NEXT TILE", nextTile)
    nextTile.dataset.letter = key.toLowerCase()
    nextTile.textContent = key
    nextTile.dataset.state = "active"
  }

  function handleMouseClick(e) {
    if (e.target.matches("[data-key")) {
        pressKey(e.target.dataset.key)
    }

    if (e.target.matches("[data-enter]")) {
        submitGuess()
        return
    }

    if (e.target.matches("[data-delete]")) {
        deleteKey()
        return
    }
  }

function handleKeyPress(e) {
    console.log(e)
    if (e.key === "Enter") {
        submitGuess()
        return
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
        deleteKey()
        return
    }

    if (e.key.match(/^[a-z]$/)) {
        pressKey(e.key)
        return
    }
}

function submitGuess() {

}

function deleteKey() {

}

function getActiveTiles() {
  return gridRef.querySelectorAll('[data-state="active"]')
}

  return (
    

    <div className="App">
      <GuessGrid rows={6} columns={5} gridRef={gridRef} />
      <Keyboard getActiveTiles={getActiveTiles}/>
    </div>
  );
}

export default App;
