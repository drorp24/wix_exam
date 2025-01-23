import { Node } from '@root/components/TreeNode/types';

export const defaultTree: Node = {
    id: 1,
    name: 'Menu',
    type: 'parent',
    nodes: [
        {
            id: 2,
            name: 'Products',
            type: 'parent',
            nodes: [
                {
                    id: 3,
                    name: 'Women',
                    type: 'parent',
                    nodes: [
                        {
                            id: 4,
                            name: 'Blouse',
                            type: 'leaf',
                            nodes: [],
                        },
                        { id: 7, name: 'Sweater', type: 'leaf', nodes: [] },
                    ],
                },
                {
                    id: 8,
                    name: 'Men',
                    type: 'parent',
                    nodes: [
                        {
                            id: 9,
                            name: 'Shorts',
                            type: 'leaf',
                            nodes: [],
                        },
                        {
                            id: 9,
                            name: 'T-shirts',
                            type: 'leaf',
                            nodes: [],
                        },
                    ],
                },
                {
                    id: 11,
                    name: 'Children',
                    type: 'parent',
                    nodes: [
                        {
                            id: 12,
                            name: 'Toys',
                            type: 'leaf',
                            nodes: [],
                        },
                    ],
                },
            ],
        },
    ],
};
