import { Link } from 'react-router-dom'
import logo from '../../assets/icons/logo.png'

export const Header = () => {
    return (
        <header className="mt-5 mb-5">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <img className="bg-blend-multiply inline" src={logo} alt="Логотип" />
                </Link>

                <nav>
                    <ul className="md:flex xl:gap-16 lg:gap-11 md:gap-8 hidden">
                        <li>
                            <Link
                                to="/masters"
                                className="font-semibold xl:text-2xl lg:text-xl text-gray-300 cursor-pointer hover:text-[#DAAB50] transition ease-in-out duration-300"
                            >
                                Каталог мастеров
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/gallery"
                                className="font-semibold xl:text-2xl lg:text-xl text-gray-300 cursor-pointer hover:text-[#DAAB50] transition ease-in-out duration-300"
                            >
                                Изделия
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/news"
                                className="font-semibold xl:text-2xl lg:text-xl text-gray-300 cursor-pointer hover:text-[#DAAB50] transition ease-in-out duration-300"
                            >
                                Новости
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="font-semibold xl:text-2xl lg:text-xl text-gray-300 cursor-pointer hover:text-[#DAAB50] transition ease-in-out duration-300"
                            >
                                Контакты
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="md:flex xl:gap-7 lg:gap-5 md:gap-3 hidden">
                    <a href="#">
                        {/* Первая иконка */}
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="hover:fill-[#DAAB50] transition ease-in-out duration-300" d="..." fill="#F1F1F1" />
                        </svg>
                    </a>
                    <a href="#">
                        {/* Вторая иконка */}
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="hover:fill-[#DAAB50] transition ease-in-out duration-300" d="..." fill="#F1F1F1" />
                        </svg>
                    </a>
                </div>

                <div className="burger-menu block md:hidden">
                    <button className="flex flex-col space-y-1 p-2 gap-1 rounded-md cursor-pointer">
                        <span className="block w-10 h-1 bg-[#DAAB50] rounded-2xl"></span>
                        <span className="block w-10 h-1 bg-[#DAAB50] rounded-2xl"></span>
                        <span className="block w-10 h-1 bg-[#DAAB50] rounded-2xl"></span>
                    </button>
                </div>
            </div>
        </header>
    )
}
