import { useRef, useEffect, useContext } from 'react'
import './modal.css'
import {
  CalendarContext,
  CalendarDispatchContext,
} from '../../context/calendarContexts'

// This is a Modal wrapper component that will allow data to be entered on each calendar day
export const Modal = () => {
  const state = useContext(CalendarContext)
  const dispatch = useContext(CalendarDispatchContext)

  // if (!dayData[selectedDay]) modalInputChange('initializeDayData', selectedDay)
  // Reference to the modal so that it can be opened and closed
  const modalRef = useRef(null)

  const showModal = () => {
    modalRef.current.showModal()
  }

  const closeModal = () => {
    modalRef.current.close()
    dispatch({ type: 'modal/clearSelectedDay' })
  }

  const clearInputValues = () => {
    dispatch({ type: 'modal/clearInputValues', payload: state.selectedDay })
  }

  const modalInputChange = (event, dayIdentifier) => {
    switch (event.target.name) {
      case 'moneySpent':
        dispatch({
          type: 'modal/changeDayInputVal',
          payload: { dayIdentifier, value: event.target.value },
        })
        break
      case 'hasBackground':
        dispatch({
          type: 'modal/changeBackground',
          payload: {
            dayIdentifier,
            value: !state.dayData[dayIdentifier].background,
          },
        })
        break
      default:
        console.error(`No input with the name '${event.target.name}'`)
    }
  }

  useEffect(() => {
    if (state.selectedDay) {
      if (!state.dayData[state.selectedDay])
        dispatch({ type: 'modal/initializeDayData' })
      showModal()
    }
  })

  // Allows the modal to be closed when the enter key on the keyboard is pressed
  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') closeModal()
  }

  return (
    <div>
      <dialog
        id='modal'
        className='dialog'
        ref={modalRef}
        onKeyDown={handleKeyDown}>
        <div className='inputContainer'>
          <label className='modalLabel moneySpentLabel'>
            Money Spent:
            <input
              type='number'
              className='modalInput moneySpentInput'
              name='moneySpent'
              value={state.dayData[state.selectedDay].inputVal}
              onChange={(event) => modalInputChange(event, state.selectedDay)}
            />
          </label>
          <details>
            <summary>Calendar Day Options</summary>
            <label className='modalLabel modalDetailsLabel'>
              Highlight Day?
              <input
                type='checkbox'
                name='hasBackground'
                className='modalInput'
                checked={state.dayData[state.selectedDay].background}
                onChange={(event) => modalInputChange(event, state.selectedDay)}
              />
            </label>
          </details>
        </div>
        <button className='modalSaveBtn' onClick={closeModal}>
          Save
        </button>
        <button className='modalSaveBtn' onClick={clearInputValues}>
          Clear
        </button>
      </dialog>
    </div>
  )
}
