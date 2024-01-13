export const createMockRequest = (body = {}, query = {}) => {
    return {
      body,
      query,
    };
  };
  
  export const createMockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  