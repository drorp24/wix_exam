import { ElementType } from 'react';

export interface MenuAction {
    label: string;
    shortcut: string;
    icon: ElementType;
    onClick: () => void;
    disabled?: boolean;
}
