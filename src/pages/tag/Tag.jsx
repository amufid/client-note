import { useState, useEffect } from 'react'
import instance from '../../lib/instance'
import { Table, Button, Label, Modal, TextInput } from "flowbite-react";
import toast from 'react-hot-toast';
import ModalAddTag from '../../components/tag/ModalAddTag';
import { FiDelete } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { encrypt } from '../../lib/encryptDecrypt';

export default function Tag() {
   const [tags, setTags] = useState([]);
   const [name, setName] = useState('');
   const [id, setId] = useState('');
   const [modalUpdate, setModalUpdate] = useState(false);
   const [modalDelete, setModalDelete] = useState(false);

   const getTags = async () => {
      try {
         const res = await instance.get('/tags');
         setTags(res.data.data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getTags();
   }, [])

   useEffect(() => {
      const getTagById = async () => {
         try {
            const res = await instance.get(`/tags/${id}`)
            setName(res.data.data.name);
         } catch (error) {
            console.log(error);
         }
      }

      getTagById(id)
   }, [id])

   const handleUpdate = async () => {
      try {
         const res = await instance.put(`/tags/${id}`, { name: name })
         console.log(res.data);
         toast.success('Tag updated successfully');
         setModalUpdate(false);
         getTags();
      } catch (error) {
         console.log(error);
      }
   }

   const handleDelete = async () => {
      try {
         await instance.delete(`/tags/${id}`)
         setModalDelete(false);
         toast.success('Tag deleted successfully');
         getTags();
      } catch (error) {
         console.log(error);
      }
   }

   const getId = (e) => {
      setId(e)
      setModalUpdate(true);
   }

   const getIdDelete = (e) => {
      setId(e)
      setModalDelete(true);
   }

   return (
      <div className='bg-gray-100 dark:bg-gray-900 min-h-screen'>
         <h1 className="text-2xl py-5 text-center">List Tags</h1>
         <ModalAddTag refetch={getTags} />
         <div className="overflow-x-auto mx-auto w-[300px] sm:w-[400px] mb-10">
            <Table hoverable>
               <Table.Head>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
               </Table.Head>
               <Table.Body className="divide-y">
                  {tags.map((tag) => (
                     <Table.Row key={tag.id} className="bg-gray-100 dark:bg-gray-800 shadow-md">
                        <Table.Cell><Link to={`/tag/${encrypt(tag.id)}`}>{tag.name}</Link></Table.Cell>
                        <Table.Cell>
                           <div className="flex flex-row">
                              <div className="flex justify-center mr-2">
                                 <Button color='red' size='sm' value={tag.id} onClick={() => getIdDelete(tag.id)}><FiDelete /></Button>
                              </div>
                              <Modal show={modalDelete} size="md"
                                 onClose={() => setModalDelete(false)} popup>
                                 <Modal.Header />
                                 <Modal.Body>
                                    <div className="text-center">
                                       <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                       <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                          Are you sure you want to delete this tag?
                                       </h3>
                                       <div className="flex justify-center gap-4">
                                          <Button color="failure"
                                             onClick={() => handleDelete(tag.id)}>
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
                                 <Button color='blue' size='sm' value={tag.id} onClick={() => getId(tag.id)}><FaRegEdit /></Button>
                              </div>
                              <Modal show={modalUpdate} size="md" onClose={() => setModalUpdate(false)} popup>
                                 <Modal.Header />
                                 <Modal.Body>
                                    <div className="space-y-6">
                                       <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create tag</h3>
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
