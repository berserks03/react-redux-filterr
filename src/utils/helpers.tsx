export const capitalizeFirstLetter = (string: string)=> {
  return string[0].toUpperCase() + string.slice(1);
}

export const createPages = (
  pages: number[],
  pagesCount: number,
  currentPage: number
) => {
  if (pagesCount > 10) {
    if (currentPage > 5) {
      pages.push(1);
      for (let i = currentPage - 3; i <= currentPage + 4; i++) {
        pages.push(i);
        if (i === pagesCount-1) break;
      }
      pages.push(pagesCount);
    } else {
      for (let i = 1; i < 10; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
      pages.push(pagesCount);
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
};

export const defaultImageUrl = 'https://dummyimage.com/150x150.jpg/dddddd/000000';
