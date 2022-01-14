import React, {useEffect, useState} from 'react'
import SelectDropdown from '../../comps/selectDropdown'
import Table from '../../comps/table'
import { useHistory } from "react-router-dom";
import { CONFIG } from '../../config'
import Loader from '../../assets/covalent-logo-loop_dark_v2.gif'
import axios from 'axios';
import './style.css'


export default function LandingPage() {
    const history = useHistory();
    const [chain, setChain] = useState(1)
    const [market, setMarket] = useState([])
    const [activeLoader, setLoader] = useState(true)
    const API_KEY = process.env['REACT_APP_COVALENT_API']

  
    useEffect(()=>{
      handleMarket(chain)
    },[chain])

    // Request for market (global view)
    const handleMarket = async(id) => {
      const resp = await axios.get(`https://api.covalenthq.com/v1/${id}/nft_market_cap/?&key=${API_KEY}`)
      setMarket(resp.data.data.items)
      setLoader(false)
    }

    return (
      <>
      <div className="banner">
      </div>
      <div className = "main">
        <div className="content">
          <div className="select-chain">
            <SelectDropdown
                options={CONFIG.FILTER_OPTIONS}
                onChange={(e)=>{setChain(e.target.value)}}
            />
          </div>
          {activeLoader ? 
          <div className="load">
            <img  src={Loader}></img>
          </div> 
          :
          <Table
            onClick={(id) =>{ history.push(`/collection/${id}/${chain}`)}}
            data={market}
          />
          }
        </div>
      </div>
      </>
    )
  
}