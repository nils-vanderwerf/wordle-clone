import React, { useRef } from 'react'
import Tile from './Tile'

function GuessGrid({rows, columns, gridRef}) {
  let grid = new Array(rows * columns)
  grid.fill(<Tile/>)

  console.log("GRID REF", gridRef)
  return (
    <div data-guess-grid ref={gridRef} className="guess-grid">
      {grid}
    </div>
  )
}

export default GuessGrid
