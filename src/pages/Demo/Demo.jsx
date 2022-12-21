import React, { useEffect, useState } from 'react'
import InvoiceItem from '../../components/InvoiceItem'
import { uid } from 'uid';
import axios from 'axios'
import './Demo.css'
import FileBase64 from 'react-file-base64';

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
            RateSqFtWise: '',
            Total: 0,
            Img: ''
        },
    ])

    const [client, setClient] = useState({
        username: '',
        number: 0,
        discount: 0,
        advance: 0
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
                    item[key] = item.RateItemWise ? (item.RateItemWise) * (item.Quantity) : (item.RateSqFtWise) && (item.TotalSqFt) * (item.Quantity)
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
            RateSqFtWise: '',
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

    console.log("bheshhh____________", client)

    useEffect(() => {
        setData({ products: [...items], ...client })
    }, [items, client])

    console.log("data_______", data)
    const handleSubmit = () => {
        const res = axios.post('https://invoice-api-m465.onrender.com/api/client', data)
        console.log(res.data)
        window.location.reload()
    }

    const handleClient = () => {
        const res = axios.get(`https://invoice-api-m465.onrender.com/api/client/?name=${clientName}`)
            .then((res) => setClientData(res.data))
            .catch((err) => console.log(err))
    }

    const total = !clientData ? items?.reduce((a, b) => a = Number(a) + Number(b.Total), 0).toFixed(2) : clientData?.products?.reduce((a, b) => a = Number(a) + Number(b.Total), 0).toFixed(2)

    console.log("totola", Number(total))

    const figure = !clientData ? (total * client.discount / 100).toFixed(2) : (total * clientData?.discount / 100).toFixed(2)

    const finalPrice = ((total - figure) - (!clientData ? client?.advance : clientData?.advance)).toFixed(2)

    return (
        <div className='body'>
            <div className='search'>
                <input type="text" placeholder='Get Client Data By Search Their Name Or Number' onChange={(e) => setClientName(e.target.value)} />
                <button onClick={handleClient}>Search</button>
            </div>
            <div>
                <label className='label'>Name: </label>
                {
                    clientData ? <span className='api__data'>{clientData.username}</span> :
                        <input type="text" placeholder='username' name='username' onChange={handleChange} required className='client__data' />
                } &nbsp;
                <label className='label'>Mobile Number: </label>
                {
                    clientData ? <span className='api__data'>{clientData.number}</span> :
                        <input type="number" placeholder='number' name='number' onChange={handleChange} required className='client__data' />
                }
            </div>
            <table style={{ marginTop: '40px' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid lightgray' }}>
                        <th colSpan="9">RETAIL WORK ESTIMATE</th>
                    </tr>
                    <tr>
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
                        <th>Rate Sq.Ft Wise</th>
                        <th>Total</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientData ? clientData.products.map((item, i) => (
                            <tr key={i}>
                                <td className='span'>
                                    <span>{item.Item}</span>
                                </td>
                                <td className='span'>
                                    <span>{item.Height}</span>
                                </td>
                                <td className='span'>
                                    <span>{item.Width}</span>
                                </td>
                                <td className='span'>
                                    <span>{item.TotalSqFt}</span>
                                </td>
                                <td className='span'>
                                    <span>{item.Quantity}</span>
                                </td>
                                <td className='span'>
                                    <span>{item.RateItemWise}</span>
                                </td>
                                <td className='span'>
                                    <span>{item.RateSqFtWise}</span>
                                </td>
                                <td className='span'>
                                    <span>{item.Total}</span>
                                </td>
                                <td className='span'>
                                    <img src={item.Img} alt="" className='img' />
                                </td>
                            </tr>

                        )) :
                            items.map((item, i) => (
                                <tr key={i}>
                                    <td>
                                        <input type="text" placeholder='Item' name='Item' id={item.id} onChange={edtiItemHandler} />
                                    </td>
                                    <td>
                                        <input type="number" placeholder='Height' name='Height' id={item.id} onChange={edtiItemHandler} />
                                    </td>
                                    <td>
                                        <input type="number" placeholder='Width' name='Width' id={item.id} onChange={edtiItemHandler} />
                                    </td>

                                    <td>
                                        <input type="number" placeholder="TotalSqFt" name='TotalSqFt' id={item.id} value={item.TotalSqFt} onChange={edtiItemHandler} />
                                    </td>
                                    <td>
                                        <input type="number" placeholder="Quantity" name='Quantity' id={item.id} onChange={edtiItemHandler} />
                                    </td>
                                    <td>
                                        <input type="number" placeholder="RateItemWise" name='RateItemWise' id={item.id} onChange={edtiItemHandler} disabled={item?.RateSqFtWise} />
                                    </td>
                                    <td>
                                        <input type="number" placeholder="RateSqFtWise" name='RateSqFtWise' id={item.id} onChange={edtiItemHandler} disabled={item?.RateItemWise} />
                                    </td>
                                    <td>
                                        <input type="number" placeholder="Total" name='Total' id={item.id} value={item.Total} onChange={edtiItemHandler} />
                                    </td>
                                    <td>
                                        <input type="file" name='Img' id={item.id} onChange={edtiItemHandler} />
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </table>
            <div>
                {
                    !clientData && <>
                        <button onClick={addItemHandler} disabled={clientData} className='btn'>
                            Add Item
                        </button>
                        {(!clientData && (items.length > 1)) &&
                            <button onClick={deleteItem} disabled={''} className='btn'>
                                Remove Item
                            </button>
                        }
                    </>
                }
            </div>
            <div className='math__data'>
                <div>
                    <label>Total Amount: </label>
                    <span>{total}</span>
                </div>
                <div>
                    <label>Discount: </label>
                    {clientData ? <span>{clientData?.discount}</span> :
                        <input type="number" placeholder='Discount' name='discount' onChange={handleChange} disabled={clientData} className='discount__input' />
                    }
                </div>
                <div>
                    <label>Advance: </label>
                    {clientData ? <span>{clientData?.advance}</span> :
                        <input type="number" placeholder='Advance' name='advance' onChange={handleChange} disabled={clientData} className='discount__input' />
                    }
                </div>
                <div>
                    <label>You're Saving: </label>
                    <span>{!figure ? null : figure}</span>
                </div>
                <div>
                    <label>Total Payment: </label>
                    <span>{finalPrice}</span>
                </div>
            </div>
            {
                !clientData && <button onClick={handleSubmit} disabled={clientData} className='btn'>Submit</button>
            }
        </div >
    )
}

export default Demo;
