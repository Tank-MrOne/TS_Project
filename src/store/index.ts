import Vue from 'vue';
import Vuex from 'vuex';
import { productList, seriesList, userDetail, friendsListAll } from "@/api/index";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLogin: false,
        isMine: false,
        userInfo: {},
        navTab: 2,
        homeChoice: {
            id: '1',
            img_id: '1'
        },
        friends: [],
        giveInfo: {},
        showDrawer: false,
        token: "",
        product: {},
        series: {},
    },
    mutations: {
        SET_IS_LOGIN(state: any, isLogin: boolean) {
            state.isLogin = isLogin
        },
        SET_IS_MINE(state: any, isMine: boolean) {
            state.isMine = isMine
        },
        SET_USER_INFO(state: any, userInfo: any) {
            state.userInfo = userInfo
        },
        SET_NAV_TAB(state: any, navTab: number) {
            state.navTab = navTab
        },
        SET_HOME_CHOICE(state: any, homeChoice: any) {
            state.homeChoice = homeChoice
        },
        SET_FRIENDS(state: any, friends: any) {
            state.friends = friends
        },
        SET_GIVE_INFO(state: any, giveInfo: any) {
            state.giveInfo = giveInfo
        },
        SET_SHOW_DRAWER(state: any, showDrawer: any) {
            state.showDrawer = showDrawer
        },
        SET_TOKEN(state: any, token: any) {
            state.token = token
        },
        SET_PRODUCT(state: any, product: any) {
            state.product = product
        },
        SET_SERIES(state: any, series: any) {
            state.series = series
        },
    },
    actions: {
        _API_getProductList(store: any, data: any) {
            productList(data.seriesId, data.pageNo, data.pageSize).then((res: any) => {
                if (res.code === 200) {
                    store.commit('SET_PRODUCT', res.data)
                    data.success()
                } else {
                    data.error(res.msg)
                }
            }).catch((error: any) => {
                console.log(error)
            });
        },
        _API_getSeriesList(store: any, data: any) {
            seriesList(data.pageNo, data.pageSize).then((res: any) => {
                if (res.code === 200) {
                    store.commit('SET_SERIES', res.data)
                    data.success()
                } else {
                    data.error(res.msg)
                }
            }).catch((error: any) => {
                console.log(error)
            });
        },
        _API_getUserDetail(store: any, data: any) {
            userDetail().then((res: any) => {
                console.log('userInfo', res)
                if (res.code === 200) {
                    store.commit('SET_USER_INFO', res.data)
                    sessionStorage.setItem('userInfo', JSON.stringify(res.data))
                } else {
                    data.error(res.msg)
                }
            }).catch((error: any) => {
                console.log(error)
            });
        },
        _API_getFriendsListAll(store: any, data: any) {
            friendsListAll().then((res: any) => {
                console.log('firends', res)
                if (res.code === 200) {
                    store.commit('SET_FRIENDS', res.data?.records)
                    sessionStorage.setItem('friends', JSON.stringify(res.data?.records))
                    data.success()
                } else {
                    data.error(res.msg)
                }
            }).catch((error: any) => {
                console.log(error)
            });
        },
    }
});

export default store;
