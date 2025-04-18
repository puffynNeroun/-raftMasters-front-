import { useState } from 'react';
import img from '../../assets/img/Group 2.jpg';

export const News = () => {
    const [activeTab, setActiveTab] = useState('masters');

    const cardsData = {
        masters: [
            { id: 1, img, title: 'Мастер 1' },
            { id: 2, img, title: 'Мастер 2' },
            { id: 3, img, title: 'Мастер 3' },
        ],
        masterClasses: [
            { id: 4, img, title: 'Мастер-класс 1' },
            { id: 5, img, title: 'Мастер-класс 2' },
        ],
        contests: [
            { id: 6, img, title: 'Конкурс 1' },
            { id: 7, img, title: 'Конкурс 2' },
            { id: 8, img, title: 'Конкурс 3' },
            { id: 9, img, title: 'Конкурс 4' },
        ],
    };

    const renderCards = () => {
        let cards = [];

        if (activeTab === 'masters') cards = cardsData.masters;
        else if (activeTab === 'masterClasses') cards = cardsData.masterClasses;
        else if (activeTab === 'contests') cards = cardsData.contests;

        return cards.map(card => (
            <div key={card.id} className="card flex flex-col max-w-64 md:max-w-xl">
                <img src={card.img} alt="img" />
                <button className="pt-6 pb-6 pl-16 pr-16 text-center text-xl cursor-pointer font-semibold hover:text-[#1A1A1A] bg-[#DAAB50] transition ease-in-out duration-300 uppercase">
                    Читать далее
                </button>
            </div>
        ));
    };

    return (
        <section className="news pt-16 md:pt-24">
            <div className="container mx-auto">
                <h2 className="uppercase text-5xl sm:text-6xl md:text-7xl text-gray-300 text-center mb-11">
                    Новости
                </h2>

                <div className="nav-group flex flex-col md:flex md:flex-row md:flex-wrap gap-6 md:gap-16 items-center justify-center mb-16">
                    <button
                        onClick={() => setActiveTab('masters')}
                        className="pt-6 pb-6 pl-16 pr-16 text-xl cursor-pointer text-[#DAAB50] border-2 border-[#DAAB50] border-solid box-border font-semibold hover:text-[#1A1A1A] hover:bg-[#DAAB50] transition ease-in-out duration-300 uppercase"
                    >
                        Мастера
                    </button>
                    <button
                        onClick={() => setActiveTab('masterClasses')}
                        className="pt-6 pb-6 pl-16 pr-16 text-xl cursor-pointer text-[#DAAB50] border-2 border-[#DAAB50] border-solid box-border font-semibold hover:text-[#1A1A1A] hover:bg-[#DAAB50] transition ease-in-out duration-300 uppercase"
                    >
                        Мастер-классы
                    </button>
                    <button
                        onClick={() => setActiveTab('contests')}
                        className="pt-6 pb-6 pl-16 pr-16 text-xl cursor-pointer text-[#DAAB50] border-2 border-[#DAAB50] border-solid box-border font-semibold hover:text-[#1A1A1A] hover:bg-[#DAAB50] transition ease-in-out duration-300 uppercase"
                    >
                        Конкурсы
                    </button>
                </div>

                <div className="carts-group flex items-center justify-center flex-wrap gap-5">
                    {renderCards()}
                </div>
            </div>
        </section>
    );
};
