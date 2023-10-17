

const uploadFile = (req, res) => {
    res.send('Recibido')
};

const getFiles = (req, res) => {
    res.send('All')
};

const getSingleFile = (req, res) => {

};


module.exports = {
    uploadFile,
    getFiles,
    getSingleFile
}