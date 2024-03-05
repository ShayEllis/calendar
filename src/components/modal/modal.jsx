import { useRef, useState, cloneElement, useReducer } from 'react'
import PropTypes from 'prop-types'
import './modal.css'
import { createInitalState, reducer } from '../../reducers/modalReducer'

export const Modal = ({ children, classes, day, buttonTxt = 'Open Modal' }) => {
  const modalRef = useRef(null)
  const [state, dispatch] = useReducer(reducer, day, createInitalState) //useReducer(reducer, arguments, func to return inital state)

  const showModal = () => {
    modalRef.current.showModal()
  }

  const closeModal = () => {
    modalRef.current.close()
  }

  const handleInputChange = ({ target }) => {
    switch (target.name) {
      case 'moneySpent':
        dispatch({ type: 'changeDayData', payload: target.value })
        break
      case 'hasBackground':
        dispatch({ type: 'changeHighlightDay', payload: !state.highlightDay })
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
          onClick={classes.includes('notCurrentMonth') ? undefined : showModal}>
          {cloneElement(children, {
            dayData: state.dayData,
            highlightDay: state.highlightDay,
          })}
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
              value={state.dayData}
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
                checked={state.highlightDay}
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
