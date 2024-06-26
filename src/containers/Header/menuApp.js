export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user', 
        menus: [
            // {
            //     name: 'menu.admin.crud', link: '/system/user-manage'
            // },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
                
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },
            { //quản lý kế hoạch khám bệnh bác sĩ
               
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
                
            },
        
            
        ]
    },
    { //quản lý phòng khám
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            }
        ]
    },
    { //quản lý chuyên khoa
        name: 'menu.admin.specialty', 
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            }
        ]
    },
    { //quản lý cẩm nang đỏi qua lịch sử khám bệnh
        name: 'menu.admin.history', 
        menus: [
            {
                name: 'menu.admin.manage-history', link: '/system/manage-history'
            },
            {
                name: 'menu.admin.manage-all-history', link: '/system/manage-all-history'
            }
        ]
    },
    { //quản lý cẩm nang đỏi qua lịch sử khám bệnh
        name: 'menu.admin.manage-revenue', 
        menus: [
            {
                name: 'menu.admin.revenue', link: '/system/revenue'
            },
            {
                name: 'menu.admin.revenue-id', link: '/system/revenue-id'
            }
            ,
            {
                name: 'menu.admin.revenue-admin', link: '/system/revenue-admin'
            }
        ]
    },
];

export const doctorMenu = [
    {
    name: 'menu.admin.manage-user',
    menus : [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            }
        ]
},
{
    name: 'menu.admin.doctor-patient',
    menus : [
          
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            }
        ]

},
{
    name: 'menu.admin.history-patient',
    menus : [
          
            {
                name: 'menu.doctor.history-patient', link: '/doctor/history-patient'
            }
        ]

},
{
    name: 'menu.admin.manage-revenue',
    menus : [
          
            {
                name: 'menu.doctor.manage-revenue', link: '/doctor/manage-revenue'
            }
        ]

}
];