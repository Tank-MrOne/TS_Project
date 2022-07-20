const Friends = [
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13268506154%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627182&t=7e8f3480ba5332f6f07e32a014e3476f',
        userName: "蜡笔小新",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: true, // 实名认证
        tags: ['创世标识']
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F9257646733%2F641.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627217&t=29c502c8683bb6faf6f61f72fa3c9ab0',
        userName: "鸣人",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: true, // 实名认证
        tags: []
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14019171421%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627217&t=47d7bdcd3a0d159b59fb0298f14cd6c7',
        userName: "自来也",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: false, // 实名认证
        tags: ['创世标识']
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13584065202%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627217&t=1f5814292408eb132b571561d085b3a3',
        userName: "宇智波",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: true, // 实名认证
        tags: ['创世标识']
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F12324951714%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627217&t=cf2123ce9d4a22ca47514ebcb3e6775e',
        userName: "四代火影",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: true, // 实名认证
        tags: []
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F12993492390%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627217&t=c302fcf9f207a41bb75fe1d736d956a0',
        userName: "晓组织",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: true, // 实名认证
        tags: ['创世标识']
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fc1bd9a55a0fa036eea0ba109a6929165b6440143.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627217&t=372bbaab42a808bd09fcd67d418201a4',
        userName: "卡卡西",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: true, // 实名认证
        tags: ['创世标识']
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13268506154%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627182&t=7e8f3480ba5332f6f07e32a014e3476f',
        userName: "蜡笔小新",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: true, // 实名认证
        tags: ['创世标识']
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F9257646733%2F641.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627217&t=29c502c8683bb6faf6f61f72fa3c9ab0',
        userName: "鸣人",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: true, // 实名认证
        tags: []
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14019171421%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627217&t=47d7bdcd3a0d159b59fb0298f14cd6c7',
        userName: "自来也",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: false, // 实名认证
        tags: ['创世标识']
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13584065202%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627217&t=1f5814292408eb132b571561d085b3a3',
        userName: "宇智波",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: true, // 实名认证
        tags: ['创世标识']
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F12324951714%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627217&t=cf2123ce9d4a22ca47514ebcb3e6775e',
        userName: "四代火影",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: true, // 实名认证
        tags: []
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F12993492390%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627217&t=c302fcf9f207a41bb75fe1d736d956a0',
        userName: "晓组织",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: true, // 实名认证
        tags: ['创世标识']
    },
    {
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fc1bd9a55a0fa036eea0ba109a6929165b6440143.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660627217&t=372bbaab42a808bd09fcd67d418201a4',
        userName: "卡卡西",
        userId: '1293141172387138',
        userAddress: '124872564512938471823874128756785678234167823641786572395617862376418263481276418235',
        realName: true, // 实名认证
        tags: ['创世标识']
    },
]

export default Friends