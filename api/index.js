const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./api/db.json');
const middleWares = jsonServer.defaults();
const dataBase = router.db;
server.use(middleWares);
server.use(jsonServer.bodyParser);

server.get('/get', (req, res) => {
    const dataKey = req.query.key;
    const data = dataBase.get(`${dataKey}`).value();

    res.json({
        success: true,
        data: data
    });
});

server.post('/post', (req, res) => {
    const dataName = req.query.key;
    const newData = req.body;

    try {
        const dbData = dataBase.get(dataName);

        dataBase.set(dataName, [...dbData, newData]).write();

        res.status(200).json({
            data: dbData.value(),
            success: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errMsg: err.message
        });
    }
});

server.put('/put', (req, res) => {
    const dataName = req.query.key;
    const updatedData = req.body;

    try {
        const dbData = dataBase.get(dataName);

        // Assuming your data structure has an identifier for each item
        const itemIdToUpdate = updatedData.orderId;
        const updatedIndex = dbData.findIndex(item => item.orderId === itemIdToUpdate);

        if (updatedIndex === -1) {
            throw new Error('Item not found');
        }

        dataBase.set(dataName,[
            ...dbData.slice(0, updatedIndex),
            updatedData,
            ...dbData.slice(updatedIndex + 1)
        ]).write();

        res.status(200).json({
            data: dbData.value(),
            success: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errMsg: err.message
        });
    }
});



server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running');
});
