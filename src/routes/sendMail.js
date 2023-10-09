const { Router } = require('express');
const {sendMailContact, getAllcontactos} = require('../controllers/ContactoMail')

const router = Router();

router.post('/', sendMailContact);
router.get('/', getAllcontactos)


module.exports = router;