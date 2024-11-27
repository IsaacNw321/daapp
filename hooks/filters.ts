import { useContext } from "react"
import { FiltersContext } from "@/context/filters"
import { User } from "@/app/types";


export const FilterUsers = (users : User[] ) => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("filteredUsers must be used within a FiltersProvider");
  }
  const {filters} = context
  return users.filter((user : User)  => {
    return filters.role === 'all' || filters.role === user.userRole
  })
}

