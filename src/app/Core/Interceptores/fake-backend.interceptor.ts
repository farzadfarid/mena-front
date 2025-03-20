import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

// Generate random available dates for specialists
const SPECIALISTS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  fullName: `Specialist ${i + 1}`,
  image: `./assets/images/specialist/${i + 1}.jpg`,
  skills: ['Plumbing', 'Carpentry', 'Masonry', 'Electrician', 'Painting'][i % 5],
  availableDates: generateRandomDates(), // Function generates random available dates
}));

function generateRandomDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < 5; i++) {
    let futureDate = new Date(today);
    futureDate.setDate(today.getDate() + (i * 2)); // Generates future dates
    dates.push(futureDate.toISOString().split('T')[0]); // Format: YYYY-MM-DD
  }
  return dates;
}

const SPECIALISTSDetail = SPECIALISTS.map(specialist => ({
  ...specialist,
  summary: `Expert in construction and building design with ${5 + (specialist.id % 5)} years of experience.`,
  age: 25 + (specialist.id % 20),
  certified: specialist.id % 2 === 0,
  rating: Math.floor(Math.random() * 5) + 1,
  cv: `https://www.africau.edu/images/default/sample.pdf`
}));

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(
      delay(1000), // Simulate network delay
      mergeMap(() => {
        if (req.url.startsWith('/api/specialists') && req.method === 'GET') {
          const urlParams = new URLSearchParams(req.url.split('?')[1]);
          const selectedDate = urlParams.get('date'); // Extract date parameter

          let filteredSpecialists = SPECIALISTS;

          if (selectedDate) {
            filteredSpecialists = SPECIALISTS.filter(specialist =>
              specialist.availableDates.includes(selectedDate)
            );
          }

          return of(new HttpResponse({ status: 200, body: filteredSpecialists }));
        }

        if (req.url.includes('/api/specialistDetail') && req.method === 'GET') {
          const match = req.url.match(/\/api\/specialistDetail\/(\d+)/);
          const id = match ? parseInt(match[1], 10) : 0;

          if (id === 0) {
            return of(new HttpResponse({ status: 400, body: { message: 'Invalid Specialist ID' } }));
          }

          const specialist = SPECIALISTSDetail.find(specialist => specialist.id === id);
          return specialist
            ? of(new HttpResponse({ status: 200, body: specialist }))
            : of(new HttpResponse({ status: 404, body: { message: 'Specialist not found' } }));
        }

        return next.handle(req);
      })
    );
  }
}
