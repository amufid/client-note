import instance from "../../lib/instance";
import PropTypes from 'prop-types';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { Button, Modal, FileInput, Spinner } from "flowbite-react";
import { RiImageAddFill } from "react-icons/ri";

ModalAddImage.propTypes = {
   note: PropTypes.object,
   refetch: PropTypes.func
}

export default function ModalAddImage({ note, refetch }) {
   const [modal, setModal] = useState(false);
   const [image, setImage] = useState();
   const [file, setFile] = useState();
   const [loading, setLoading] = useState(false);

   const handleUpload = async (e) => {
      e.preventDefault();

      if (!image) {
         return toast.error('Please select an image');
      }

      const formData = new FormData();
      formData.append('file_path', image);
      formData.append('note_id', note.id);

      setLoading(true)

      try {
         await instance.post('/attachments', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         })

         setModal(false);
         toast.success('Image added successfully')
         refetch();
      } catch (error) {
         toast.error('Something went wrong')
      } finally {
         setLoading(false);
      }
   }

   const handleImage = (e) => {
      setImage(e.target.files[0])
      setFile(URL.createObjectURL(e.target.files[0]));
   }

   return (
      <>
         <Button color='green' value={note.id} onClick={() => setModal(true)} className="w-10 h-10 mr-2 flex items-center">
            <RiImageAddFill />
         </Button>
         <Modal show={modal} size="md" onClose={() => setModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
               <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add image</h3>
                  <div>
                     <FileInput id="file-upload-helper-text" onChange={handleImage} helperText="Format : JPEG, PNG and JPG." required />
                  </div>
                  <div className="flex justify-center">
                     {file && <img src={file} alt="image" width={200} />}
                  </div>
                  <div className="w-full">
                     {loading ? (
                        <Button disabled>
                           <div>
                              <Spinner aria-label="Spinner button example" size="sm" />
                              <span className="pl-3">Saving...</span>
                           </div>
                        </Button>
                     ) : (
                        <Button onClick={handleUpload} type='submit' >
                           Save
                        </Button>
                     )}
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   )
}
