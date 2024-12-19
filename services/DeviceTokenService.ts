import Api from '@/network/Api';
import { useNotifications } from '#build/imports';

export const deviceTokenService = () => {
    const saveFCMToken = async () => {
        const { requestPermission } = useNotifications();
        const token = await requestPermission();
        console.log('token', token);
        
        if (token) {
            // Gửi token này đến API lưu trữ
            await Api.deviceToken
                .store({ token: token })
                .then((res: any) => {
                    console.log('save token: ', res);
                })
                .catch((err: any) => {
                    console.log(err);
                });
        }
    };

    return { saveFCMToken };
};
