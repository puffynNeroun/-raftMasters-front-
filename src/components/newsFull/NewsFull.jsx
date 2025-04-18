import img from '../../assets/img/Group 2.jpg'

export const NewsFull = () => {
    return (
        <section className='newsFull'>
            <div className="container newsFull-container mx-auto px-3">
                <div className="content-news flex flex-col md:flex-row items-start justify-center gap-10 md:gap-36">
                    <img className="img-news w-full md:max-w-md object-cover" src={img} alt="img"/>
                    <div className='content-block-news w-full md:w-1/2'>
                        <h2 className='uppercase text-4xl sm:text-5xl md:text-6xl text-center md:text-left text-gray-300 mb-8 sm:mb-10 md:mb-11'>
                            Заголовок статьи
                        </h2>
                        <p className="text-gray-300 max-w-full md:max-w-2xl text-lg sm:text-xl font-semibold pb-8 sm:pb-10">
                            Здесь будет ваш текст. Вы можете вставить сюда любую информацию, которую хотите отобразить на
                            странице. Например, описание вашего проекта, информацию о компании, цитаты или любой другой
                            текст. Просто замените этот текст на нужный вам Здесь будет ваш текст. Вы можете вставить сюда любую информацию, которую хотите отобразить на
                            странице. Например, описание вашего проекта, информацию о компании, цитаты или любой другой
                            текст. Просто замените этот текст на нужный вам.
                        </p>
                    </div>
                </div>
                <div className='flex items-start justify-center'>
                    <button
                        className="close-news px-6 py-3 text-base sm:text-lg lg:text-xl cursor-pointer font-semibold hover:text-[#1A1A1A] bg-[#DAAB50] transition ease-in-out duration-300 uppercase">
                        Назад
                    </button>
                </div>
            </div>
        </section>
    );
};


