import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Grid, Rings } from 'react-loader-spinner'

const Report = () => {

    const [data, setData] = useState()

    useEffect(() => {
        // axios.get('http://localhost:5000/api/client/report')
        axios.get('https://invoice-api-m465.onrender.com/api/client/report')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
    }, [])

    const length = data?.length

    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <>
            {!data ?
                <div className="flex items-center justify-center h-screen">
                    <Rings
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="6"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="rings-loading"
                    />
                </div>
                :
                <div className="border w-[80vw] h-screen flex flex-col items-center m-auto">
                    <header className='flex justify-between w-full text-2xl font-medium px-10 py-5'>
                        <h3>Invoices</h3>
                        <div className='flex items-center gap-4'>
                            <Link to='/update'>
                                <h2 className='underline'>{user}</h2>
                            </Link>
                            <Link to='/'>
                                <h3 className='border px-3 py-1 rounded-md text-white bg-red-600 cursor-pointer'>New Invoice</h3>
                            </Link>
                        </div>
                    </header>
                    <div className=''>
                        <div className='flex justify-around w-[80vw]'>
                            <div className='flex flex-col gap-5 items-center'>
                                <h1 className='text-2xl font-medium my-5 text-center'>No.</h1>
                                {data?.map((item, index) =>
                                    <span className='text-xl font-medium mr-2'>{index + 1}</span>
                                )}
                            </div>
                            <div className='flex flex-col gap-5'>
                                <h1 className='text-2xl font-medium my-5 text-center'>Client</h1>
                                {data?.map((item) =>
                                    <span className='text-xl font-medium'>{item.username}</span>
                                )}
                            </div>
                            <div className='flex flex-col gap-5 items-center'>
                                <h1 className='text-2xl font-medium my-5 text-center'>Date</h1>
                                {data?.map((item) =>
                                    <span className='text-xl font-medium'>{moment(item.createdAt).format("DD/MM/YYYY | HH:mm")}</span>
                                )}
                            </div>
                            {/* <div className='flex flex-col gap-5 items-center'>
                        <h1 className='text-2xl font-medium my-5 text-center'>Clear Payment</h1>
                        {data?.map((item) =>
                            <span className='text-xl font-medium'>{!item?.advance ? '-' : item.advance}</span>
                        )}
                    </div> */}
                            <div className='flex flex-col gap-5 items-center'>
                                <h1 className='text-2xl font-medium my-5 text-center'>Pending Payment</h1>
                                {data?.map((item) =>
                                    <span className='text-xl font-medium'>{!item.totalAmount ? '-' : (item?.totalAmount - item?.discount) - item?.advance - item?.afterDelivery}</span>
                                )}
                            </div>
                            <div className='flex flex-col gap-5 items-center'>
                                <h1 className='text-2xl font-medium my-5 text-center'>Total Amount</h1>
                                {data?.map((item) =>
                                    <div className='flex items-center gap-5 relative'>
                                        <span className='text-xl font-medium w-12'>{!item?.totalAmount ? '-' : (item?.totalAmount)}</span>
                                        <Link to={{ pathname: `/${item._id}`, query: { id: item._id } }}>
                                            <button className='border px-2 py-1 rounded-md bg-red-600 text-white font-medium absolute top-[-5px]'>Details</button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default Report;
