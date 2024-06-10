import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState, useEffect } from "react";
import instance from "../../lib/instance";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';

export default function ModalUpdate({ noteId, openModal, onCloseModal, refetch }) {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');

   useEffect(() => {
      const getNoteById = async () => {
         try {
            const res = await instance.get(`/notes/${noteId}`)

            setTitle(res.data.data.title)
            setContent(res.data.data.content)
         } catch (error) {
            console.log(error);
         }
      }

      getNoteById(noteId)
   }, [noteId])

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await instance.put(`/notes/${noteId}`, {
            title: title,
            content: content
         })
         toast.success('Updated successfully');
         refetch();
         onCloseModal();
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      }
   }

   return (
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
         <Modal.Header />
         <Modal.Body>
            <div className="space-y-6">
               <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update note</h3>
               <div>
                  <div className="mb-2 block">
                     <Label htmlFor="title" value="Title" />
                  </div>
                  <TextInput
                     id="title"
                     name="title"
                     placeholder="Title"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     required
                  />
               </div>
               <div>
                  <div className="mb-2 block">
                     <Label htmlFor="content" value="Content" />
                  </div>
                  <Textarea
                     id="content"
                     type="text"
                     placeholder="Content"
                     rows={4}
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     required
                  />
               </div>
               <div className="w-full">
                  <Button onClick={handleSubmit} type='submit'>Save</Button>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   )
}

ModalUpdate.propTypes = {
   noteId: PropTypes.number,
   openModal: PropTypes.bool,
   onCloseModal: PropTypes.func,
   refetch: PropTypes.func
}
