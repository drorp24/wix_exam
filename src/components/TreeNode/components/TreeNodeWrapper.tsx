import { FC } from 'react';

import { TreeNode } from '..';
import { useTreeContext } from '../context/TreeContext';

export const TreeNodeWrapper: FC = () => {
    const { tree } = useTreeContext();

    return <TreeNode node={tree} />;
};
