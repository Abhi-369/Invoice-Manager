import React from 'react'
import InvoiceField from './InvoiceField'

const InvoiceItem = ({ product, inchWidth, inchHeight, feetWidth, feetHeight, totalSqft, ratePerSqft, ratePerQunty, amount, onEditItem, id }) => {
    return (
        <tr>
            <td>
                <input type="text" placeholder="product" name='product' id={id} />
            </td>
            {/* <td>
                <InvoiceField
                    onEditItem={onEditItem}
                    // value={product}
                    name='product'
                    id={id}
                />
            </td>
            <td>
                <InvoiceField
                    onEditItem={onEditItem}
                    // value={inchWidth}
                    name='inchWidth'
                    id={id}
                />
            </td>
            <td>
                <InvoiceField
                    onEditItem={onEditItem}
                    // value={inchHeight}
                    name='inchHeight'
                    id={id}
                />
            </td>
            <td>
                <InvoiceField
                    onEditItem={onEditItem}
                    // value={feetWidth}
                    name='feetWidth'
                    id={id}
                />
            </td>
            <td>
                <InvoiceField
                    onEditItem={onEditItem}
                    // value={feetHeight}
                    name='feetHeight'
                    id={id}
                />
            </td>
            <td>
                <InvoiceField
                    onEditItem={onEditItem}
                    // value={totalSqft}
                    name='totalSqft'
                    id={id}
                />
            </td>
            <td>
                <InvoiceField
                    onEditItem={onEditItem}
                    // value={ratePerSqft}
                    name='ratePerSqft'
                    id={id}
                />
            </td>
            <td>
                <InvoiceField
                    onEditItem={onEditItem}
                    // value={ratePerQunty}
                    name='ratePerQunty'
                    id={id}
                />
            </td>
            <td>
                <InvoiceField
                    onEditItem={onEditItem}
                    // value={amount}
                    name='amount'
                    id={id}
                />
            </td> */}
        </tr>
    )
}

export default InvoiceItem;


