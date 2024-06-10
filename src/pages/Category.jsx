import { useState, useEffect } from "react";
import instance from "../lib/instance";
import { Table, Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import ModalAddCategory from "../components/category/ModalAddCategory";
import toast from "react-hot-toast";
import { FiDelete } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { encrypt } from "../lib/encryptDecrypt";

export default function Category() {
   const [categories, setCategories] = useState([]);
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [id, setId] = useState('');
   const [modalUpdate, setModalUpdate] = useState(false);
   const [modalDelete, setModalDelete] = useState(false);

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

   useEffect(() => {
      const getCategoryById = async () => {
         try {
            const res = await instance.get(`/categories/${id}`)
            setName(res.data.data.name)
            setDescription(res.data.data.description)
         } catch (error) {
            console.log(error);
         }
      }

      getCategoryById(id)
   }, [id])

   const handleUpdate = async (e) => {
      e.preventDefault();
      try {
         await instance.put(`/categories/${id}`, {
            name: name,
            description: description
         })

         setModalUpdate(false);
         toast.success('Category updated successfully');
         getCategories();
      } catch (error) {
         console.log(error);
      }
   }

   const handleDelete = async () => {
      try {
         await instance.delete(`/categories/${id}`)

         toast.success('Category deleted successfully');
         getCategories();
         setModalDelete(false);
      } catch (error) {
         console.log(error);
      }
   }

   const getId = (e) => {
      setId(e);
      setModalUpdate(true);
   }

   const getIdDelete = (e) => {
      setId(e);
      setModalDelete(true);
   }

   return (
      <div className='bg-gray-100 dark:bg-gray-900 min-h-screen'>
         <h1 className="text-2xl py-5 text-center text-black dark:text-white">List Categories</h1>
         <ModalAddCategory refetch={getCategories} />
         <div className="overflow-x-auto mx-auto w-[400px] sm:w-[500px] pb-10 shadow-sm">
            <Table hoverable>
               <Table.Head>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Description</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
               </Table.Head>
               <Table.Body className="divide-y">
                  {categories.map((category) => (
                     <Table.Row key={category.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell><Link to={`/category/${encrypt(category.id)}`} className="hover:underline hover:text-blue-400">{category.name}</Link></Table.Cell>
                        <Table.Cell>{category.description}</Table.Cell>
                        <Table.Cell>
                           <div className="flex flex-row">
                              <div className="flex justify-center mr-2">
                                 <Button color='red' size='sm' value={category.id} onClick={() => getIdDelete(category.id)}><FiDelete /></Button>
                              </div>
                              <Modal show={modalDelete} size="md"
                                 onClose={() => setModalDelete(false)} popup>
                                 <Modal.Header />
                                 <Modal.Body>
                                    <div className="text-center">
                                       <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                       <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                          Are you sure you want to delete this category?
                                       </h3>
                                       <div className="flex justify-center gap-4">
                                          <Button color="failure"
                                             onClick={() => handleDelete(category.id)}>
                                             {"Yes, I'm sure"}
                                          </Button>
                                          <Button color="gray"
                                             onClick={() => setModalDelete(false)}>
                                             No, cancel
                                          </Button>
                                       </div>
                                    </div>
                                 </Modal.Body>
                              </Modal>
                              <div className="flex justify-center">
                                 <Button color='blue' size='sm' value={category.id} onClick={() => getId(category.id)}><FaRegEdit /></Button>
                              </div>
                              <Modal show={modalUpdate} size="md" onClose={() => setModalUpdate(false)} popup>
                                 <Modal.Header />
                                 <Modal.Body>
                                    <div className="space-y-6">
                                       <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create category</h3>
                                       <div>
                                          <div className="mb-2 block">
                                             <Label htmlFor="name" value="Nama" />
                                          </div>
                                          <TextInput
                                             name="name"
                                             placeholder="Nama"
                                             value={name}
                                             onChange={(e) => setName(e.target.value)}
                                             required
                                          />
                                       </div>
                                       <div className="max-w-md">
                                          <div className="mb-2 block">
                                             <Label htmlFor="description" value="Deskripsi" />
                                          </div>
                                          <Textarea
                                             type="text"
                                             placeholder="Deskripsi"
                                             rows={4}
                                             value={description}
                                             onChange={(e) => setDescription(e.target.value)}
                                             required
                                          />
                                       </div>
                                       <div className="w-full">
                                          <Button onClick={handleUpdate} type='submit'>Save</Button>
                                       </div>
                                    </div>
                                 </Modal.Body>
                              </Modal>
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
