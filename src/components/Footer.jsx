import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function Component() {
   return (
      // <Footer container>
      //    <div className="w-full">
      //       <div className="flex flex-col w-full justify-between">
      //          <div className="flex justify-start">
      //             <img
      //                href="/"
      //                src="/src/assets/logo-note.png"
      //                alt="Flowbite Logo"
      //                width='200px'
      //                className="py-3"
      //             // name="My Note"
      //             />
      //          </div>
      //          <div className="flex sm:flex-row justify-center">
      //             <div className="mr-10">
      //                <Footer.Title title="about" />
      //                <Footer.LinkGroup col>
      //                   <Footer.Link href="/">Dashboard</Footer.Link>
      //                   <Footer.Link href="/register">Register</Footer.Link>
      //                </Footer.LinkGroup>
      //             </div>
      //             <div>
      //                <Footer.Title title="Legal" />
      //                <Footer.LinkGroup col>
      //                   <Footer.Link href="#">Privacy Policy</Footer.Link>
      //                   <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
      //                </Footer.LinkGroup>
      //             </div>
      //             <div className="flex items-center justify-center flex-col">
      //                <Footer.LinkGroup row>
      //                   <Footer.Icon href="#" icon={BsFacebook} />
      //                   <Footer.Icon href="#" icon={BsInstagram} />
      //                   <Footer.Icon href="#" icon={BsTwitter} />
      //                   <Footer.Icon href="#" icon={BsGithub} />
      //                </Footer.LinkGroup>
      //             </div>
      //          </div>
      //          <Footer.Divider />
      //          <Footer.Copyright href="#" by="My Note" year={2024} />
      //       </div>
      //    </div>
      // </Footer >
      <Footer container>
         <div className="w-full text-center">
            <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between ">
               <div className="mb-5 sm:mb-3">
                  <img
                     href="/"
                     src="/src/assets/logo-note.png"
                     alt="Flowbite Logo"
                     width='200px'
                  />
               </div>
               <div className=" justify-center mb-5 sm:mb-3">
                  <Footer.LinkGroup row>
                     <Footer.Link href="#">About</Footer.Link>
                     <Footer.Link href="#">Privacy Policy</Footer.Link>
                     <Footer.Link href="#">Licensing</Footer.Link>
                     <Footer.Link href="#">Contact</Footer.Link>
                  </Footer.LinkGroup>
               </div>
               <div className="w-auto flex flex-col justify-end items-center sm:justify-center mb-3">
                  <h2 className="text-md mb-2">Social media</h2>
                  <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                     <Footer.Icon href="#" icon={BsFacebook} />
                     <Footer.Icon href="#" icon={BsInstagram} />
                     <Footer.Icon href="#" icon={BsTwitter} />
                     <Footer.Icon href="#" icon={BsGithub} />
                  </div>
               </div>
            </div>
            <Footer.Divider />
            <Footer.Copyright href="#" by="My Note™" year={2024} />
         </div>
      </Footer>
   );
}
