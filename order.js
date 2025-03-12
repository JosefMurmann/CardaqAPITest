const express = require('express');
const path = require('path');
//const fetch = require('node-fetch'); // Ensure node-fetch is imported correctly
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', async (req, res) => {
    try {
        const response = await fetch('https://gate.cardaq.co.uk/api/v0.6/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ****'
            },
            body: JSON.stringify({
                "client": {
                    "email": "example@mail.com"
                },
                "products": [
                    {
                        "price": req.body.products[0].price,
                        "title": req.body.products[0].title
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            res.status(response.status).json(errorData);
            return;
        }

        const data = await response.json();
        console.log('Order created successfully:', data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/product', async (req, res) => {
    try {
        const response = await fetch('https://gate.cardaq.co.uk/api/v0.6/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 100f3d7982112ded1876c7b8759718dffe0635d79a8443a260467a5d717f67f2'
            },
            body: JSON.stringify({
                "brand": req.body.brand,
                "currency": req.body.currency,
                "price": req.body.price,
                "title": req.body.title
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            res.status(response.status).json(errorData);
            return;
        }

        const data = await response.json();
        console.log('Product created successfully:', data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/products', async (req, res) => {
    try {
        const response = await fetch('https://gate.cardaq.co.uk/api/v0.6/products/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 100f3d7982112ded1876c7b8759718dffe0635d79a8443a260467a5d717f67f2'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            res.status(response.status).json(errorData);
            return;
        }

        const data = await response.json();
        console.log('Products fetched successfully:', data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
