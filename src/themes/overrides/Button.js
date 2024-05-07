export default function Button(theme) {
  const { palette, typography, customShadows, shape: { borderRadius }, } = theme;

  return {
    MuiButton: {
      defaultProps: {
        elevation: 2,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontFamily: typography?.fontFamily,
          backgroundImage: 'none',
          fontSize: '16px',
          textTransform: "capitalize",
          borderRadius: `${borderRadius / 2}px`
        },
        sizeLarge: {
          height: 45,
        },
        sizeMedium: {
          height: 40,
        },
        sizeSmall: {
          height: 35,
        },

        containedInherit: {
          color: palette.grey[800],
          boxShadow: customShadows?.z8,
          fontWeight: 500,
          '&:hover': {
            backgroundColor: palette?.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: customShadows?.primary,
          backgroundColor: palette?.primary?.main,
          color: palette?.common?.white,
          fontWeight: 500,
          "&:disabled": {
            backgroundColor: palette?.primary?.lighter,
          }
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
          backgroundColor: palette?.secondary?.main,
          color: palette?.common?.white,
          fontWeight: 500,
          "&:disabled": {
            backgroundColor: palette?.secondary?.lighter,
          }
        },
        containedInfo: {
          color: palette?.common?.white,
          backgroundColor: palette?.info?.main,
          boxShadow: customShadows?.info,
          fontWeight: 500,
          "&:disabled": {
            backgroundColor: palette?.info?.lighter,
          },
          '&:hover': {
            backgroundColor: palette?.info?.dark,
          },
        },
        containedSuccess: {
          color: palette?.common?.black,
          backgroundColor: palette?.success?.main,
          boxShadow: customShadows?.success,
          fontWeight: 500,
          "&:disabled": {
            backgroundColor: palette?.success?.lighter,
          },
          '&:hover': {
            backgroundColor: palette?.success?.dark,
          },
        },
        containedWarning: {
          color: palette?.common?.black,
          boxShadow: customShadows.warning,
          backgroundColor: palette?.warning?.main,
          fontWeight: 500,
          "&:disabled": {
            backgroundColor: palette?.warning?.lighter,
          },
          '&:hover': {
            backgroundColor: palette?.warning?.dark,
          },
        },
        containedError: {
          color: palette?.common?.white,
          boxShadow: customShadows.error,
          backgroundColor: palette?.error?.main,
          fontWeight: 500,
          "&:disabled": {
            backgroundColor: palette?.error?.lighter,
          },
          '&:hover': {
            backgroundColor: palette?.error?.dark,
          },
        },


        textInherit: {
          color: palette?.text?.inherit,
          padding: 0,
          margin: 0,
          fontWeight: 600,
          backgroundColor: palette?.common?.transparent,
          '&:hover': {
            backgroundColor: palette?.common?.transparent,
          },
          '&:active': {
            backgroundColor: palette?.common?.transparent,
          }
        },
        textPrimary: {
          fontWeight: 600,
          color: palette?.text?.primary,
          padding: 0,
          margin: 0,
          height: 'auto',
          backgroundColor: palette?.common?.transparent,
          '&:hover': {
            backgroundColor: palette?.common?.transparent,
          },
          '&:active': {
            backgroundColor: palette?.common?.transparent,
          },
          '&:focus': {
            backgroundColor: palette?.common?.transparent,
          }
        },
        textSecondary: {
          fontWeight: 600,
          color: palette?.text?.secondary,
          padding: 0,
          margin: 0,
          backgroundColor: palette?.common?.transparent,
          '&:hover': {
            backgroundColor: palette?.common?.transparent,
          },
        },
        textInfo: {
          fontWeight: 600,
          color: palette?.text?.info,
          padding: 0,
          margin: 0,
          backgroundColor: palette?.common?.transparent,
          '&:hover': {
            backgroundColor: palette?.common?.transparent,
          },
        },
        textSuccess: {
          fontWeight: 600,
          color: palette?.text?.success,
          padding: 0,
          margin: 0,
          backgroundColor: palette?.common?.transparent,
          '&:hover': {
            backgroundColor: palette?.common?.transparent,
          },
        },
        textWarning: {
          fontWeight: 600,
          color: palette?.text?.warning,
          padding: 0,
          margin: 0,
          backgroundColor: palette?.common?.transparent,
          '&:hover': {
            backgroundColor: palette?.common?.transparent,
          },
        },
        textError: {
          fontWeight: 600,
          color: palette?.text?.error,
          padding: 0,
          margin: 0,
          backgroundColor: palette?.common?.transparent,
          '&:hover': {
            backgroundColor: palette?.common?.transparent,
          },
        },

        rounded: {
          borderRadius: `${theme?.shape?.borderRadius}px`
        }
      }
    }
  };
}