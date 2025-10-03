
// This is a mock client to simulate API requests.
// In a real application, this would be an instance of axios or a fetch-based client.
const httpClient = {
  get: (url: string) => Promise.resolve({ data: null }),
  post: (url: string, data: any) => Promise.resolve({ data }),
  put: (url: string, data: any) => Promise.resolve({ data }),
  delete: (url: string) => Promise.resolve(),
};
export default httpClient;
