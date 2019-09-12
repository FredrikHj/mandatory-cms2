import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { objProductList } from './Repeaters.js';
import axios from 'axios';

export let Reviews = (props) => {
    let [ incommingReviews, setIncommingReviews ] = useState([]);
    let [ reviewName, setReviewName ] = useState('');
    let [ reviewMess, setReviewMess ] = useState('');
    let [ reviewRating, setReviewRating ] = useState('');
    let [ reviewAddEmtyStr, setReviewAddEmtyStr] = useState('');    // If no field is filled the text is saved here

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
        setReviewAddEmtyStr('');
    }
    let handleReviewMess = (e) => {
        let targetStr = e.target.value;
        setReviewMess(targetStr);
        setReviewAddEmtyStr('');
    }
    let handleReviewRating = (e) => {
        let targetStr = e.target.value;
        setReviewRating(targetStr);
        setReviewAddEmtyStr('');
    }
    let reviewCancelBtn = () => {
        props.setGetProductReview(false);
    }
    let reviewCleanBtn = () => {
        setReviewName('');
        setReviewMess('');
        setReviewRating('');
    }
    let reviewAddBtn = () => {
        
        if (reviewName === '' || reviewMess === '' || reviewRating === '') {
            setReviewAddEmtyStr('Fält ifyllda?');

        } else {
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
                let incommingData = response.data;
                console.log(incommingData);
                //setIncommingReviews(incommingData);                          
            })
            .catch((error) => {
                console.log(error);
            });
            props.setGetProductReview(false); //Fel = räknar ej oom antalet recensioner på rad 157 i detail
        }
    };
    let revertProductDetailBtn = () => {
        props.setGetProductReview(false);
    }
    props.setReviewQuantity(incommingReviews.length);
    console.log(props.getProductReview);
    return (
        <section id="reviewContainer" style={(props.getProductReview === true) ? {display: 'block'} : {display: 'none'}} >
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
                                <td><input id="reviewInputName" type="text" onChange={ handleReviewName } value={ reviewName } required/></td>   
                                <td><textarea id="reviewInputMess" type="text" onChange={ handleReviewMess } value={ reviewMess } required/></td>
                                <td><input id="reviewInputRating" type="number" onChange={ handleReviewRating } value={ reviewRating } required/></td>   
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
                                            <td><input id="reviewInputName" type="text" onChange={ handleReviewName } value={ reviewName } required/></td>   
                                            <td><textarea id="reviewInputMess" type="text" onChange={ handleReviewMess } value={ reviewMess } required/></td>
                                            <td><input id="reviewInputRating" type="number" onChange={ handleReviewRating } value={ reviewRating } required/></td>   
                                        </tr>
                                    </>
                    }
                </tbody>
            </table>
                    <p id="reviewFieldEmtyMess" style={(props.productReviewShow === '1') ? {display: 'none'} : {display: 'block'}}>{ reviewAddEmtyStr }</p>
                <section id="reviewBtn">
                    <button style={(props.productReviewShow === '1') ? {display: 'none'} : {display: 'block'}} onClick={ reviewCancelBtn } className="chooseBtn" id="addReview">Avbryt</button>
                    <button style={(props.productReviewShow === '1') ? {display: 'none'} : {display: 'block'}} onClick={ reviewCleanBtn } className="chooseBtn" id="addReview">Rensa</button>
                    <button style={(props.productReviewShow === '1') ? {display: 'none'} : {display: 'block'}} onClick={ reviewAddBtn } className="chooseBtn" id="addReview">Posta</button>
                    <button style={(props.productReviewShow === '1') ? {display: 'block'} : {display: 'none'}} onClick={ revertProductDetailBtn } className="chooseBtn" id="addReview">Återgå</button>
               </section>

        </section>
    );
};

