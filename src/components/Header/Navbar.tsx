const Navbar = () => {
    return (
        <nav className='mx-auto my-0 px-4 py-0 border border-[#eeeeee]'>
                <ul className="relative list-none mx-2 p-4 flex justify-start gap-8 font-bold text-lg">
                    <li>
                        <a href="#">Men</a>
                    </li>
                    <li>
                        <a href="#">Women</a>
                    </li>
                    <li>
                        <a href="#">Brands</a>
                    </li>
                    <li>
                        <a href="#">Notes</a>
                    </li>
                </ul>
        </nav>
    )
}

export default Navbar;