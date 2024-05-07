import { cyanBlur, redBlur } from '.././../assets/images'

export default function Paper(theme) {
  const { palette, transitions, customShadows, shape: { borderRadius } } = theme;

  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          width: '100%',
          boxShadow: customShadows?.paper,
          border: `1px solid ${palette?.divider}`,
          // backdropFilter: "blur(20px)",
          backgroundColor: palette?.common?.paper,
          backgroundImage: `url(${cyanBlur}), url(${redBlur})`,
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "right top, left bottom",
          backgroundSize: "50%, 50%",
          padding: "10px",
          overflow: "hidden",
          transition: transitions.create(transitions?.easing?.easeInOut, {
            duration: transitions?.duration?.standard
          }),
        },
        rounded: {
          borderRadius: `${borderRadius / 2}px`
        }
      }
    }
  };
}
