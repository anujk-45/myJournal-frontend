import { useState, useEffect } from "react";

const useFetch = ({url, flag}) => {
  const [isPending, setIsPending] = useState(true);
  const [err, setErr] = useState(null);
  const [data, setData] = useState(null);
  useEffect(()=> {
    console.log("Inside useEffect");
    setTimeout(() => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'flag':flag
        } 
      }).then((response) => {
        setIsPending(false)
        if(!response.ok){
          throw new Error('Unable to fetch blogs')
        }
        return response.json()
      }).then((result) => {
        // console.log("Blog list",result)
        setData(result)
      }).catch((e) => {
        setErr(e);
        console.log(e);
      })
    }, 1000);
  },[url, flag]);

  return {data, isPending, err};
}

export default useFetch;