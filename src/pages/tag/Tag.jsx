import { useState, useEffect } from 'react'
import instance from '../../lib/instance'
import { Table } from "flowbite-react";
import ModalAddTag from '../../components/tag/ModalAddTag';
import { Link } from 'react-router-dom';
import { encrypt } from '../../lib/encryptDecrypt';
import ModalUpdate from '../../components/tag/ModalUpdateTag';
import ModalDelete from '../../components/tag/ModalDeleteTag';

export default function Tag() {
   const [tags, setTags] = useState([]);

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
                              <ModalDelete tag={tag} refetch={getTags} />
                              <ModalUpdate tag={tag} refetch={getTags} />
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
