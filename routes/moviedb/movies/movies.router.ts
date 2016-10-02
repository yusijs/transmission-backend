import express = require("express")
import { moviedb } from '../../../config'

export const router = express.Router({})

import { router as FIND_ROUTER} from './find'

router.use("/find", FIND_ROUTER)