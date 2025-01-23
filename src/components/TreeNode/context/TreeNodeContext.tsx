import { createContext, useContext } from 'react';

import { TreeNodeContextValue } from '@root/components/TreeNode/types';

export const TreeNodeContext = createContext<TreeNodeContextValue | undefined>(undefined);

// open/toggle state is required by ExpandButton and Nodes only;
// this context keeps others from having to pass them down
export const useTreeNodeContext = (): TreeNodeContextValue => {
    const context = useContext(TreeNodeContext);

    if (!context) {
        throw new Error('useTreeNodeContext must be used within a TreeNodeContextProvider');
    }

    return context;
};
