import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import useModal from '@/hooks/useModal'

export interface ConfirmModalProps {
  title?: string
  message: string
  cancelText?: string
  confirmText?: string
  handleClose?: (...arg: any[]) => any
  handleConfirm?: (...arg: any[]) => any
}

const ConfirmModal = ({
  title,
  message,
  cancelText = '취소',
  confirmText = '확인',
  handleClose,
  handleConfirm,
}: ConfirmModalProps) => {
  const { hideModal } = useModal()

  const onClose = () => {
    if (handleClose) {
      handleClose()
    }
    hideModal()
  }

  const onConfirm = async () => {
    if (handleConfirm) {
      await handleConfirm()
    }
    hideModal()
  }

  return (
    <Modal animationType="none" transparent={true} visible={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => onClose()}
          >
            <Text style={styles.textStyle}>{cancelText}</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => onConfirm()}
          >
            <Text style={styles.textStyle}>{confirmText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default ConfirmModal
