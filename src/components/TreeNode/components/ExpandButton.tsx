import { ChevronRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC, memo } from 'react';

import { useTreeNodeContext } from '../context/TreeNodeContext';

export const ExpandButton: FC = memo(() => {
    const { open, toggleOpen } = useTreeNodeContext();

    return (
        <IconButton onClick={toggleOpen}>
            <ChevronRight
                sx={{
                    transform: `rotate(${open ? 90 : 0}deg)`,
                    transition: 'transform 0.3s',
                }}
            />
        </IconButton>
    );
});

ExpandButton.displayName = 'ExpandButton';
