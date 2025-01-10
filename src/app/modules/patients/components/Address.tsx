import React, { useState } from 'react';

const Address: React.FC = () => {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Address submitted:', address);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="street">Street:</label>
                <input
                    type="text"
                    id="street"
                    name="street"
                    value={address.street}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="state">State:</label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="zip">Zip Code:</label>
                <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={address.zip}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Address;