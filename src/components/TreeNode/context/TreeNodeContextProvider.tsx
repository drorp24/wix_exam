import { FC, useMemo } from 'react';

import { useToggle } from '@root/hooks/useToggle';

import { TreeNodeContext } from './TreeNodeContext';
import { useContextMenu } from '../../ContextMenu/useContextMenu';
import { Node } from '../types';

interface TreeNodeContextProviderProps {
    node: Node;
    children: React.ReactNode;
}

export const TreeNodeContextProvider: FC<TreeNodeContextProviderProps> = ({ node, children }) => {
    const { open, toggleOpen } = useToggle();
    const { openContextMenu, isContextMenuOpen, closeContextMenu, handleRightClick } = useContextMenu();

    const value = useMemo(
        () => ({
            node,
            open,
            toggleOpen,
            openContextMenu,
            isContextMenuOpen,
            closeContextMenu,
            handleRightClick,
        }),
        [closeContextMenu, isContextMenuOpen, node, open, openContextMenu, toggleOpen, handleRightClick]
    );

    return <TreeNodeContext.Provider value={value}>{children}</TreeNodeContext.Provider>;
};
