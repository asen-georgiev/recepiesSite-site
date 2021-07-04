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
    },
    {
        _id: 4,
        name: 'Comments',
        link1Name: 'N/A',
        link1To: 'N/A',
        link2Name: 'All Comments list',
        link2To: '/admin/commentlist'
    },
    {
        _id: 5,
        name: 'Emails',
        link1Name: 'N/A',
        link1To: 'N/A',
        link2Name: 'All Emails list',
        link2To: '/admin/emaillist'
    }
]

export default table;
