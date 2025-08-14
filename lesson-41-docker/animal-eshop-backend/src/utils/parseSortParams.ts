const sortOrderList = ["asc", "desc"];

//@ts-expect-error
const parseSortParams = (query, sortFields: string[]) => {
  const sortOrder = sortOrderList.includes(query.sortOrder) ? query.sortOrder : sortOrderList[0];
  const sortBy = sortFields.includes(query.sortBy) ? query.sortBy : sortFields[0];

  return {
    sortBy,
    sortOrder,
  }

};

export default parseSortParams;
