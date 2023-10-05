import Link from 'next/link'
import classnames from 'classnames'

import Spinner from '@/components/spinner'

import type { ButtonLinkProps, ButtonProps } from './types'

import { button, innerSpan } from './button.css'

const Button = (props: ButtonProps) => {
  const {
    children,
    color = 'blue',
    size = 'md',
    disabled = false,
    outlined = false,
    loading = false,
    block = false,
    type = 'button',
    className,
    onClick,
  } = props
  const classComp = {
    color,
    size,
    outlined: outlined === 'true' ? true : false,
    block: block === 'true' ? true : false,
    loading: loading === 'true' ? true : false,
  }

  return (
    <button
      {...props}
      disabled={disabled}
      className={classnames(button(classComp), className)}
      type={type}
      onClick={onClick}
    >
      <span className={innerSpan}>{children}</span>
      {loading === 'true' && <Spinner />}
    </button>
  )
}

const ButtonLink = (props: ButtonLinkProps) => {
  const {
    children,
    color = 'blue',
    size = 'md',
    outlined = false,
    block = false,
    loading = false,
    className,
  } = props
  const classComp = {
    color,
    size,
    outlined: outlined === 'true' ? true : false,
    block: block === 'true' ? true : false,
    loading: loading === 'true' ? true : false,
  }

  return (
    <Link {...props} className={classnames(button(classComp), className)}>
      <span className={innerSpan}>{children}</span>
      {loading === 'true' && <Spinner />}
    </Link>
  )
}

Button.Link = ButtonLink

export default Button
