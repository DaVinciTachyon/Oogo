import { Response, Router } from 'express';
import { handleRequest } from '../services/RequestService.js';
import joi from 'joi';
import { getEnumValues } from '../services/ValidationService.js';
import { UserRole } from '../models/UserRole.js';
import { UserStatus } from '../models/UserStatus.js';
import UserService from '../services/UserService.js';
import { isAuthenticated, isAdmin } from '../services/AuthorisationService.js';
import { ApiRequest } from "../models/ApiContext";
import FileRepository from '../repositories/FileRepository.js';

const router = Router();

router.patch('/:id', isAuthenticated, isAdmin, handleRequest(async (req: ApiRequest, res: Response) => {
    await UserService.patch(parseInt(req.params['id'] as string, 10), req.body)
    res.send({ message: 'User Successfully updated!' })
  },
  {
    params: joi.object({
      id: joi.number().min(0).required()
    }),
    body: joi.object({
      status: joi.valid(...getEnumValues(UserStatus)).required()
    })
  }
))

router.get('/search', isAuthenticated, isAdmin, handleRequest(async (req: ApiRequest, res: Response) => {
    const query = {
      status: (req.query['status'] as string[]).map((status) => status as UserStatus)
    }
    const users = await UserService.list(query)
    res.send({ users })
  },
  {
    query: joi.object({
      status: joi.array().items(joi.valid(...getEnumValues(UserStatus)))
    })
  }
))

router.post(
  '/cv/:id', 
  FileRepository.upload.single('curriculumVitae'), 
  handleRequest((req: ApiRequest, res: Response) => {
    const userId = parseInt(req.params['id'] as string, 10)
    FileRepository.addCV(userId, req.file as any)
    res.json({ message: 'CV successfully uploaded' })
  },
  {
    params: joi.object({
      id: joi.number().min(0).required()
    }),
  })
)
router.post(
  '/id/:id', 
  FileRepository.upload.single('identification'), 
  handleRequest((req: ApiRequest, res: Response) => {
    const userId = parseInt(req.params['id'] as string, 10)
    FileRepository.addID(userId, req.file as any)
    res.json({ message: 'CV successfully uploaded' })
  },
  {
    params: joi.object({
      id: joi.number().min(0).required()
    }),
  })
)

router.post('/signup', handleRequest(
  async (req: ApiRequest, res: Response) => {
    const userId = await UserService.signUp(req.body);
    res.send({ message: 'Successfully Signed Up!', id: userId });
  },
  {
    body: joi.object({
      basicDetails: joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        age: joi.number().min(0),
        email: joi.string().email().required(),
        password: joi.string().required(),
        role: joi.valid(...getEnumValues(UserRole)).required(),
      }),
      details: joi.object({
        experience: joi.number().min(0),
        qualifications: joi.string(),
        rate: joi.number(),
        transport: joi.boolean(),
        inHome: joi.boolean(),
        description: joi.string(),
      }),
      payment: joi.object({
        name: joi.string(),
        iban: joi.string(),
      })
    }),
  },
));

router.post('/login', handleRequest(
  async (req: ApiRequest, res: Response) => {
    const token = await UserService.logIn(req.body.email, req.body.password);
    const user = await UserService.getByEmail(req.body.email)
    res.send({ token, user });
  },
  {
    body: joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
  },
));

export default router;
