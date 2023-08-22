import {
  DYNAMIC_THEME_PREVIEW_CONFIG,
  DYNAMIC_THEME_USER_CONFIG
} from './constant';

export const saveToLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocal = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const savePreviewToLocal = (value) => {
  saveToLocal(DYNAMIC_THEME_PREVIEW_CONFIG, value);
};

export const loadPreviewFromLocal = () => {
  return loadFromLocal(DYNAMIC_THEME_PREVIEW_CONFIG) || {};
};

export const removePreviewFromLocal = () => {
  return localStorage.removeItem(DYNAMIC_THEME_PREVIEW_CONFIG);
};

export const saveUserThemeToLocal = (value) => {
  saveToLocal(DYNAMIC_THEME_USER_CONFIG, value);
};

export const loadUserThemeFromLocal = () => {
  return loadFromLocal(DYNAMIC_THEME_USER_CONFIG);
};

