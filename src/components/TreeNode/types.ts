import { Description } from '@mui/icons-material';
import FolderIcon from '@mui/icons-material/Folder';
import { ElementType } from 'react';

import { UseContextMenuResponse } from '@root/components/ContextMenu/useContextMenu';
import { UseToggleResponse } from '@root/hooks/useToggle';

export type NodeType = 'parent' | 'leaf';

interface BasicNode {
    id: number;
    name: string;
    nodes: Node[];
}

export interface ParentNode extends BasicNode {
    type: 'parent';
}

// alternatively a leaf could be indicated by an empty nodes array
// but I anyway wanted a node to have a type property, for implementations such as a file explorer (e.g. folder vs. file)
export interface LeafNode extends BasicNode {
    type: 'leaf';
}

export type Node = ParentNode | LeafNode;

export type TreeNodeContextValue = UseToggleResponse &
    UseContextMenuResponse & {
        node: Node;
        editedNodeId: number | null;
        setEditedNodeId: React.Dispatch<React.SetStateAction<number | null>>;
    };

export type TreeContextValue = {
    tree: Node;
    setTree: (tree: Node) => void;
    nodeMenuEl: null | HTMLElement;
    setNodeMenuEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
};

export const DefaultNodeTypeIcon: Record<NodeType, ElementType> = {
    parent: FolderIcon,
    leaf: Description,
};

export const DefaultBranchHeight = 2.5;
