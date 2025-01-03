import { useEffect, useState } from "react"

export const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    extraData, // This is a custom function that we supplied to our table instance
    updateCell, // This is a custom function that we supplied to our table instance
  }: any) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)
  
    const onChange = (e:any) => {
      setValue(e.target.value)
    }
  
    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateCell(extraData, index, id, value)
    }
  
    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    return <input min={0} className={`form-control py-2 ${value > 0? "bg-warning": ""}`} style={{width: "100px"}} type="number" value={value} onChange={onChange} onBlur={onBlur} />
  }