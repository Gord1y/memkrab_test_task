'use client'

import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

export type Cell = {
  id: number
  amount: number
  highlighted?: boolean
}

type AppContextType = {
  data: Cell[][]
  updateCellValue: (
    rowIndex: number,
    colIndex: number,
    newValue: number
  ) => void
  addRow: () => void
  removeRow: (rowIndex: number) => void
  M: number
  N: number
  X: number
  setM: (value: number) => void
  setN: (value: number) => void
  setX: (value: number) => void
  setData: (value: Cell[][]) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<Cell[][]>([])
  const [initialData, setInitialData] = useState<Cell[][]>([])
  const [M, setM] = useState<number>(0)
  const [N, setN] = useState<number>(0)
  const [X, setX] = useState<number>(0)
  const [fromRow, setFromRow] = useState<boolean>(false)

  useEffect(() => {
    if (!fromRow) {
      const generateMatrix = () => {
        const newData: Cell[][] = []
        for (let i = 0; i < M; i++) {
          const newRow: Cell[] = []
          for (let j = 0; j < N; j++) {
            newRow.push({
              id: i * N + j,
              amount: Math.floor(Math.random() * 900) + 100
            })
          }
          newData.push(newRow)
        }
        setData(newData)
        setInitialData(newData)
      }

      generateMatrix()
    }

    setFromRow(false)
  }, [M, N])

  const updateCellValue = (
    rowIndex: number,
    colIndex: number,
    newValue: number
  ) => {
    const newData = [...data]
    newData[rowIndex][colIndex].amount = newValue
    setData(newData)
  }

  const addRow = () => {
    let newRow: Cell[] = []

    if (initialData.length > 0) {
      newRow = initialData[0].map(cell => ({ id: cell.id, amount: 0 }))
    }

    setData([...data, newRow])
    setM(prev => prev + 1)
    setFromRow(true)
  }

  const removeRow = (rowIndex: number) => {
    const newData = [...data]
    newData.splice(rowIndex, 1)
    setData(newData)
    setM(prev => prev - 1)
    setFromRow(true)
  }

  return (
    <AppContext.Provider
      value={{
        data,
        updateCellValue,
        addRow,
        removeRow,
        M,
        N,
        X,
        setM,
        setData,
        setN,
        setX
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export { AppProvider, useAppContext }
