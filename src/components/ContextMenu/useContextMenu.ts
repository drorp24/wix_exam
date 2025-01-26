import { useTreeContext } from '../TreeNode/context/TreeContext';
import { Node } from '../TreeNode/types';

export interface UseContextMenuResponse {
    openContextMenu: (event: React.MouseEvent<HTMLElement>) => void;
    closeContextMenu: () => void;
    isContextMenuOpen: (node: HTMLElement | null) => boolean;
    handleRightClick: (node: Node) => (event: any) => void;
}

export const useContextMenu = (): UseContextMenuResponse => {
    const { nodeMenuEl, setNodeMenuEl, setOpenMenuNode } = useTreeContext();

    const openContextMenu = (event: React.MouseEvent<HTMLElement>) => {
        setNodeMenuEl(event.currentTarget);
    };

    const handleRightClick = (node: Node) => (event) => {
        event.preventDefault(); // Prevent the default browser context menu
        openContextMenu(event);
        setOpenMenuNode(node);
    };

    const closeContextMenu = () => {
        setNodeMenuEl(null);
    };

    const isContextMenuOpen = (node: HTMLElement | null) => !!node && nodeMenuEl === node;

    return {
        openContextMenu,
        closeContextMenu,
        isContextMenuOpen,
        handleRightClick,
    };
};
