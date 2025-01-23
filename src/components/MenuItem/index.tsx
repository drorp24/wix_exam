import { ListItemIcon, ListItemText, MenuItem as MuiMenuItem, Typography } from '@mui/material';
import { FC } from 'react';

import { MenuAction } from '@root/components/MenuItem/types';

export const MenuItem: FC<MenuAction> = ({ label, shortcut, icon: Icon, onClick, disabled }) => (
    <MuiMenuItem onClick={onClick} sx={{ py: 1.5, minWidth: '24ch' }} disabled={disabled}>
        <ListItemIcon>
            <Icon />
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
        <Typography>{shortcut}</Typography>
    </MuiMenuItem>
);
