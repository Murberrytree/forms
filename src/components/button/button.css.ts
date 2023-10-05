import { recipe } from '@vanilla-extract/recipes'

import {
  alpha2hex,
  TOKEN_COLORS,
  TOKEN_TYPOGRAPHY,
} from '@/styles/_foundations/tokens.css'
import { breakpoints, themeVars } from '@/styles/_foundations/vars.css'
import { PrimaryColors } from '@/types/const/styles'

import { style } from '@vanilla-extract/css'

const injectColor = (color: PrimaryColors) => {
  return {
    color: themeVars.color.white,
    background: themeVars.color.primary[color][500],
    borderColor: themeVars.color.primary[color][500],
    selectors: {
      '&:hover': {
        background: themeVars.color.primary[color][400],
        borderColor: themeVars.color.primary[color][400],
      },
      '&:active, &:focus-visible': {
        background: themeVars.color.primary[color][600],
        borderColor: themeVars.color.primary[color][600],
      },
      '&:disabled': {
        background: themeVars.color.button.enabled,
        color: themeVars.color.text[500],
        borderColor: 'transparent',
        cursor: 'default',
      },
    },
  }
}
const injectColorOutlined = (color: PrimaryColors) => {
  return {
    variants: {
      color,
      outlined: true,
    },
    style: {
      background: 'transparent',
      color: themeVars.color.primary[color][500],
      borderColor: themeVars.color.primary[color][500],
      selectors: {
        '&:hover': {
          background: `${TOKEN_COLORS.primary[color][400]}${alpha2hex(0.2)}`,
        },
        '&:active, &:focus-visible': {
          background: `${TOKEN_COLORS.primary[color][600]}${alpha2hex(0.2)}`,
        },
        '&:disabled': {
          background: 'transparent',
          color: themeVars.color.button.container,
          borderColor: themeVars.color.button.container,
          cursor: 'default',
        },
      },
    },
  }
}

export const button = recipe({
  base: {
    display: 'inline-flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 6,
    color: 'inherit',
    borderStyle: 'solid',
    borderColor: 'transparent',
    gap: 4,
    fontSize: TOKEN_TYPOGRAPHY.fontSize.label.md,
    transition: 'background-color 0.2s, border-color 0.2s',
  },

  variants: {
    color: {
      secondary: {
        background: themeVars.color.button.enabled,
        borderWidth: 1,
        borderColor: themeVars.color.overlay,
        selectors: {
          '&:hover': {
            background: themeVars.color.button.hover,
          },
          '&:active': {
            background: themeVars.color.button.pressed,
          },
          '&:disabled': {
            background: themeVars.color.button.enabled,
            color: themeVars.color.text[500],
            borderColor: themeVars.color.overlay,
            cursor: 'default',
          },
        },
      },
      blue: injectColor('blue'),
      green: injectColor('green'),
      violet: injectColor('violet'),
    },
    size: {
      lg: { padding: '15px 40px' },
      md: {
        padding: '10px 24px',
        '@media': {
          [`(max-width: ${breakpoints.mobile}px)`]: {
            padding: '15px 14px',
          },
        },
      },
      sm: { padding: '8px 16px' },
    },
    outlined: {
      true: {
        background: 'none',
        borderWidth: 1,
      },
    },
    block: {
      true: {
        width: '100%',
      },
    },
    loading: {
      true: {
        position: 'relative',
        color: 'transparent',
        cursor: 'none',
        pointerEvents: 'none',
      },
    },
  },

  compoundVariants: [
    injectColorOutlined('blue'),
    injectColorOutlined('green'),
    injectColorOutlined('violet'),
  ],

  defaultVariants: {
    color: 'secondary',
    size: 'md',
  },
})

export const innerSpan = style({
  lineHeight: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 6,
})
