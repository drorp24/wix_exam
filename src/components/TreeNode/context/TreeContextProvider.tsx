import { FC, useCallback, useMemo, useState } from 'react';

import { Node } from '../types'; // Adjust the import path as necessary
import { TreeContext } from './TreeContext';

interface TreeContextProviderProps {
    initialTree: Node;
    children: React.ReactNode;
    onUpdateTree: (tree: Node) => void;
}

export const TreeContextProvider: FC<TreeContextProviderProps> = ({ children, initialTree, onUpdateTree }) => {
    const [tree, setTree] = useState<Node>(initialTree);
    const [nodeMenuEl, setNodeMenuEl] = useState<null | HTMLElement>(null);
    const [openMenuNode, setOpenMenuNode] = useState<Node | null>(null);
    const [editedNodeId, setEditedNodeId] = useState<number | null>(null);

    const updateTree = useCallback(
        (tree: Node) => {
            setTree(tree);
            onUpdateTree(tree);
        },
        [onUpdateTree]
    );

    const value = useMemo(
        () => ({
            tree,
            setTree: updateTree,
            nodeMenuEl,
            setNodeMenuEl,
            openMenuNode,
            setOpenMenuNode,
            editedNodeId,
            setEditedNodeId,
        }),
        [tree, updateTree, nodeMenuEl, openMenuNode, editedNodeId]
    );

    return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};
