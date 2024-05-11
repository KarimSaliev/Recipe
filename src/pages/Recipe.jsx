import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

function Recipe() {
    const params = useParams();
    const [recipe, setRecipe] = useState({});
    const [activeTab, setActiveTab] = useState('instructions')
    useEffect(()=>{
        getRecipe(params.dishId)
    },[])
    const ingr_array = recipe.extendedIngredients
    const getRecipe = async(dishId)=>{
        const check = localStorage.getItem(`${dishId}`);
        if (check) {
            setRecipe(JSON.parse(check));
        }
        else {
            const response = await fetch(`https://api.spoonacular.com/recipes/${dishId}/information?apiKey=4c8413aab99c4728a2845589b6a49d02`)
            const data = await response.json()
            console.log(data);
            localStorage.setItem(`${dishId}`, JSON.stringify(data))
            setRecipe(data)
        }
    }
  return (
   <RecipeWrapper>
        <div>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt="" />
        </div>
        <Info>
            <ButtonContainer>
            <Button className={activeTab === 'instructions' ? 'active': ''} onClick={()=>setActiveTab('instructions')}>Instructions</Button>
            <Button className={activeTab === 'ingredients' ? 'active': ''} onClick={()=>setActiveTab('ingredients')} >Ingredients</Button>
            </ButtonContainer>
            
            {activeTab === 'instructions' && (
                <>
                <h3 dangerouslySetInnerHTML={{__html: recipe.summary}}></h3>
                <h3 dangerouslySetInnerHTML={{__html: recipe.instructions}}></h3>
                </>
                
            )}
            {activeTab === 'ingredients' && (
                <>
                <ul>
            {ingr_array.map((ingredient)=>{
                    return (
                        <li key={ingredient.id}>{ingredient.original}</li>
                    )
                    
                })}
            </ul>
                </>
            )}

            
        </Info>
   </RecipeWrapper>
  )
}
const RecipeWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    padding: 3rem;
    display: flex;
    h2 {
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }`
const Button = styled.button`
    padding: 1rem 2rem;
    color: grey;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    &.active {
        background: linear-gradient(to right, orange, yellow) 
    }`
const Info = styled.div`
    margin-left: 10rem;
    display: flex;
    flex-direction: column;`
const ButtonContainer = styled.div`
    display: flex;
    align-items: flex-start;`
    
export default Recipe
