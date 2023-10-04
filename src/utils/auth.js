import { REQUIRED_STORAGE_KEYS, STORAGE_KEYS, Storage } from "./storage";

const Auth = {
  isAuthenticated: () =>
    REQUIRED_STORAGE_KEYS.every((eachKey) => Storage.getItem(eachKey)),
  getCurrentUserDetail: () => {
    return Storage.getItem(STORAGE_KEYS.APP_USERS)?.find(
      (d) => d.email === Storage.getItem(STORAGE_KEYS.APP_TOKEN)
    );
  },
  updateCurrentUser: (data) => {
    const allUsers = Storage.getItem(STORAGE_KEYS.APP_USERS) || [];
    const findIndex = allUsers.findIndex(
      (d) => d.email === Storage.getItem(STORAGE_KEYS.APP_TOKEN)
    );
    if (findIndex !== -1) {
      allUsers[findIndex] = { ...allUsers[findIndex], ...data };
      Storage.setItem(STORAGE_KEYS.APP_USERS, allUsers);
    }
  },
  deAuthenticate: () =>
    REQUIRED_STORAGE_KEYS.forEach((eachKey) => Storage.removeItem(eachKey)),
};
export default Auth;
