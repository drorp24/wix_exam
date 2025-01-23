import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Stack, TextField, Typography } from '@mui/material';
import { FC, memo, useRef } from 'react';

import { TreeNodeProps } from '..';
import { ExpandButton } from './ExpandButton';
import { TreeNodeContextMenu } from './TreeNodeContextMenu';
import { useTreeNodeContext } from '../context/TreeNodeContext';
import { useTreeNodeActions } from '../hooks/useTreeNodeActions';

export const Branch: FC<Omit<Required<TreeNodeProps>, 'node' | 'setNode'>> = memo(({ nodeTypeIcon, branchHeight }) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const { node, editedNodeId, isContextMenuOpen } = useTreeNodeContext();
    const { name, type } = node;
    const Icon = nodeTypeIcon[type];
    const expandable = type === 'parent' && node.nodes?.length;

    const { openContextMenu, handleRightClick } = useTreeNodeContext();
    const { menuActions, newName, handleChangeNode, handleKeyDown } = useTreeNodeActions();
    console.log('newName: ', newName);

    const isMenuOpen = isContextMenuOpen(nodeRef.current);

    return (
        <>
            <Stack
                ref={nodeRef}
                flexDirection='row'
                alignItems='center'
                gap={1}
                sx={{
                    height: `${branchHeight}rem`,
                    '&:hover': { cursor: 'default' },
                    width: 'max-content',
                    zIndex: 1301,
                }}
                onContextMenu={handleRightClick}>
                <Box sx={{ visibility: expandable ? 'visible' : 'hidden' }}>
                    <ExpandButton />
                </Box>
                <Icon color='primary' />
                {node.id === editedNodeId ? (
                    <TextField
                        variant='outlined'
                        value={newName}
                        onChange={handleChangeNode}
                        onKeyDown={handleKeyDown}
                        sx={{ p: 0, '& input': { p: 1 } }}
                        focused
                        autoFocus
                    />
                ) : (
                    <Typography>{name}</Typography>
                )}
                <IconButton onClick={openContextMenu}>
                    <MoreVert color='primary' />
                </IconButton>
            </Stack>
            <TreeNodeContextMenu menuActions={menuActions} isMenuOpen={isMenuOpen} />
        </>
    );
});

Branch.displayName = 'Branch';
