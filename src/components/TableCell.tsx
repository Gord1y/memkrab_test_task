import React, { useState } from 'react'

import { Cell, useAppContext } from '../context/AppContext'

import { Edit } from './Edit'

interface TableCellProps {
  cellData: Cell
  rowIndex: number
  colIndex: number
  onHover: () => void
  onIncreaseValue: () => void
}

const TableCell: React.FC<TableCellProps> = ({
  cellData,
  rowIndex,
  colIndex,
  onHover,
  onIncreaseValue
}) => {
  const { updateCellValue } = useAppContext()
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(cellData.amount.toString())

  const handleEdit = () => {
    setEditing(true)
  }

  const handleBlur = () => {
    setEditing(false)
    // Update the cell value when input loses focus
    const newValue = parseInt(inputValue)
    updateCellValue(rowIndex, colIndex, newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <td
      onMouseEnter={onHover}
      className={cellData.highlighted ? 'highlighted' : ''}
    >
      {editing ? (
        <div className='block'>
          <input
            type='number'
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus
          />
        </div>
      ) : (
        <div className='block'>
          <p onClick={onIncreaseValue}>{cellData.amount}%</p>
          <button onClick={handleEdit}>
            <Edit />
          </button>
        </div>
      )}
    </td>
  )
}

export default TableCell
