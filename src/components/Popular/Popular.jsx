import { useEffect, useState } from "react";
import styles from './Popular.module.css'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { useNavigate } from "react-router-dom";
function Popular() {
    useEffect(()=>{
        getPopular();
        
    },[])
    const navigate = useNavigate();
    const [popular, setPopular] = useState([]);
    const handleEvent = (recipeId)=>{
        navigate(`/recipe/${recipeId}`);
    }
    const getPopular = async() => {
        const check = localStorage.getItem('popular');
        if (check) {
            setPopular(JSON.parse(check));
        }
        else {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=4c8413aab99c4728a2845589b6a49d02&number=9`)
            const data = await response.json()
            console.log(data);
            localStorage.setItem('popular', JSON.stringify(data.recipes))
            setPopular(data.recipes)
        }
     
    }


    
  return (
    <div>
            <div className={styles["wrapper"]}>
            <h1>Popular</h1>
            <Splide options={{
                perPage: 2,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '5rem'
            }}>
                 {popular.map((recipe)=>{
        return(
            <SplideSlide>
            <div className={styles["card"]} key={recipe.id}  onClick={()=>handleEvent(recipe.id)}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
            </div>
            
            </SplideSlide>
           
           )
     })}
            </Splide>
       
            </div>
            

     
    </div>
  )
}
export default Popular