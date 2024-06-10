import React, { useRef, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import queryGetSongs from '../queries/GetSongs';

const ADD_SONG = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            id
            title
        }
    }
`;


function AddSong() {
    const titleRef = useRef(null);
    const [addSong, { data, loading, error }] = useMutation(ADD_SONG);

    useEffect(() => {
        if (data) {
            M.toast({ html: 'Song successfully added.' });
        }
    }, [data]);

    return (
        <div>
            <div className="row">

                <div className="section">
                    <Link to='/'>Back</Link>
                </div>
                <div className="divider"></div>
                <form className="col s12" onSubmit={(e) => {
                    e.preventDefault();
                    addSong({ variables: { title: titleRef.current.value }, refetchQueries: [ {  query: queryGetSongs } ]  });
                    titleRef.current.value = '';

                }}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="title" type="text" className="validate" ref={titleRef} />
                            <label htmlFor="title">Song Name</label>
                        </div>
                    </div>
                    {loading && 'Creating song...'}
                    {error && `Submission error! ${error.message}`}
                </form>
            </div>
        </div>
    )
}

export default AddSong;
