import subjectRouter from '@modules/subjects/infra/http/router/subject.router';
import unitRouter from '@modules/unit/infra/http/router/unit.router';
import userRouter from '@modules/users/infra/http/router/user.router';
import userSubjectsRouter from '@modules/userSubjects/infra/http/router/userSubjects.router';
import { Router } from 'express';

const router = Router();

router.use('/users', userRouter);
router.use('/subject', subjectRouter);
router.use('/unit', unitRouter);
router.use('/userSubjects', userSubjectsRouter);

export default router;
