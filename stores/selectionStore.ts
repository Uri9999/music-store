import { defineStore } from 'pinia';
import Api from '~/network/Api';
import type { Selection } from '~/types/selection';

export const useSelectionStore = defineStore('selection', {
    state: () => ({
        data: null as Selection | null,
    }),

    actions: {
        setData(data: any) {
            this.data = data;
        },
        async getData() {
            if (this.data == null) {
                await Api.selection
                    .index()
                    .then((res: any) => {
                        this.setData(res.data);
                    })
                    .catch((err: any) => {
                        console.log('err:', err);
                    });
            }

            return this.data;
        },
    },
});
