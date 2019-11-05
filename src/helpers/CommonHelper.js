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

  static getSelectedFilters(event, appliedFiltersList) {
    const { name, value, checked, type } = event.target;
    // const { appliedFiltersList } = this.state;
    let result = [];
    // NOTE: handling value of checkbox
    if (event.target.hasOwnProperty("checked")) {
      // NOTE: push the element directly when the array is empty(Initial Value)
      if (appliedFiltersList.length === 0) {
        let filterVal = type === "checkbox" ? [value] : value;
        if (checked) {
          const obj = {
            type: name,
            filters: filterVal
          };
          result = [...appliedFiltersList, obj];
        }
      } else {
        const doesExistRes = CommonHelper.getByKeyValFromObject(appliedFiltersList, "type", name);
        const doesExist = doesExistRes ? Object.assign({}, doesExistRes) : {};
        // NOTE: check if the filter type already exist
        if (doesExist && Object.keys(doesExist).length > 0) {
          let { filters = [] } = doesExist;
          // NOTE: when filters array is not empty and value does not exist
          if (checked) {
            if (filters.constructor === Array) {
              if (filters && filters.length > 0 && filters.indexOf(value) === -1) {
                filters = [...filters, value];
              } else if (filters && filters.length === 0) {
                filters = [...filters, value];
              }
            } else if (filters.constructor === String || filters.constructor === Number) {
              filters = value;
            }
          } else if (!checked) {
            // NOTE: to remove element from filter when uncheck
            if (filters.length > 0 && filters.indexOf(value) > -1) {
              filters.splice(filters.indexOf(value), 1);
            }
          }
          doesExist.filters = filters;
          // NOTE: replace with new updated Value
          const indexOfExisting = appliedFiltersList.findIndex(af => af.type == name);
          let newValueClone = Object.assign([], appliedFiltersList);
          newValueClone[indexOfExisting] = doesExist;
          result = [...newValueClone];
        } else {
          let filterVal = type === "checkbox" ? [value] : value;
          const obj = {
            type: name,
            filters: filterVal
          };
          result = [...appliedFiltersList, obj];
        }
      }
    }

    return result;
  }
}

export default CommonHelper;
