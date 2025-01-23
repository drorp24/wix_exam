import { CreateNewFolder, DeleteOutline, DriveFileRenameOutline, NoteAdd } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';

import { MenuAction } from '@root/components/MenuItem/types';

import { useTreeContext } from '../context/TreeContext';
import { useTreeNodeContext } from '../context/TreeNodeContext';
import { Node, NodeType } from '../types';

export interface UseTreeNodeActionsResponse {
    menuActions: MenuAction[];
    newName: string;
    handleChangeNode: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

// An alternative to maintaining the entire tree state could be creating a local state & setter for each node.
// Such approach may better fit long trees where recursive operations may be less desired.
// However, local node state would make it harder to obtain the entire tree state, which is
// essential when that state is required to be persisted to a backend system or controlled by a parent component.
export const useTreeNodeActions = (): UseTreeNodeActionsResponse => {
    const { tree, setTree } = useTreeContext();
    const { node, setEditedNodeId, closeContextMenu } = useTreeNodeContext();
    const [newName, setNewName] = useState(node.name);

    const handleAddNode = useCallback(
        (nodeType: NodeType) => {
            const newNode: Node = {
                id: Date.now(), // This is a simple way to generate unique IDs
                name: 'New Node',
                type: nodeType,
                nodes: [],
            };

            const updateTree = (currentTree: Node): Node => {
                if (currentTree.id === node.id && currentTree.type === 'parent') {
                    return {
                        ...currentTree,
                        nodes: [...currentTree.nodes, newNode],
                    };
                }

                if (currentTree.type === 'parent') {
                    return {
                        ...currentTree,
                        nodes: currentTree.nodes.map(updateTree),
                    };
                }

                return currentTree;
            };

            setTree(updateTree(tree!));
        },
        [node.id, setTree, tree]
    );

    const handleEditNode = useCallback(() => {
        setEditedNodeId(node.id);
        closeContextMenu();
    }, [closeContextMenu, node.id, setEditedNodeId]);

    const handleChangeNode = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    }, []);

    const handleSaveNode = useCallback(() => {
        const updateTree = (currentTree: Node): Node => {
            if (currentTree.id === node.id) {
                return {
                    ...currentTree,
                    name: newName,
                };
            }

            if (currentTree.type === 'parent') {
                return {
                    ...currentTree,
                    nodes: currentTree.nodes.map(updateTree),
                };
            }

            return currentTree;
        };

        setTree(updateTree(tree!));
    }, [newName, node.id, setTree, tree]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (newName && event.key === 'Enter') {
            handleSaveNode();
            setEditedNodeId(null);
        }
    };

    const handleDeleteNode = useCallback(() => {
        const updateTree = (currentTree: Node): Node => {
            if (currentTree.id === node.id) {
                return currentTree; // This will remove the node from the tree
            }

            if (currentTree.type === 'parent') {
                return {
                    ...currentTree,
                    nodes: currentTree.nodes.filter((child) => child.id !== node.id).map(updateTree),
                };
            }

            return currentTree;
        };

        const updatedTree = updateTree(tree!);
        setTree(updatedTree);
    }, [node.id, setTree, tree]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.metaKey && event.key === 'm') {
                event.preventDefault();
                handleAddNode('parent');
            } else if (event.metaKey && event.key === 'p') {
                event.preventDefault();
                handleAddNode('leaf');
            } else if (event.metaKey && event.key === 'e') {
                event.preventDefault();
                handleEditNode();
            } else if (event.metaKey && event.key === 'd') {
                event.preventDefault();
                handleDeleteNode();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleAddNode, handleEditNode, handleDeleteNode]);

    const menuActions: MenuAction[] = [
        {
            label: 'Add Submenu',
            shortcut: '⌘M',
            icon: CreateNewFolder,
            onClick: () => handleAddNode('parent'),
        },
        {
            label: 'Add Product',
            shortcut: '⌘P',
            icon: NoteAdd,
            onClick: () => handleAddNode('leaf'),
        },
        {
            label: 'Edit',
            shortcut: '⌘E',
            icon: DriveFileRenameOutline,
            onClick: handleEditNode,
        },
        {
            label: 'Delete',
            shortcut: '⌘D',
            icon: DeleteOutline,
            onClick: handleDeleteNode,
        },
    ];

    return { menuActions, newName, handleChangeNode, handleKeyDown };
};
