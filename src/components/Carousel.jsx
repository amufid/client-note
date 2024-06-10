import { Carousel } from "flowbite-react";

export default function Component() {
   return (
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mx-5 sm:mx-60 my-5 border rounded-sm animate-slidein">
         <Carousel>
            <img className="w-[750px]" src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="..." />
            <img className="w-[750px]" src="https://images.unsplash.com/photo-1531256379416-9f000e90aacc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="..." />
            <img className="w-[750px]" src="https://images.unsplash.com/photo-1598379232411-d670d6872193?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="..." />
         </Carousel>
      </div>
   );
}