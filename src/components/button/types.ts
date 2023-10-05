import { LinkProps } from 'next/link'

import { PrimaryColors, PrimaryScales } from '@/types/const/styles'
export type ButtonProps = {
  color?: PrimaryColors | 'secondary'
  size?: PrimaryScales
  block?: boolean | 'true'
  outlined?: boolean | 'true'
  loading?: boolean | 'true' | 'false'
} & React.ComponentPropsWithoutRef<'button'>

export type ButtonLinkProps = {
  color?: PrimaryColors | 'secondary'
  size?: PrimaryScales
  block?: boolean | 'true'
  outlined?: boolean | 'true'
  loading?: boolean | 'true' | 'false'
} & LinkProps &
  React.ComponentPropsWithoutRef<'a'>
