import React from 'react'

const ItemSearch = ({ items = []}) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.itemId}>
                            <td>{item.itemId}</td>
                            <td>{item.name}</td>
                            <td>{item.salePrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ItemSearch;