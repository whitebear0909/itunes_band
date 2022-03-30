import {useState, useEffect} from "react";
import { defaultListData } from "../services/constants.services";
import { getSongs } from "../services/function.service";

const Home = () => {
  const [list, setList] = useState(defaultListData);
  const [schStr, setSchStr] = useState('');
  const [songs, setSongs] = useState(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      let temp = [...list];
      let shiftedItem = temp.shift()

      if(filled && defaultListData.includes(shiftedItem) && songs.length )
        temp.push(songs.shift().collectionName);
      else temp.push(shiftedItem);
      setList(temp);
    }, 1000);
    return () => clearInterval(interval);
  }, [list]);

  const fetchData = async () => {
    try{
      const data = await getSongs(schStr);
      console.log(data);
      setFilled(true);
      setSongs(data.sort().slice(0, 5));
    }
    catch {
      alert("no data")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  }

  return (
    <>
    <input className="search-box" placeholder="Search Band" value={schStr} onKeyDown={handleKeyDown} onChange={(evt) => setSchStr(evt.target.value)}/>
     <div className="list-box">
      {
        list.map((item, index) => (
          <div className="list-item" key={index}>{item}</div>
        ))
      }
     </div>
    </>
  )
}

export default Home;