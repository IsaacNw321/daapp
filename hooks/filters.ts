import { useContext } from "react"
import { FiltersContext } from "@/context/filters"


export const FilterUsers = (users : any ) => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("filteredUsers must be used within a FiltersProvider");
  }
  const {filters} = context
  return users.filter(user  => {
    return filters.role === 'all' || filters.role === user.type
  })
}

