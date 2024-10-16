import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için
import Card from './card_component';

const EpisodeCard = () => {
    const [episodes, setEpisodes] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Arama metni için state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate(); // Yönlendirme için kullanıyoruz

    useEffect(() => {
        fetchAllEpisodes();
    }, []);

    const fetchAllEpisodes = async () => {
        try {
            let allEpisodes = [];
            let page = 1;
            let totalFetchedPages = 1;

            // Tüm sayfaları sırayla çekmek için döngü
            while (page <= totalFetchedPages) {
                const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
                const data = await response.json();
                allEpisodes = [...allEpisodes, ...data.results]; // Tüm bölümleri birleştir
                totalFetchedPages = data.info.pages; // Toplam sayfa sayısını al
                page++;
            }
            setEpisodes(allEpisodes);
            setTotalPages(Math.ceil(allEpisodes.length / 12)); // Her sayfada 12 bölüm göstereceğimiz için toplam sayfa sayısını hesaplıyoruz
        } catch (error) {
            console.error('Error fetching episodes:', error);
        }
    };

    const getCurrentPageEpisodes = () => {
        const startIndex = (currentPage - 1) * 12;
        const endIndex = currentPage * 12;
        return episodes.slice(startIndex, endIndex); // Yalnızca mevcut sayfadaki bölümleri göster
    };

    const filteredEpisodes = getCurrentPageEpisodes().filter((episode) =>
        episode.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCardClick = (episodeId) => {
        // Bölüm tıklandığında ilgili detay sayfasına yönlendir
        navigate(`/episode/${episodeId}`);
    };

    return (
        <div className="full">
            <div className="search">
                <input
                    type="text"
                    placeholder="Search for episode"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="row">
                    {filteredEpisodes.map((episode) => (
                        <div
                            key={episode.id}
                            className="col-md-3"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleCardClick(episode.id)} // Tıklandığında detay sayfasına yönlendir
                        >
                            <Card
                                imageUrl={"/images/episode.jpg"}
                                title={`${episode.episode}`}
                                content={episode.name}
                            />
                        </div>
                    ))}
                </div>
                <div className="next-button">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EpisodeCard;
