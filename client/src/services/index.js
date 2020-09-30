export const logout = () => {
    localStorage.removeItem("token");
}

export const isLogin = () => {
    if (localStorage.getItem("token")) {
        console.log("logged in");
        return true;
    }

    return false;
}