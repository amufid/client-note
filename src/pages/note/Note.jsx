import instance from '../../lib/instance'
import { useState, useEffect, useCallback } from 'react'
import { Card, FloatingLabel, Spinner, Dropdown } from "flowbite-react";
import { Link } from 'react-router-dom';
import { convertTime } from '../../lib/convertTime';
import { debounce } from 'lodash';
import Pagination from '../../components/note/Pagination';
import { encrypt } from '../../lib/encryptDecrypt';
import ModalAdd from '../../components/note/ModalAddNote';
import ModalUpdateNote from '../../components/note/ModalUpdateNote';
import ModalDeleteNote from '../../components/note/ModalDeleteNote';
import ModalAddImage from '../../components/note/ModalAddImage';

const fetchNotes = async (search, sortBy, setNotes) => {
   if (!search && !sortBy) {
      search = ''
      sortBy = 'createdAt=desc'
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
   const [search, setSearch] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [loadingPage, setLoadingPage] = useState(true);
   const [sortBy, setSortBy] = useState('');
   const [dropdownSort, setDropdownSort] = useState('');

   const getNotes = useCallback(() => {
      debouncedGetNotes(search, sortBy, setNotes)
   }, [search, sortBy])

   const sortLabel = useCallback(() => {
      if (sortBy === 'createdAt=desc') {
         setDropdownSort('Latest created')
      } else if (sortBy === 'createdAt=asc') {
         setDropdownSort('Oldest created')
      } else if (sortBy === 'updatedAt=desc') {
         setDropdownSort('Latest updated')
      } else if (sortBy === 'updatedAt=asc') {
         setDropdownSort('Oldest updated')
      }
   }, [sortBy])

   useEffect(() => {
      getNotes()
      sortLabel()
      setTimeout(() => {
         setLoadingPage(false);
      }, 500)
   }, [search, sortBy, getNotes, sortLabel])

   const handlePageChangePrev = (page) => {
      setCurrentPage(page);
   };

   const handlePageChangeNext = (page) => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
   };

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
                              <ModalAddImage note={note} refetch={getNotes} />
                           </div>
                           <div className='mr-2'>
                              <ModalUpdateNote note={note} refetch={getNotes} />
                           </div>
                           <div>
                              <ModalDeleteNote note={note} refetch={getNotes} />
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
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChangeNext={handlePageChangeNext} onPageChangePrev={handlePageChangePrev} />
         </div>
      </div>
   )
}
