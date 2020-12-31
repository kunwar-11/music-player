import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay , faAngleLeft , faAngleRight , faPause} from '@fortawesome/free-solid-svg-icons'
function Player({currentSong , isPlaying , setIsPlaying , audioElement , time , setTime , songs , setSongs , setCurrentSong}) {

    const songPlayHandler = () => {
        if(isPlaying) {
            audioElement.current.pause()
            setIsPlaying(!isPlaying)
        }
        else {
            audioElement.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    const timeHandler = (e) => {
        //console.log(e.target.currentTime , e.target.duration)
        setTime({...time , current : e.target.currentTime , final : e.target.duration })
    }

    const timeFormatter = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
          );
    }

    const dragHandler = (e) => {
        //console.log(e.target.value)
        audioElement.current.currentTime = e.target.value
        setTime({...time , current : e.target.value})
    }
   
    const actvieSongHandler = (nextprev) => {
        const newSong = songs.map(song => {
            if(song.id === nextprev.id) {
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
    } 

    const skipHandler = async (direction) => {
        const currIndex = songs.findIndex((song) => song.id === currentSong.id)
        //console.log(currIndex)
        if(direction === 'next') {
            await setCurrentSong(songs[(currIndex + 1) % songs.length])
            actvieSongHandler(songs[(currIndex + 1) % songs.length])
        }
        if(direction === 'prev') {
            if(((currIndex-1)%songs.length) === -1) {
                await setCurrentSong(songs[songs.length-1])
                actvieSongHandler(songs[songs.length-1])
                if(isPlaying) {
                    audioElement.current.play()}
                return
            } 
            await setCurrentSong(songs[(currIndex - 1) % songs.length])
            actvieSongHandler(songs[(currIndex - 1) % songs.length])
        }
        if(isPlaying) {
        audioElement.current.play()}
    }

    const songEndHandler = async () => {
        const currIndex = songs.findIndex((song) => song.id === currentSong.id)
        await setCurrentSong(songs[(currIndex + 1) % songs.length])
        actvieSongHandler(songs[(currIndex + 1) % songs.length])
        if(isPlaying) {
            audioElement.current.play()
        }
    }

    return (
        <div className = "player">
            <div className="time-controller">
                <p>{timeFormatter(time.current)}</p>
                <input onChange = {dragHandler} min = {0} max = {time.final || 0} value = {time.current} type="range"/>
                <p>{time.final ? timeFormatter(time.final) : '00:00'}</p>
            </div>
            <div className="song-controller">
                    <FontAwesomeIcon onClick = {() => skipHandler('prev')} className = 'prev' size = "2x" icon = {faAngleLeft} />
                    <FontAwesomeIcon onClick = {songPlayHandler} className = 'play' size = "2x" icon = {isPlaying ? faPause : faPlay} />
                    <FontAwesomeIcon onClick = {() => skipHandler('next')} className = 'next' size = "2x" icon = {faAngleRight} />
            </div>
            <audio onTimeUpdate = {timeHandler} onLoadedMetadata = {timeHandler} ref = {audioElement} src={currentSong.audio} onEnded = {songEndHandler}></audio>
        </div>
    )
}

export default Player
