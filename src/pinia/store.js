// store.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        token: ''
    }),
    
    actions: {
        setToken(newToken) {
            this.token = newToken;
        }
    },
    persist: {
        enabled: true, // 开启数据缓存
    }
    
});