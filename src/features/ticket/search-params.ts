export type SearchParams = {
  search: string | string[] | undefined
  sort: string | string[] | undefined
}

// these are the search options usually:
// ?search=hello (string)
// ?search[]=hello&search[]=world (array)
// ?search (undefined)
