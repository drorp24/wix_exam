import { Stack } from '@mui/material';
import { FC, memo } from 'react';

import { TreeNode } from '..';
import { useTreeNodeContext } from '../context/TreeNodeContext';

export const Nodes: FC = memo(() => {
    const { node } = useTreeNodeContext();
    const { open } = useTreeNodeContext();

    // render only visible nodes
    if (node.type !== 'parent' || !open || !node.nodes?.length) return null;

    return (
        // semantically this is a 'ul'. I didn't define it as such since mui adds too many styling things to fix.
        <Stack flexDirection='column' sx={{ ml: 4 }}>
            {node.nodes.map((node) => (
                <TreeNode node={node} key={node.id} />
            ))}
        </Stack>
    );
});

Nodes.displayName = 'Nodes';
