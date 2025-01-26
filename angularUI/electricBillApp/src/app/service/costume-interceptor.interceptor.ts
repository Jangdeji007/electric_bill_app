import { HttpInterceptorFn } from '@angular/common/http';

export const costumeInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let modifiedReq = req;
  let token= localStorage.getItem("token");
  // Add headers if necessary
  if (token) {
      modifiedReq = req.clone({
          setHeaders: {
              Authorization: `Bearer ${token}`,
          },
      });
  }

  // Pass the modified request to the next handler
  return next(modifiedReq); 
};
