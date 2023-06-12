import { hover } from '@testing-library/user-event/dist/hover';
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react';
import Slider from "react-slick";
import Loading from '../Loading/Loading';


export default function Category() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    let [categorys, setCategorys] = useState([]);
    let [subCategorys, setSubCategorys] = useState([]);
    let getCategory = async () => {
        let { data } = await axios.get('https://king-prawn-app-3mgea.ondigitalocean.app/category');
        setCategorys(data.category);
    }
    let getSubCategory = async (id) => {
        let { data } = await axios.get(`https://king-prawn-app-3mgea.ondigitalocean.app/category/${id}/subcategory`);
        setSubCategorys(data.subcategory);

    }

    useEffect(() => {
        getCategory();
    }, []);


    return (
        <>
        {categorys.length===0?
                   <Loading/>
                   :

            <Slider {...settings} className='my-5'>
                {categorys.map(
                    (cat) => {
                        return <div key={cat.id} className='col-md-6 my-3 d-flex justify-content-center'>
                            <img src={cat.image.secure_url} style={{cursor:'pointer'}} onClick={()=>getSubCategory(cat.id)} alt={cat.name} width="300px" />
                        </div>
                    }
                )}
   
            </Slider>
            }
            {
                

                <div className='container row mt-5'>

            
                { subCategorys.map(
                    (cat) => {
                        return <div className='col-md-4 mt-5'>
                            <img src={cat.image.secure_url} alt={cat.name} width="300px" />
                        </div>
                    }
        
                    )}
            </div>
                }
        </>
    )
}