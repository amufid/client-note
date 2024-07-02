import { useState, useEffect } from "react";
import { Flowbite, Navbar, Dropdown, DarkThemeToggle } from "flowbite-react";
import Cookies from "js-cookie";
import { useAuth } from "../provider/authProvider";
import instance from "../lib/instance";
import Person from "./icon/Person";
import { FaEdit } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";

export default function Component() {
  const [user, setUser] = useState('');
  const { accessToken } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await instance.get('/users/:id')
        setUser(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }

    getUser()
  }, [])

  return (
    <Flowbite>
      <Navbar fluid rounded className="bg-slate-200">
        <Navbar.Brand href="/note">
          <img src="/src/assets/logo-note.png" className="mr-3 h-10" alt="Flowbite React Logo" />
          {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span> */}
        </Navbar.Brand>
        <div className="flex md:order-2 gap-2">
          <DarkThemeToggle className="mr-3" />
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              className="z-20"
              label={<Person />}
            // label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.username}</span>
                <span className="block truncate text-sm font-medium">{user.email}</span>
              </Dropdown.Header>
              <Dropdown.Item href="/profile" icon={FaEdit}>Edit profile</Dropdown.Item>
              <Dropdown.Item href="/login" onClick={() => Cookies.remove('accessToken')} icon={SlLogout}>Logout</Dropdown.Item>
            </Dropdown>
          </div>
          <Navbar.Toggle />
        </div>
        {accessToken ? (
          <Navbar.Collapse>
            <Navbar.Link href="/note" >Note</Navbar.Link>
            <Navbar.Link href="/category" >Category</Navbar.Link>
            <Navbar.Link href="/tag" >Tag</Navbar.Link>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse>
            <Navbar.Link href="/login">Login</Navbar.Link>
            <Navbar.Link href="/register" >Register</Navbar.Link>
          </Navbar.Collapse>
        )}
      </Navbar>
    </Flowbite>
  );
}
