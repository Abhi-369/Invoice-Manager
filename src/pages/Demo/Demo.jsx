import React, { useEffect, useState } from 'react'
import InvoiceItem from '../../components/InvoiceItem'
import { uid } from 'uid';
import axios from 'axios'
import './Demo.css'
import FileBase64 from 'react-file-base64';
import { useNavigate, useParams } from 'react-router-dom';

const Demo = () => {
    const [items, setItems] = useState([
        {
            id: uid(6),
            Item: '',
            Height: '',
            Width: '',
            TotalSqFt: '',
            Quantity: '',
            RateItemWise: '',
            Total: 0,
            Img: ''
        },
    ])

    const [totalAmount, setTotalAmount] = useState(0)

    const { id } = useParams()
    const navigate = useNavigate()
    console.log("itemid--___", id)

    const [client, setClient] = useState({
        username: '',
        number: 0,
        discount: 0,
        advance: 0,
        afterDelivery: 0
    })

    const [data, setData] = useState([])
    const [clientName, setClientName] = useState('')
    const [clientData, setClientData] = useState()
    const [liveItemTotal, setLiveItemTotal] = useState()
    const [image, setImage] = useState('')
    // const [para, setPara] = useState({
    //     Width: 'Inch',
    //     Height: 'Inch',
    //     Unit: 'Inch'
    // })

    useEffect(() => {
        id &&
            axios.get(`https://invoice-api-m465.onrender.com/api/client/find/${id}`)
                .then((res) => setClientData(res.data))
                .catch((err) => console.log(err))
    }, [])
    console.log("iamge++", image)


    const edtiItemHandler = (e) => {

        const editedItem = {
            id: e?.target?.id,
            name: e?.target?.name,
            value: e?.target?.value
        };

        if (e?.target?.files && e?.target?.files[0]) {

            const photo = e?.target?.files[0]
            const reader = new FileReader();

            reader.onload = async () => await setImage(reader.result)
            reader.readAsDataURL(photo)
        }

        const newItems = items.map((item) => {
            for (const key in item) {
                if (key === editedItem.name && item.id === editedItem.id) {
                    item[key] = editedItem.value;
                }
                if (key === 'TotalSqFt' && item.id === editedItem.id) {
                    item[key] = (item.Height) * (item.Width)
                }
                if (key === 'Total' && item.id === editedItem.id) {
                    item[key] = (item.RateItemWise) * (item.Quantity)
                }
                if (key === 'Img' && item.id === editedItem.id) {
                    console.log("lodu", image)
                    item[key] = image
                }
            }
            return item;
        });

        setItems(newItems);
    }

    console.log("items", items)

    const addItemHandler = (e) => {
        const id = uid(6)
        setItems((items) => [...items, {
            id: id,
            Item: '',
            Height: '',
            Width: '',
            TotalSqFt: '',
            Quantity: '',
            RateItemWise: '',
            Total: 0,
            Img: ''
        }])
    }

    const deleteItem = () => {
        // const res = items.splice(index)
        const res = items.splice(-1)
        const final = items.filter((item) => item.id !== res.id)
        setItems(final)
    }

    const handleChange = (e) => {
        const value = e.target.value
        setClient({ ...client, [e.target.name]: value })
    }

    const total = !clientData ? items?.reduce((a, b) => a = Number(a) + Number(b.Total), 0) : clientData?.products?.reduce((a, b) => a = Number(a) + Number(b.Total), 0)

    useEffect(() => {
        setTotalAmount({ totalAmount: total })
        setData({ products: [...items], ...client, ...totalAmount })
    }, [items, client])


    console.log("data_______", data)

    const handleSubmit = () => {
        axios.post('https://invoice-api-m465.onrender.com/api/client', data)
        // axios.post('http://localhost:5000/api/client', data)

        navigate('/list')
        window.location.reload()
    }

    const handleUpdate = () => {
        axios.put(`https://invoice-api-m465.onrender.com/api/client/${id}`, client)
        // axios.put(`http://localhost:5000/api/client/${id}`, client)
        window.location.reload()
    }



    const handleClient = () => {
        const res = axios.get(`https://invoice-api-m465.onrender.com/api/client/?name=${clientName}`)
            // const res = axios.get(`http://localhost:5000/api/client/?name=${clientName}`)
            .then((res) => setClientData(res.data))
            .catch((err) => console.log(err))
    }

    console.log("bheshhh____________", client)

    const finalPrice = ((total - (!clientData ? client.discount : clientData.discount)) - (!clientData ? client?.advance : clientData?.advance) - (!clientData ? client?.afterDelivery : clientData?.afterDelivery))

    return (
        <div className='flex flex-col items-center justify-center h-screen w-screen relative gap-5'>
            <div className='absolute top-2 left-0 right-0 w-2/4 mx-auto flex bg-[#d8042a] rounded-md overflow-hidden placeholder-white'>
                <input type="text" placeholder='Get Client Data By Search Their Name Or Number' className='w-full bg-transparent outline-none text-white border-none p-2 placeholder-slate-200' onChange={(e) => setClientName(e.target.value)} />
                <button onClick={handleClient} className="outline-none border-l-2 text-white p-2 font-medium ">Search</button>
            </div>
            <div>
                <label className='label'>Name: </label>
                {
                    clientData ? <span className='api__data'>{clientData.username}</span> :
                        <input type="text" placeholder='Username' name='username' autoComplete='on' onChange={handleChange} required className='bg-[#C5C7C6] border-b-2 border-black rounded-md ml-1 p-2 placeholder-gray-500' />
                } &nbsp;
                <label className='label'>Mobile Number: </label>
                {
                    clientData ? <span className='api__data'>{clientData.number}</span> :
                        <input type="number" placeholder='Number' name='number' autoComplete='on' onChange={handleChange} required className='bg-[#C5C7C6] border-b-2 border-black rounded-md ml-1 p-2 placeholder-gray-500' />
                }
            </div>
            <table className='mt-5'>
                <thead className='child:border-2'>
                    <tr className=''>
                        <th colSpan="9" className='p-3'>RETAIL WORK ESTIMATE</th>
                    </tr>
                    <tr className='child:border-2 child:px-3 child:py-2'>
                        <th>Item</th>
                        <th>Height
                            {/* <select name="Height" id="" onChange={(e) => setPara({ ...para, [e.target.name]: e.target.value })}>
                                {clientData ? <option value={clientData.parameter.Height}>{clientData.parameter.Height}</option> :
                                    <>
                                        <option value="Inch" >Inch</option>
                                        <option value="Cm" >Cm</option>
                                    </>
                                }
                            </select> */}
                        </th>
                        <th>Width
                            {/* <select name="Width" id="" onChange={(e) => setPara({ ...para, [e.target.name]: e.target.value })}>
                                {clientData ? <option value={clientData.parameter.Width}>{clientData.parameter.Width}</option> :
                                    <>
                                        <option value="Inch">Inch</option>
                                        <option value="Cm" >Cm</option>
                                    </>
                                }
                            </select> */}
                        </th>
                        <th>Total Sq.Ft
                            {/* <select name="Unit" id="" onChange={(e) => setPara({ ...para, [e.target.name]: e.target.value })}>
                                {clientData ? <option value={clientData.parameter.Width}>{clientData.parameter.Width}</option> :
                                    <>
                                        <option value="Inch">Inch</option>
                                        <option value="Cm" >Cm</option>
                                    </>
                                }
                            </select> */}
                        </th>
                        <th>Quantity</th>
                        <th>Rate Item Wise</th>
                        <th>Total</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientData ? clientData.products.map((item, i) => (
                            <tr key={i} className=''>
                                <td className='bg-[#D8042A] text-white border-4 text-center rounded-xl px-10 py-2 font-semibold'>
                                    <span>{item.Item}</span>
                                </td>
                                <td className='bg-[#D8042A] text-white border-4 text-center rounded-xl px-10 py-2 font-semibold'>
                                    <span>{item.Height}</span>
                                </td>
                                <td className='bg-[#D8042A] text-white border-4 text-center rounded-xl px-10 py-2 font-semibold'>
                                    <span>{item.Width}</span>
                                </td>
                                <td className='bg-[#D8042A] text-white border-4 text-center rounded-xl px-10 py-2 font-semibold'>
                                    <span>{item.TotalSqFt}</span>
                                </td>
                                <td className='bg-[#D8042A] text-white border-4 text-center rounded-xl px-10 py-2 font-semibold'>
                                    <span>{item.Quantity}</span>
                                </td>
                                <td className='bg-[#D8042A] text-white border-4 text-center rounded-xl px-10 py-2 font-semibold'>
                                    <span>{item.RateItemWise}</span>
                                </td>
                                <td className='bg-[#D8042A] text-white border-4 text-center rounded-xl px-10 py-2 font-semibold'>
                                    <span>{item.Total}</span>
                                </td>
                                <td className='bg-[#D8042A] text-white border-4 text-center rounded-xl px-10 py-2 font-semibold'>
                                    <img src={item.Img} alt="" className='img' />
                                </td>
                            </tr>

                        )) :
                            items.map((item, i) => (
                                <tr key={i}>
                                    <td>
                                        <input type="text" placeholder='Item' name='Item' autoComplete='on' id={item.id} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px w-32 bg-[#d8042a] text-white rounded-md' />
                                    </td>
                                    <td>
                                        <input type="number" placeholder='Height' name='Height' id={item.id} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px w-32 bg-[#d8042a] text-white rounded-md' />
                                    </td>
                                    <td>
                                        <input type="number" placeholder='Width' name='Width' id={item.id} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px w-32 bg-[#d8042a] text-white rounded-md' />
                                    </td>

                                    <td>
                                        <input type="number" placeholder="TotalSqFt" name='TotalSqFt' id={item.id} value={item.TotalSqFt} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px w-32 bg-[#d8042a] text-white rounded-md' />
                                    </td>
                                    <td>
                                        <input type="number" placeholder="Quantity" name='Quantity' id={item.id} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px w-32 bg-[#d8042a] text-white rounded-md' />
                                    </td>
                                    <td>
                                        <input type="number" placeholder="RateItemWise" name='RateItemWise' id={item.id} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px w-32 bg-[#d8042a] text-white rounded-md' />
                                    </td>

                                    <td>
                                        <input type="number" placeholder="Total" name='Total' id={item.id} value={item.Total} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px w-32 bg-[#d8042a] text-white rounded-md' />
                                    </td>
                                    <td>
                                        <input type="file" name='Img' id={item.id} onChange={edtiItemHandler} className='border-none outline-none p-3 mx-px w-44 bg-[#d8042a] text-white rounded-md' />
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </table>
            <div>
                {
                    !clientData && <>
                        <button onClick={addItemHandler} disabled={clientData} className='bg-[#d8042a] px-6 py-2 rounded-md text-white font-medium mr-5'>
                            Add Item
                        </button>
                        {(!clientData && (items.length > 1)) &&
                            <button onClick={deleteItem} disabled={''} className='bg-[#d8042a] px-6 py-2 rounded-md text-white font-medium'>
                                Remove Item
                            </button>
                        }
                    </>
                }
            </div>
            <div className='child:border-b-4 child:m-5 child:border-red-600 child:p-1 text-[#b41733] text-lg font-medium '>
                <div>
                    <label>Total Amount: </label>
                    <span>{total}</span>
                </div>
                <div>
                    <label>Discount: </label>
                    {clientData ? <span>{clientData?.discount}</span> :
                        <input type="number" placeholder='Discount' name='discount' onChange={handleChange} disabled={clientData} className='border-none outline-none py-2 placeholder-gray-200 text-center mx-px bg-[#d8042a] text-white rounded-md' />
                    }
                </div>
                <div>
                    <label>Advance: </label>
                    {clientData ? <span>{clientData?.advance}</span> :
                        <input type="number" placeholder='Advance' name='advance' onChange={handleChange} disabled={clientData} className='border-none outline-none py-2 placeholder-gray-200 text-center mx-px bg-[#d8042a] text-white rounded-md' />
                    }
                </div>
                {id && <>
                    <div>
                        <label>Payment After Delivery: </label>
                        <input type="number" placeholder='Amount' name='afterDelivery' id='onEditPayment' defaultValue={clientData && clientData?.afterDelivery} disabled={finalPrice === 0} onChange={handleChange} className='border-none outline-none py-2 placeholder-gray-200 text-center mx-px bg-[#d8042a] text-white rounded-md' />
                    </div>

                    <div>
                        <label>Total Payed Amount: </label>
                        <span>{clientData?.advance + clientData?.discount + clientData?.afterDelivery}</span>
                    </div>
                    {(finalPrice === 0) &&
                        <div>
                            <button className='w-full p-2 cursor-default'>Payment is Cleared!</button>
                        </div>
                    }
                </>
                }
                {id && finalPrice !== 0 &&
                    <div>
                        <label>Total Pending Payment: </label>
                        <span>{finalPrice}</span>
                    </div>
                }
            </div>
            {
                !clientData && <button onClick={handleSubmit} className='bg-[#d8042a] px-5 py-2 rounded-md text-white font-medium'>Submit</button>
            }
            {
                (id && finalPrice !== 0) && <div className='flex gap-5'>
                    <button onClick={handleUpdate} className='bg-[#d8042a] px-5 py-2 rounded-md text-white font-medium cursor-pointer'>Update Payment</button>
                    <label htmlFor='onEditPayment' className='bg-[#d8042a] px-5 py-2 rounded-md text-white font-medium cursor-pointer'>Edit Payment</label>
                </div>
            }
        </div >
    )
}

export default Demo;
