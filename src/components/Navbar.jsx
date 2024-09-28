import { useState, useEffect } from "react";
import { Flowbite, Navbar, Dropdown, DarkThemeToggle } from "flowbite-react";
import Person from "./icon/Person";
import { FaEdit } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";
import { useAuth } from "../provider/useAuth";
import PropTypes from 'prop-types';

export default function NavbarPage(props) {
  const { clearToken } = useAuth();
  const [pathname, setPathname] = useState('');
  const { user } = useAuth()

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [pathname])

  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    return <>{props.children}</>
  }

  const handleLogout = () => {
    window.location.href = '/login'
    clearToken();
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <Flowbite>
        <Navbar fluid rounded className="bg-slate-200">
          <Navbar.Brand href="/note">
            <img src="/src/assets/logo-note.png" className="mr-3 h-10" alt="Flowbite React Logo" />
          </Navbar.Brand>
          <div className="flex md:order-2 gap-2">
            <DarkThemeToggle className="mr-3" />
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline
                className="z-20"
                label={<Person />} >
                <Dropdown.Header>
                  <span className="block text-sm">{user}</span>
                  {/* <span className="block truncate text-sm font-medium">{user.email}</span> */}
                </Dropdown.Header>
                <Dropdown.Item href="/profile" icon={FaEdit}>Edit profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout} icon={SlLogout}>Logout</Dropdown.Item>
              </Dropdown>
            </div>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="/note" >Note</Navbar.Link>
            <Navbar.Link href="/category" >Category</Navbar.Link>
            <Navbar.Link href="/tag" >Tag</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </Flowbite>
      <div className="w-full h-full">
        {props.children}
      </div>
    </div>
  );
}

NavbarPage.propTypes = {
  children: PropTypes.node
}
