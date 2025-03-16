import React from 'react';
import { Button } from './button';
import { Loader2 } from 'lucide-react';
import { Spinner } from './spinner';

export interface PendingButtonProps {
    onClick?: () => Promise<void>;
    children?: React.ReactNode;

    className?: string;
    disabled?: boolean;
    variant?: 'default' | 'secondary' | 'destructive';
}

export function PendingButton(props: PendingButtonProps) {
    const [pending, setPending] = React.useState(false);

    async function handleClick() {
        setPending(true);
        await props.onClick?.();
        setPending(false);
    }

    return (
        <Button
            onClick={handleClick}
            disabled={props.disabled || pending}
            className={props.className}
            variant={props.variant}
        >
            {pending ? <Spinner size="small" /> : props.children}
        </Button>
    );
}
