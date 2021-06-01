const table = [
    {
        _id: 1,
        name: 'Admins',
        link1Name: 'Register',
        link1To: '/admin/adminregister',
        link2Name: 'All Admins list',
        link2To: '/admin/adminlist'
    },
    {
        _id: 2,
        name: 'Users',
        link1Name: 'Register',
        link1To: '/admin/userregister',
        link2Name: 'All Users list',
        link2To: '/admin/userlist'
    },
    {
        _id: 3,
        name: 'Recipes',
        link1Name: 'Create',
        link1To: '/admin/reciperegister',
        link2Name: 'All Recipes list',
        link2To: '/admin/recipelist'
    }
]

export default table;
