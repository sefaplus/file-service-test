/* Test constants, must correspond to the file being tested */
export const fileProperties = {
  extension: 'png', // Extension of a file to be used for testing
  content_type: 'image/png', // Mime type of the file to be used for testing
  content_length: '14338', // Size in bytes of the file to be tested
};

export const testFilePath = `${__dirname}/file.${fileProperties.extension}`; // Path to test file
