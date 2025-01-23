import { useState } from 'react';

import { defaultTree } from '@root/data/defaultTree';

import { Node } from '../types';

export interface UseTreeResponse {
    tree: Node;
    setTree: React.Dispatch<React.SetStateAction<Node>>;
}

export const useTree = (): UseTreeResponse => {
    const [tree, setTree] = useState<Node>(defaultTree);

    return { tree, setTree };
};
