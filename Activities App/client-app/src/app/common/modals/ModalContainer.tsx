import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Modal, ModalContent } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'

const ModalContainer = () => { 
  const rootStore = useContext(RootStoreContext)
  const {modal: {open, body}, closeModal} = rootStore.modalStore;
  return (
    <Modal open = {open} onClose = {closeModal} size ='mini'>
      <ModalContent>
        {body}
      </ModalContent>
    </Modal>
  )
}

export default observer(ModalContainer)
