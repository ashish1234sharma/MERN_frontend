// @mui
import { alpha } from '@mui/material/styles';
//

export default function customShadows({ colors }) {
  const transparent = alpha(colors?.grey[500], 0.16);

  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z4: `0 4px 8px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 12px 24px -4px ${transparent}`,
    z16: `0 16px 32px -4px ${transparent}`,
    z20: `0 20px 40px -4px ${transparent}`,
    z24: `0 24px 48px 0 ${transparent}`,
    //
    primary: `0 8px 16px 0 ${alpha(colors?.primary?.main, 0.24)}`,
    info: `0 8px 16px 0 ${alpha(colors?.info?.main, 0.24)}`,
    secondary: `0 8px 16px 0 ${alpha(colors?.secondary?.main, 0.24)}`,
    success: `0 8px 16px 0 ${alpha(colors?.success?.main, 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(colors?.warning?.main, 0.24)}`,
    error: `0 8px 16px 0 ${alpha(colors?.error?.main, 0.24)}`,
    //
    paper: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
    card: `0 0 2px 0 ${alpha(colors?.grey[500], 0.2)}, 0 12px 24px -4px ${alpha(colors?.grey[500], 0.12)}`,
    dialog: `-40px 40px 80px -8px ${alpha(colors?.grey[500], 0.24)}`,
    dropdown: `0 0 2px 0 ${alpha(colors?.grey[500], 0.24)}, -20px 20px 40px -4px ${alpha(colors?.grey[500], 0.24)}`,
  };
}
