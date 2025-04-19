import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsById } from '../../store/slices/newsSlice';
import { useParams, useNavigate } from 'react-router-dom';

export const NewsFull = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { selectedNews, loading, error } = useSelector(state => state.news);

    useEffect(() => {
        dispatch(fetchNewsById(id));
    }, [dispatch, id]);

    if (loading) return <p className="text-white text-xl text-center">Загрузка...</p>;
    if (error) return <p className="text-red-500 text-xl text-center">{error}</p>;
    if (!selectedNews) return null;

    return (
        <section className="newsFull">
            <div className="container newsFull-container mx-auto px-3">
                <div className="content-news flex flex-col md:flex-row items-start justify-center gap-10 md:gap-36">
                    <img
                        className="img-news w-full md:max-w-md object-cover"
                        src={
                            selectedNews.image
                                ? `http://localhost:5000${selectedNews.image}`
                                : 'https://via.placeholder.com/500x400?text=News'
                        }
                        alt={selectedNews.title}
                    />
                    <div className="content-block-news w-full md:w-1/2">
                        <h2 className="uppercase text-4xl sm:text-5xl md:text-6xl text-center md:text-left text-gray-300 mb-8 sm:mb-10 md:mb-11">
                            {selectedNews.title}
                        </h2>
                        <p className="text-gray-300 max-w-full md:max-w-2xl text-lg sm:text-xl font-semibold pb-8 sm:pb-10 whitespace-pre-line">
                            {selectedNews.content}
                        </p>
                        <p className="text-sm text-gray-500">
                            Опубликовано: {new Date(selectedNews.publishedDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="flex items-start justify-center mt-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="close-news px-6 py-3 text-base sm:text-lg lg:text-xl cursor-pointer font-semibold hover:text-[#1A1A1A] bg-[#DAAB50] transition ease-in-out duration-300 uppercase"
                    >
                        Назад
                    </button>
                </div>
            </div>
        </section>
    );
};
