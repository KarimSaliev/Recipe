import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
function Search() {
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    function handleEvent(event) {
        setInput(event.target.value);
    }
    function submit(event) {
        event.preventDefault();
        navigate(`/searched/${input}`)
    }

  return (
        <FormContainer>
            <FormStyle onSubmit={submit}>
                
                <input type="text" value = {input} onChange={handleEvent}/>
                <FaSearchIcon></FaSearchIcon>
            </FormStyle>
        </FormContainer>
        


  )
}
const FormContainer = styled.div`
    min-width: 100vw;
    padding: 2%;
    `
    

const FormStyle = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    input {
        border: none;
        background: linear-gradient(35deg, grey, black);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
    }`

const FaSearchIcon = styled(FaSearch)`
    margin-left: 10px;
    font-size: 2rem;
    `;
export default Search
