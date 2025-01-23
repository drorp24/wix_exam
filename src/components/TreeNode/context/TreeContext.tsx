import { createContext, useContext } from 'react';

import { TreeContextValue } from '@root/components/TreeNode/types';

export const TreeContext = createContext<TreeContextValue | undefined>(undefined);

export const useTreeContext = (): TreeContextValue => {
    const context = useContext(TreeContext);

    if (!context) {
        throw new Error('useTreeContext must be used within a TreeContextProvider');
    }

    return context;
};
