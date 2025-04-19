import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { sendContactEmail } from '../../services/sendEmailService.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Валидация
const nameRegex = /^[A-Za-zА-Яа-яёЁ\s'-]+$/;

const schema = yup.object().shape({
    first_name: yup
        .string()
        .matches(nameRegex, 'Имя может содержать только буквы')
        .min(2, 'Имя слишком короткое')
        .max(30, 'Имя слишком длинное')
        .required('Введите имя'),

    last_name: yup
        .string()
        .matches(nameRegex, 'Фамилия может содержать только буквы')
        .min(2, 'Фамилия слишком короткая')
        .max(30, 'Фамилия слишком длинная')
        .required('Введите фамилию'),

    email: yup
        .string()
        .email('Некорректный email')
        .required('Введите email'),

    phone: yup
        .string()
        .matches(/^[0-9+\-()\s]*$/, 'Некорректный номер'),

    message: yup
        .string()
        .min(5, 'Сообщение слишком короткое')
        .max(1000, 'Сообщение слишком длинное')
        .required('Введите сообщение'),
});


export const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data, e) => {
        try {
            await sendContactEmail(e.target);
            toast.success('Сообщение отправлено!');
            reset();
        } catch (err) {
            console.error(err);
            toast.error('Ошибка при отправке. Попробуйте позже.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl">
            <div className="mb-8">
                <p className="text-2xl sm:text-4xl font-semibold pb-4">Полное имя</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <input {...register('first_name')} placeholder="Имя"
                               className="p-3 bg-[#DAAB50] text-[#1A1A1A] border-2 border-[#DAAB50] w-full" />
                        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
                    </div>
                    <div>
                        <input {...register('last_name')} placeholder="Фамилия"
                               className="p-3 bg-[#DAAB50] text-[#1A1A1A] border-2 border-[#DAAB50] w-full" />
                        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <p className="text-2xl sm:text-4xl font-semibold pb-4">Контакты</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <input {...register('email')} placeholder="Email"
                               className="p-3 bg-[#DAAB50] text-[#1A1A1A] border-2 border-[#DAAB50] w-full" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <input {...register('phone')} placeholder="Телефон"
                               className="p-3 bg-[#DAAB50] text-[#1A1A1A] border-2 border-[#DAAB50] w-full" />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <p className="text-2xl sm:text-4xl font-semibold pb-4">Вопросы / комментарии</p>
                <div>
                    <textarea {...register('message')} placeholder="Сообщение"
                              className="p-3 bg-[#DAAB50] text-[#1A1A1A] border-2 border-[#DAAB50] w-full h-40" />
                    {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                </div>
            </div>

            <button type="submit" disabled={isSubmitting}
                    className="bg-[#DAAB50] text-[#1A1A1A] p-4 w-full font-bold border-2 border-[#DAAB50] hover:bg-[#c69e42] transition">
                {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
        </form>
    );
};
