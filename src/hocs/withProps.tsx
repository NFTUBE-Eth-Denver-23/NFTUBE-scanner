import React, {
  ComponentType,
  ForwardedRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react'

export function withProps<P, D extends Partial<P>, T>(
  Component: ComponentType<P>,
  baseProps: Partial<P>,
): ForwardRefExoticComponent<
  PropsWithoutRef<Omit<P, keyof D> & Partial<P>> & RefAttributes<T>
> {
  return React.forwardRef(
    (props: Omit<P, keyof D> & Partial<P>, ref: ForwardedRef<T>) => (
      //@ts-ignore
      <Component {...baseProps} {...props} ref={ref} />
    ),
  )
}
