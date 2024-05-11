import { useEffect, useState } from "react";
import styles from './Veg.module.css'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { useNavigate } from "react-router-dom";
function Veg() {
    useEffect(()=>{
        getVeg();
    },[])
    const navigate = useNavigate();
    const handleEvent = (recipe)=>{
      navigate(`/recipe/${recipe}`);
  }
    const [veg, setVeg] = useState([]);
    const getVeg = async() => {
        const check = localStorage.getItem('veg');
        if (check) {
            setVeg(JSON.parse(check));
        }
        else {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=4c8413aab99c4728a2845589b6a49d02&number=9&tags=vegetarian`)
            const data = await response.json()
            console.log(data);
            localStorage.setItem('veg', JSON.stringify(data.recipes))
            setVeg(data.recipes)
        }
     
    }
   

    
  return (
    <div>
            <div className={styles["wrapper"]}>
            <h1>Vegetarian</h1>
            <Splide options={{
                perPage: 2,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '5rem'
            }}>
                 {veg.map((recipe)=>{
        return(
            <SplideSlide>
            <div className={styles["card"]} key={recipe.id} onClick={()=>handleEvent(recipe.id)}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title}/>
            </div>
            
            </SplideSlide>
           
           )
     })}
            </Splide>
       
            </div>
            

     
    </div>
  )
}
export default Veg