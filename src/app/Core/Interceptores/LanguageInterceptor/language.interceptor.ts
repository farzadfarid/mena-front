import { HttpInterceptorFn } from '@angular/common/http';

export const LanguageInterceptor: HttpInterceptorFn = (req, next) => {
  const language = localStorage.getItem('selectedLanguage') || 'en';
  console.log('🔹 زبان ارسال شده در هدر:', language); // نمایش مقدار زبان در کنسول
  const modifiedReq = req.clone({
    setHeaders: {
      'Accept-Language': language
    }
  });

  return next(modifiedReq);
};
