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
                    label: "CSS题库",
                    name: "about",
                    path: "/about",

                },
                {
                    label: "HTML题库",
                    name: "cssbank",
                    path: "/cssbank",
                },
            ],
            meta: {
                icon: "el-icon-setting",
            },
        },

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
                    label: "用户信息列表",
                    name: "userinfo",
                    path: "/userinfo",

                },
                {
                    label: "修改头像",
                    name: "SetAvatar",
                    path: "/setavatar",

                },
            ],
            meta: {
                icon: "el-icon-setting",
            },
        },
        {
            label: "角色管理",
            name: "rolemanagement",
            children: [
                {
                    label: "角色管理",
                    name: "rolemanagement",
                    path: "/rolemanagement",

                },
                {
                    label: "创建角色",
                    name: "newrole",
                    path: "/newrole",

                },
                {
                    label: "权限配置",
                    name: "jurisdiction",
                    path: "/jurisdiction",

                },
            ],
            meta: {
                icon: "el-icon-setting",
            },
        },
        {
            label: "任务中心",
            name: "tasksystem",
            children: [
                {
                    label: "我的任务",
                    name: "calendar",
                    path: "/calendar",

                },
                {
                    label: "创建任务",
                    name: "createtask",
                    path: "/createtask",

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
        {
            label: '其他',
            name: 'other',
            children: [
                {
                    label: "关于我们",
                    name: "aboutus",
                    path: "/about",

                },
            ],
            meta: {
                icon: "el-icon-eleme",
            },
        },

    ];
