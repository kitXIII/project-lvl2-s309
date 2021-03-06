import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');

const resultPlainPath = path.resolve(__dirname, '__fixtures__/result_plain.txt');
const resultJsonPath = path.resolve(__dirname, '__fixtures__/result_json.json');

const firstJsonPath = path.resolve(__dirname, '__fixtures__/before.json');
const secondJsonPath = path.resolve(__dirname, '__fixtures__/after.json');

const firstYamlPath = path.resolve(__dirname, '__fixtures__/before.yml');
const secondYamlPath = path.resolve(__dirname, '__fixtures__/after.yml');

const firstIniPath = path.resolve(__dirname, '__fixtures__/before.ini');
const secondIniPath = path.resolve(__dirname, '__fixtures__/after.ini');

describe('Get diff between two files,and output to pretty format', () => {
  const result = fs.readFileSync(resultPath, 'utf8');

  test('Get diff json files', () => {
    expect(genDiff(firstJsonPath, secondJsonPath, 'pretty')).toBe(result);
  });

  test('Get diff yaml files', () => {
    expect(genDiff(firstYamlPath, secondYamlPath, 'pretty')).toBe(result);
  });

  test('Get diff ini files', () => {
    expect(genDiff(firstIniPath, secondIniPath, 'pretty')).toBe(result);
  });
});

describe('Get diff between two files,and output to alternative format', () => {
  test('Output diff to plain text format', () => {
    const result = fs.readFileSync(resultPlainPath, 'utf8');
    expect(genDiff(firstJsonPath, secondJsonPath, 'plain')).toBe(result);
  });

  test('Output diff to json format', () => {
    const result = fs.readFileSync(resultJsonPath, 'utf8');
    expect(genDiff(firstYamlPath, secondYamlPath, 'json')).toBe(result);
  });
});
