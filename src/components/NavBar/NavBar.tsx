function NavBar({children}: {children: React.ReactNode}) {
  return (
    <nav className="relative z-50 h-[4.5rem] flex justify-center items-center sticky top-0 bg-white shadow-custom">
        { children }
    </nav>
  )
}

export default NavBar
