import React , {useState , useRef} from 'react'
import './styles/App.scss'
import Song from './components/Song'
import Player from './components/Player'
import Data from './Data'
import Library from './components/Library'
import Nav from './components/Nav'
function App() {

  const [songs , setSongs] = useState(Data())
  const [currentSong , setCurrentSong] = useState(songs[0])
  const [isPlaying , setIsPlaying] = useState(false)
  const[time , setTime] = useState({
    current : 0,
    final : 0
})
const [libraryStatus , setLibraryStatus] = useState(false)
const audioElement = useRef(null)
    

  return (
    <div className={`App ${libraryStatus ? 'active-library' : ''}`}>
      <Nav libraryStatus = {libraryStatus} setLibraryStatus = {setLibraryStatus}/>
      <Song currentSong = {currentSong}/>
      <Player currentSong = {currentSong} isPlaying = {isPlaying} setIsPlaying = {setIsPlaying} audioElement = {audioElement}  time ={time} setTime = {setTime} songs = {songs} setSongs = {setSongs} setCurrentSong = {setCurrentSong}/>
      <Library songs = {songs} setCurrentSong = {setCurrentSong} audioElement = {audioElement} isPlaying = {isPlaying} setSongs = {setSongs} libraryStatus ={libraryStatus}/>
    </div>
  );
}

export default App;
