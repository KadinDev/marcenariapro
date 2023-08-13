import React from 'react'
import Modal from 'react-modal'

// Define as propriedades do componente Modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function ModalComponent({
    isOpen, 
    onClose, 
    children
} : ModalProps){
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName={'react-modal-overlay'}
            className="react-modal-content"
            ariaHideApp
        >

            {children}

        </Modal>
    )
}