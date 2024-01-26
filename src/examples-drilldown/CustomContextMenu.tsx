import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MoveDown from '@mui/icons-material/MoveDown';
import { ContextMenuProps } from '@sisense/sdk-ui';

export const CustomContextMenu = ({
  position,
  closeContextMenu,
  itemSections,
  children,
}: ContextMenuProps) => {
  const open = !!position;

  return (
    <Menu
      MenuListProps={{ dense: true }}
      anchorReference="anchorPosition"
      anchorPosition={position ?? { left: 0, top: 0 }}
      open={open}
      onClose={closeContextMenu}
    >
      {' '}
      {(!itemSections || !(itemSections as any)[1].items.length) && (
        <MenuItem key={'none'}>
          <ListItemText> {'No drills available'}</ListItemText>
        </MenuItem>
      )}
      {!!itemSections &&
        !!(itemSections as Array<{ items: Array<object> }>)[1].items.length &&
        itemSections?.map(({ items }) =>
          items?.map((item) => (
            <MenuItem
              key={item.key ?? item.caption}
              onClick={() => {
                closeContextMenu();
                item.onClick?.();
              }}
            >
              <ListItemIcon>
                <MoveDown fontSize="small" />
              </ListItemIcon>
              <ListItemText> {item.caption}</ListItemText>
            </MenuItem>
          )),
        )}
      {children}
    </Menu>
  );
};
