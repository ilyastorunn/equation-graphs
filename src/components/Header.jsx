export default function Header() {
  return (
    <>
      <header className="w-full h-[6vh] bg-lucky-point-900 text-lucky-point-50 flex items-center justify-between px-[5vw]">
        <h1 className="text-xl font-bold uppercase">Graphing calculator</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
