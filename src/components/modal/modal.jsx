import { useRef, useState, cloneElement } from 'react'
import PropTypes from 'prop-types'
import './modal.css'

export const Modal = ({ children, classes, buttonTxt = 'Open Modal' }) => {
  const modalRef = useRef(null)
  const [dayData, setDayData] = useState('')
  const [highlightDay, setHighlightDay] = useState(false)
  // esLint in IDE gave an error when the prop was directly used
  const classesPassed = classes

  const showModal = () => {
    modalRef.current.showModal()
  }

  const closeModal = () => {
    modalRef.current.close()
  }

  const handleInputChange = ({ target }) => {
    switch (target.name) {
      case 'moneySpent':
        setDayData(target.value)
        break
      case 'hasBackground':
        setHighlightDay(!highlightDay)
        break
      default:
        console.error(`No input with the name '${target.name}'`)
    }
  }

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') closeModal()
  }

  return (
    <div>
      {children ? (
        <div
          id='showModal'
          onClick={
            classesPassed.includes('notCurrentMonth') ? undefined : showModal
          }>
          {cloneElement(children, { data: dayData, highlightDay })}
        </div>
      ) : (
        <button id='showModal' onClick={showModal}>
          {buttonTxt}
        </button>
      )}
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
              value={dayData}
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
                checked={highlightDay}
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

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.string.isRequired,
  buttonTxt: PropTypes.string,
}
