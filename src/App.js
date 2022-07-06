import { useState } from 'react';
import { data } from './data';
import './App.css';

function App() {
  
  const [cities, setCities] = useState(data);

  const removeItem = (id) => {
    let newCities = cities.filter(element => element.id !== id);
    setCities(newCities);
  };

  const [place, setPlace] = useState(0);
  const [datas, setDatas] = useState(data);
  let newArray = [...datas];
  const [showMore, setShowMore] = useState(false);



  const nextPlace = (e, index) => {
    setDatas(newArray);

    const slideImage = document.querySelectorAll("#slideImage", "#par", "parTwo");
    newArray[index] = cities[index];

    setPlace((place => {
      place++;
      if(place > 4) {
        place = 0;
      }
      return place;
    }));
    
    slideImage[index].setAttribute('headingPlace', newArray[index].placeName[place]);
    slideImage[index].setAttribute('src', newArray[index].image[place]);
    slideImage[index].setAttribute('aboutPlace', newArray[index].description[place]);
    return slideImage;
  }



  const previousPlace = (e, index) => {
    
    const slideImage = document.querySelectorAll("#slideImage");
        newArray[index] = cities[index];
        setDatas(newArray);
      setPlace ((place => {
      place--;
      if(place < 0 ) {
        place = 4;
      }
      return place;
    }))
    slideImage[index].setAttribute('src', newArray[index].image[place]);
      return slideImage;
  }

  return (

    <div>

      <div className='heading'>
        <h1> Top {cities.length} cities to visit in Spain</h1>
        </div>

    
    {cities.map((element => {
      const {id, cityName, placeName, image, description, showMore} = element;
      const index = cities.indexOf(element);

      const showTextClick = (element) => {
        element.showMore = !element.showMore
        setShowMore(!showMore)
      }
   
      return (
        <div className='item' key={ id } data-id={data.id}>
          <div className='container'>
            <h2>{cityName}</h2>
          </div>  

          <div className='container'>
            <h3 className='headingPlace' id='par'> {placeName[0]}</h3>
          </div> 

          
          <div className='container'>
            <img id='slideImage' src={ image[0] } width="600px" alt="sightseeing" />
          </div> 

          <div className='placeDescription'>
            <p id='parTwo' className='aboutPlace'> 
              {showMore ? description[0] : description[0].substring(0,220) + "...."}
              <button className='showButton' onClick={() => showTextClick(element)}>{showMore ? "Show less" : "Show more"}</button>
          </p>
            
          </div> 

          <div className='buttons'>
            <button className='prevNextBtn' onClick={ (e)=> previousPlace(e, index)  } id = { id } >Previous</button>
            <button className='prevNextBtn' onClick={ (e)=> nextPlace(e, index)} id = { id }>Next</button>
          </div>

          <div className='container'>
            <button onClick={() => removeItem(id)} className='deletePlaceBtn'>Delete this city</button>
          </div>

      </div>
      )
      }))}          
      
      <div className='container'>
            <button className='deleteAll' onClick={() => setCities([])}>Delete all</button>
          </div>
      
      </div>
  );
    }

export default App;