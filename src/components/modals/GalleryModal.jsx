import PropTypes from 'prop-types';

export const GalleryModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
            <div
                className="bg-[#1C245C] w-full max-w-4xl p-6 rounded-lg flex flex-col md:flex-row relative shadow-lg border-4"
                style={{ borderColor: '#DAAB50' }}
            >
                <button
                    className="absolute top-4 right-4 text-2xl cursor-pointer"
                    onClick={onClose}
                    aria-label="Закрыть"
                    style={{ color: '#DAAB50' }}
                >
                    ×
                </button>

                <div className="w-full md:w-1/2 bg-gray-200 aspect-square flex items-center justify-center">
                    {item.mainImage ? (
                        <img
                            src={`http://localhost:5000${item.mainImage}`}
                            alt={item.name}
                            className="object-cover max-h-full max-w-full"
                        />
                    ) : (
                        <div className="text-gray-400 text-2xl">No image</div>
                    )}
                </div>

                <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-8 flex flex-col justify-between text-white">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 tracking-wider break-words">
                            {item.name}
                        </h2>
                        <p className="mb-4 text-sm md:text-base leading-relaxed">
                            {item.description || 'Нет описания'}
                        </p>
                        <p className="text-2xl font-bold" style={{ color: '#DAAB50' }}>
                            {item.price}$
                        </p>
                    </div>
                    <button
                        className="mt-6 py-3 text-center font-bold transition rounded cursor-pointer"
                        style={{
                            backgroundColor: '#DAAB50',
                            color: '#1C245C'
                        }}
                    >
                        МАСТЕР
                    </button>
                </div>
            </div>
        </div>
    );
};

// ✅ PropTypes для ESLint
GalleryModal.propTypes = {
    item: PropTypes.shape({
        mainImage: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    onClose: PropTypes.func.isRequired
};
