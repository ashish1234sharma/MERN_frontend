
// ----------------------------------------------------------------------

export default function themePalette({ colors, customization }) {

  return {
    common: colors?.common,
    primary: colors?.primary,
    secondary: colors?.secondary,
    info: colors?.info,
    success: colors?.success,
    warning: colors?.warning,
    error: colors?.error,
    grey: colors?.grey,
    divider: colors?.divider,
    text: colors?.text,
    background: colors?.background,
    action: colors?.action,
  };
}
