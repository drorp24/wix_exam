import { useTreeContext } from '../TreeNode/context/TreeContext';

export interface UseContextMenuResponse {
    openContextMenu: (event: React.MouseEvent<HTMLElement>) => void;
    closeContextMenu: () => void;
    isContextMenuOpen: (node: HTMLElement | null) => boolean;
    handleRightClick: (event: any) => void;
}

export const useContextMenu = (): UseContextMenuResponse => {
    const { nodeMenuEl, setNodeMenuEl } = useTreeContext();

    const openContextMenu = (event: React.MouseEvent<HTMLElement>) => {
        setNodeMenuEl(event.currentTarget);
    };

    const handleRightClick = (event) => {
        event.preventDefault(); // Prevent the default browser context menu
        openContextMenu(event);
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
