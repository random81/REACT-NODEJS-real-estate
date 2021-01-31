/*
A significant automatic part of the routing for the app functionality is as such:
User submits form->restCallMap->handelrequest->restmap->handleComp
*/
import express from 'express';
import index from '../controllers/index.server.controller';

const router = express.Router();
router.route('/').get(index.getContent);
// submit part A ajax request loads map
router.route('/restmap').post(index.restCallMap);
// submit part B of ajax request from handelrequest
router.route('/rest').post(index.restCall);
export default router;
