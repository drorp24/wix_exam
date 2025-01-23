import { FC } from 'react';

import { MenuAction } from '@root/components/MenuItem/types';

import { ContextMenu } from '../../ContextMenu';
import { useTreeContext } from '../context/TreeContext';
import { useTreeNodeContext } from '../context/TreeNodeContext';

interface TreeNodeContextMenuProps {
    menuActions: MenuAction[];
    isMenuOpen: boolean;
}

export const TreeNodeContextMenu: FC<TreeNodeContextMenuProps> = ({ menuActions, isMenuOpen }) => {
    const { nodeMenuEl } = useTreeContext();
    const { closeContextMenu } = useTreeNodeContext();

    return (
        <ContextMenu
            nodeMenuEl={nodeMenuEl}
            open={isMenuOpen}
            closeContextMenu={closeContextMenu}
            menuActions={menuActions}
        />
    );
};
