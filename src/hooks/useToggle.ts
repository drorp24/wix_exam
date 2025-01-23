import { useCallback, useState } from 'react';

export interface UseToggleResponse {
    open: boolean;
    toggleOpen: () => void;
}

// hooks folder contains generic reusable hooks such as this one
export const useToggle = () => {
    const [open, setOpen] = useState(false);
    const toggleOpen = useCallback(() => setOpen((open) => !open), []);

    return { open, toggleOpen };
};
