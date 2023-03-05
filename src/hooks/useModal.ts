// import { ModalType, setModal } from '@/Store/Modal'

import { ModalType, modalState } from '@/store/modal'
import { useRecoilState, useSetRecoilState } from 'recoil'

export default function useModal() {
  const setModal = useSetRecoilState(modalState)
  const showModal = ({ modalType, modalProps }: ModalType) => {
    setModal({ modalType, modalProps })
  }

  const hideModal = () => {
    setModal({ modalType: null, modalProps: null })
  }

  return {
    showModal,
    hideModal,
  }
}
