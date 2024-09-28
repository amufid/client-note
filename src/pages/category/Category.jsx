import { useState, useEffect } from "react";
import instance from "../../lib/instance";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import ModalAddCategory from "../../components/category/ModalAddCategory";
import ModalUpdateCategory from "../../components/category/ModalUpdateCategory";
import ModalDeleteCategory from "../../components/category/ModalDeleteCategory";

export default function Category() {
   const [categories, setCategories] = useState([]);

   const getCategories = async () => {
      try {
         const res = await instance.get('/categories');
         setCategories(res.data.data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getCategories()
   }, [])

   return (
      <div className='text-slate-700 dark:text-slate-100'>
         <h1 className="text-2xl py-5 text-center">List Categories</h1>
         <ModalAddCategory refetch={getCategories} />
         <div className="overflow-x-auto mx-auto w-auto sm:w-[500px] pb-10 shadow-sm">
            <Table hoverable>
               <Table.Head>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Description</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
               </Table.Head>
               <Table.Body className="divide-y">
                  {categories.map((category) => (
                     <Table.Row key={category.id} className="bg-slate-100 dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                           <Link to='/detailCategory' state={{ id: category.id }} className="hover:underline hover:text-blue-400">
                              <p className="text-md">{category.name}</p>
                           </Link>
                        </Table.Cell>
                        <Table.Cell><p className="text-md">{category.description}</p></Table.Cell>
                        <Table.Cell>
                           <div className="flex flex-col sm:flex-row">
                              <ModalDeleteCategory category={category} refetch={getCategories} />
                              <ModalUpdateCategory category={category} refetch={getCategories} />
                           </div>
                        </Table.Cell>
                     </Table.Row>
                  ))}
               </Table.Body>
            </Table>
         </div>
      </div>
   )
}
