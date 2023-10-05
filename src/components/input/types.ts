export interface InputProp {
  color?: 'red' | 'blue' | 'secondary'
  disabled?: boolean
  readonly?: boolean
}

type InputTextProp = {
  onTyping?: (value: string) => void
  onKeyDown?: (value: string) => void
  defaultValue?: string
  isFocus?: boolean
}

export type InputProps = React.ComponentPropsWithoutRef<'input'> & InputProp
export type InputTextProps = React.ComponentPropsWithoutRef<'input'> &
  InputTextProp

export interface Context {
  classComp: InputProp
  clearValue: () => void
  inputValue: string | number | readonly string[]
  setInputValue: React.Dispatch<
    React.SetStateAction<string | number | readonly string[]>
  >
}

export type htmlInputType = 'number' | 'password' | 'text'
