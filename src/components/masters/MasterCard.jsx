import PropTypes from 'prop-types'
import userPlaceholder from '../../assets/img/users.jpg'

export const MasterCard = ({ master }) => {
    return (
        <div className="card bg-white overflow-hidden shadow-lg flex flex-col h-[500px]">
            {/* БОЛЬШАЯ КАРТИНКА */}
            <div className="flex justify-center items-center h-[320px] overflow-hidden bg-gray-100">
                <img
                    src={master.photo ? `http://localhost:5000${master.photo}` : userPlaceholder}
                    alt={master.fullName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* КОМПАКТНЫЙ КОНТЕНТ */}
            <div className="bg-[#DAAB50] p-3 flex flex-col justify-between flex-grow">
                <div className="flex flex-row justify-between items-start gap-4 mb-3">
                    <div className="flex flex-col gap-1">
                        <div>
                            <p className="text-base font-bold leading-5">{master.fullName}</p>
                            <p className="text-xs text-gray-800">{master.contactEmail}</p>
                        </div>

                        <div className="flex gap-2 mt-1">
                            {master.socialLinks?.split(',').map((link, idx) => (
                                <a key={idx} href={link.trim()} target="_blank" rel="noopener noreferrer">
                                    <div className="w-3.5 h-3.5 bg-black rounded-full" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ПРАВАЯ КОЛОНКА */}
                    <p className="text-xs text-right text-gray-900 max-w-[130px] leading-snug line-clamp-3">
                        {master.shortDescription}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <button className="bg-black text-white px-3 py-1.5 uppercase text-xs hover:opacity-80">
                        Подробнее
                    </button>
                    <div className="flex gap-3 text-black font-semibold text-xs uppercase">
                        <span>{master.category?.name}</span>
                        <span>{master.region?.name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

MasterCard.propTypes = {
    master: PropTypes.shape({
        id: PropTypes.number,
        photo: PropTypes.string,
        fullName: PropTypes.string.isRequired,
        contactEmail: PropTypes.string,
        socialLinks: PropTypes.string,
        shortDescription: PropTypes.string,
        category: PropTypes.shape({
            name: PropTypes.string
        }),
        region: PropTypes.shape({
            name: PropTypes.string
        }),
    }).isRequired,
}
