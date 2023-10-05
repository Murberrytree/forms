import { recipe } from '@vanilla-extract/recipes'

import { TOKEN_TYPOGRAPHY } from '@/styles/_foundations/tokens.css'
import { breakpoints, themeVars } from '@/styles/_foundations/vars.css'

import { style } from '@vanilla-extract/css'

export const InputWrapperRecipe = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '8px 16px',
    color: themeVars.color.text[800],
    textAlign: 'left',
    gap: 8,
    whiteSpace: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
    fontSize: TOKEN_TYPOGRAPHY.fontSize.label.md,
    backgroundColor: themeVars.color.bg.input,
    border: `1px solid ${themeVars.color.border[800]}`,
    borderRadius: 6,
    transition: 'border-color 0.2s, background-color 0.2s',
    '@media': {
      [`(min-width: ${breakpoints.tablet}px)`]: {
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.bg.hover,
            borderColor: themeVars.color.border[900],
          },
        },
      },
    },
    selectors: {
      '&:placeholder': {
        color: themeVars.color.text[600],
      },
    },
  },
  variants: {
    color: {
      secondary: {
        borderColor: themeVars.color.border[800],
      },
      blue: {
        borderColor: themeVars.color.primary.blue[500],
        '&:hover': {
          borderColor: themeVars.color.primary.blue[600],
        },
      },
      red: {
        borderColor: themeVars.color.error,
        '&:hover': {
          borderColor: themeVars.color.error,
        },
      },
    },
    disabled: {
      true: {
        backgroundColor: themeVars.color.bg.hover,
        borderColor: themeVars.color.border[900],
      },
    },
    readonly: {
      true: {},
    },
    clear: {
      true: {
        backgroundColor: 'transparent',
        border: 0,
      },
    },
  },
  defaultVariants: {
    color: 'secondary',
  },
})

export const InputRecipe = recipe({
  base: {
    flex: 1,
    color: themeVars.color.text[800],
    border: 'none',
  },
  variants: {
    color: {
      secondary: {},
      blue: {},
      red: {},
    },
    disabled: {
      true: {},
    },
    readonly: {
      true: {
        color: themeVars.color.text[700],
      },
    },
  },
  defaultVariants: {
    color: 'secondary',
  },
})

export const InputLabelWrapper = style({
  position: 'relative',
  display: 'block',
  marginBottom: 8,
  color: themeVars.color.text[700],
  fontSize: 14,
  selectors: {
    [`&.required:after`]: {
      content: '',
      position: 'absolute',
      width: 4,
      height: 4,
      marginLeft: 4,
      backgroundColor: themeVars.color.error,
      borderRadius: 2,
    },
  },
})
