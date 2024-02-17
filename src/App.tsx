import { useEffect,useState } from "react"

interface Book{
  img: string,
  link: string,
  price: string,
  store: string,
  title: string
}

export default function page() {
  const [data, setData] = useState([] as Book[])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  async function sortData(v: string){
    if(v === 'MaxToMin'){
      setData([...data].sort((a, b)=>(
        Number(b.price.split('$')[1]) - Number(a.price.split('$')[1])
      )))
    }
    if(v === 'MinToMax'){
      setData([...data].sort((a, b)=>(
        Number(a.price.split('$')[1]) - Number(b.price.split('$')[1])
      )))
    }
  }
  
  useEffect(()=> {
    async function getData(){
      try{
        const res = await fetch(import.meta.env.VITE_URL)
        const data = await res.json()
        setData(data)
      }catch(e){
        console.log((e as Error).message)
      }
    }

    getData()
  },[])

  return (
    <>
      <header className="px-8 py-2 flex justify-around my-6 flex-wrap">
        <div className="w-full mb-5 flex justify-center">
          <h1 className="absolute top-0 left-0 text-transparent">書蟲</h1>
          <input onChange={(e)=> setSearch(e.target.value.toLowerCase().trim())}
                    placeholder="輸入書名"
                    className='bg-[#fff] w-[400px] h-12 border-2 border-[#000] p-2.5 my-2.5 block text-center text-[25px]'
          />
        </div>
        <nav className="w-[1100px] flex justify-evenly">
          <button onClick={()=>sortData('MaxToMin')}>價格(大~小)</button>
          <button onClick={()=>sortData('MinToMax')}>價格(小~大)</button>
          <button onClick={()=>setFilter('')}>全部書店</button>
          <button onClick={()=>setFilter('TAAZE讀冊生活')}>讀冊生活</button>
          <button onClick={()=>setFilter('博客來')}>博客來</button>
          <button onClick={()=>setFilter('誠品線上')}>誠品線上</button>
          <button onClick={()=>setFilter('墊腳石')}>墊腳石</button>
          <button onClick={()=>setFilter('金石堂')}>金石堂</button>
          <button onClick={()=>setFilter('天瓏網路書店')}>天瓏網路書店</button>
        </nav>
      </header>
      <div className=" w-full flex justify-center flex-wrap">
        <div className="flex flex-wrap justify-center lg:justify-start w-[1024px]">
          {
            data?.filter(book => filter ? (book.store === filter) : true )
            .filter(book => book.title.toLowerCase().includes(search) ? book.title : '' )
            .map(book => (
              <a key={crypto.randomUUID()} 
                href={book.link} 
                className="relative bg-[#fff] border-2 block w-[180px] m-3 px-2 pt-3 pb-5 shadow-lg rounded-sm border-[#ffd278] hover:border-[#c89a40cd] hover:shadow-xl hover:font-semibold"
              >
                <h2 className="absolute top-[-15px] left-1/2 translate-x-[-50%] bg-[#ffc574] border-2 px-2.5 py-0.5 border-[#000] font-bold w-[140px] text-center">
                  {book.store}
                </h2>
                <h3 className="h-12 overflow-hidden my-2">
                  {book.title}
                </h3>
                <img src={book.img} alt={book.title} width={200} height={150} loading="lazy"/>
                <div className="mt-3 mr-3 text-right absolute bottom-0 right-0 text-[#d84c37] font-bold">
                  NT. {book.price}
                </div>
              </a>
            ))
          }
        </div>
        <footer className="md:px-5 md:text-[18px]">
          © 2024 All Rights Reserved. Designed By Wayne
        </footer>
      </div>
    </>
  )
}