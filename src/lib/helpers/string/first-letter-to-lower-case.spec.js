import firstLetterToLowerCase from './first-letter-to-lower-case';

describe('firstLetterToLowerCase', () => {
  it('should set the first letter to lower case', () => {
    let string = 'Sample';
    let result = firstLetterToLowerCase(string);

    expect(result).toBe('sample');
  });

  it('should not lower any other letter', () => {
    let string = 'Sample String';
    let result = firstLetterToLowerCase(string);

    expect(result).toBe('sample String');
  });
});
