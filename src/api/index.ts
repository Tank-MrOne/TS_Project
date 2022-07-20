import instance from '@/utils/request'

// 获取验证码
export function captcha() {
    return instance.get("auth/captcha");
}

// 用户登入
export function login(data: any) {
    return instance.post("auth/login", data);
}

// 退出登入
export function logout(token: string) {
    return instance.post("auth/logout", {
        headers: {
            token
        }
    });
}

// 用户注册
export function register(data: any) {
    return instance.post("auth/register", data);
}

// 发送短信验证码
export function sendCode(data: any) {
    return instance.post("sms/sendCode", data);
}

// 商品列表分页
export function productList(seriesId: string = '', pageNo: string = '1', pageSize: string = '4') {
    return instance.get(`uib/product/list?pageNo=${pageNo}&pageSize=${pageSize}&seriesId=${seriesId}`);
}

// 系列列表分页
export function seriesList(pageNo: string = '1', pageSize: string = '2') {
    return instance.get(`uib/series/list?pageNo=${pageNo}&pageSize=${pageSize}`);
}

// 获取商品详情
export function productDetail(id: string) {
    return instance.get(`uib/product/detail?id=${id}`);

}

// 获取系列详情
export function seriestDetail(id: string) {
    return instance.get(`uib/series/get?id=${id}`);
}

// 收藏馆页
export function productListUserId(userId: string, pageNo: string = '1', pageSize: string = '6') {
    return instance.get(`uib/user/product/list?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`);
}

// 兑换藏品
export function productExchanege(data: any) {
    return instance.post("uib/product/exchanege", data);
}

// 获取好友列表
export function friendsListAll() {
    return instance.get("uib/friends/listAll");
}

// 检索全部用户
export function searchUsername(username: string) {
    return instance.get(`uib/friends/search?username=${username}`);
}

// 赠送图片
export function productPresent(data: any) {
    return instance.post("uib/product/present", data);
}

// 添加好友
export function friendsAdd(data: any) {
    return instance.post("uib/friends/add", data);
}

// 删除好友
export function friendsRemove(data: any) {
    return instance.post("uib/friends/remove", data);
}

// 用户菜单列表
export function navListAll() {
    return instance.get("uib/nav/listAll");
}

// 用户信息
export function userDetail() {
    return instance.get("uib/user/detail");
}

// 用户认证
export function userAudit(data: any) {
    return instance.post("uib/user/audit", data);
}
