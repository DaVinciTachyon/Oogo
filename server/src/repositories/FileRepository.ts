import { FileType } from '../models/FileType.js'
import multer from 'multer'
import File, { FileInput } from '../entities/File.js'

const storage = multer.diskStorage({
    destination: (_req: any, _file: any, callback: any) => {
        callback(null, 'uploads')
    },
    filename: (_req: any, file: any, callback: any) => {
        callback(null, `${Date.now()}--${file.originalname}`)
    },
})

const upload = multer({ storage })

function add(id: number, type: FileType, file: FileInput) {
    return File.create({ ...file, userId: id, type })
}

function addCV(id: number, file: FileInput) {
    return add(id, FileType.CV, file)
}

function addID(id: number, file: FileInput) {
    return add(id, FileType.ID, file)
}

export default {
    upload,
    addID,
    addCV
}