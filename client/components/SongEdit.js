import React, { useRef, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import queryGetSongs from '../queries/GetSongs';
import queryGetSongDetails from '../queries/GetSongDetails';
import CreateLyrics from './CreateLyrics';
import Lyrics from './Lyrics';

const EDIT_SONG = gql`
    mutation EditSong($id: ID!, $title: String!){
        editSong(id: $id, title: $title){
            id
            title
        }
    }
`;

const SongEditForm = ({ songTitle, onSubmit }) => {
    const titleRef = useRef(null);

    return (
        <form className="col s12" onSubmit={(e) => onSubmit(e, titleRef)}>
            <div className="row">
                <div className="input-field col s12">
                    <input defaultValue={songTitle} id="songName" type="text" className="validate" ref={titleRef} />
                    <label className='active' htmlFor="songName">Song Name</label>
                </div>
            </div>
        </form>
    );
};

export default function SongEdit() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(queryGetSongDetails, { variables: { id } });
    const [editSong, { data: eData }] = useMutation(EDIT_SONG);

    useEffect(() => {
        if (eData) {
            M.toast({ html: 'Song successfully updated.' });
        }
    }, [eData]);

    const handleSubmit = (e, titleRef) => {
        e.preventDefault();
        editSong({ variables: { id, title: titleRef.current.value }, refetchQueries: [{ query: queryGetSongs }] });
    };

    if (!id) return <p>Error: id not provided</p>;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='row'>
            <div className='col s12'>
                <div className="section">
                    <Link to='/'>Back</Link>
                </div>

                <div className="divider"></div>
                <div className="row">
                    <SongEditForm songTitle={data.song.title} onSubmit={handleSubmit} />
                </div>

                <Lyrics lyrics={data.song.lyrics}/>

                <div className="divider"></div>
                <CreateLyrics songId={data.song.id} />
            </div>
        </div>
    );
}
