export function pagesToShow (
  currentPage: number,
  pageCount: number,
  pageSlot: number = 9
): number[] {
  if (pageCount === 1) return [1]
  if (pageCount === 2) return [1, 2]
  const firstPage = 1
  const lastPage = pageCount
  let middleStart = currentPage
  let middleEnd = currentPage
  const middleDelta = (pageSlot - 5) / 2
  middleEnd += Math.ceil(middleDelta)
  middleEnd = Math.min(
    Math.max(middleEnd, firstPage + pageSlot - 3),
    lastPage - 2
  )
  middleStart -= Math.floor(middleDelta)
  middleStart = Math.max(
    Math.min(middleStart, lastPage - pageSlot + 3),
    firstPage + 2
  )
  let leftSplit = false
  let rightSplit = false
  if (middleStart > firstPage + 2) leftSplit = true
  if (middleEnd < lastPage - 2) rightSplit = true
  const items = []
  items.push(firstPage)
  if (leftSplit) {
    items.push(-2)
  } else if (lastPage >= firstPage + 1) {
    items.push(firstPage + 1)
  }
  for (let i = middleStart; i <= middleEnd; ++i) {
    items.push(i)
  }
  if (rightSplit) {
    items.push(-1)
  } else if (
    middleEnd === lastPage - 2 &&
    items[items.length - 1] !== lastPage - 1
  ) {
    items.push(lastPage - 1)
  }
  if (items[items.length - 1] !== lastPage) items.push(lastPage)
  return items
}

export type PageItem =
  | {
    type: 'fastBackward' | 'fastForward'
    label: string
    active: false
    pageRanges?: number[]
  }
  | {
    type: 'page'
    label: number
    active: boolean
  }

function getFastRanges (fastIdx: number, pages: number[]) {
  const ranges = [
    pages[fastIdx - 1] + 1,
    pages[fastIdx + 1] - 1
  ];
  
  return ranges;
}

export function getPagesFromRanges (start: number, end: number) {
  const ranges: number[] = [];
  let cur = start;
  
  while (cur++ < end) {
    ranges.push(cur)
  }
  
  return ranges;
}

export function mapPagesToPageItems (pages: number[], currentPage: number): PageItem[] {
  return pages.map((page, idx) => {
    switch (page) {
      case -2:
        return {
          type: 'fastBackward',
          label: 'fastBackward',
          active: false,
          pageRanges: getFastRanges(idx, pages),
        }
      case -1:
        return {
          type: 'fastForward',
          label: 'fastForward',
          active: false,
          pageRanges: getFastRanges(idx, pages),
        }
      default:
        if (page === currentPage) {
          return {
            type: 'page',
            label: page,
            active: true
          }
        } else {
          return {
            type: 'page',
            label: page,
            active: false
          }
        }
    }
  })
}

export function pageItems (
  currentPage: number,
  pageCount: number,
  pageSlot?: number
): PageItem[] {
  const pages = pagesToShow(currentPage, pageCount, pageSlot)
  const results = mapPagesToPageItems(pages, currentPage)

  // console.info('[feat] ::pageItems results', results);
  return results;
}
