/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

/* export default function themeTypography(theme) {
  return {
    fontFamily: theme?.customization?.fontFamily,
    h1: {
      fontWeight: 800,
      color: theme.colors?.text?.dark,
      lineHeight: "normal",
      fontSize: "34px",
    },
    h2: {
      fontWeight: 700,
      color: theme.colors?.text?.dark,
      lineHeight: "normal",
      fontSize: "34px",
    },
    h3: {
      fontWeight: 600,
      color: theme.colors?.text?.dark,
      lineHeight: "normal",
      fontSize: "18px",
    },
    h4: {
      fontWeight: 500,
      color: theme.colors?.text?.dark,
      lineHeight: "normal",
      fontSize: "14px",
    },
    h5: {
      fontWeight: 400,
      color: theme.colors?.text?.dark,
      lineHeight: "normal",
      fontSize: "14px",
    },
    h6: {
      fontWeight: 300,
      color: theme.colors?.text?.dark,
      lineHeight: "normal",
      fontSize: "12px",
    },
    subtitle: {

    },
    subtitle1: {

    },
    subtitle2: {

    },
    body: {

    },
    body1: {

    },
    body2: {

    },
    caption: {

    },
    caption1: {

    },
    caption2: {

    },
    overline: {

    }
  };
} */

export default function themeTypography(theme) {
  const { customization, colors } = theme;

  return {
    fontFamily: customization?.fontFamily,
    h1: {
      fontWeight: 800, // Bold
      color: colors?.text?.black,
      lineHeight: "normal",
      fontSize: "38px",
    },
    h2: {
      fontWeight: 700, // Bold
      color: colors?.text?.black,
      lineHeight: "normal",
      fontSize: "30px",
    },
    h3: {
      fontWeight: 600, // Regular & Bold
      color: colors?.text?.black,
      lineHeight: "normal",
      fontSize: "24px",
    },
    h4: {
      fontWeight: 600, // Bold
      color: colors?.text?.black,
      lineHeight: "normal",
      fontSize: "20px",
    },
    h5: {
      fontWeight: 600, // Regular & Medium & Bold
      color: colors?.text?.black,
      lineHeight: "normal",
      fontSize: "16px",
    },
    h6: {
      fontWeight: 500, // Regular
      color: colors?.text?.black,
      lineHeight: "normal",
      fontSize: "14px",
    },
    subtitle: {

    },
    subtitle1: {
      fontWeight: 500, // Regular
      color: colors?.text?.grey,
      lineHeight: "normal",
      fontSize: "14px",
    },
    subtitle2: {
      fontWeight: 300, // Medium
      color: colors?.text?.grey,
      lineHeight: "normal",
      fontSize: "12px",
    },
    body: {

    },
    body1: {
      fontWeight: 300, // Regular
      color: colors?.text?.black,
      lineHeight: "normal",
      fontSize: "14px",
    },
    body2: {
      fontWeight: 300, // Regular
      color: colors?.text?.black,
      lineHeight: "normal",
      fontSize: "12px",
    },
    caption: {
      fontWeight: 300, // Regular
      color: colors?.text?.black,
      lineHeight: "normal",
      fontSize: "12px",
    },
    caption1: {
      fontWeight: 400, // Regular
      color: colors?.text?.grey,
      lineHeight: "normal",
      fontSize: "14px",
    },
    caption2: {

    },
    overline: {

    }
  };
}