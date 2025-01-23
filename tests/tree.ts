import { Node } from '@root/components/TreeNode/types';

export const defaultTree: Node = {
    id: 1,
    name: 'Home',
    type: 'parent',
    nodes: [
        {
            id: 2,
            name: 'Movies',
            type: 'parent',
            nodes: [
                {
                    id: 3,
                    name: 'Action',
                    type: 'parent',
                    nodes: [
                        {
                            id: 4,
                            name: '2000s',
                            type: 'parent',
                            nodes: [
                                { id: 5, name: 'Gladiator.mp4', type: 'leaf', nodes: [] },
                                { id: 6, name: 'The-Dark-Knight.mp4', type: 'leaf', nodes: [] },
                            ],
                        },
                        { id: 7, name: '2010s', type: 'leaf', nodes: [] },
                    ],
                },
                {
                    id: 8,
                    name: 'Comedy',
                    type: 'parent',
                    nodes: [
                        {
                            id: 9,
                            name: '2000s',
                            type: 'parent',
                            nodes: [{ id: 10, name: 'Superbad.mp4', type: 'leaf', nodes: [] }],
                        },
                    ],
                },
                {
                    id: 11,
                    name: 'Drama',
                    type: 'parent',
                    nodes: [
                        {
                            id: 12,
                            name: '2000s',
                            type: 'parent',
                            nodes: [{ id: 13, name: 'American-Beauty.mp4', type: 'leaf', nodes: [] }],
                        },
                    ],
                },
            ],
        },
        {
            id: 14,
            name: 'Music',
            type: 'parent',
            nodes: [
                { id: 15, name: 'Rock', type: 'leaf', nodes: [] },
                { id: 16, name: 'Classical', type: 'leaf', nodes: [] },
            ],
        },
        { id: 17, name: 'Pictures', type: 'leaf', nodes: [] },
        {
            id: 18,
            name: 'Documents',
            type: 'parent',
            nodes: [],
        },
        { id: 19, name: 'passwords.txt', type: 'leaf', nodes: [] },
    ],
};
