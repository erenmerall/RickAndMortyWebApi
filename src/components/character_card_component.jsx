const CharacterCard = ({ imageUrl, title, content, onClick }) => {
    return (
        <div className="characterCard" onClick={onClick} style={{ cursor: 'pointer' }}>
            <img src={imageUrl} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
            </div>
        </div>
    );
};

export default CharacterCard;
