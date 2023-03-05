import { Platform } from 'react-native'
import getToast from '@/utils/getToast'
import { queryUserByTag } from '@/api/user'
import validator from 'password-validator'

const { showSuccessToast, showErrorToast } = getToast()

export async function validateUserTag(userTag: string) {
  const schema = new validator()
  schema
    .is()
    .min(3) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .not()
    .spaces() // Should not have spaces

  const validation = schema.validate(userTag, { details: true })

  if (validation[0]) {
    showErrorToast(
      validation[0].message.replace('string', 'user tag'),
      Platform.OS === 'android' ? 360 : null,
    )
    return false
  } else {
    const user = await queryUserByTag(userTag)
    if (user?.userId) {
      showErrorToast(
        'Someone is already using your tag!',
        Platform.OS === 'android' ? 360 : null,
      )
      return false
    } else {
      return true
    }
  }
}

export function validateEmail(email: string) {
  const schema = new validator()
  schema
    .is()
    .min(5) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .not()
    .spaces() // Should not have spaces

  const validation = schema.validate(email, { details: true })

  if (validation[0]) {
    showErrorToast(
      validation[0].message.replace('string', 'email'),
      Platform.OS === 'android' ? 360 : null,
    )
    return false
  } else {
    return true
  }
}

export function validatePassword(password: string) {
  const schema = new validator()
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .symbols() // Should have symbols
    .has()
    .not()
    .spaces() // Should not have spaces

  const validation = schema.validate(password, { details: true })

  if (validation[0]) {
    showErrorToast(
      validation[0].message.replace('string', 'password'),
      Platform.OS === 'android' ? 360 : null,
    )
    return false
  } else {
    return true
  }
}
