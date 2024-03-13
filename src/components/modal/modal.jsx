import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import './modal.css'

// This is a Modal wrapper component that will allow data to be entered on each calendar day
export const Modal = ({ handleInputChange, selectedDay, dayData }) => {
  // Reference to the modal so that it can be opened and closed
  const modalRef = useRef(null)

  const showModal = () => {
    modalRef.current.showModal()
  }

  const closeModal = () => {
    modalRef.current.close()
  }

  useEffect(() => {
    if (selectedDay) {
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
              value={dayData.data}
              onChange={(event) => handleInputChange(event, selectedDay)}
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
                checked={dayData.highlightedDay}
                onChange={(event) => handleInputChange(event, selectedDay)}
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
