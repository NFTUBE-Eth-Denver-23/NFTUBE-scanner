import { ModalType, modalState } from '@/store/modal'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import ConfirmModal from './ConfirmModal'

export const MODAL_TYPES = {
  ConfirmModal: 'ConfirmModal',
  AlertModal: 'AlertModal',
  CommonModal: 'CommonModal',
  CodePushModal: 'CodePushModal',
} as const

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.ConfirmModal]: ConfirmModal,
}

const GlobalModal = () => {
  const { modalType, modalProps }: ModalType = useRecoilValue(modalState)

  const renderComponent = () => {
    if (!modalType) {
      return null
    }
    const ModalComponent = MODAL_COMPONENTS[modalType]

    return <ModalComponent {...modalProps} />
  }

  return <>{renderComponent()}</>
}

export default GlobalModal
