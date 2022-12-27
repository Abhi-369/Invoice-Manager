import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Rings } from 'react-loader-spinner'
import '@progress/kendo-theme-default/dist/all.css';
import { PDFExport } from '@progress/kendo-react-pdf';

const Report = () => {

    const [data, setData] = useState()
    const pdfExportComponent = useRef(null)
    const [showPending, setShowPending] = useState(true) //for toggling
    const [pending, setPending] = useState(false)

    useEffect(() => {
        function fetchData() {
            // axios.get('http://localhost:5000/api/client/report')
            axios.get('https://invoice-api-m465.onrender.com/api/client/report')
                .then((res) => setData(res.data))
                .catch((err) => console.log(err))
        }
        fetchData()
    }, [])

    const res = data?.sort((a, b) => (b.totalAmount - b.discount - b.advance - b.afterDelivery) - (a.totalAmount - a.discount - a.advance - a.afterDelivery))

    function getPending() {
        if (showPending) {
            const pendingValue = data?.filter((item) => item.totalAmount - item.discount - item.advance - item.afterDelivery !== 0)
            pendingValue?.sort((a, b) => (b.totalAmount - b.discount - b.advance - b.afterDelivery) - (a.totalAmount - a.discount - a.advance - a.afterDelivery))
            setPending(pendingValue)
        } else {
            setPending(null)
            setData(res)
        }
        setShowPending(!showPending)
    }

    const user = JSON.parse(localStorage.getItem('user'))

    function printDocument() {
        pdfExportComponent.current.save()
    }

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
                <div className="md:border-2 lg:w-[80vw] w-screen h-auto flex flex-col items-center mx-auto py-10">
                    <header className='flex justify-between w-full md:text-2xl text-xl font-medium md:px-10 px-2 py-5'>
                        <h3>Invoices</h3>
                        <button onClick={getPending} className='border px-3 py-1 rounded-md text-xl text-white bg-red-600 hover:bg-red-700 sm:block hidden'>{`${!showPending ? 'View All' : 'View All Pending'}`}</button>
                        <button onClick={printDocument} className='border px-3 py-1 rounded-md text-xl text-white bg-red-600 hover:bg-red-700 sm:block hidden'>Export to PDF</button>
                        <div className='flex items-center gap-4'>
                            <Link to='/update'>
                                <h2 className='underline'>{user}</h2>
                            </Link>
                            <Link to='/'>
                                <h3 className='border px-3 py-1 rounded-md text-xl text-white bg-red-600 hover:bg-red-700 cursor-pointer'>New Invoice</h3>
                            </Link>
                        </div>
                    </header>

                    <div className='overflow-x-auto overflow-y-hidden'>
                        <PDFExport ref={pdfExportComponent} margin="3cm">
                            <div className='md:flex justify-around lg:w-[80vw] w-screen grid grid-cols-5'>
                                <div className='flex flex-col gap-5 items-center'>
                                    <h1 className='md:text-2xl text-sm font-medium my-5 text-center'>No.</h1>
                                    {(!pending ? data : pending)?.map((item, index) =>
                                        <span key={index} className='md:text-xl text-sm font-medium mr-2'>{index + 1}</span>
                                    )}
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <h1 className='md:text-2xl text-sm font-medium my-5 text-center'>Client</h1>
                                    {(!pending ? data : pending)?.map((item, i) =>
                                        <span key={i} className='md:text-xl text-sm font-medium'>{item.username}</span>
                                    )}
                                </div>
                                <div className='flex flex-col gap-5 items-center'>
                                    <h1 className='md:text-2xl text-sm font-medium my-5 text-center'>Date</h1>
                                    {(!pending ? data : pending)?.map((item, i) =>
                                        <span key={i} className='md:text-xl text-sm font-medium whitespace-nowrap'>{moment(item.createdAt).format("DD/MM/YYYY | HH:mm")}</span>
                                    )}
                                </div>
                                <div className='flex flex-col gap-5 items-center'>
                                    <h1 className='md:text-2xl text-sm font-medium my-5 text-center whitespace-nowrap'>Pending</h1>
                                    {(!pending ? data : pending)?.map((item, i) =>
                                        <span key={i} className='md:text-xl text-sm font-medium'>{!item.totalAmount ? '-' : (item?.totalAmount - item?.discount) - item?.advance - item?.afterDelivery}</span>
                                    )}
                                </div>
                                <div className='flex flex-col gap-5 items-center'>
                                    <h1 className='md:text-2xl text-sm font-medium my-5 text-center whitespace-nowrap'>Total</h1>
                                    {(!pending ? data : pending)?.map((item, i) =>
                                        <div key={i} className='flex items-center md:gap-5 relative'>
                                            <span className='md:text-xl text-sm font-medium w-12'>{!item?.totalAmount ? '-' : (item?.totalAmount)}</span>
                                            <Link to={{ pathname: `/${item._id}`, query: { id: item._id } }}>
                                                <button className='border px-2 py-1 rounded-md bg-red-600 text-white font-medium absolute top-[-5px]'>Details</button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </PDFExport>

                    </div>
                </div>
            }
        </>
    )
}

export default Report;
