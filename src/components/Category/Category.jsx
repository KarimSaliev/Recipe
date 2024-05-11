import {FaPizzaSlice, FaHamburger} from 'react-icons/fa';
import {GiNoodles, GiChopsticks} from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import styles from './Category.module.css';
import styled from 'styled-components';
function Category() {

  return (
    <div>
        <div className={styles["list"]}>
            <SLink to={'cuisines/Italian'}>
            <div className={styles["icon"]}>
   
            <FaPizzaSlice style={iconStyle}/>
            <h4>Italian</h4>

            </div> 
            </SLink>
      
        <SLink to={'/cuisines/American'}>
        <div className={styles["icon"]}>
      
        <FaHamburger  style={iconStyle} />
        <h4>American</h4>
     
        </div> 
        </SLink>
        <SLink to={'/cuisines/Thai'}> 
        <div className={styles["icon"]}>
        
        <GiNoodles  style={iconStyle}/>
        <h4>Thai</h4>
      
        </div> 
        </SLink>
        <SLink to={'/cuisines/Japanese'}>
        <div className={styles["icon"]}>

        <GiChopsticks style={iconStyle} />
        <h4>Japanese</h4>


</div> 
        </SLink>
        
        </div>
       
    </div>
  )
}
const SLink = styled(NavLink)`
text-decoration: none;
color: inherit;
background-color: black;
border-radius: 50%;
width: 5em;
height: 5em;
display: flex;
justify-content: center;
align-items: center;

&.active {
    background: linear-gradient(to right, orange, yellow);
}
`;
const iconStyle = {
    color: 'white',
    fontSize: '1.3em'
}
export default Category
