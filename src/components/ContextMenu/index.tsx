import { Menu, Stack } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';

import { MenuAction } from '@root/components/MenuItem/types';

import { MenuItem } from '../MenuItem';
import { UseContextMenuResponse } from './useContextMenu';
import { TreeContextValue } from '../TreeNode/types';

type ContextMenuProps = Pick<UseContextMenuResponse, 'closeContextMenu'> &
    Pick<TreeContextValue, 'nodeMenuEl'> & {
        menuActions: MenuAction[];
    } & { open: boolean };

// generic reusable Context Menu component
export const ContextMenu = ({ menuActions, nodeMenuEl, open, closeContextMenu }: ContextMenuProps) => (
    <Paper sx={{ width: 400, maxWidth: '100%' }}>
        <Menu
            anchorEl={nodeMenuEl}
            open={open}
            onClose={closeContextMenu}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            PopoverClasses={{
                root: 'disable-overlay', // Add a custom class if needed
            }}
            sx={{ '& .MuiMenu-list': { p: 0 } }}>
            <MenuList component={'ul'} sx={{ '&.MuiList-root': { p: 0 } }}>
                {menuActions.map((action, i) => (
                    <Stack
                        key={i}
                        sx={(theme) => ({
                            borderBottom: i < menuActions.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                        })}>
                        <MenuItem key={action.label} {...action} disabled={action.disabled} />
                    </Stack>
                ))}
            </MenuList>
        </Menu>
    </Paper>
);
