import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CharacterCard from './character_card_component';
import "../CSS/episode_detail.css";


const EpisodeDetail = () => {
    const { id } = useParams(); // Bölüm ID'sini URL'den alıyoruz
    const [episode, setEpisode] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState();

    useEffect(() => {
        fetchEpisodeDetails();
    }, [id]);

    const fetchEpisodeDetails = async () => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
            const data = await response.json();
            setEpisode(data);
            fetchCharacters(data.characters);
        } catch (error) {
            console.error('Error fetching episode details:', error);
        }
    };

    const fetchCharacters = async (characterUrls) => {
        try {
            const characterPromises = characterUrls.map(async (url) => {
                const response = await fetch(url);
                return response.json();
            });
            const charactersData = await Promise.all(characterPromises);
            setCharacters(charactersData);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    const fetchCharacterDetails = async (characterId) => {
        try {
            const characterResponse = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
            const characterData = await characterResponse.json();
            setSelectedCharacter(characterData);

            const episodeDetailsPromises = characterData.episode.map(async (episodeUrl) => {
                const characterIdFromUrl = episodeUrl.split('/').pop();
                const episodeResponse = await fetch(`https://rickandmortyapi.com/api/episode/${characterIdFromUrl}`);
                return episodeResponse.json();
            });

            const episodeDetailsData = await Promise.all(episodeDetailsPromises);
            console.log('Oynadığı Bölümler:', episodeDetailsData);
        } catch (error) {
            console.error('Error fetching character details:', error);
        }
    };

    const handleCharacterClick = async (characterId) => {
        fetchCharacterDetails(characterId);
    };

    if (!episode) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-3">
                    <h2>Episode Details</h2>
                    <CharacterCard
                        imageUrl={"/images/episode.jpg"}
                        title={`${episode.episode}`}
                        content={episode.name}
                    />
                </div>
            </div>

            <h3>Characters in this episode:</h3>
            <div className="row">
                {characters.map((character) => (
                    <div key={character.id} className="col-md-3">
                        <CharacterCard
                            imageUrl={character.image}
                            title={character.name}
                            content={character.status}
                            onClick={() => handleCharacterClick(character.id)}  // onClick işlevi
                        />
                    </div>
                ))}
            </div>

            <div className="row">
                <div className="col-md-3">
                    {selectedCharacter && (
                        <div className='selectedCharacter'>
                            <h2>Seçili Karakter Detayları</h2>
                            <CharacterCard
                                imageUrl={selectedCharacter.image}
                                title={selectedCharacter.name}
                                content={selectedCharacter.status}
                            />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default EpisodeDetail;
