import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {HttpService} from './http.service';
import {provideHttpClient} from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'https://66c9c0a459f4350f064d5742.mockapi.io/api/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request', async () => {
    const mockResponse = {data: 'test data'};
    const endpoint = 'test-endpoint';
    const options = {params: {limit: 20}};

    const result = service.get<typeof mockResponse>(endpoint, options);

    const req = httpTestingController.expectOne(`${baseUrl}${endpoint}?limit=20`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('limit')).toBe('20');

    req.flush(mockResponse);

    await expectAsync(result).toBeResolvedTo(mockResponse);
  });

  it('should send a POST request', async () => {
    const mockResponse = {data: 'test data'};
    const endpoint = 'test-endpoint';
    const body = {name: 'test name'};

    const result = service.post<typeof mockResponse>(endpoint, body);

    const req = httpTestingController.expectOne(`${baseUrl}${endpoint}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);

    req.flush(mockResponse);

    await expectAsync(result).toBeResolvedTo(mockResponse);
  });

  it('should send a PUT request', async () => {
    const mockResponse = {data: 'test data'};
    const endpoint = 'test-endpoint';
    const body = {name: 'updated name'};

    const result = service.put<typeof mockResponse>(endpoint, body);

    const req = httpTestingController.expectOne(`${baseUrl}${endpoint}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);

    req.flush(mockResponse);

    await expectAsync(result).toBeResolvedTo(mockResponse);
  });

  it('should send a DELETE request', async () => {
    const mockResponse = {data: 'test data'};
    const endpoint = 'test-endpoint';

    const result = service.delete<typeof mockResponse>(endpoint);

    const req = httpTestingController.expectOne(`${baseUrl}${endpoint}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(mockResponse);

    await expectAsync(result).toBeResolvedTo(mockResponse);
  });
});
