import React from 'react'
import Librarysong from './Librarysong'
function Library({songs , setCurrentSong , audioElement , isPlaying , setSongs ,libraryStatus}) {
    return (
        <div className = {`library ${libraryStatus ? 'library-active' : ''}`}>
            <h2 className= "playlist-heading">Playlist</h2>
            <div className="library-element">
                {songs.map( song => {
                    return (
                        <Librarysong song = {song} setCurrentSong = {setCurrentSong} songs = {songs} id = {song.id} key = {song.id}  audioElement = {audioElement} isPlaying = {isPlaying} setSongs = {setSongs}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Library
