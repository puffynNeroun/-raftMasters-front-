import { ContactForm } from './ContactForm';
import { ToastContainer } from 'react-toastify';

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

                    <ContactForm />
                    <ToastContainer />
                </div>
            </div>
        </section>
    );
};
