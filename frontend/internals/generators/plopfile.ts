/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodePlopAPI } from 'node-plop';
import { componentGenerator } from './component';
import shell from 'shelljs';
import Handlebars from 'handlebars';
import { sliceGenerator } from './slice';
import { querySliceGenerator } from './querySlice/index';
interface PrettifyCustomActionData {
  path: string;
}

Handlebars.registerHelper('properCase', (text: string) => {
  return text.replace(/(\w)(\w*)/g, (_, firstChar, rest) => {
    return firstChar.toUpperCase() + rest.toLowerCase();
  });
});

export default function plop(plop: NodePlopAPI) {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('slice', sliceGenerator);
  plop.setGenerator('query-slice', querySliceGenerator);

  plop.setActionType('prettify', (answers, config) => {
    const data = { ...answers, ...config?.data } as PrettifyCustomActionData;

    const jsVariableReplacedPath = data.path.replace(
      /\$\{([^}]+)\}/g,
      (_, varName) => eval(varName),
    );
    const template = Handlebars.compile(jsVariableReplacedPath);
    const resolvedPath = template(data);

    shell.exec(`yarn run prettify -- "${resolvedPath}"`);

    return ``;
  });
}
