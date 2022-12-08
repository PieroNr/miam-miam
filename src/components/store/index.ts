import {defineStore} from "pinia";

export const useMiamStore = defineStore("miam", {
    state: () => ({
        room: null,
        user: null,
    })
})