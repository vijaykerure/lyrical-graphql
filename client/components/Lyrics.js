import React from "react";
import { gql, useMutation } from "@apollo/client";

const LIKE_LYRICS = gql`
    mutation LikeLyric($likeLyricId: ID) {
        likeLyric(id: $likeLyricId) {
            id
            likes
        }
}`;

function renderItems(lyrics, onLike, lLoading) {
    return lyrics.map(({ id, content, likes }) => {
        return <li key={id} className="collection-item">{content}
            <div className="like-box">
                <i className="material-icons"
                    style={{ cursor: lLoading ? 'not-allowed' : 'pointer' }}
                    onClick={() => !lLoading && onLike(id)}
                >thumb_up</i>
                
                <p>{likes}</p>
            </div>
            
        </li>;
    });
}

const Lyrics = ({ lyrics }) => {
    const [likeLyric, { loading }] = useMutation(LIKE_LYRICS);
    function onLike (lyricId) {
        likeLyric({variables: { likeLyricId: lyricId }})
    }
    return (
        <div>
            <ul className="collection with-header">
                <li className="collection-header"><h6>Lyrics</h6></li>
                {lyrics && lyrics.length ? renderItems(lyrics, onLike, loading) : <li className="collection-item">No lyrics found</li>}
            </ul>
        </div>
    )

}

export default Lyrics;
