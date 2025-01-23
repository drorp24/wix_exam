import { Node } from '@root/components/TreeNode/types';
import { defaultTree } from '@root/data/defaultTree';

import { PersistedItem } from './types';

interface UseGetTreeResponse {
    getTree: () => Node;
}

export const useGetTree = (): UseGetTreeResponse => {
    const getTree = (): Node => {
        const serializedTree = localStorage.getItem(PersistedItem);
        return serializedTree ? JSON.parse(serializedTree) : defaultTree;
    };
    return { getTree };
};
