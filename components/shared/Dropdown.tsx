import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"

import { ICategory } from "@/lib/database/models/category.model"
import { startTransition, useEffect, useState } from "react"
import { Input } from "../ui/input"

import { createCategory, getAllCategories } from "@/lib/actions/category.actions"

type DropdownProps = {
  value?:string,
  onChangeHandler?:() => void
}

const Dropdown = ({value, onChangeHandler}: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCategory, setNewCategory] = useState("")

  
  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim()
    })
      .then((category) => {
        setCategories((prevState) => [...prevState, category])
      })
  }

  useEffect(()=>{
    const getCategories = async()=>{
      const categoriesList = await getAllCategories()
      categoriesList && setCategories(categoriesList as ICategory[])
    }

    getCategories()
  },[])
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
       {
        categories.length > 0 && categories.map((e)=>(
          <SelectItem key={e._id} value={e._id} className="select-item p-regular-14">{e.name}</SelectItem>
        ))
       }
       <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 focus:text-primary-500 hover:bg-primary-50">Add new category</AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input className="input-field mt-3" type="text" placeholder="Category name" onChange={(e)=> setNewCategory(e.target.value)}/>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </SelectContent>
    </Select>

  )
}

export default Dropdown