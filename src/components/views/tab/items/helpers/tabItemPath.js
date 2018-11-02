
export default (tab, item, path) =>
  `/tab/${tab.id}/items/item/${item.id}${path ? `/${path}` : ''}`
