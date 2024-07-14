import instance from '../../lib/instance'
import { useState, useEffect, useCallback } from 'react'
import { Card, FloatingLabel, Spinner, Dropdown } from "flowbite-react";
import { Link } from 'react-router-dom';
import { convertTime } from '../../lib/convertTime';
import { debounce } from 'lodash';
import Pagination from '../../components/note/Pagination';
import ModalAdd from '../../components/note/ModalAddNote';
import ModalUpdateNote from '../../components/note/ModalUpdateNote';
import ModalDeleteNote from '../../components/note/ModalDeleteNote';
import ModalAddImage from '../../components/note/ModalAddImage';
import { toast } from 'react-toastify';
import { SlOptions } from "react-icons/sl";
import { BsPinAngleFill } from "react-icons/bs";
import { RiUnpinFill } from "react-icons/ri";
import ModalPinNote from '../../components/note/ModalPin';

const fetchNotes = async (search, sortBy, setNotes) => {
   if (!search && !sortBy) {
      search = ''
      sortBy = 'createdAt=desc'
   }

   try {
      const res = await instance.get(`/notes?search=${search}&${sortBy}`)
      setNotes(res.data.data)
   } catch (error) {
      toast.error(error.response.data.message)
   }
}

const debouncedGetNotes = debounce(fetchNotes, 500)

export default function Note() {
   const [notes, setNotes] = useState([])
   const [search, setSearch] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [loading, setLoading] = useState(true);
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
      setLoading(false)
   }, [getNotes, sortLabel])

   const handlePin = async (id, pin) => {
      let newPin;

      if (pin === null) {
         newPin = true
      } else if (pin === true) {
         newPin = false
      } else {
         newPin = true
      }

      try {
         await instance.put(`/notes/${id}`, { isPinned: newPin })
         toast.success('Note updated successful')
         getNotes()
      } catch (error) {
         toast.error('Something went wrong')
      }
   }

   const handlePageChangePrev = (page) => {
      setCurrentPage(page);
   };

   const handlePageChangeNext = (page) => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
   };

   const limit = 10;
   const totalPages = Math.ceil(notes.length / limit);
   const indexOfLastNote = currentPage * limit;
   const indexOfFirstNote = indexOfLastNote - limit;
   const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

   if (loading) {
      return (
         <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <Spinner aria-label="Center-aligned spinner example" size='xl' />
         </div>
      )
   }

   return (
      <>
         <div className='bg-gray-100 dark:bg-gray-900 min-h-screen'>
            <div className='flex'>
               <div className='flex mx-auto'>
                  <div className='flex w-[350px] sm:w-[550px] justify-between py-3 items-center'>
                     <div className='flex flex-col sm:flex-row'>
                        <div className='mr-2 mb-2 sm:mb-0'>
                           <ModalAdd refetch={getNotes} />
                        </div>
                        <div className='mr-2 mb-2'>
                           <Dropdown label={`${sortBy ? dropdownSort : 'Sort'}`} onChange={() => sortLabel()}>
                              <Dropdown.Item onClick={() => setSortBy()}>Sort</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item onClick={() => setSortBy('createdAt=desc')}>Latest created</Dropdown.Item>
                              <Dropdown.Item onClick={() => setSortBy('createdAt=asc')}>Oldest created</Dropdown.Item>
                              <Dropdown.Item onClick={() => setSortBy('updatedAt=desc')}>Latest updated</Dropdown.Item>
                              <Dropdown.Item onClick={() => setSortBy('updatedAt=asc')}>Oldest updated</Dropdown.Item>
                           </Dropdown>
                        </div>
                        <div>
                           <ModalPinNote />
                        </div>
                     </div>
                     <div>
                        <FloatingLabel variant="outlined" label="Search title" className='w-54' onChange={e => setSearch(e.target.value)} />
                     </div>
                  </div>
               </div>
            </div>
            <div className='flex justify-center dark:text-slate-300 text-slate-700 '>
               <div className='flex flex-col'>
                  {currentNotes.map(note => (
                     <Card key={note.id} className="w-[370px] sm:w-[550px] mb-1 sm:mb-3 mx-5">
                        <div className='flex flex-row justify-between'>
                           <div className='flex flex-col'>
                              <Link to='/detailNote' state={{ id: note.id }}>
                                 <h2 className='text-lg sm:text-xl tracking-tight hover:dark:text-blue-500 hover:text-blue-400 mr-2'>
                                    {note.title}
                                 </h2>
                              </Link>
                              <div className='mt-2'>
                                 <p className='text-xs'>
                                    {convertTime(note.created_at)}
                                 </p>
                              </div>
                           </div>
                           <div className='flex flex-row'>
                              <div className='flex flex-row mr-2'>
                                 <ModalAddImage note={note} refetch={getNotes} />
                                 <ModalUpdateNote note={note} refetch={getNotes} />
                                 <ModalDeleteNote note={note} refetch={getNotes} />
                              </div>
                              <Dropdown
                                 renderTrigger={() =>
                                    <span className='hover:text-blue-500 flex mt-3'>
                                       <SlOptions />
                                    </span>}>
                                 <Dropdown.Item>
                                    <button
                                       value={note.isPinned}
                                       onClick={() => handlePin(note.id, note.isPinned)} >
                                       {note.isPinned === null || note.isPinned === false ? (
                                          <p className='w-full flex flex-row'><BsPinAngleFill /><span className='ml-3'>Pin note</span></p>
                                       ) : (
                                          <p className='w-full flex flex-row'><RiUnpinFill /><span className='ml-3'>Unpin note</span></p>
                                       )}
                                    </button>
                                 </Dropdown.Item>
                              </Dropdown>
                           </div>
                        </div>
                        <pre className='responsive-pre text-sm'>
                           {note.content}
                        </pre>
                        <Link to='/detailNote' state={{ id: note.id }}>
                           <div className='grid grid-cols-3 justify-center items-center'>
                              {note.attachment.map((note) => (
                                 <div key={note.id} className='m-1'>
                                    <img src={note.file_path} alt="image" className='w-[150px] h-auto mb-2' />
                                 </div>
                              ))}
                           </div>
                        </Link>
                        <div className='flex flex-row justify-between'>
                           <div>
                              {note.note_tags.map((note) => (
                                 <div key={note.id} className='mr-2'>
                                    <p className='text-xs'>
                                       Tag : {note.tag.name}
                                    </p>
                                 </div>
                              ))}
                              {note.note_categories.map((note) => (
                                 <div key={note.id}>
                                    <p className='text-xs'>
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
               {notes.length > 5 && (
                  <Pagination
                     currentPage={currentPage}
                     totalPages={totalPages}
                     onPageChangeNext={handlePageChangeNext}
                     onPageChangePrev={handlePageChangePrev}
                  />
               )}
            </div>
         </div>
      </>
   )
}
