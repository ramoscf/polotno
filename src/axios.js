import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Axios = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://apicartazfacil.com/public/api/cf_imagem?token=lezsyc2jx3rnov1ptdbik89a4qh5mf67')
        .then(res => {
            const data = res.data.data;
            setData(data);
        }).catch(err=>{
          console.log(err);
      })
},[])

const dragUrl = React.useRef();
const stageRef = React.useRef();
const [images, setImages] = React.useState([]);

  return (
    <>
    {
      data && data.map((item)=>{
         return(
              <div className="card" key={item.prod_id} >
                <div className="container">
                    <h4>{item.img_nome} - <img src={item.img_caminho} width="50" /></h4> 

                    <img
                      alt={item.img_nome}
                      src={item.img_caminho} 
                      width="50" 
                      draggable="true"
                      onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                      }}
                    />

                </div>
              </div>
         )
     })
    }
  </>
  )
}

export default Axios