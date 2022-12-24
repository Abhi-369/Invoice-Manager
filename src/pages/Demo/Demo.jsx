import React, { useEffect, useState } from 'react'
import { uid } from 'uid';
import axios from 'axios'
import './Demo.css'
import { useNavigate, useParams } from 'react-router-dom';
import { BiMinusCircle } from 'react-icons/bi'
import { Rings } from 'react-loader-spinner';

const Demo = () => {

    const [dropDownData, setDropDownData] = useState()

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
    const [arr, setArr] = useState()
    const [indexOfItem, setIndexOfItem] = useState()
    const [clientName, setClientName] = useState('')
    const [clientData, setClientData] = useState()
    const [image, setImage] = useState('')
    // const [para, setPara] = useState({
    //     Width: 'Inch',
    //     Height: 'Inch',
    //     Unit: 'Inch'
    // })

    const heading = [
        'Height',
        'Width',
        'Total Sq.Ft',
        'Quantity',
        'Rate Item Wise',
        'Total',
        'Image'
    ]

    useEffect(() => {
        id &&
            axios.get(`https://invoice-api-m465.onrender.com/api/client/find/${id}`)
                .then((res) => setClientData(res.data))
                .catch((err) => console.log(err))
    }, [])
    console.log("iamge++", image)

    useEffect(() => {
        async function fetchData() {
            const res = localStorage.getItem('dropDown') && JSON.parse(localStorage.getItem('dropDown'))
            console.log("res>data", res)
            setDropDownData([...new Set(res)])
        }
        fetchData()
    }, [arr])

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

    const handleSubmit = async () => {
        await axios.post('https://invoice-api-m465.onrender.com/api/client', data)
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

    const handleDropDownValue = (e) => {
        const val = e.target.value
        const result = val.split(', ')
        setArr(result)
    }

    const handleSave = () => {
        const user = JSON.parse(localStorage.getItem('dropDown'))
        !user ? localStorage.setItem('dropDown', JSON.stringify(arr)) : localStorage.setItem('dropDown', JSON.stringify([...user, ...arr]))
        window.location.reload()
    }

    const handleRemoveValue = async (e) => {
        const storage = await localStorage.getItem('dropDown') && JSON.parse(localStorage.getItem('dropDown'))
        const val = e.target.value
        const result = val
        const index = storage.indexOf(result)
        setIndexOfItem(index)
    }

    const handleRemove = async () => {
        const storage = await localStorage.getItem('dropDown') && JSON.parse(localStorage.getItem('dropDown'))
        const res = storage.filter((item) => item !== storage[indexOfItem])
        await localStorage.setItem('dropDown', JSON.stringify(res));
        window.location.reload()
        // setDropDownData(res)
    }

    const finalPrice = ((total - (!clientData ? client.discount : clientData.discount)) - (!clientData ? client?.advance : clientData?.advance) - (!clientData ? client?.afterDelivery : clientData?.afterDelivery))

    return (
        <>
            {(!clientData && id) ?
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
                </div> :
                <div className="relative h-screen border-2 w-screen">
                    {
                        id &&
                        <nav className='flex bg-[#d8042a] max-w-2xl mx-auto m-1 rounded-md overflow-hidden placeholder-white'>
                            <input type="text" placeholder='Get Client Data By Search Their Name Or Number' className='w-full bg-transparent outline-none text-white border-none p-2 placeholder-slate-200' onChange={(e) => setClientName(e.target.value)} />
                            <button onClick={handleClient} className="outline-none border-l-2 text-white p-2 font-medium ">Search</button>
                        </nav>
                    }

                    {!id &&
                        <div className='mt-4'>
                            <div className='flex items-start gap-3 pl-3 mb-2'>
                                <input type="text" placeholder="Type Item Name Here" className="border-2 border-[#d8042a] rounded-lg outline-none px-2 py-1" onChange={handleDropDownValue} />
                                <button className='bg-[#d8042a] text-white px-3 py-1 rounded-md font-medium' onClick={handleSave}>Save</button>
                            </div>
                            <div className='flex items-start gap-3 pl-3'>
                                <input type="text" placeholder="Type One Value at Once" className="border-2 border-[#d8042a] rounded-lg outline-none px-2 py-1" onChange={handleRemoveValue} />
                                <button className='bg-[#d8042a] text-white px-3 py-1 rounded-md font-medium' onClick={handleRemove}>Remove</button>
                            </div>
                        </div>
                    }

                    <div className='flex sm:flex-row flex-col items-center justify-center my-5 child:flex child:items-center gap-5'>
                        <div>
                            <label className='font-semibold sm:text-xl text-base'>Name: </label>
                            {
                                clientData ? <span className='api__data'>{clientData.username}</span> :
                                    <input type="text" placeholder='Username (Required)' name='username' autoComplete='on' onChange={handleChange} required className='bg-[#C5C7C6] border-b-2 border-black rounded-md ml-1 px-2 py-1 placeholder-gray-500' />
                            } &nbsp;
                        </div>
                        <div>
                            <label className='font-semibold sm:text-xl text-base whitespace-nowrap'>Mobile Number: </label>
                            {
                                clientData ? <span className='api__data'>{clientData.number}</span> :
                                    <input type="number" placeholder='Number (Required)' name='number' autoComplete='on' onChange={handleChange} required className='bg-[#C5C7C6] border-b-2 border-black rounded-md ml-1 px-2 py-1 placeholder-gray-500' />
                            }
                        </div>
                    </div>
                    <div className='w-[99vw] mx-auto overflow-x-auto'>
                        <table className='mt-3'>
                            <thead className='child:border-2'>
                                <tr className=''>
                                    <th colSpan="8" className='p-3'>RETAIL WORK ESTIMATE</th>
                                </tr>
                                <tr className='child:border-2 child:px-3 child:py-2'>
                                    <th>Item</th>
                                    <th>Height</th>
                                    <th>Width</th>
                                    <th>Total Sq.Ft</th>
                                    <th>Quantity</th>
                                    <th>Rate Item Wise</th>
                                    <th>Total</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {
                                    clientData ? clientData.products.map((item, i) => (
                                        <tr key={i} className=''>
                                            <td className='bg-[#d8042a] text-white rounded-lg text-center px-5 py-1 border-2'>
                                                <input type='text' defaultValue={item.Item} disabled={true} className='bg-transparent outline-none w-full' />
                                            </td>
                                            <td className='bg-[#d8042a] text-white rounded-lg text-center px-5 py-1 border-2'>
                                                <input type='number' defaultValue={item.Height} disabled={true} className='bg-transparent outline-none w-full' />
                                            </td>
                                            <td className='bg-[#d8042a] text-white rounded-lg text-center px-5 py-1 border-2'>
                                                <input type='number' defaultValue={item.Width} disabled={true} className='bg-transparent outline-none w-full' />
                                            </td>
                                            <td className='bg-[#d8042a] text-white rounded-lg text-center px-5 py-1 border-2'>
                                                <input type='number' defaultValue={item.TotalSqFt} disabled={true} className='bg-transparent outline-none w-full' />
                                            </td>
                                            <td className='bg-[#d8042a] text-white rounded-lg text-center px-5 py-1 border-2'>
                                                <input type='number' defaultValue={item.Quantity} disabled={true} className='bg-transparent outline-none w-full' />
                                            </td>
                                            <td className='bg-[#d8042a] text-white rounded-lg text-center px-5 py-1 border-2'>
                                                <input type='number' defaultValue={item.RateItemWise} disabled={true} className='bg-transparent outline-none w-full' />
                                            </td>
                                            <td className='bg-[#d8042a] text-white rounded-lg text-center px-5 py-1 border-2'>
                                                <input type='number' defaultValue={item.Total} disabled={true} className='bg-transparent outline-none w-full' />
                                            </td>
                                            <td className='bg-[#d8042a] text-white rounded-lg text-center px-5 py-1 border-2 w-32'>
                                                <img src={item.Img} alt="" className='img' />
                                            </td>
                                        </tr>

                                    )) :
                                        items.map((item, i) => (
                                            <tr key={i} className='border-2'>
                                                <td className='bg-[#d8042a] text-white rounded-md border-2'>
                                                    {/* <input type="text" placeholder='Item' name='Item' autoComplete='on' id={item.id} onChange={edtiItemHandler} className='bg-transparent outline-none w-full' /> */}
                                                    <select name="Item" id={item.id} className="bg-transparent outline-none" onChange={edtiItemHandler}>
                                                        <option disabled selected className='bg-[#d8042a] outline-none disabled:bg-gray-200'>select item</option>
                                                        {dropDownData?.map((item) =>
                                                            <option value={item} className='bg-[#d8042a] outline-none flex items-center'>{item}</option>

                                                        )}
                                                    </select>
                                                </td>
                                                <td className='bg-[#d8042a] text-white rounded-md border-2'>
                                                    <input type="number" placeholder='Height' name='Height' id={item.id} onChange={edtiItemHandler} className='bg-transparent outline-none w-full' />
                                                </td>
                                                <td className='bg-[#d8042a] text-white rounded-md border-2'>
                                                    <input type="number" placeholder='Width' name='Width' id={item.id} onChange={edtiItemHandler} className='bg-transparent outline-none w-full' />
                                                </td>

                                                <td className='bg-[#d8042a] text-white rounded-md border-2'>
                                                    <input type="number" placeholder="TotalSqFt" name='TotalSqFt' id={item.id} value={item.TotalSqFt} onChange={edtiItemHandler} className='bg-transparent outline-none w-full' />
                                                </td>
                                                <td className='bg-[#d8042a] text-white rounded-md border-2'>
                                                    <input type="number" placeholder="Quantity" name='Quantity' id={item.id} onChange={edtiItemHandler} className='bg-transparent outline-none w-full' />
                                                </td>
                                                <td className='bg-[#d8042a] text-white rounded-md border-2'>
                                                    <input type="number" placeholder="RateItemWise" name='RateItemWise' id={item.id} onChange={edtiItemHandler} className='bg-transparent outline-none w-full' />
                                                </td>

                                                <td className='bg-[#d8042a] text-white rounded-md border-2'>
                                                    <input type="number" placeholder="Total" name='Total' id={item.id} value={item.Total} onChange={edtiItemHandler} className='bg-transparent outline-none w-full' />
                                                </td>
                                                <td className='bg-[#d8042a] text-white rounded-md'>
                                                    <input type="file" name='Img' id={item.id} onChange={edtiItemHandler} />
                                                </td>
                                            </tr>
                                            // <tr key={i}>
                                            //     <td>
                                            //         <input type="text" placeholder='Item' name='Item' autoComplete='on' id={item.id} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px xl:w-32 md:w-16 w-12  bg-[#d8042a] text-white rounded-md' />
                                            //     </td>
                                            //     <td>
                                            //         <input type="number" placeholder='Height' name='Height' id={item.id} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px xl:w-32 md:w-16 w-12  bg-[#d8042a] text-white rounded-md' />
                                            //     </td>
                                            //     <td>
                                            //         <input type="number" placeholder='Width' name='Width' id={item.id} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px xl:w-32 md:w-16 w-12  bg-[#d8042a] text-white rounded-md' />
                                            //     </td>

                                            //     <td>
                                            //         <input type="number" placeholder="TotalSqFt" name='TotalSqFt' id={item.id} value={item.TotalSqFt} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px xl:w-32 md:w-16 w-12  bg-[#d8042a] text-white rounded-md' />
                                            //     </td>
                                            //     <td>
                                            //         <input type="number" placeholder="Quantity" name='Quantity' id={item.id} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px xl:w-32 md:w-16 w-12  bg-[#d8042a] text-white rounded-md' />
                                            //     </td>
                                            //     <td>
                                            //         <input type="number" placeholder="RateItemWise" name='RateItemWise' id={item.id} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px xl:w-32 md:w-16 w-12  bg-[#d8042a] text-white rounded-md' />
                                            //     </td>

                                            //     <td>
                                            //         <input type="number" placeholder="Total" name='Total' id={item.id} value={item.Total} onChange={edtiItemHandler} className='border-none outline-none p-3 placeholder-gray-200 text-center mx-px xl:w-32 md:w-16 w-12  bg-[#d8042a] text-white rounded-md' />
                                            //     </td>
                                            //     <td>
                                            //         <input type="file" name='Img' id={item.id} onChange={edtiItemHandler} className='border-none outline-none p-3 mx-px xl:w-44 w-32 bg-[#d8042a] text-white rounded-md' />
                                            //     </td>
                                            // </tr>
                                        ))}
                            </tbody>
                        </table >
                    </div >
                    <div className='flex items-center justify-center mt-3'>
                        {
                            !clientData && <>
                                <button onClick={addItemHandler} disabled={clientData} className='bg-[#d8042a] px-6 py-2 rounded-md text-white font-medium mr-5 hover:bg-red-700'>
                                    Add Item
                                </button>
                                {(!clientData && (items.length > 1)) &&
                                    <button onClick={deleteItem} disabled={''} className='bg-[#d8042a] px-6 py-2 rounded-md text-white font-medium hover:bg-red-700'>
                                        Remove Item
                                    </button>
                                }
                            </>
                        }
                    </div>
                    <div className='child:border-b-4 child:m-5 child:border-red-600 child:p-1 child:text-center flex items-center justify-center sm:gap-10 text-[#b41733] sm:text-lg text-sm font-medium'>
                        <div>
                            <label>Total Amount: </label>
                            <span>{total}</span>
                        </div>
                        <div>
                            <label>Discount: </label>
                            {clientData ? <span>{clientData?.discount}</span> :
                                <input type="number" placeholder='Discount' name='discount' onChange={handleChange} disabled={clientData} className='border-none outline-none py-px placeholder-gray-200 text-center mx-px bg-[#d8042a] text-white rounded-md sm:w-auto w-[100px]' />
                            }
                        </div>
                        <div>
                            <label>Advance: </label>
                            {clientData ? <span>{clientData?.advance}</span> :
                                <input type="number" placeholder='Advance' name='advance' onChange={handleChange} disabled={clientData} className='border-none outline-none py-px placeholder-gray-200 text-center mx-px bg-[#d8042a] text-white rounded-md sm:w-auto w-[100px]' />
                            }
                        </div>
                        {(id || clientData) && <>
                            <div>
                                <label>Payment After Delivery: </label>
                                <input type="number" placeholder='Amount' name='afterDelivery' id='onEditPayment' defaultValue={clientData && clientData?.afterDelivery} disabled={finalPrice === 0} onChange={handleChange} className='border-none outline-none py-px placeholder-gray-200 text-center mx-px bg-[#d8042a] text-white rounded-md' />
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
                        {((id && finalPrice !== 0) || (clientData && finalPrice !== 0)) &&
                            <div>
                                <label>Total Pending Payment: </label>
                                <span>{finalPrice}</span>
                            </div>
                        }
                    </div>
                    {
                        !clientData &&
                        <div className='flex justify-center'>
                            <button onClick={handleSubmit} className='bg-[#d8042a] px-20 py-2 rounded-md text-white font-medium mt-10 hover:bg-red-700 active:scale-95 transition-all duration-100 ease-in'>Submit</button>
                        </div>
                    }
                    {
                        ((id && finalPrice !== 0) || (clientData && finalPrice !== 0)) && <div className='flex gap-5 items-center justify-center'>
                            <button onClick={handleUpdate} className='bg-[#d8042a] px-5 py-2 rounded-md text-white font-medium cursor-pointer'>Update Payment</button>
                            <label htmlFor='onEditPayment' className='bg-[#d8042a] px-5 py-2 rounded-md text-white font-medium cursor-pointer'>Edit Payment</label>
                        </div>
                    }
                </div>}
        </>

    )
}

export default Demo;