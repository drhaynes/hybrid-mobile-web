import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <header
            className="sticky top-0 z-10 w-full bg-white shadow-md py-4">
            <div className="container mx-auto px-4 flex items-center">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/next.svg"
                        alt="Logo"
                        width={120}
                        height={40}
                        priority
                    />
                </Link>
                <nav>
                    <ul className="px-4 pt-4 flex flex-wrap space-x-4">
                        <li>
                            <Link
                                href="/about"
                                className="text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;