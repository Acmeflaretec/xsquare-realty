const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { addbuilders,deletebuilders, getbuildersById, updatebuilders,getAdminbuilders,getSelectbuilders,
 } = require('../controllers/buildersController');    
const { upload } = require('../middlewares/multer');
  
router.post('/', upload.array('images', 10), addbuilders);
router.get('/adminbuilders', getAdminbuilders);
router.delete('/:id',  deletebuilders);
router.get('/:id', getbuildersById);
router.patch('/', upload.array('images', 10), updatebuilders);
router.get('/', getSelectbuilders); 

module.exports = router;
