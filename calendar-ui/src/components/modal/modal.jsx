import { useRef, useEffect, useContext } from 'react'
import './modal.css'
import {
  CalendarContext,
  CalendarDispatchContext,
} from '../../context/calendarContexts'
import { calendarServer } from '../../utils/calendarServer'

// This is a Modal wrapper component that will allow data to be entered on each calendar day
export const Modal = () => {
  const state = useContext(CalendarContext)
  const dispatch = useContext(CalendarDispatchContext)

  // Reference to the modal so that it can be opened and closed
  const modalRef = useRef(null)

  const showModal = () => {
    modalRef.current.showModal()
  }

  const closeModal = () => {
    modalRef.current.close()
  }

  const clearDayValues = () => {
    dispatch({ type: 'modal/clearDayValues', payload: state.selectedDay })
  }

  const modalInputChange = (event, dayIdentifier) => {
    switch (event.target.name) {
      case 'moneySpent':
        dispatch({
          type: 'modal/changeMoneySpent',
          payload: { dayIdentifier, value: parseInt(event.target.value) },
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

  // Sends data to the server when the modal is closed
  const handleModalClose = () => {
    calendarServer.updateCalendarDayData(
      state.selectedDay,
      state.dayData[state.selectedDay]
    )
  }

  return (
    <div>
      <dialog
        id='modal'
        className='dialog'
        onKeyDown={handleKeyDown}
        onClose={handleModalClose}
        ref={modalRef}>
        <div className='inputContainer'>
          <label className='modalLabel moneySpentLabel'>
            Money Spent:
            <input
              type='number'
              className='modalInput moneySpentInput'
              name='moneySpent'
              value={state.dayData[state.selectedDay].moneySpent}
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
        <button className='modalSaveBtn' onClick={clearDayValues}>
          Clear
        </button>
      </dialog>
    </div>
  )
}
