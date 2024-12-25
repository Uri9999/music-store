import { defineStore } from 'pinia';
import Api from '~/network/Api';

export const useCartStore = defineStore('cart', {
    state: () => ({
        count: 0 as number,
    }),

    actions: {
        async getCount() {
            await Api.cart
                .getCountByMe()
                .then((res: any) => {
                    this.count = res.data;
                })
                .catch((err: any) => {
                    console.log(err);
                });
        },
    },
});
