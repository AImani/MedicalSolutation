import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LayoutSplashScreen } from '@/_metronic/layout/core';
import { AdminSurvey } from '.';
import { AddEditeSurvey } from './Questions/AddEditeSurvey';
import { AddQuestion } from './Questions/AddQuestion';
import { QuestionOptionlist } from './QuestionOptions/QuestionOptionlist';
import { AddQuestionOptions } from './QuestionOptions/AddQuestionOption';
import { AdminSurveyResponses } from './Responses/AdminSurveyResponses';

export const SurveyRoutes = ({ ...props }: any) => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/list' element={<AdminSurvey />} />
        <Route path='/responses' element={<AdminSurveyResponses />} />
        <Route path='/add' element={<AddEditeSurvey />} />
        <Route path='/edit/:id' element={<AddEditeSurvey />} />
        <Route path='/edit/:id/add-question' element={<AddQuestion />} />
        <Route path='/:id/question-option-list/:qsid' element={<QuestionOptionlist />} />
        <Route path='/:id/question-option-list/:qsid/add-option' element={<AddQuestionOptions />} />
      </Routes>
    </Suspense>
  );
};

export default SurveyRoutes;
