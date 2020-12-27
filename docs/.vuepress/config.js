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
                        link: '/ecma/'
                    }, {
                        text: 'Vue.js',
                        link: '/vue/'
                    },
                    {
                        text: 'CSS',
                        link: '/css-study/'
                    },
                    {
                        text: '算法',
                        link: '/programme/'
                    },
                ]
            },
            {
                text: 'GitHub',
                link: 'https://github.com/WangLYang/vuepress-blog'
            }
        ],
        //侧边栏
        sidebar: {
            '/ecma': [{
                title: '侧边栏1',
                collapsable: false,
            }],
            '/vue': [{
                title: '侧边栏1',
                collapsable: false,
            }],
            '/programme': [{
                title: '侧边栏1',
                collapsable: false,
            }],
            '/css-study': [{
                title: '侧边栏1',
                collapsable: false,
            }]
        }
    }
}