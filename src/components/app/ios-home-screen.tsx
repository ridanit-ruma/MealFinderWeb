import { Button } from '../ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '../ui/drawer';
import IosShareIcon from '@/assets/ios_share.svg?react';
import { Badge } from '../ui/badge';

export function IosHomeScreenAlert(props: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    return (
        <Drawer open={props.open} onOpenChange={props.setOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>홈 화면에 추가</DrawerTitle>
                    <DrawerDescription>
                        보안상의 이유로 iOS 기기는 알림을 받기 위해 공유
                        시트에서 홈 화면에 추가해야 합니다.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center w-full pl-11 mt-6">
                        <h2 className="mr-7 text-5xl">1.</h2>
                        <IosShareIcon fill="white" />
                        <p className="ml-3">
                            공유 버튼을 눌러 공유 시트를 엽니다.
                        </p>
                    </div>
                    <div className="flex items-center w-full pl-11 mt-6">
                        <h2 className="mr-7 text-5xl">2.</h2>
                        <p>
                            <Badge variant="secondary">홈 화면에 추가</Badge> 를
                            탭합니다.
                        </p>
                    </div>
                    <div className="flex items-center w-full pl-11 mt-6">
                        <h2 className="mr-7 text-5xl">3.</h2>
                        <p>새로 추가된 앱에서 다시 알림을 요청합니다.</p>
                    </div>
                </div>
                <DrawerFooter>
                    <Button
                        onClick={() => props.setOpen(false)}
                        variant="secondary"
                        className="h-12 mt-4"
                    >
                        닫기
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
