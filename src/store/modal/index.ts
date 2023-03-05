import { ConfirmModalProps } from '@/components/modal/ConfirmModal'
import { MODAL_TYPES } from '@/components/modal/GlobalModal'
import { atom } from 'recoil'

export const modalState = atom({
  key: 'modalState',
  default: { modalType: null, modalProps: null },
})

export interface ConfirmModalType {
  modalType: typeof MODAL_TYPES.ConfirmModal | null | undefined
  modalProps: ConfirmModalProps | null | undefined
}

export type ModalType = ConfirmModalType
