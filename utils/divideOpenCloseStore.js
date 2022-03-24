export function divideOpenCloseStore(storeList) {
  const openStoreList = [];
  const closeStoreList = [];

  for (const store of storeList) {
    if (store['status'] === 'close') {
      closeStoreList.push(store);
    } else {
      openStoreList.push(store);
    }
  }

  return openStoreList.concat(closeStoreList);
}
