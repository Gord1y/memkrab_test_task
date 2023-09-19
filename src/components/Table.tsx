'use client'

import React, { useEffect, useState } from 'react'

import { Cell, useAppContext } from '../context/AppContext'

import TableCell from './TableCell'

const Table: React.FC = () => {
  const {
    data,
    addRow,
    setData,
    removeRow,
    setM,
    setN,
    setX,
    M,
    N,
    X,
    updateCellValue
  } = useAppContext()
  const [hoveredCell, setHoveredCell] = useState<{
    rowIndex: number
    colIndex: number
  } | null>(null)

  useEffect(() => {
    const calculateX = () => {
      setX(Math.min(M, N))
    }

    calculateX()
  }, [M, N])

  const calculateRowSum = (row: Cell[]) => {
    return row.reduce((sum, cell) => sum + cell.amount, 0).toFixed(2)
  }

  const calculateColumnAverage = (colIndex: number) => {
    const total = data.reduce((sum, row) => sum + row[colIndex].amount, 0)
    return (total / data.length).toFixed(2)
  }

  const calculateDistance = (cell1: Cell, cell2: Cell) => {
    const dx = cell1.amount - cell2.amount
    return Math.abs(dx)
  }

  const highlightNearestCells = () => {
    if (hoveredCell) {
      const { rowIndex, colIndex } = hoveredCell
      const hoveredCellValue = data[rowIndex][colIndex]

      const cellsWithDistances = data.flat().map(cell => ({
        cell,
        distance: calculateDistance(hoveredCellValue, cell)
      }))

      cellsWithDistances.sort((a, b) => a.distance - b.distance)

      const highlightedCells = cellsWithDistances.slice(1, X + 1)
      const updatedData = data.map(row =>
        row.map(cell => ({
          ...cell,
          highlighted: highlightedCells.some(
            highlightedCell => highlightedCell.cell.id === cell.id
          )
        }))
      )

      setData(updatedData)
    }
  }

  const handleIncreaseValue = (rowIndex: number, colIndex: number) => {
    const newValue = data[rowIndex][colIndex].amount + 1
    updateCellValue(rowIndex, colIndex, newValue)
    highlightNearestCells()
  }

  return (
    <div>
      <div>
        M:{' '}
        <input
          type='number'
          value={M}
          onChange={e => setM(parseInt(e.target.value))}
        />
        N:{' '}
        <input
          type='number'
          value={N}
          onChange={e => setN(parseInt(e.target.value))}
        />
      </div>
      <button onClick={addRow}>Add Row</button>
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <TableCell
                  key={cell.id}
                  cellData={cell}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  onHover={() => setHoveredCell({ rowIndex, colIndex })}
                  onIncreaseValue={() =>
                    handleIncreaseValue(rowIndex, colIndex)
                  }
                />
              ))}
              <td>Line sum: {calculateRowSum(row)}</td>
              <td>
                <button onClick={() => removeRow(rowIndex)}>Remove</button>
              </td>
            </tr>
          ))}
          <tr>
            {data.length > 0 &&
              data[0].map((_, colIndex) => (
                <td key={colIndex}>
                  Col Avg: {calculateColumnAverage(colIndex)}
                </td>
              ))}
            <td>X: {X}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
