import { useRef, cloneElement, useReducer } from 'react'
import PropTypes from 'prop-types'
import './modal.css'
import { createInitalState, reducer } from '../../reducers/modalReducer'

// This is a Modal wrapper component that will allow data to be entered on each calendar day
export const Modal = ({ classes, day, buttonTxt = 'Open Modal' }) => {
  // Reference to the modal so that it can be opened and closed
  const modalRef = useRef(null)
  /*  
    Reducer for managing the state of the input elements, I chose this approach so that the data 
    could be saved when the month is changed which unmounts the day components. 
  */
  // const [state, dispatch] = useReducer(reducer, day, createInitalState)

  const showModal = () => {
    modalRef.current.showModal()
  }

  const closeModal = () => {
    modalRef.current.close()
  }

  // When data in an input is change this will check the name of the input field and send the correct action to the reducer
  const handleInputChange = ({ target }) => {
    switch (target.name) {
      case 'moneySpent':
        dispatch({
          type: 'changeDayData',
          payload: { day, value: target.value },
        })
        break
      case 'hasBackground':
        dispatch({
          type: 'changeHighlightDay',
          payload: { day, value: !state.highlightDay },
        })
        break
      default:
        console.error(`No input with the name '${target.name}'`)
    }
  }

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
              value={1} //state.dayData
              onChange={handleInputChange}
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
                checked={1} //state.highlightDay
                onChange={handleInputChange}
              />
            </label>
          </details>
        </div>
        <button className='modalSaveBtn' onClick={closeModal}>
          Save
        </button>
      </dialog>
    </div>
  )
}

// Modal.propTypes = {
//   children: PropTypes.element.isRequired,
//   classes: PropTypes.string.isRequired,
//   buttonTxt: PropTypes.string,
//   day: PropTypes.object.isRequired,
// }
