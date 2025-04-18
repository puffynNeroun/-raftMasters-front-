import './welcome.css'
import logoWelcome from '../../assets/icons/logo-welcome.png'

export const Welcome = () => {
    return (
        <section className="welcome">
            <div className="container mx-auto p-3 flex items-center justify-center flex-col">
                <h1 className="text-5xl leading-15 sm:text-6xl md:text-7xl lg:text-8xl text-center text-gray-300 pb-20 pt-16 md:pt-32 uppercase">Название проекта</h1>
                <img className="mb-20" src={logoWelcome} alt="Логотип"/>
                <p className="text-gray-300 text-center max-w-lg text-xl md:max-w-2xl font-semibold pb-10 md:pb-32 md:text-2xl">Здесь будет ваш текст.
                    Вы можете вставить сюда любую информацию, которую хотите отобразить на странице. Например, описание
                    вашего проекта, информацию о компании, цитаты или любой другой текст. Просто замените этот текст на
                    нужный вам.</p>
            </div>
        </section>
    );
};
