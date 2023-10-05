'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'

import { Sprinkles, sprinkles } from '@/styles/_foundations/sprinkles.css'

import InputContext, { useInput } from './context'
import { InputProps, InputTextProps } from './types'

import { InputLabelWrapper, InputRecipe, InputWrapperRecipe } from './input.css'

const Input = (props: InputProps) => {
  const {
    children,
    color = 'secondary',
    disabled = false,
    readonly = false,
    className,
  } = props
  const [inputValue, setInputValue] = useState<
    string | number | readonly string[]
  >('')

  const clearValue = useCallback(() => setInputValue(''), [])
  const classComp = { color, disabled, readonly }

  const contextValue = useMemo(
    () => ({ classComp, clearValue, inputValue, setInputValue }),
    [classComp, clearValue, inputValue, setInputValue],
  )

  return (
    <InputContext.Provider value={contextValue}>
      <label
        className={classNames(
          InputWrapperRecipe(classComp),
          className,
          sprinkles({ cursor: 'text' }),
        )}
      >
        {children}
      </label>
    </InputContext.Provider>
  )
}

const InputLabel = ({
  children,
  required,
}: {
  children: React.ReactNode
  required?: boolean
}) => {
  return (
    <label className={classNames(InputLabelWrapper, { required })}>
      {children}
    </label>
  )
}

const InputText = forwardRef(function InputText(
  props: InputTextProps,
  inputRef: React.ForwardedRef<HTMLInputElement> | any,
) {
  const defaultRef = useRef<HTMLInputElement | null>(null)
  const inputRefs = inputRef ?? defaultRef
  const { onChange, onTyping, onKeyDown, maxLength, defaultValue, isFocus } =
    props
  const { classComp, inputValue, setInputValue } = useInput()

  const handleTyping = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    if (maxLength && Array.from(target.value).length > maxLength) return

    if (onTyping && !!inputRefs.current) {
      onTyping(target.value)
      setInputValue(target.value)
      inputRefs.current.value = target.value
    }
  }

  const handleEnter = ({
    key,
    target,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key !== 'Enter' || !onKeyDown) return

    const { value } = target as any
    onKeyDown(value)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onTyping) handleTyping(event)
    if (onChange) onChange(event)
  }

  useEffect(() => {
    if (!defaultValue) return
    if (inputRefs.current) inputRefs.current.value = defaultValue
    setInputValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (isFocus && inputRefs.current) inputRefs.current.focus()
  }, [isFocus])

  return (
    <input
      {...props}
      className={classNames(InputRecipe(classComp), props.className)}
      ref={inputRefs}
      disabled={classComp.disabled}
      value={onTyping && inputValue}
      onChange={handleChange}
      onKeyDown={handleEnter}
    />
  )
})

const InputClickTrigger = ({
  children,
  onClick,
  clear,
}: {
  children: React.ReactNode
  onClick?: (value: string | number | readonly string[]) => void
  clear?: boolean
}) => {
  const { clearValue, inputValue } = useInput()

  const handleClick = () => {
    if (clear) clearValue()
    if (onClick) onClick(inputValue)
  }

  return (
    <span aria-hidden="true" onClick={handleClick}>
      {children}
    </span>
  )
}

const InputMessage = ({
  children,
  className,
  color,
}: {
  color?: Sprinkles['color']
} & React.ComponentPropsWithoutRef<'p'>) => {
  return (
    <p
      className={classNames(
        className,
        sprinkles({
          color: color || 'text600',
          fontSize: 'label.sm',
          marginTop: 8,
        }),
      )}
    >
      {children}
    </p>
  )
}

Input.Label = InputLabel
Input.Text = InputText
Input.ClickTrigger = InputClickTrigger
Input.Message = InputMessage

export default Input
