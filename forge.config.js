module.exports = {
    packagerConfig: {
        asar: true,
        icon: '/src/script/public/assets/images/icons/win/icon'
    },
    rebuildConfig: {},
    makers: [{
            name: '@electron-forge/maker-squirrel',
            // config: {
            //     setupIcon: '/src/script/public/assets/images/icons/win/icon'
            // },
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            config: {
                options: {
                    icon: '/src/script/public/assets/images/icons/win/icon'
                },
            },
        },
        {
            name: '@electron-forge/maker-rpm',
            config: { icon: '/src/script/public/assets/images/icons/win/icon' },
        },
    ],
    plugins: [{
        name: '@electron-forge/plugin-auto-unpack-natives',
        config: {},
    }, ],
};