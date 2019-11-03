class CommonHelper {
  static getByKeyValFromObject(searchInArray, searchKey, searchValue) {
    let result = searchInArray.find(searchIn => searchIn[searchKey] === searchValue);
    return result;
  }

  // NOTE: use to sort numeric values
  static sortList(list, key, orderBy = "ASC") {
    let sortedList = [];
    if (orderBy === "DESC") {
      sortedList = list.sort((a, b) => {
        return parseFloat(b[key]) - parseFloat(a[key]);
      });
    } else {
      sortedList = list.sort((a, b) => {
        return parseFloat(a[key]) - parseFloat(b[key]);
      });
    }
    return sortedList;
  }

  static getListWithLimit(list, firstIndex, lastIndex) {
    const sortedLimitedList = list.slice(firstIndex, lastIndex);
    return sortedLimitedList;
  }
}

export default CommonHelper;
