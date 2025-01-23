// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Branch } from './Branch'; // Adjust path if necessary
import { useTreeNodeContext } from '../context/TreeNodeContext';
import { useTreeNodeActions } from '../hooks/useTreeNodeActions';

// Mock dependencies
vi.mock('../context/TreeNodeContext', () => ({
    useTreeNodeContext: vi.fn(),
}));
vi.mock('../hooks/useTreeNodeActions', () => ({
    useTreeNodeActions: vi.fn(),
}));
vi.mock('./ExpandButton', () => ({
    ExpandButton: vi.fn(() => <div>ExpandButton</div>),
}));
vi.mock('./TreeNodeContextMenu', () => ({
    TreeNodeContextMenu: vi.fn(() => <div>TreeNodeContextMenu</div>),
}));

describe('Branch', () => {
    const mockNode = {
        id: 1,
        name: 'Test Node',
        type: 'parent',
        nodes: [{ id: 2, name: 'Child Node', type: 'leaf', nodes: [] }],
    };

    const mockNodeTypeIcon = {
        parent: () => <div>Parent Icon</div>,
        leaf: () => <div>Leaf Icon</div>,
    };

    const mockContext = {
        node: mockNode,
        editedNodeId: null,
        isContextMenuOpen: vi.fn(() => false),
        openContextMenu: vi.fn(),
        handleRightClick: vi.fn(),
    };

    const mockActions = {
        menuActions: [],
        newName: '',
        handleChangeNode: vi.fn(),
        handleKeyDown: vi.fn(),
    };

    beforeEach(() => {
        (useTreeNodeContext as vi.Mock).mockReturnValue(mockContext);
        (useTreeNodeActions as vi.Mock).mockReturnValue(mockActions);
    });

    it('renders correctly with default props', () => {
        render(<Branch nodeTypeIcon={mockNodeTypeIcon} branchHeight={2.5} />);

        expect(screen.getByText('Parent Icon')).toBeInTheDocument();
        expect(screen.getByText('Test Node')).toBeInTheDocument();
        expect(screen.getByText('ExpandButton')).toBeInTheDocument();
        expect(screen.getByText('TreeNodeContextMenu')).toBeInTheDocument();
    });

    it('renders a TextField when the node is being edited', () => {
        (useTreeNodeContext as vi.Mock).mockReturnValue({
            ...mockContext,
            editedNodeId: mockNode.id,
        });

        render(<Branch nodeTypeIcon={mockNodeTypeIcon} branchHeight={2.5} />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('handles right-click to open the context menu', () => {
        render(<Branch nodeTypeIcon={mockNodeTypeIcon} branchHeight={2.5} />);

        const stackElement = screen.getByText('Parent Icon').closest('div');
        fireEvent.contextMenu(stackElement!);

        expect(mockContext.handleRightClick).toHaveBeenCalled();
    });

    it('opens the context menu when the icon button is clicked', () => {
        render(<Branch nodeTypeIcon={mockNodeTypeIcon} branchHeight={2.5} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockContext.openContextMenu).toHaveBeenCalled();
    });

    it('renders the correct icon based on node type', () => {
        render(<Branch nodeTypeIcon={mockNodeTypeIcon} branchHeight={2.5} />);

        expect(screen.getByText('Parent Icon')).toBeInTheDocument();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Branch nodeTypeIcon={mockNodeTypeIcon} branchHeight={2.5} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
