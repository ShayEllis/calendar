import { useRef, useState, Children, cloneElement } from 'react'
import './modal.css'

export const Modal = ({ children, buttonTxt = 'Open Model' }) => {
  const modalRef = useRef(null)
  const [dayData, setDayData] = useState('')

  const renderChildren = () => {
    return Children.map(children, (child) => cloneElement(child, {data: !!dayData}))
  } 

  const showModal = () => {
    modalRef.current.showModal()
  }

  const closeModal = () => {
    modalRef.current.close()
  }

  const handleInputChange = ({ target }) => {
    setDayData(target.value)
  }

  return (
    <div>
      {children ? (
        <div id='showModal' onClick={showModal}>
          {renderChildren()}
        </div>
      ) : (
        <button id='showModal' onClick={showModal}>
          {buttonTxt}
        </button>
      )}
      <dialog id='modal' className='dialog' ref={modalRef}>
        <button id='closeModal' className='modalCloseBtn' onClick={closeModal}>
          Close
        </button>
        <div>
          <label htmlFor='test'>Test Label: </label>
          <input
            type='text'
            id='test'
            name='test'
            value={dayData}
            onChange={handleInputChange}
          />
        </div>
      </dialog>
    </div>
  )
}
