import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
function Cuisines() {
    const [cuisine, setCuisine] = useState([]);
    const navigate = useNavigate();
    const handleEvent = (item)=>{
        navigate(`/recipe/${item}`);
    }
    let params = useParams()
    const getCuisine= async(name)=> {
        const check = localStorage.getItem(`${name}`);
        if (check) {
            setCuisine(JSON.parse(check));
        }
        else {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4c8413aab99c4728a2845589b6a49d02&cuisine=${name}`)
            const recipes = await data.json()
            console.log(recipes.results)
            localStorage.setItem(`${name}`, JSON.stringify(recipes.results))
            setCuisine(recipes.results)
        }
       
    }
    useEffect(()=>{
        getCuisine(params.type)
    },[params.type])
  return (
    <Wrapper>
        <Grid>
        {cuisine.map((item)=>{
            return(
                
                <Card key={item.id} onClick={()=>handleEvent(item.id)}>
                    <img src={item.image}/>
                    <h4>{item.title}</h4>
                </Card>
            )
        })}
    </Grid>
    </Wrapper>
    )
}
const Wrapper = styled.div`
display: flex;
justify-content:center;
min-width: 100vw;
padding: 3rem;`;
const Grid = styled.div`
display: grid;
grid-template-columns: 200px 200px 200px 200px;
grid-template-rows: 300px;
grid-gap: 3rem;
margin-top: 1rem;
`;

const Card = styled.div`
img{
    width: 100%;
    border-radius: 2rem;
}
a{
    text-decoration: none;
}
h4{
   text-align: center;
   padding: 1rem; 
}`

export default Cuisines
