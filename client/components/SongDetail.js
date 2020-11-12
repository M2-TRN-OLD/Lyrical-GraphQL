import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
    render() {
        const { song } = this.props.data;

        // you can use the loading or the song property here..  should use this all over the place..  resolves 'cannot read property undefined
        if (!song) { return <div>Loading...</div>; }

        return (
            <div className="container">
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={this.props.params.id}/>
            </div>
        )
    }
}

// we will use this pattern often and will be able to copy it to other projects.
export default graphql(fetchSong, { options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);