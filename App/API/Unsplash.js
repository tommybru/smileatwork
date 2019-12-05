
import Unsplash, { toJson } from 'unsplash-js/native';
import AppConfig from '../Config/AppConfig';

getConfig = () => new Unsplash(AppConfig.unsplash[Math.floor(Math.random() * 9)]);

export function getPopularPhotos(callback) {
  console.log(AppConfig.unsplashAlt);
  const unsplash = getConfig();
  unsplash.photos.listPhotos(1, 10, "popular")
  .then(toJson)
  .then(json => {
    console.log(json);
    callback(json);
  }).catch((err) => {
    console.warn(err);
    getPopularPhotos(callback);
  });
}

export function getPhotosForUser(callback, username = "vorosbenisop") {
  const unsplash = getConfig();
  unsplash.users.photos(username, 1, 10, "popular", false)
  .then(toJson)
  .then(json => {
    callback(json);
  }).catch(() => {
    console.warn(err);
    getPopularPhotos(callback, username);
  });
}
