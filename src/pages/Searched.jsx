import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
function Searched() {
    const params = useParams()
    const [search, setSearch] = useState([])
    const navigate = useNavigate();
    const handleEvent = (item)=>{
        navigate(`/recipe/${item}`);
    }
    const getSearch= async(name)=> {
        const check = localStorage.getItem(`${name}`);
        if (check) {
            setSearch(JSON.parse(check));
        }
        else {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4c8413aab99c4728a2845589b6a49d02&query=${name}`)
            const searched = await data.json()
            console.log(searched.results)
            localStorage.setItem(`${name}`, JSON.stringify(searched.results))
            setSearch(searched.results)
        }
       
    }
    useEffect(()=>{
        getSearch(params.item)
    },[params.item])
  return (
    <Wrapper>
        <Grid>
        {search.map((item)=>{
            return(
                
                <Card key={item.id} onClick={()=>{handleEvent(item.id)}}>
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

export default Searched
