import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'

const Home = () => {

    const [data, setData] = useState()
    const [name, setName] = useState('')
    const [products, setProducts] = useState({ products: [] })
    const [fetchData, setFetchData] = useState()

    const [clientData, setClientData] = useState({
        username: '',
        number: ''
    })
    const [flexBanner, setFlexBanner] = useState({
        flexBanner: {
            inchWidth: '',
            inchHeight: '',
            feetWidth: '',
            feetHeight: '',
            totalSqft: '',
            ratePerSqft: '',
            ratePerQunty: '',
            amount: '',
        }
    })

    const [vinyle, setVinyle] = useState({
        vinyle: {
            inchWidth: '',
            inchHeight: '',
            feetWidth: '',
            feetHeight: '',
            totalSqft: '',
            ratePerSqft: '',
            ratePerQunty: '',
            amount: '',
        }
    })
    const [vinyleWithFoam, setVinyleWithFoam] = useState({
        vinyleWithFoam: {
            inchWidth: '',
            inchHeight: '',
            feetWidth: '',
            feetHeight: '',
            totalSqft: '',
            ratePerSqft: '',
            ratePerQunty: '',
            amount: '',
        }
    })

    const [design, setDesign] = useState({
        design: {
            inchWidth: '',
            inchHeight: '',
            feetWidth: '',
            feetHeight: '',
            totalSqft: '',
            ratePerSqft: '',
            ratePerQunty: '',
            amount: '',
        }
    })
    const [pasting, setPasting] = useState({
        pasting: {
            inchWidth: '',
            inchHeight: '',
            feetWidth: '',
            feetHeight: '',
            totalSqft: '',
            ratePerSqft: '',
            ratePerQunty: '',
            amount: '',
        }
    })

    const [flexBannerAndFrame, setFlexBannerAndFrame] = useState({
        flexBannerAndFrame: {
            inchWidth: '',
            inchHeight: '',
            feetWidth: '',
            feetHeight: '',
            totalSqft: '',
            ratePerSqft: '',
            ratePerQunty: '',
            amount: '',
        }
    })

    useEffect(() => {
        setProducts({ products: { ...flexBanner, ...flexBannerAndFrame, ...vinyle, ...vinyleWithFoam, ...design, ...pasting } })
        setData({ ...clientData, ...products })
    }, [clientData, flexBanner, flexBannerAndFrame, vinyle, vinyleWithFoam, design, pasting])

    const clientDataChange = (e) => {
        const value = e.target.value
        setClientData({ ...clientData, [e.target.name]: value })
    }

    const handleChangeOne = (e) => {
        const value = e.target.value
        setFlexBanner({ flexBanner: { ...flexBanner.flexBanner, [e.target.name]: value } })
    }

    const handleChangeTwo = (e) => {
        const value = e.target.value
        setFlexBannerAndFrame({ flexBannerAndFrame: { ...flexBannerAndFrame.flexBannerAndFrame, [e.target.name]: value } })
    }

    const handleChangeThree = (e) => {
        const value = e.target.value
        setVinyle({ vinyle: { ...vinyle.vinyle, [e.target.name]: value } })
    }

    const handleChangeFour = (e) => {
        const value = e.target.value
        setVinyleWithFoam({ vinyleWithFoam: { ...vinyleWithFoam.vinyleWithFoam, [e.target.name]: value } })
    }

    const handleChangeFive = (e) => {
        const value = e.target.value
        setDesign({ design: { ...design.design, [e.target.name]: value } })
    }

    const handleChangeSix = (e) => {
        const value = e.target.value
        setPasting({ pasting: { ...pasting.pasting, [e.target.name]: value } })
    }

    const handleSubmit = (e) => {
        const res = axios.post('http://localhost:5000/api/client', data)
        console.log(res.data)
        setClientData({ username: '', number: '' })
        setFlexBanner({
            flexBanner: {
                inchWidth: '',
                inchHeight: '',
                feetWidth: '',
                feetHeight: '',
                totalSqft: '',
                ratePerSqft: '',
                ratePerQunty: '',
                amount: '',
            }
        })
        setFlexBannerAndFrame({
            flexBannerAndFrame: {
                inchWidth: '',
                inchHeight: '',
                feetWidth: '',
                feetHeight: '',
                totalSqft: '',
                ratePerSqft: '',
                ratePerQunty: '',
                amount: '',
            }
        })
        setVinyle({
            vinyle: {
                inchWidth: '',
                inchHeight: '',
                feetWidth: '',
                feetHeight: '',
                totalSqft: '',
                ratePerSqft: '',
                ratePerQunty: '',
                amount: '',
            }
        })
        setVinyleWithFoam({
            vinyleWithFoam: {
                inchWidth: '',
                inchHeight: '',
                feetWidth: '',
                feetHeight: '',
                totalSqft: '',
                ratePerSqft: '',
                ratePerQunty: '',
                amount: '',
            }
        })
        setDesign({
            design: {
                inchWidth: '',
                inchHeight: '',
                feetWidth: '',
                feetHeight: '',
                totalSqft: '',
                ratePerSqft: '',
                ratePerQunty: '',
                amount: '',
            }
        })
        setPasting({
            pasting: {
                inchWidth: '',
                inchHeight: '',
                feetWidth: '',
                feetHeight: '',
                totalSqft: '',
                ratePerSqft: '',
                ratePerQunty: '',
                amount: '',
            }
        })
    }

    const fetchClient = (e) => {
        const res = axios.get(`http://localhost:5000/api/client/?name=${name}`)
            .then((res) => setFetchData(res.data))
            .catch((err) => console.log(err))

    }

    console.log("dadafen", fetchData)
    console.log('lol', flexBanner.flexBanner)


    return (
        <div>
            <div className="search__data">
                <input type="text" placeholder="get client data by search their name" onChange={(e) => setName(e.target.value)} />
                <button onClick={fetchClient}>Search</button>
            </div>
            <table border="n" style={{ borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th colspan="9">RETAIL WORK ESTIMATE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>NAME</td>
                        {fetchData ? <td>{fetchData.username}</td> :
                            <td><input type="text" className='input' placeholder="nom" name='username' value={clientData.username} onChange={clientDataChange} /></td>
                        }
                    </tr>
                    <tr>
                        <td>MOBILE NUMBER</td>
                        {fetchData ? <td>{fetchData.number}</td> :
                            <td><input type="number" className='input' placeholder="number" name='number' value={clientData.number} onChange={clientDataChange} /></td>
                        }
                    </tr>
                    <tr>
                        <td>DATE</td>
                        <td><input type="date" className='input' placeholder="date" /></td>
                    </tr>
                    <tr>
                        <td>TIME</td>
                        <td><input type="time" className='input' placeholder="time" /></td>
                    </tr>
                    <tr>
                        <th>PRODUCT</th>
                        <th>INCH WIDTH</th>
                        <th>INCH HEIGHT</th>
                        <th>FEET WIDTH</th>
                        <th>FEET HEIGHT</th>
                        <th>TOTAL SQ.FT</th>
                        <th>RATE PER.SQ.FT</th>
                        <th>RATE PER QUANTITY</th>
                        <th>AMOUNT</th>
                    </tr>

                    <tr>
                        <td>FLEXBANNER</td>
                        {fetchData ? <td>{fetchData.products[0]?.flexBanner?.inchWidth}</td> :
                            <td><input type="text" className="input" value={flexBanner?.flexBanner?.inchWidth} placeholder="Insert your value here" onChange={handleChangeOne} name='inchWidth' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBanner?.inchHeight}</td> :
                            <td><input type="text" className="input" value={flexBanner?.flexBanner?.inchHeight} placeholder="Insert your value here" onChange={handleChangeOne} name='inchHeight' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBanner?.feetWidth}</td> :
                            <td><input type="text" className="input" value={flexBanner?.flexBanner?.feetWidth} placeholder="Insert your value here" onChange={handleChangeOne} name='feetWidth' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBanner?.feetHeight}</td> :
                            <td><input type="text" className="input" value={flexBanner?.flexBanner?.feetHeight} placeholder="Insert your value here" onChange={handleChangeOne} name='feetHeight' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBanner?.totalSqft}</td> :
                            <td><input type="text" className="input" value={flexBanner?.flexBanner?.totalSqft} placeholder="Insert your value here" onChange={handleChangeOne} name='totalSqft' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBanner?.ratePerSqft}</td> :
                            <td><input type="text" className="input" value={flexBanner?.flexBanner?.ratePerSqft} placeholder="Insert your value here" onChange={handleChangeOne} name='ratePerSqft' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBanner?.ratePerQunty}</td> :
                            <td><input type="text" className="input" value={flexBanner?.flexBanner?.ratePerQunty} placeholder="Insert your value here" onChange={handleChangeOne} name='ratePerQunty' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBanner?.amount}</td> :
                            <td><input type="text" className="input" value={flexBanner?.flexBanner?.amount} placeholder="Insert your value here" onChange={handleChangeOne} name='amount' /></td>
                        }
                    </tr>
                    <tr>
                        <td>FLEXBANNERANDFRAME</td>
                        {fetchData ? <td>{fetchData.products[0]?.flexBannerAndFrame?.inchWidth}</td> :
                            <td><input type="text" className="input" value={flexBannerAndFrame?.flexBannerAndFrame?.inchWidth} placeholder="Insert your value here" onChange={handleChangeTwo} name='inchWidth' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBannerAndFrame?.inchHeight}</td> :
                            <td><input type="text" className="input" value={flexBannerAndFrame?.flexBannerAndFrame?.inchHeight} placeholder="Insert your value here" onChange={handleChangeTwo} name='inchHeight' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBannerAndFrame?.feetWidth}</td> :
                            <td><input type="text" className="input" value={flexBannerAndFrame?.flexBannerAndFrame?.feetWidth} placeholder="Insert your value here" onChange={handleChangeTwo} name='feetWidth' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBannerAndFrame?.feetHeight}</td> :
                            <td><input type="text" className="input" value={flexBannerAndFrame?.flexBannerAndFrame?.feetHeight} placeholder="Insert your value here" onChange={handleChangeTwo} name='feetHeight' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBannerAndFrame?.totalSqft}</td> :
                            <td><input type="text" className="input" value={flexBannerAndFrame?.flexBannerAndFrame?.totalSqft} placeholder="Insert your value here" onChange={handleChangeTwo} name='totalSqft' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBannerAndFrame?.ratePerSqft}</td> :
                            <td><input type="text" className="input" value={flexBannerAndFrame?.flexBannerAndFrame?.ratePerSqft} placeholder="Insert your value here" onChange={handleChangeTwo} name='ratePerSqft' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBannerAndFrame?.ratePerQunty}</td> :
                            <td><input type="text" className="input" value={flexBannerAndFrame?.flexBannerAndFrame?.ratePerQunty} placeholder="Insert your value here" onChange={handleChangeTwo} name='ratePerQunty' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.flexBannerAndFrame?.amount}</td> :
                            <td><input type="text" className="input" value={flexBannerAndFrame?.flexBannerAndFrame?.amount} placeholder="Insert your value here" onChange={handleChangeTwo} name='amount' /></td>
                        }
                    </tr>
                    <tr>
                        <td>VINYLE</td>
                        {fetchData ? <td>{fetchData.products[0]?.vinyle?.inchWidth}</td> :
                            <td><input type="text" className="input" value={vinyle?.vinyle?.inchWidth} placeholder="Insert your value here" onChange={handleChangeThree} name='inchWidth' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyle?.inchHeight}</td> :
                            <td><input type="text" className="input" value={vinyle?.vinyle?.inchHeight} placeholder="Insert your value here" onChange={handleChangeThree} name='inchHeight' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyle?.feetWidth}</td> :
                            <td><input type="text" className="input" value={vinyle?.vinyle?.feetWidth} placeholder="Insert your value here" onChange={handleChangeThree} name='feetWidth' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyle?.feetHeight}</td> :
                            <td><input type="text" className="input" value={vinyle?.vinyle?.feetHeight} placeholder="Insert your value here" onChange={handleChangeThree} name='feetHeight' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyle?.totalSqft}</td> :
                            <td><input type="text" className="input" value={vinyle?.vinyle?.totalSqft} placeholder="Insert your value here" onChange={handleChangeThree} name='totalSqft' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyle?.ratePerSqft}</td> :
                            <td><input type="text" className="input" value={vinyle?.vinyle?.ratePerSqft} placeholder="Insert your value here" onChange={handleChangeThree} name='ratePerSqft' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyle?.ratePerQunty}</td> :
                            <td><input type="text" className="input" value={vinyle?.vinyle?.ratePerQunty} placeholder="Insert your value here" onChange={handleChangeThree} name='ratePerQunty' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyle?.amount}</td> :
                            <td><input type="text" className="input" value={vinyle?.vinyle?.amount} placeholder="Insert your value here" onChange={handleChangeThree} name='amount' /></td>
                        }
                    </tr>
                    <tr>
                        <td>VINYLE WITH FOAM SHEET</td>
                        {fetchData ? <td>{fetchData.products[0]?.vinyleWithFoam?.inchWidth}</td> :
                            <td><input type="text" className="input" value={vinyleWithFoam?.vinyleWithFoam?.inchWidth} placeholder="Insert your value here" onChange={handleChangeFour} name='inchWidth' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyleWithFoam?.inchHeight}</td> :
                            <td><input type="text" className="input" value={vinyleWithFoam?.vinyleWithFoam?.inchHeight} placeholder="Insert your value here" onChange={handleChangeFour} name='inchHeight' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyleWithFoam?.feetWidth}</td> :
                            <td><input type="text" className="input" value={vinyleWithFoam?.vinyleWithFoam?.feetWidth} placeholder="Insert your value here" onChange={handleChangeFour} name='feetWidth' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyleWithFoam?.feetHeight}</td> :
                            <td><input type="text" className="input" value={vinyleWithFoam?.vinyleWithFoam?.feetHeight} placeholder="Insert your value here" onChange={handleChangeFour} name='feetHeight' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyleWithFoam?.totalSqft}</td> :
                            <td><input type="text" className="input" value={vinyleWithFoam?.vinyleWithFoam?.totalSqft} placeholder="Insert your value here" onChange={handleChangeFour} name='totalSqft' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyleWithFoam?.ratePerSqft}</td> :
                            <td><input type="text" className="input" value={vinyleWithFoam?.vinyleWithFoam?.ratePerSqft} placeholder="Insert your value here" onChange={handleChangeFour} name='ratePerSqft' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyleWithFoam?.ratePerQunty}</td> :
                            <td><input type="text" className="input" value={vinyleWithFoam?.vinyleWithFoam?.ratePerQunty} placeholder="Insert your value here" onChange={handleChangeFour} name='ratePerQunty' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.vinyleWithFoam?.amount}</td> :
                            <td><input type="text" className="input" value={vinyleWithFoam?.vinyleWithFoam?.amount} placeholder="Insert your value here" onChange={handleChangeFour} name='amount' /></td>
                        }
                    </tr>
                    <tr>
                        <td>DESIGN</td>
                        {fetchData ? <td>{fetchData.products[0]?.design?.inchWidth}</td> :
                            <td><input type="text" className="input" value={design?.design?.inchWidth} placeholder="Insert your value here" onChange={handleChangeFive} name='inchWidth' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.design?.inchHeight}</td> :
                            <td><input type="text" className="input" value={design?.design?.inchHeight} placeholder="Insert your value here" onChange={handleChangeFive} name='inchHeight' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.design?.feetWidth}</td> :
                            <td><input type="text" className="input" value={design?.design?.feetWidth} placeholder="Insert your value here" onChange={handleChangeFive} name='feetWidth' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.design?.feetHeight}</td> :
                            <td><input type="text" className="input" value={design?.design?.feetHeight} placeholder="Insert your value here" onChange={handleChangeFive} name='feetHeight' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.design?.totalSqft}</td> :
                            <td><input type="text" className="input" value={design?.design?.totalSqft} placeholder="Insert your value here" onChange={handleChangeFive} name='totalSqft' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.design?.ratePerSqft}</td> :
                            <td><input type="text" className="input" value={design?.design?.ratePerSqft} placeholder="Insert your value here" onChange={handleChangeFive} name='ratePerSqft' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.design?.ratePerQunty}</td> :
                            <td><input type="text" className="input" value={design?.design?.ratePerQunty} placeholder="Insert your value here" onChange={handleChangeFive} name='ratePerQunty' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.design?.amount}</td> :
                            <td><input type="text" className="input" value={design?.design?.amount} placeholder="Insert your value here" onChange={handleChangeFive} name='amount' /></td>
                        }
                    </tr>
                    <tr>
                        <td>PASTING AND FEETING</td>
                        {fetchData ? <td>{fetchData.products[0]?.pasting?.inchWidth}</td> :
                            <td><input type="text" className="input" value={pasting?.pasting?.inchWidth} placeholder="Insert your value here" onChange={handleChangeSix} name='inchWidth' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.pasting?.inchHeight}</td> :
                            <td><input type="text" className="input" value={pasting?.pasting?.inchHeight} placeholder="Insert your value here" onChange={handleChangeSix} name='inchHeight' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.pasting?.feetWidth}</td> :
                            <td><input type="text" className="input" value={pasting?.pasting?.feetWidth} placeholder="Insert your value here" onChange={handleChangeSix} name='feetWidth' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.pasting?.feetHeight}</td> :
                            <td><input type="text" className="input" value={pasting?.pasting?.feetHeight} placeholder="Insert your value here" onChange={handleChangeSix} name='feetHeight' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.pasting?.totalSqft}</td> :
                            <td><input type="text" className="input" value={pasting?.pasting?.totalSqft} placeholder="Insert your value here" onChange={handleChangeSix} name='totalSqft' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.pasting?.ratePerSqft}</td> :
                            <td><input type="text" className="input" value={pasting?.pasting?.ratePerSqft} placeholder="Insert your value here" onChange={handleChangeSix} name='ratePerSqft' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.pasting?.ratePerQunty}</td> :
                            <td><input type="text" className="input" value={pasting?.pasting?.ratePerQunty} placeholder="Insert your value here" onChange={handleChangeSix} name='ratePerQunty' /></td>
                        }
                        {fetchData ? <td>{fetchData.products[0]?.pasting?.amount}</td> :
                            <td><input type="text" className="input" value={pasting?.pasting?.amount} placeholder="Insert your value here" onChange={handleChangeSix} name='amount' /></td>
                        }
                    </tr>

                </tbody>
            </table>
            <div className='btn'>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div >
    )
}

export default Home