import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../ui/alert-dialog';

export function NotificationFailAlert(props: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    return (
        <AlertDialog open={props.open} onOpenChange={props.setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>알림 요청 실패</AlertDialogTitle>
                    <AlertDialogDescription>
                        알림 요청에 실패했습니다. 권한을 다시 한번 확인해주세요.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>닫기</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
