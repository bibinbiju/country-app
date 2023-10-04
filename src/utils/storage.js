const STORAGE_KEY_PREFFIX = "country-app:";
export const STORAGE_KEYS = {
  APP_TOKEN: "APP_TOKEN",
  APP_USERS: "APP_USERS",
};
const MAP_KEYS_NAMES = {
  [STORAGE_KEYS.APP_TOKEN]: `${STORAGE_KEY_PREFFIX}token`,
  [STORAGE_KEYS.APP_USERS]: `${STORAGE_KEY_PREFFIX}app-users`,
};
export const REQUIRED_STORAGE_KEYS = [STORAGE_KEYS.APP_TOKEN];
export const Storage = {
  setItem: (key, value) =>
    localStorage.setItem(MAP_KEYS_NAMES[key], JSON.stringify(value ?? null)),
  getItem: (key) => {
    const newValue =
      localStorage.getItem(MAP_KEYS_NAMES[key]) !== "undefined"
        ? localStorage.getItem(MAP_KEYS_NAMES[key])
        : null;
    return JSON.parse(newValue ?? null);
  },
  removeItem: (key) => localStorage.removeItem(MAP_KEYS_NAMES[key]),
  clear: () => {
    for (const storageKey in localStorage) {
      if (storageKey(STORAGE_KEY_PREFFIX) !== -1)
        localStorage.removeItem(storageKey);
    }
  },
};
