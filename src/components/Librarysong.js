import React from 'react'
function Librarysong({song , setCurrentSong , songs , id , audioElement , isPlaying , setSongs}) {

    const currentSongHandler = async () => {

        const newSong = songs.map(song => {
            if(song.id === id) {
                return {
                    ...song ,
                    active : true
                }
            } else {
                return {
                    ...song,
                    active : false
                }
            }
        })

        setSongs(newSong)
        //console.log(song)
       await setCurrentSong(song)
       if(isPlaying) {
        audioElement.current.play()}    
    }

    return (
        <div onClick = {currentSongHandler} className={`library-song ${song.active ? "selected" : ""}`}>
            <img src={song.cover} alt={song.name}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default Librarysong
