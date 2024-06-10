import { Flowbite, Button, Navbar, DarkThemeToggle } from "flowbite-react";

export default function Component() {
  return (
    <Flowbite>
      <Navbar fluid rounded className="bg-slate-200">
        <Navbar.Brand href="/">
          <img src="/src/assets/logo-note.png" className="mr-3 h-10" alt="Flowbite React Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-2">
          <DarkThemeToggle className="mr-3" />
          <a href='/login'><Button>Get started</Button></a>
        </div>
      </Navbar>
    </Flowbite>
  );
}
