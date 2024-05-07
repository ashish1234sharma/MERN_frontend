//
import Paper from './Paper';
import Input from './Input';
import FormControl from './FormControl';
import Button from './Button';
import Alert from './Alert';
import Switch from './Switch';
import MenuItem from './MenuItem';
import Popover from './Popover';
import IconButton from './IconButton';
import Avatar from './Avatar';
import Tabs from './Tabs';
import Tooltip from './Tooltip';

// ----------------------------------------------------------------------

export function ComponentsOverrides(theme) {
  return Object.assign(
    Paper(theme),
    Input(theme),
    FormControl(theme),
    Button(theme),
    Alert(theme),
    Switch(theme),
    MenuItem(theme),
    Popover(theme),
    IconButton(theme),
    Avatar(theme),
    Tabs(theme),
    Tooltip(theme),
  );
}
