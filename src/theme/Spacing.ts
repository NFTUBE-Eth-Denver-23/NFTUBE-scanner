import { isTablet } from 'react-native-device-info'

export const Spacing = {
  '0.5-x': isTablet() ? 2 * 1.5 : 2,
  '1-x': isTablet() ? 4 * 1.5 : 4,
  '1.5-x': isTablet() ? 6 * 1.5 : 6,
  '2-x': isTablet() ? 8 * 1.5 : 8,
  '2.5-x': isTablet() ? 10 * 1.5 : 10,
  '3-x': isTablet() ? 12 * 1.5 : 12,
  '3.5-x': isTablet() ? 14 * 1.5 : 14,
  '4-x': isTablet() ? 16 * 1.5 : 16,
  '4.5-x': isTablet() ? 18 * 1.5 : 18,
  '5-x': isTablet() ? 20 * 1.5 : 20,
  '5.5-x': isTablet() ? 22 * 1.5 : 22,
  '6-x': isTablet() ? 24 * 1.5 : 24,
  '7.5-x': isTablet() ? 30 * 1.5 : 30,
  '8-x': isTablet() ? 32 * 1.5 : 32,
  '9-x': isTablet() ? 36 * 1.5 : 36,
  '10-x': isTablet() ? 40 * 1.5 : 40,
  '12-x': isTablet() ? 48 * 1.5 : 48,
  '14-x': isTablet() ? 56 * 1.5 : 56,
  '16-x': isTablet() ? 64 * 1.5 : 64,
  '18-x': isTablet() ? 70 * 1.5 : 70,
  '20-x': isTablet() ? 80 * 1.5 : 80,
  '22-x': isTablet() ? 88 * 1.5 : 88,
  '28-x': isTablet() ? 112 * 1.5 : 112,
} as const

export default Spacing
