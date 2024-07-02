import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import instance from "../../lib/instance";
import PropTypes from 'prop-types';
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ModalUpdate({ note, refetch }) {
   const [title, setTitle] = useState(note.title);
   const [content, setContent] = useState(note.content);
   const [modal, setModal] = useState(false);
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!title || !content) {
         return toast.error('Title and content cannot be empty!');
      }

      setLoading(true);

      try {
         await instance.put(`/notes/${note.id}`, {
            title: title,
            content: content
         })
         setModal(false);
         toast.success('Updated successfully');
         refetch();
      } catch (error) {
         toast.error('Something went wrong!');
      } finally {
         setLoading(false);
      }
   }

   const handleModal = () => {
      setModal(!modal)
   }

   return (
      <>
         <Button color='blue' onClick={handleModal} className="w-10 h-10 mr-2 flex items-center">
            <FaRegEdit />
         </Button>
         <Modal show={modal} size="md" onClose={handleModal} popup>
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
                  {loading ? (
                     <div className="w-full">
                        <Button disabled>Saving...</Button>
                     </div>
                  ) : (
                     <div className="w-full">
                        <Button onClick={handleSubmit} type='submit'>Save</Button>
                     </div>
                  )}
               </div>
            </Modal.Body>
         </Modal>
      </>
   )
}

ModalUpdate.propTypes = {
   note: PropTypes.object,
   refetch: PropTypes.func,
}
