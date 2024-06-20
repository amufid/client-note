import { Button, Label, Modal, TextInput, Textarea, Select, FileInput, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import instance from "../../lib/instance";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';

export default function AddNote({ refetch }) {
   const [openModal, setOpenModal] = useState(false);
   const [categories, setCategories] = useState([]);
   const [tags, setTags] = useState([]);
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [category_id, setCategoryId] = useState('');
   const [tag_id, setTagId] = useState('');
   const [file_path, setFilePath] = useState('');
   const [image, setImage] = useState(null);
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!title || !content) {
         return toast.error('Title and content cannot be empty');
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category_id', category_id);
      formData.append('tag_id', tag_id);
      formData.append('file_path', file_path);

      setLoading(true);

      try {
         await instance.post('/notes', formData)

         setTitle('');
         setContent('');
         setFilePath('');
         setTagId('');
         setCategoryId('');
         setImage(null);
         setOpenModal(false);
         setLoading(false);
         toast.success('Note created successfully');
         refetch();
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      }
   }

   useEffect(() => {
      const getTags = async () => {
         try {
            const res = await instance.get('/tags')
            setTags(res.data.data);
         } catch (error) {
            console.log(error);
         }
      }

      getTags()
   }, [])

   useEffect(() => {
      const getCategories = async () => {
         try {
            const res = await instance.get('/categories')
            setCategories(res.data.data);
         } catch (error) {
            console.log(error);
         }
      }

      getCategories()
   }, [])

   const handleImage = (e) => {
      setFilePath(e.target.files[0])
      setImage(URL.createObjectURL(e.target.files[0]));
   }

   const onCloseModal = () => {
      setOpenModal(false);
   }

   return (
      <>
         <div>
            <Button color='blue' size='md' onClick={() => setOpenModal(true)}>+ Add Note</Button>
         </div>
         <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
               <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create note</h3>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="title" value="Title" />
                     </div>
                     <TextInput
                        id="title"
                        name="title"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                     />
                  </div>
                  <div className="max-w-md">
                     <div className="mb-2 block">
                        <Label htmlFor="content" value="Content" />
                     </div>
                     <Textarea
                        id="content"
                        type="text"
                        placeholder="Content"
                        rows={4}
                        onChange={(e) => setContent(e.target.value)}
                        required
                     />
                  </div>
                  <div className="max-w-md">
                     <h3 className="text-gray-900 dark:text-white">Add image</h3>
                     <div>
                        <FileInput id="file-upload-helper-text" onChange={handleImage} helperText="Format : PNG, JPEG and JPG." />
                     </div>
                     <div className="flex justify-center">
                        {image && <img src={image} alt="image" width={200} />}
                     </div>
                  </div>
                  <div className="max-w-md">
                     <div className="mb-2 block">
                        <Label htmlFor="category" value="Select category" />
                     </div>
                     <Select onChange={(e) => setCategoryId(e.target.value)} id="category" >
                        <option value=''>Pilih kategori</option>
                        {categories.map((category) => (
                           <option key={category.id} value={category.id} >{category.name}</option>
                        ))}
                     </Select>
                  </div>
                  <div className="max-w-md">
                     <div className="mb-2 block">
                        <Label htmlFor="tag" value="Select tag" />
                     </div>
                     <Select onChange={(e) => setTagId(e.target.value)} id="tag" >
                        <option value=''>Pilih tag</option>
                        {tags.map((tag) => (
                           <option key={tag.id} value={tag.id} >{tag.name}</option>
                        ))}
                     </Select>
                  </div>
                  <div className="w-full">
                     {loading ? (
                        <Button>
                           <div>
                              <Spinner aria-label="Spinner button example" size="sm" />
                              <span className="pl-3">Saving...</span>
                           </div>
                        </Button>
                     ) : (
                        <Button onClick={handleSubmit} type='submit' >
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

AddNote.propTypes = {
   refetch: PropTypes.func
}
