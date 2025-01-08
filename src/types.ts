
export type todoAction = {
    id: number,
    name: string,
    state:string,
    priority:string,
    purpose?:string
  }

export type TFilter = Record<"State" | "Priority" , string|undefined> 
export type TSort = Record<"Priority" , "high"|"low"|undefined> 