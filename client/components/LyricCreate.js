import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { content: '' };
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                content:this.state.content,
                songId:this.props.songId
            }
        }).then(() => this.setState({ content: '' }));

    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input
                    value={this.state.content}
                    onChange={event => this.setState({ content: event.target.value })}/>
            </form>
        )
    }
}

// if you are making use of a resource, make sure you are grabbing that resource in the query
const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
        id
        lyrics {
            id
            content
            likes
        }
    }
    }
`;

export default graphql(mutation)(LyricCreate);