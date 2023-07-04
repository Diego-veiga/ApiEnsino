import 'reflect-metadata';
import { area } from '@modules/subjects/domain/enum/area';
import { SubjectToSubjectViewMapper } from '@modules/subjects/mappers/SubjectToSubjectView.mappper';

describe('MapperSubjectToSubjectView', () => {
  it('Must return the SubjectView', async () => {
    const subject = {
      id: '1',
      name: 'math',
      area: area.human,
      active: true,
      create_at: new Date(),
      update_at: new Date(),
    };
    const subjectView = {
      id: '1',
      name: 'math',
      area: area.human,
      creationDate: new Date(),
      updateDate: new Date(),
    };

    const subjectToSubjectViewMapper = new SubjectToSubjectViewMapper();

    const result =
      subjectToSubjectViewMapper.mapperSubjectToSubjectView(subject);

    expect(result).toEqual(subjectView);
  });
});
