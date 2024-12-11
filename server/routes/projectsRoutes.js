const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { addprojects,deleteprojects, getprojectsById, updateprojects,getAdminprojects,getSelectprojects,
 } = require('../controllers/projectsController');    
const { upload } = require('../middlewares/multer');

router.post('/', upload.array('images', 10), addprojects);
router.get('/adminProjects', getAdminprojects);
router.delete('/:id',  deleteprojects);
router.get('/:id', getprojectsById);
router.patch('/', upload.array('images', 10), updateprojects);
router.get('/', getSelectprojects); 

module.exports = router;
