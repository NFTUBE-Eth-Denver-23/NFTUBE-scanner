import React from 'react'
import { View } from 'react-native'

type Props =
  | {
      width: number
    }
  | { height: number }
  | { width: number; height: number }
  | { flex: number }
  | { backgroundColor: string }

export function Spacing(props: Props) {
  return <View style={props} />
}
