import { ElementType, FC, memo } from 'react';

import { Branch } from './components/Branch';
import { Nodes } from './components/Nodes';
import { TreeNodeContextProvider } from './context/TreeNodeContextProvider';
import { DefaultBranchHeight, DefaultNodeTypeIcon, Node, NodeType } from './types';

// This component will work for any type of node, as long as it adheres to the minimal Node interface

export interface TreeNodeProps {
    node: Node;
    nodeTypeIcon?: Record<NodeType, ElementType>; // users can provide the icons they want for any type of node
    branchHeight?: number;
}

export const TreeNode: FC<TreeNodeProps> = memo(
    ({ node, nodeTypeIcon = DefaultNodeTypeIcon, branchHeight = DefaultBranchHeight }) => (
        <TreeNodeContextProvider node={node}>
            <Branch nodeTypeIcon={nodeTypeIcon} branchHeight={branchHeight} />
            <Nodes />
        </TreeNodeContextProvider>
    )
);

TreeNode.displayName = 'TreeNode';
