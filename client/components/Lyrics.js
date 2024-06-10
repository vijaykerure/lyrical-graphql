import React from "react";
import { gql, useMutation } from "@apollo/client";

const LIKE_LYRICS = gql`
    mutation LikeLyric($likeLyricId: ID) {
        likeLyric(id: $likeLyricId) {
            id
            likes
        }
}`;

function renderItems(lyrics, onLike) {
    return lyrics.map(({ id, content, likes }) => {
        return <li key={id} className="collection-item">{content}
            <div className="action-box">
                {likes}
                <i className="material-icons"
                    onClick={() => onLike}
                >thumb_up</i>
            </div>
            
        </li>;
    });
}

const Lyrics = ({ lyrics }) => {
    const [likeLyric] = useMutation(LIKE_LYRICS);
    function onLike (lyricId) {
        likeLyric({variabiles: { likeLyricId: lyricId }})
    }
    return (
        <div>
            <ul className="collection with-header">
                <li className="collection-header"><h6>Lyrics</h6></li>
                {lyrics && lyrics.length ? renderItems(lyrics, onLike) : <li className="collection-item">No lyrics found</li>}
            </ul>
        </div>
    )

}

export default Lyrics;
