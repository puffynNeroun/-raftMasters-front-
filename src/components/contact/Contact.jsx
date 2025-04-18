export const Contact = () => {
    return (
        <section className="contact pt-16 md:pt-24">
            <div className="container mx-auto px-4">
                <div className="text-white flex flex-col items-center p-4 md:p-8">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-wider text-center">
                        КОНТАКТЫ
                    </h1>
                    <p className="text-lg sm:text-xl mb-8 text-center">
                        Если у вас есть вопрос, заполните эту контактную форму. Спасибо!
                    </p>

                    <form className="w-full max-w-3xl">
                        <div className="mb-8">
                            <p className="text-2xl sm:text-4xl font-semibold pb-4">Полное имя</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Имя"
                                    className="p-3 bg-[#DAAB50] text-[#1A1A1A] border-2 border-[#DAAB50]"
                                />
                                <input
                                    type="text"
                                    placeholder="Фамилия"
                                    className="p-3 bg-[#DAAB50] text-[#1A1A1A] border-2 border-[#DAAB50]"
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="text-2xl sm:text-4xl font-semibold pb-4">Контакты</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="p-3 bg-[#DAAB50] text-[#1A1A1A] border-2 border-[#DAAB50]"
                                />
                                <input
                                    type="tel"
                                    placeholder="Телефон"
                                    className="p-3 bg-[#DAAB50] text-[#1A1A1A] border-2 border-[#DAAB50]"
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="text-2xl sm:text-4xl font-semibold pb-4">Вопросы / комментарии</p>
                            <textarea
                                placeholder="Сообщение"
                                className="p-3 bg-[#DAAB50] text-[#1A1A1A] w-full h-40 border-2 border-[#DAAB50]"
                            ></textarea>
                        </div>

                        <button className="bg-[#DAAB50] text-[#1A1A1A] p-4 w-full font-bold border-2 border-[#DAAB50] hover:bg-[#c69e42] transition">
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
