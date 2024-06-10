import React, { useRef, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import queryGetSongDetails from "../queries/GetSongDetails";

const CREATE_LYRICS_CONTENT = gql`
    mutation AddLyricsToSong($content: String!, $songId: ID!) {
        addLyricToSong(content: $content, songId: $songId) {
            id,
            lyrics {
                id
                content
            }
        }
    }
`;


function CreateLyrics({ songId }) {
    const lyricsContent = useRef(null);
    const [addLyricToSong, { data, loading, error }] = useMutation(CREATE_LYRICS_CONTENT);

    useEffect(() => {
        if (data) {
            M.toast({ html: 'Lyrics successfully added.' });
        }
    }, [data]);

    return (
        <div>
            <div className="row">
                <form className="col s12" onSubmit={(e) => {
                    e.preventDefault();
                    addLyricToSong({ variables: { content: lyricsContent.current.value, songId }, refetchQueries: [{ query: queryGetSongDetails }] });
                    lyricsContent.current.value = '';

                }}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input  type="text" id="lyricsContent" className="materialize-textarea" ref={lyricsContent} />
                            <label htmlFor="lyricsContent">Lyrics Content</label>
                        </div>
                    </div>
                    {loading && 'Creating lyrics...'}
                    {error && `Submission error! ${error.message}`}
                </form>
            </div>
        </div>
    )
}

export default CreateLyrics;
