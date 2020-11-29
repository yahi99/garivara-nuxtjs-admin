export const menuItems = [
    {
      id: 1,
      label: "menuitems.navigation.text",
      isTitle: true
    },
    {
      id: 2,
      label: "Dashboard",
      icon: "ri-dashboard-line",
      link: '/'
    },
    {
        id: 3,
        label: "View Lists",
        isTitle: true
    },
    {
      id: 4,
      label: 'Users',
      icon: 'ri-user-line',
      link: '/users'
    },
    {
      id: 5,
      label: 'Owners',
      icon: 'ri-user-2-fill',
      link: '/owners'
    },
    {
      id: 6,
      label: 'Drivers',
      icon: 'ri-user-6-fill',
      isMenuCollapsed: false,
      subItems: [
        {
          id: 22,
          label: 'Verified drivers',
          link: '/drivers'
        },
        {
          id: 21,
          label: 'Pending drivers',
          link: '/drivers/pending-drivers'
        }
      ]
    },
    {
      id: 20,
      label: 'Vehicles',
      icon: 'ri-car-fill',
      isMenuCollapsed: false,
      subItems: [
        {
          id: 21,
          label: 'Verification requests',
          link: '/vehicles/verification-requests'
        }
      ]
    },
    {
      id: 8,
      label: "Admin Config",
      isTitle: true
    },
    {
      id: 9,
      label: "Fuel category",
      icon: "ri-oil-line",
      link: '/fuel-category'
    },
    {
      id: 10,
      label: "Vehicle type category",
      icon: "ri-car-washing-line",
      link: '/vehicle-type-category'
    },
    {
      id: 11,
      label: "Vehicle brands",
      icon: "ri-caravan-line",
      link: '/vehicle-brands'
    }
];

