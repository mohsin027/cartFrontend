import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';

function ProductCard({product,cart,setCart}) {
  const dispatch = useDispatch()
  useEffect(() =>{},[])
  async function addToCart(e) {
    e.preventDefault();
    try {
       const response=await axios.post("http://localhost:5000/addToCart",product) 
       console.log(response);
dispatch({type:"REFRESH-CART"})

    } catch (error) {
        console.log(error);
    }
    
  }
  return (
    <Card className='card' >
        <div className='offer-circle'>
            <span>-50%</span>
        </div>
      <Card.Img className='card-img' variant="top" src={`${product.image?.url}`} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {product.desc}
        </Card.Text>
        <Card.Text>
          {product.rating}
        </Card.Text>
        <Card.Text>
          {product.price}
        </Card.Text>
        <Button className='cart-button' variant="primary" onClick={addToCart}>Add To Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;