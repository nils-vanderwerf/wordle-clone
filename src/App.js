import React, {useRef, useEffect} from 'react'
import GuessGrid from './components/GuessGrid';
import Keyboard from './components/Keyboard';
import Alert from './components/Alert';
import './App.css';

import {dictionary} from './data/dictionary'
const WORD_LENGTH = 5

const randomNum = Math.floor(Math.floor(Math.random(dictionary.length) * dictionary.length))
const targetWord = dictionary[randomNum]
console.log(targetWord)

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
    const activeTiles = getActiveTiles()
    if (activeTiles.length >= WORD_LENGTH) return
    const nextTile = gridRef.current.querySelector(":not([data-letter])")
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
  const activeTiles = [...getActiveTiles()]
  if (activeTiles.length !== WORD_LENGTH) {
    showAlert("Not enough letters")
    // shakeTiles(activeTiles)
    return
  }
}

function showAlert(message, duration = 1000) {
  const alertContainer = document.querySelector("[data-alert-container]")
  const alert = document.createElement("div")
  alert.textContent = message
  alert.classList.add("alert")
  alertContainer.prepend(alert)
  if (duration == null) return

  setTimeout(() => {
    alert.classList.add("hide")
    alert.addEventListener("transitionend", () => {
      alert.remove()
    })
  }, duration)
}

function deleteKey() {
  const activeTiles  = getActiveTiles()
  const lastTile = activeTiles[activeTiles.length - 1]
  if (lastTile == null) return
  lastTile.textContent = ""
  delete lastTile.dataset.state
  delete lastTile.dataset.letter
}

function getActiveTiles() {
  return gridRef.current.querySelectorAll('[data-state="active"]')
}

  return (
    <div className="App">
      <Alert/>
      <GuessGrid rows={6} columns={5} gridRef={gridRef} />
      <Keyboard/>
    </div>
  );
}

export default App;
