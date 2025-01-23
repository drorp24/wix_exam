import { Node } from '@root/components/TreeNode/types';

import { PersistedItem } from './types';

interface UseUpdateTreeResponse {
    updateTree: (tree: Node) => void;
}

export const useUpdateTree = (): UseUpdateTreeResponse => {
    const updateTree = (tree) => {
        const serializedTree = JSON.stringify(tree, null, 2);
        localStorage.setItem(PersistedItem, serializedTree);
    };
    return { updateTree };
};
