export default
    [
        {
            label: "题库管理",
            name: "topicbank",
            children: [
                {
                    label: "题库管理",
                    name: "topicbank",
                    path: "/topicbank",
                },
                {
                    label: "JS题库",
                    name: "jsbank",
                    path: "/jsbank",
                },
                {
                    label: "HTML题库",
                    name: "about",
                    path: "/about",
                },
                {
                    label: "CSS题库",
                    name: "cssbank",
                    path: "/cssbank",
                },
            ],
            meta: {
                icon: "el-icon-setting",
            },
        },
        {
            label: '比赛系统',
            name: 'competitionsystem',
            children: [
                {
                    label: "匹配比赛",
                    name: "login",
                    path: "/login",
                },
                {
                    label: "报名系统",
                    name: "register",
                    path: "/register",
                },

            ],
            meta: {
                icon: "el-icon-eleme",
            },
        },
        // {
        //   index: "4",
        //   label: "刷题系统",
        // },
        {
            label: "账号设置",
            name: "accountsetting",
            children: [
                {
                    label: "个人资料",
                    name: "personaldata",
                    path: "/personaldata",
                },
                {
                    label: "权限管理",
                    name: "jurisdiction",
                    path: "/jurisdiction",
                },
                {
                    label: "用户列表",
                    name: "userinfo",
                    path: "/userinfo",
                },
            ],
            meta: {
                icon: "el-icon-setting",
            },
        },
        {
            label: "任务系统",
            name: "tasksystem",
            children: [
                {
                    label: "任务系统",
                    name: "calendar",
                    path: "/calendar",
                },
                {
                    label: "任务列表",
                    name: "tasklist",
                    path: "/tasklist",
                },
            ],
            meta: {
                icon: "el-icon-setting",
            },
        },

    ];
