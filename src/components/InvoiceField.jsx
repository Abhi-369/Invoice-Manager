import React from 'react'

const InvoiceField = ({ onEditItem, value, name, id }) => {
    return (
        <input
            type={name === 'product' ? 'text' : 'number'}
            min="0"
            // value={value}
            name={name}
            id={id}
            required
            placeholder={name}
            onChange={onEditItem}
        />
    )
}

export default InvoiceField;
