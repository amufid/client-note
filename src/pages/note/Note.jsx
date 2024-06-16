import instance from '../../lib/instance'
import { useState, useEffect, useCallback } from 'react'
import { Card, Button, Modal, FileInput, FloatingLabel, Spinner, Dropdown } from "flowbite-react";
import ModalAdd from '../../components/note/ModalAddNote';
import ModalUpdate from '../../components/note/ModalUpdateNote';
import toast from 'react-hot-toast';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FiDelete } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { convertTime } from '../../lib/convertTime';
import { debounce } from 'lodash';
import Pagination from '../../components/note/Pagination';
import { encrypt } from '../../lib/encryptDecrypt';

const fetchNotes = async (search, sortBy, setNotes) => {
   if (!search && !sortBy) {
      search = ''
      sortBy = 'updatedAt=desc'
   }

   try {
      const res = await instance.get(`/notes?search=${search}&${sortBy}`)
      setNotes(res.data.data)
   } catch (error) {
      console.log(error);
   }
}
const debouncedGetNotes = debounce(fetchNotes, 500)

export default function Note() {
   const [notes, setNotes] = useState([])
   const [noteId, setNoteId] = useState('')
   const [openModal, setOpenModal] = useState(false);
   const [modalDelete, setModalDelete] = useState(false);
   const [modalImage, setModalImage] = useState(false);
   const [image, setImage] = useState();
   const [file, setFile] = useState();
   const [search, setSearch] = useState('');
   const [loading, setLoading] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [loadingPage, setLoadingPage] = useState(true);
   const [sortBy, setSortBy] = useState('');
   const [dropdownSort, setDropdownSort] = useState('');

   const getNotes = useCallback(() => {
      debouncedGetNotes(search, sortBy, setNotes)
   }, [search, sortBy])

   useEffect(() => {
      getNotes()
      sortLabel()
      setTimeout(() => {
         setLoadingPage(false);
      }, 500)
   }, [search, sortBy, getNotes])

   const handleDelete = async () => {
      try {
         await instance.delete(`/notes/${noteId}`)

         toast.success('Note deleted successfully')
         setModalDelete(false);
         getNotes();
      } catch (error) {
         console.log(error);
         toast.error('Failed to delete note')
      }
   }

   const handleUpload = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('file_path', image);
      formData.append('note_id', noteId);

      setLoading(true)

      try {
         await instance.post('/attachments', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         })

         setModalImage(false);
         setLoading(false);

         getNotes();
         toast.success('Image added successfully')
      } catch (error) {
         console.log(error);
      }
   }

   const handleImage = (e) => {
      setImage(e.target.files[0])
      setFile(URL.createObjectURL(e.target.files[0]));
   }

   const getId = (e) => {
      setNoteId(e);
      setOpenModal(true)
   }

   const getIdImage = (e) => {
      setNoteId(e);
      setModalImage(true)
   }

   const getIdDelete = (e) => {
      setNoteId(e);
      setModalDelete(true)
   }

   const handlePageChange = (page) => {
      setCurrentPage(page);
   };

   const sortLabel = () => {
      if (sortBy === 'createdAt=desc') {
         setDropdownSort('Latest created')
      } else if (sortBy === 'createdAt=asc') {
         setDropdownSort('Oldest created')
      } else if (sortBy === 'updatedAt=desc') {
         setDropdownSort('Latest updated')
      } else if (sortBy === 'updatedAt=asc') {
         setDropdownSort('Oldest updated')
      }
   }

   const limit = 5;
   const totalPages = Math.ceil(notes.length / limit);
   const indexOfLastNote = currentPage * limit;
   const indexOfFirstNote = indexOfLastNote - limit;
   const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

   if (loadingPage) {
      return (
         <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <Spinner aria-label="Center-aligned spinner example" size='xl' />
         </div>
      )
   }

   return (
      <div className='bg-gray-100 dark:bg-gray-900 min-h-screen'>
         {/* <h1 className='text-2xl sm:text-3xl text-center py-5 text-black dark:text-white'>List notes</h1> */}
         <div className='flex'>
            <div className='flex mx-auto'>
               <div className='flex w-[350px] sm:w-[550px] justify-between py-3 items-center'>
                  <div className='flex flex-col sm:flex-row'>
                     <div className='mr-2 mb-2 sm:mb-0'>
                        <ModalAdd refetch={getNotes} />
                     </div>
                     <div className='mr-2'>
                        <Dropdown label={`${sortBy ? dropdownSort : 'Sort'}`} onChange={() => sortLabel()}>
                           <Dropdown.Item onClick={() => setSortBy()}>Sort</Dropdown.Item>
                           <Dropdown.Divider />
                           <Dropdown.Item onClick={() => setSortBy('createdAt=desc')}>Latest created</Dropdown.Item>
                           <Dropdown.Item onClick={() => setSortBy('createdAt=asc')}>Oldest created</Dropdown.Item>
                           <Dropdown.Item onClick={() => setSortBy('updatedAt=desc')}>Latest updated</Dropdown.Item>
                           <Dropdown.Item onClick={() => setSortBy('updatedAt=asc')}>Oldest updated</Dropdown.Item>
                        </Dropdown>
                     </div>
                  </div>
                  <div>
                     <FloatingLabel variant="outlined" label="Search title" className='w-54' onChange={e => setSearch(e.target.value)} />
                  </div>
               </div>
            </div>
         </div>
         <div className='flex justify-center'>
            <div className='flex flex-col'>
               {currentNotes.map(note => (
                  <Card key={note.id} className="w-[370px] sm:w-[550px] mb-2 mx-5">
                     <div className='flex flex-row justify-between'>
                        <div>
                           <Link to={`/note/${encrypt(note.id)}`}>
                              <h2 className='text-lg sm:text-2xl tracking-tight text-gray-900 dark:text-white hover:dark:text-blue-500 hover:text-blue-400 mr-2'>
                                 {note.title}
                              </h2>
                           </Link>
                        </div>
                        <div className='flex flex-row'>
                           <div className='mr-2'>
                              <Button value={note.id} onClick={() => getIdImage(note.id)}><RiImageAddFill /></Button>
                              <Modal show={modalImage} size="md" onClose={() => setModalImage(false)} popup>
                                 <Modal.Header />
                                 <Modal.Body>
                                    <div className="space-y-6">
                                       <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add image</h3>
                                       <div>
                                          <FileInput id="file-upload-helper-text" onChange={handleImage} helperText="Format : JPEG, PNG and JPG." />
                                       </div>
                                       <div className="flex justify-center">
                                          {file && <img src={file} alt="image" width={200} />}
                                       </div>
                                       <div className="w-full">
                                          <Button onClick={handleUpload} type='submit' >
                                             {loading ? (
                                                <div>
                                                   <Spinner aria-label="Spinner button example" size="sm" />
                                                   <span className="pl-3">Loading...</span>
                                                </div>
                                             ) : 'Save'}
                                          </Button>
                                       </div>
                                    </div>
                                 </Modal.Body>
                              </Modal>
                           </div>
                           <div className='mr-2'>
                              <Button color='green' value={note.id} onClick={() => getId(note.id)}>
                                 <FaRegEdit />
                              </Button>
                              {openModal &&
                                 <ModalUpdate
                                    noteId={noteId}
                                    onCloseModal={() => setOpenModal(false)}
                                    openModal={openModal}
                                    refetch={getNotes}
                                 />}
                           </div>
                           <div>
                              <Button color='red' value={note.id} onClick={() => getIdDelete(note.id)}>
                                 <FiDelete />
                              </Button>
                              <Modal show={modalDelete} size="md"
                                 onClose={() => setModalDelete(false)} popup>
                                 <Modal.Header />
                                 <Modal.Body>
                                    <div className="text-center">
                                       <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                       <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                          Are you sure you want to delete this note?
                                       </h3>
                                       <div className="flex justify-center gap-4">
                                          <Button color="failure"
                                             onClick={() => handleDelete()}>
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
                           </div>
                        </div>
                     </div>
                     <p className='font-normal text-gray-700 dark:text-gray-400'>
                        {note.content}
                     </p>
                     <div className='grid grid-cols-3 justify-center items-center'>
                        {note.attachment.map((note) => (
                           <div key={note.id} className='m-1'>
                              <img src={note.file_path} alt="image" className='w-[150px] h-auto mb-2' />
                           </div>
                        ))}
                     </div>
                     <div className='flex flex-row justify-between'>
                        <div className='mr-2'>
                           <p className='font-normal text-gray-700 dark:text-gray-400'>Written on : </p>
                           <p className='font-normal text-gray-700 dark:text-gray-400'>
                              {convertTime(note.created_at)}
                           </p>
                        </div>
                        <div>
                           {note.note_tags.map((note) => (
                              <div key={note.id} className='mr-2'>
                                 <p className='font-normal text-gray-700 dark:text-gray-400'>
                                    Tag : {note.tag.name}
                                 </p>
                              </div>
                           ))}
                           {note.note_categories.map((note) => (
                              <div key={note.id}>
                                 <p className='font-normal text-gray-700 dark:text-gray-400'>
                                    Category : {note.category.name}
                                 </p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </Card>
               ))}
            </div>
         </div>
         <div className='flex justify-center py-7'>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
         </div>
      </div>
   )
}
