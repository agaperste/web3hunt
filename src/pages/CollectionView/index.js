import React, {useEffect, useState} from 'react'
import {  useParams, useHistory } from "react-router-dom";
import SelectDropdown from '../../comps/selectDropdown'
import Loader from '../../assets/covalent-logo-loop_dark_v2.gif'
import Alert from '../../assets/alert.svg'
import Back from '../../assets/Back.svg'
import Table from '../../comps/table'
import axios from 'axios'
import './style.css'
import { CONFIG } from '../../config'



export default function CollectionView() {
  let { address, id } = useParams();
  const [nft, setNft] = useState([])
  const [activeLoader, setLoader] = useState(true)
  const history = useHistory();
  const API_KEY = process.env['REACT_APP_COVALENT_API']

  useEffect(()=>{
    handleCollection()
    handleNft()
  },[])

  const [data, setData] = useState({})

   var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  // Request for collection data
  const handleCollection = async() => {
    const resp = await axios.get(`https://api.covalenthq.com/v1/${id}/nft_market_cap/collection/${address}/?&key=${API_KEY}`)
    setData(resp.data.data.items[0])
  }

  // Request for nft collection (first 5)
  const handleNft = async() => {
    
    const resp = await axios.get(`https://api.covalenthq.com/v1/${id}/tokens/${address}/nft_token_ids/?quote-currency=USD&format=JSON&page-size=5&key=${API_KEY}`)
    let collection = []

    // Request for nft metadata for display pictures
    for(let i of resp.data.data.items){
       let resp2 = await axios.get(`https://api.covalenthq.com/v1/${id}/tokens/${address}/nft_metadata/${i.token_id}/?quote-currency=USD&format=JSON&key=${API_KEY}`)
       collection.push(resp2.data.data.items[0].nft_data[0])
    }

    setNft([...collection])
    setLoader(false)

  }
  
  return (
    <>
        <>
        <div className="banner">
        </div>
        <div className="main">
          <div className="back" onClick={()=>{history.goBack()}}>
            <img src={Back}></img>
          </div>
          <div className="content">
            <div className="info">
              <div className="image">
                {activeLoader ? 
                <img src={Loader}></img>
                :
                  <img className="collection-img" onError={(event) => {
                  event.target.classList.add("error-image")
                  event.target.classList.remove("collection-img")
                  }} src={nft[0] ?.external_data?.image}></img>
                }
              </div>
              <div className="details">
                <h2>Collection Address</h2>
                <h3>{address}</h3>
                <table className="collection-table">
                  <tr className="title-row">
                    <td>Ticker Symbol</td>
                    <td>24hr Volume</td>
                    <td>24hr Sold Count</td>
                  </tr>
                  <tr className ="data-row">
                    <td>{data.collection_ticker_symbol ? data.collection_ticker_symbol : "null"}</td>
                    <td> {data.volume_quote_24h ? formatter.format(data.volume_quote_24h).split('.')[0]  : "null"}</td>
                    <td>{data.unique_token_ids_sold_count_day ? data.unique_token_ids_sold_count_day : "null"}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="bottom-section">
            <h3>NFT Preview</h3>
            {activeLoader ? 
            <div className="collection-load">
              <img src={Loader}></img>
            </div>
            :
            <div className="collection-display">
              {nft && nft.map((o,i)=>{
                return (
                    <div className="nft">
                      <img onError={(event) => {
                        event.target.classList.add("error-image")
                        event.target.classList.remove("collection-img")
                        }} className="collection-img" key={i} src={o ?.external_data?.image} onClick={()=>{history.push(`/nft/${address}/${o.token_id}`)}}>
                      </img>
                  </div>
                )
              })}
            </div>
            }
          </div>
          </div>
          </>
    </>
  );

}