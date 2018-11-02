
// get either /create-tab or /tab/:id style urls
// based on whether or not there is a tab present.
export default (tab = {}, path = '') => {
  if (!tab || !tab.id) {
    return `/tab/create/${path}`
  }
  return `/tab/${tab.id}/${path}`
}
