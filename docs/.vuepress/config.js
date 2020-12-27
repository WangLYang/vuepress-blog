module.exports = {
    title: 'WLY \'s Blog',
    head: [
        ['link', {
            rel: 'icon',
            href: '/code.png'
        }]
    ],
    description: 'Better late than never',
    themeConfig: {
        logo: '/code.png',
        lastUpdated: 'Last Updated',
        //导航栏
        nav: [{
                text: '主页',
                link: '/'
            },
            {
                text: '学习积累',
                items: [{
                        text: 'Ecma Script',
                        link: '/ecma'
                    }, {
                        text: 'Vue.js',
                        link: '/vue'
                    },
                    {
                        text: 'CSS',
                        link: '/css'
                    },
                    {
                        text: '算法',
                        link: '/programme'
                    },
                ]
            },
            {
                text: 'GitHub',
                link: '/'
            }
        ],
        //侧边栏
        sidebar: {
            '/vue': [{
                title: '侧边栏1',
                collapsable: false,

            }]
        }
    }
}