import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { objProductList } from './Repeaters.js';
import axios from 'axios';

export let Reviews = (props) => {
    let [ incommingReviews, setIncommingReviews ] = useState([]);
    let [ reviewName, setReviewName ] = useState('');
    let [ reviewMess, setReviewMess ] = useState('');
    let [ reviewRating, setReviewRating ] = useState('');

    useEffect(() => {
        // Get Review
         axios.get(`${objProductList.urlGetReviews}`//?=${props.productId}`
         , {
          headers: objProductList.cockpitToken
        })
        .then(response => {
            let incommingData = response.data.entries;
            console.log(incommingData);
            setIncommingReviews(incommingData);                          
        })
        .catch((error) => {
          console.log(error);
        });
      }, []);
        
    if (!incommingReviews) {
        return <p id="listGetting">Listan hämtas ...</p>;
    }
    let handleReviewName = (e) => {
        let targetStr = e.target.value;
        setReviewName(targetStr);
    }
    let handleReviewMess = (e) => {
        let targetStr = e.target.value;
        setReviewMess(targetStr);
    }
    let handleReviewRating = (e) => {
        let targetStr = e.target.value;
        setReviewRating(targetStr);
    }
    let addReview = () => {        
        // Post a new review
        axios.post(`${objProductList.urlPostReview}` //?=${props.productId}`
        ,{
            headers: [ objProductList.cockpitToken, {"Content-Type": "application/json"} ],
            data: {
                title: reviewName,
                body: reviewMess,
                rating: reviewRating,
            },
        })
        .then(response => {
            let incommingData = response;
            console.log(incommingData);
            //setIncommingReviews(incommingData);                          
            console.log(response);
            // 
        })
        .catch((error) => {
            console.log(error);
        });
    };
    props.setReviewQuantity(incommingReviews.length);
    console.log(props.productReviewShow);
    return (
        <section id="reviewContainer" style={(props.showProductReview === true) ? {display: 'block'} : {display: 'none'}} >
            <p className="headLineRewview">{'Recensioner för - ' + props.productName }  </p>
            <table id="tableReview">
                <thead>
                    <tr><th>Namn</th><th>Recension</th><th>Betyg</th></tr>
                </thead>
                <tbody> 
                    {(incommingReviews.length !== 0)
                        ? (props.productReviewShow === '2')
                            ?
                                <tr>
                                    <td><input id="reviewInputName" type="text" onChange={ handleReviewName }/></td>   
                                    <td><textarea id="reviewInputMess" type="text" onChange={ handleReviewMess }/></td>
                                    <td><input id="reviewInputRating" type="number" onChange={ handleReviewRating }/></td>   
                                </tr>                         
                            : 
                                incommingReviews.map((obj, productCount) => {
                                    productCount += 1;
                                    
                                    return (
                                        <tr>
                                                <td>{ obj.title }</td>
                                                <td>{ obj.body }</td>
                                                <td>{ obj.rating }</td>
                                            </tr>
                                    );
                                })
                                :  <>
                                        <tr><td colSpan="10"><p id="noReviewsStr">Inga recensioner ...</p></td></tr> 
                                        <tr id="noReviewsFields">
                                            <td><input id="reviewInputName" type="text" onChange={ handleReviewName }/></td>   
                                            <td><textarea id="reviewInputMess" type="text" onChange={ handleReviewMess }/></td>
                                            <td><input id="reviewInputRating" type="number" onChange={ handleReviewRating }/></td>   
                                        </tr>
                                    </>
                    }
                </tbody>
            </table >
  
                <section id="reviewBtn">
                    <button style={(props.productReviewShow === '1') ? {display: 'none'} : {display: 'block'}} onClick={ '' } className="chooseBtn" id="addReview">Avbryt</button>
                    <button style={(props.productReviewShow === '1') ? {display: 'none'} : {display: 'block'}} onClick={ '' } className="chooseBtn" id="addReview">Rensa</button>
                    <button onClick={ addReview } className="chooseBtn" id="addReview">
                        {(props.productReviewShow === '1')
                            ? 'Återgå'
                            : 'Posta'
                        }
                        </button>
               </section>

        </section>
    );
};

