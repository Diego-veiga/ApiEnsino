import subjectRouter from '@modules/subjects/infra/http/router/subject.router';
import userRouter from '@modules/users/infra/http/router/user.router';
import { Router } from 'express';
const router = Router();

router.use('/users', userRouter);
router.use('/subject', subjectRouter);

export default router;
