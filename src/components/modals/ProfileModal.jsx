import PropTypes from 'prop-types'

export const ProfileModal = ({ master, achievements, onClose }) => {
    const photoUrl = master.photo ? `http://localhost:5000${master.photo}` : '/default-user.jpg'

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 py-6">
            <div className="bg-[#1C245C] max-w-6xl w-full rounded-xl p-6 md:p-8 border-4 border-[#DAAB50] relative flex flex-col md:flex-row gap-8 shadow-lg">

                <button
                    className="cursor-pointer absolute top-4 right-4 text-3xl text-[#DAAB50] hover:scale-110 transition"
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    &times;
                </button>

                {/* Левая часть: Фотография мастера */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <img
                        src={photoUrl}
                        alt={master.fullName}
                        className="rounded-lg w-full max-h-[500px] object-cover"
                    />
                </div>

                {/* Правая часть: Контент */}
                <div className="w-full md:w-1/2 flex flex-col justify-between text-white">
                    <div>
                        <p className="uppercase text-xs tracking-widest text-gray-400">
                            {master.category?.name || 'Не указано'}
                        </p>
                        <p className="uppercase text-xs tracking-widest text-gray-400 mb-4">
                            {master.region?.name || 'Регион не указан'}
                        </p>

                        <h2 className="text-4xl font-bold tracking-widest mb-4 leading-tight">
                            {master.fullName}
                        </h2>

                        <p className="text-sm text-gray-300 leading-relaxed">
                            {master.biography || master.shortDescription || 'Нет описания'}
                        </p>

                        {achievements?.length > 0 && (
                            <ul className="mt-4 list-disc pl-5 text-sm text-[#DAAB50] space-y-1">
                                {achievements.map((ach, idx) => (
                                    <li key={idx}>{ach.title}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row gap-4">
                        <button className="cursor-pointer bg-[#DAAB50] text-[#1C245C] px-6 py-3 font-bold text-sm rounded hover:bg-[#c99b3d] transition">
                            Написать мастеру
                        </button>
                        <div className="cursor-pointer bg-gray-200 px-6 py-3 rounded text-sm font-medium text-[#1C245C]">
                            {master.contactPhone || '+7 000 000 00 00'}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-[#1C245C] font-medium">
                            {master.contactEmail || 'hello@example.com'}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        {master.socialLinks?.split(',').map((link, i) => (
                            <a key={i} href={link.trim()} target="_blank" rel="noreferrer">
                                <div className="w-5 h-5 rounded-full bg-gray-300 hover:bg-[#DAAB50]" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

ProfileModal.propTypes = {
    master: PropTypes.object.isRequired,
    achievements: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
}