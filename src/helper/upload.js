// import { isObject } from 'main/utils/lodash';

const defaultResolve = (response) => {
  return response.data;
};

export function parseResponse(response, props, resolve = defaultResolve) {
  let data = resolve(response);
  const { name, url } = props;
  return {
    ...data,
    uid: file.uid,
    [name]: data[name],
    url: data[url]
  };
}
