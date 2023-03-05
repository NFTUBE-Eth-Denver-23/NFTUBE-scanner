import { SetRecoilState, atomFamily } from 'recoil'

export const triggerState = atomFamily({
  key: 'trigger',
  default: Date.now(),
})

export function trigger(key: string) {
  return ({ set }: { set: SetRecoilState }) =>
    set(triggerState(key), Date.now())
}
