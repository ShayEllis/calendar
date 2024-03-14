import { useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import './modal.css'
import { modalInputChange } from '../../actions/appAction'
import { StateContext } from '../../context/stateContext'

// This is a Modal wrapper component that will allow data to be entered on each calendar day
export const Modal = () => {
  const state = useContext(StateContext)

  // if (!dayData[selectedDay]) modalInputChange('initializeDayData', selectedDay)
  // Reference to the modal so that it can be opened and closed
  const modalRef = useRef(null)

  const showModal = () => {
    modalRef.current.showModal()
  }

  const closeModal = () => {
    modalRef.current.close()
  }

  useEffect(() => {
    if (state.selectedDay) {
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
              value={state.dayData[state.selectedDay]?.data}
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
                checked={state.dayData[state.selectedDay]?.highlightedDay}
                onChange={(event) => modalInputChange(event, state.selectedDay)}
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
