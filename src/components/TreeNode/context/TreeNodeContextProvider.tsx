import { FC, useMemo, useState } from 'react';

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
    const [editedNodeId, setEditedNodeId] = useState<number | null>(null);

    const value = useMemo(
        () => ({
            node,
            open,
            toggleOpen,
            openContextMenu,
            isContextMenuOpen,
            closeContextMenu,
            editedNodeId,
            setEditedNodeId,
            handleRightClick,
        }),
        [
            closeContextMenu,
            isContextMenuOpen,
            node,
            open,
            openContextMenu,
            toggleOpen,
            editedNodeId,
            setEditedNodeId,
            handleRightClick,
        ]
    );

    return <TreeNodeContext.Provider value={value}>{children}</TreeNodeContext.Provider>;
};
