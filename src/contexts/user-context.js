import { createContext } from 'react';

const UserContext = createContext({
    auth: false,
    username: "",
    userAuth() {},
    user: {}
})

export default UserContext;